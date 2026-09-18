/**
 * Client GraphQL Buffer (https://api.buffer.com) per il tool locale.
 */
const BUFFER_API = 'https://api.buffer.com';

const CREATE_POST = `
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    __typename
    ... on PostActionSuccess {
      post { id status dueAt text }
    }
    ... on LimitReachedError { message }
    ... on InvalidInputError { message }
    ... on UnauthorizedError { message }
    ... on UnexpectedError { message }
    ... on RestProxyError { message code }
    ... on NotFoundError { message }
  }
}`;

const ACCOUNT_Q = `
query AccountStatus {
  account {
    id
    timezone
    organizations {
      id
      name
      limits { scheduledPosts }
    }
  }
}`;

const POSTS_Q = `
query ListScheduledPosts(
  $organizationId: OrganizationId!
  $channelIds: [ChannelId!]
  $status: [PostStatus!]
  $first: Int
) {
  posts(
    first: $first
    input: {
      organizationId: $organizationId
      filter: { channelIds: $channelIds, status: $status }
      sort: [{ field: dueAt, direction: asc }]
    }
  ) {
    edges {
      node {
        id
        status
        dueAt
        text
        channelId
        channelService
      }
    }
    pageInfo { hasNextPage endCursor }
  }
}`;

export function loadEnvFromDisk(fs, filePath) {
  if (!fs.existsSync(filePath)) return {};
  const out = {};
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq < 1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

export async function bufferGql(apiKey, query, variables = {}) {
  const res = await fetch(BUFFER_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Buffer HTTP ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
  }
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }
  return json.data;
}

export async function getAccountStatus(apiKey) {
  const data = await bufferGql(apiKey, ACCOUNT_Q);
  const account = data.account;
  // currentTime non è più nel GraphQL Account: lo deriviamo dal timezone
  const tz = account?.timezone || 'UTC';
  let currentTime;
  try {
    currentTime = new Intl.DateTimeFormat('sv-SE', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date()).replace(' ', 'T');
  } catch {
    currentTime = new Date().toISOString();
  }
  return { ...account, currentTime };
}

/** Post in coda Buffer (scheduled + sending) per canale. */
export async function listChannelQueue(apiKey, { organizationId, channelId, first = 50 } = {}) {
  if (!organizationId) throw new Error('organizationId mancante');
  const data = await bufferGql(apiKey, POSTS_Q, {
    organizationId,
    channelIds: channelId ? [channelId] : undefined,
    status: ['scheduled', 'sending'],
    first: Math.min(100, Math.max(1, first)),
  });
  const edges = data?.posts?.edges || [];
  return edges.map((e) => ({
    id: e.node.id,
    status: e.node.status,
    dueAt: e.node.dueAt,
    text: e.node.text,
    channelId: e.node.channelId,
    channelService: e.node.channelService,
  }));
}

export async function createPinterestPost(apiKey, {
  channelId,
  text,
  dueAt,
  imageUrl,
  title,
  link,
  boardServiceId,
}) {
  const input = {
    channelId,
    schedulingType: 'automatic',
    mode: 'customScheduled',
    dueAt,
    text,
    assets: [
      {
        image: {
          url: imageUrl,
          thumbnailUrl: imageUrl,
          metadata: { altText: title || 'Pin Luxseetarot' },
        },
      },
    ],
    metadata: {
      pinterest: {
        title: title || 'Luxseetarot',
        url: link,
        boardServiceId: String(boardServiceId),
      },
    },
  };
  const data = await bufferGql(apiKey, CREATE_POST, { input });
  const payload = data.createPost;
  if (payload.__typename !== 'PostActionSuccess') {
    const err = new Error(payload.message || payload.__typename || 'Buffer createPost failed');
    err.code = payload.__typename;
    err.payload = payload;
    throw err;
  }
  return payload.post;
}
