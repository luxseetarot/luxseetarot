(function () {
  var originalTitle = document.title;
  var messages = ['😊 Torna qui!', '✨ Ti aspettiamo…'];
  var idx = 0;
  var timer = null;

  function start() {
    originalTitle = document.title;
    idx = 0;
    document.title = messages[0];
    if (timer) return;
    timer = setInterval(function () {
      idx = (idx + 1) % messages.length;
      document.title = messages[idx];
    }, 1600);
  }

  function stop() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    document.title = originalTitle;
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) start();
    else stop();
  });
})();
