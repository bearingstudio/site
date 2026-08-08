/* ============================================
   BEARING STUDIO — a11y.js
   Shared accessibility menu (large text / high contrast)
   Used by index.html, beacon.html, cayenne.html
   ============================================ */
(function(){
  var btn  = document.getElementById('a11y-toggle');
  var menu = document.getElementById('a11y-menu');
  if (!btn || !menu) return;

  function openMenu(o) {
    menu.classList.toggle('is-open', o);
    btn.setAttribute('aria-expanded', o ? 'true' : 'false');
  }
  btn.addEventListener('click', function(e){ e.stopPropagation(); openMenu(!menu.classList.contains('is-open')); });
  document.addEventListener('click', function(e){ if (!menu.contains(e.target) && e.target !== btn) openMenu(false); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') openMenu(false); });

  var toggles = {
    'large-text':    { cls: 'bs-a11y-large-text',   target: document.documentElement, key: 'bs-large-text' },
    'high-contrast': { cls: 'bs-a11y-high-contrast', target: document.body,            key: 'bs-high-contrast' }
  };
  Object.keys(toggles).forEach(function(name){
    var t = toggles[name];
    try {
      if (localStorage.getItem(t.key) === 'true') t.target.classList.add(t.cls);
      var optBtn = document.querySelector('[data-toggle="' + name + '"]');
      if (optBtn) optBtn.setAttribute('aria-pressed', localStorage.getItem(t.key) === 'true' ? 'true' : 'false');
    } catch(e) {}
  });
  document.querySelectorAll('[data-toggle]').forEach(function(opt){
    opt.addEventListener('click', function(e){
      e.stopPropagation();
      var name = opt.getAttribute('data-toggle');
      var t = toggles[name];
      var on = !t.target.classList.contains(t.cls);
      t.target.classList.toggle(t.cls, on);
      opt.setAttribute('aria-pressed', on ? 'true' : 'false');
      try { localStorage.setItem(t.key, String(on)); } catch(err) {}
    });
  });
})();
