// Two interactions, no dependencies: filter the shelf, and flip a card between its sides.
(function () {
  var search = document.querySelector('[data-search]');
  var labels = Array.prototype.slice.call(document.querySelectorAll('[data-tag]'));
  var tapes = Array.prototype.slice.call(document.querySelectorAll('[data-tape]'));
  var sides = Array.prototype.slice.call(document.querySelectorAll('[data-side]'));
  var empty = document.querySelector('[data-empty]');
  var activeTag = null;

  function filter() {
    var q = search ? search.value.trim().toLowerCase() : '';
    var shown = 0;
    tapes.forEach(function (t) {
      var hitText = !q || t.getAttribute('data-text').indexOf(q) !== -1;
      var hitTag = !activeTag || (' ' + t.getAttribute('data-tags') + ' ').indexOf(' ' + activeTag + ' ') !== -1;
      var on = hitText && hitTag;
      t.classList.toggle('hidden', !on);
      if (on) shown++;
    });
    sides.forEach(function (s) {
      s.classList.toggle('hidden', !s.querySelector('[data-tape]:not(.hidden)'));
    });
    if (empty) empty.classList.toggle('hidden', shown !== 0);
  }

  if (search) search.addEventListener('input', filter);
  labels.forEach(function (b) {
    b.addEventListener('click', function () {
      var tag = b.getAttribute('data-tag');
      activeTag = activeTag === tag ? null : tag;
      labels.forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-tag') === activeTag)); });
      filter();
    });
  });
  var params = new URLSearchParams(location.search);
  if (params.get('tag')) {
    var pre = labels.filter(function (b) { return b.getAttribute('data-tag') === params.get('tag'); })[0];
    if (pre) pre.click();
  }

  var reveal = document.querySelector('[data-reveal]');
  var sealed = document.querySelector('[data-sealed]');
  if (reveal) { reveal.classList.add('is-sealed'); if (sealed) sealed.hidden = false; }
  var unseal = function () {
    if (!reveal || !reveal.classList.contains('is-sealed')) return;
    reveal.classList.remove('is-sealed'); reveal.classList.add('is-open');
    if (sealed) sealed.hidden = true;
  };

  var turn = document.querySelector('[data-turn]');
  var flip = document.querySelector('[data-flip]');
  if (turn && flip) {
    var a = turn.querySelector('.face--a');
    var b = turn.querySelector('.face--b');
    var label = flip.querySelector('span');
    var set = function (flipped) {
      turn.classList.toggle('is-flipped', flipped);
      a.setAttribute('aria-hidden', String(flipped));
      b.setAttribute('aria-hidden', String(!flipped));
      if ('inert' in a) { a.inert = flipped; b.inert = !flipped; }
      label.textContent = flipped ? 'Flip back to Side A' : 'Flip to Side B';
      flip.setAttribute('aria-pressed', String(flipped));
    };
    set(false);
    flip.addEventListener('click', function () { set(!turn.classList.contains('is-flipped')); unseal(); });
  }
})();
