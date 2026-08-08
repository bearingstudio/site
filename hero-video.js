/* ============================================
   BEARING STUDIO — hero-video.js
   Randomize the background video's start time on each
   load, instead of always starting from 0:00.
   ============================================ */
(function(){
  function randomizeStart(id) {
    var el = document.getElementById(id);
    if (!el || typeof Vimeo === 'undefined') return;
    var player = new Vimeo.Player(el);
    player.getDuration().then(function(duration){
      if (!duration) return;
      return player.setCurrentTime(Math.random() * duration);
    }).catch(function(){});
  }
  ['bs-hero-video', 'cay-hero-video'].forEach(randomizeStart);
})();
