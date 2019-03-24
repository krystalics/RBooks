(function () {
  var html = document.documentElement;

  function onWindowResize() {
    // html.style.fontSize = html.getBoundingClientRect().width / 25 + 'px';
    html.style.fontSize = 50 + 'px';//先默认50px
  }

  window.addEventListener('resize', onWindowResize);
  onWindowResize();
})();