/* ---------------------------------------------------------------
   Builds the page from content.js. You don't need to edit this.
   --------------------------------------------------------------- */
(function () {
  'use strict';

  var S = window.SITE;
  if (!S) {
    var msg = document.createElement('div');
    msg.className = 'content-error';
    msg.innerHTML = '<strong>There is a typo in content.js.</strong><br>' +
      esc(window.__contentError || 'The file could not be read.') +
      '<br>Common causes: a missing comma after }, a missing quote mark, or a straight " inside text.';
    document.body.appendChild(msg);
    return;
  }

  var $ = function (id) { return document.getElementById(id); };
  var PUB_LIMIT = 8;

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  // *italic* and [text](url)
  function fmt(s) {
    return esc(s)
      .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }
  function linkOpen(url) {
    return url ? '<a href="' + esc(url) + '" target="_blank" rel="noopener">' : '';
  }
  function linkClose(url) { return url ? '</a>' : ''; }
  function list(x) { return Array.isArray(x) ? x : []; }

  /* ---------- simple text bindings ---------- */
  document.querySelectorAll('[data-bind]').forEach(function (el) {
    var v = S[el.getAttribute('data-bind')];
    if (v) el.textContent = v;
  });
  document.title = (S.name || '') + (S.role ? ' — ' + S.role : '');
  $('year').textContent = new Date().getFullYear();

  /* ---------- current positions ---------- */
  if ($('now')) $('now').innerHTML = list(S.now).map(function (n) {
    return '<div><span class="yrs">' + esc(n.years) + '</span><dt>' + esc(n.role) +
      '</dt><dd>' + esc(n.org) + '</dd></div>';
  }).join('');

  /* ---------- hero figure ---------- */
  $('hero-figure').innerHTML = (S.heroImage
    ? '<img src="' + esc(S.heroImage) + '" alt="">'
    : heroDrawing()) +
    (S.heroCaption ? '<figcaption>' + esc(S.heroCaption) + '</figcaption>' : '');
  if (S.heroImage && S.heroCaption && /Placeholder/i.test(S.heroCaption)) {
    $('hero-figure').querySelector('figcaption').remove();
  }

  /* ---------- about ---------- */
  $('about-text').innerHTML = list(S.about).map(function (p) { return '<p>' + fmt(p) + '</p>'; }).join('');
  $('portrait').innerHTML = S.portrait
    ? '<img src="' + esc(S.portrait) + '" alt="Portrait of ' + esc(S.name) + '">'
    : placeholderBox('PORTRAIT');

  /* ---------- projects ---------- */
  $('project-list').innerHTML = list(S.projects).map(function (p, i) {
    var img = p.image ? '<img src="' + esc(p.image) + '" alt="" loading="lazy">' : planDrawing(i);
    return '<article class="project reveal">' +
      '<div class="img">' + linkOpen(p.link) + img + linkClose(p.link) + '</div>' +
      '<div class="meta mono"><span>' + esc(p.years) + '</span><span>' + esc(p.place) + '</span></div>' +
      '<h3>' + linkOpen(p.link) + esc(p.title) + linkClose(p.link) + '</h3>' +
      '<p>' + fmt(p.text) + '</p>' +
      (p.role ? '<div class="role mono">' + esc(p.role) + '</div>' : '') +
      '</article>';
  }).join('');

  /* ---------- publications ---------- */
  // Merge: your own entries in content.js + the automatic list from the research portal.
  // If the same title appears in both, your content.js version wins.
  function key(t) { return String(t || '').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 60); }
  var hide = list(S.hidePublications).map(function (h) { return String(h).toLowerCase(); });
  var pubs = list(S.publications).slice();
  var have = pubs.map(function (p) { return key(p.title); });
  list(window.PORTAL_PUBLICATIONS).forEach(function (p) {
    var k = key(p.title);
    if (have.indexOf(k) !== -1) return;
    var t = String(p.title).toLowerCase();
    if (hide.some(function (h) { return h && t.indexOf(h) !== -1; })) return;
    have.push(k); pubs.push(p);
  });
  pubs = pubs.map(function (p, i) { return [p, i]; }).sort(function (a, b) {
    return String(b[0].year).localeCompare(String(a[0].year)) || a[1] - b[1];
  }).map(function (x) { return x[0]; });
  var names = list(S.myName).slice().sort(function (a, b) { return b.length - a.length; });
  function boldMe(authors) {
    var out = esc(authors);
    names.forEach(function (n) {
      var e = esc(n);
      if (e) out = out.split(e).join('\u0000' + e + '\u0001');
    });
    // collapse nested markers, then convert
    return out.replace(/\u0000+/g, '<b>').replace(/\u0001+/g, '</b>');
  }
  var state = { type: 'All', all: false };
  var order = ['Journal article', 'Conference', 'Book', 'Thesis', 'Exhibition', 'Other'];
  var types = ['All'];
  pubs.forEach(function (p) { if (p.type && types.indexOf(p.type) === -1) types.push(p.type); });
  types.sort(function (a, b) {
    var ia = a === 'All' ? -1 : order.indexOf(a), ib = b === 'All' ? -1 : order.indexOf(b);
    return (ia < 0 && a !== 'All' ? 99 : ia) - (ib < 0 && b !== 'All' ? 99 : ib);
  });
  function count(t) { return t === 'All' ? pubs.length : pubs.filter(function (p) { return p.type === t; }).length; }
  function plural(t) {
    var map = { 'Journal article': 'Journal articles', 'Conference': 'Conference papers', 'Thesis': 'Thesis', 'Book': 'Books & chapters', 'Exhibition': 'Exhibitions', 'Other': 'Other' };
    return map[t] || t;
  }
  $('pub-filters').innerHTML = types.length > 2 ? types.map(function (t) {
    return '<button class="chip" data-type="' + esc(t) + '" aria-pressed="' + (t === 'All') + '">' +
      esc(plural(t)) + '<span class="n">' + count(t) + '</span></button>';
  }).join('') : '';
  $('pub-filters').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    state.type = b.getAttribute('data-type'); state.all = false;
    this.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', c === b); });
    renderPubs();
  });
  $('pub-more').addEventListener('click', function () { state.all = true; renderPubs(); });

  function renderPubs() {
    var shown = pubs.filter(function (p) { return state.type === 'All' || p.type === state.type; });
    var total = shown.length;
    if (!state.all) shown = shown.slice(0, PUB_LIMIT);
    $('pub-list').innerHTML = shown.map(function (p) {
      return '<li class="row">' +
        '<span class="when">' + esc(p.year) + '</span>' +
        '<div>' +
          '<h3 class="title">' + linkOpen(p.link) + esc(p.title) + linkClose(p.link) + '</h3>' +
          (p.authors ? '<p class="authors">' + boldMe(p.authors) + '</p>' : '') +
          (p.venue ? '<p class="venue">' + esc(p.venue) + '</p>' : '') +
          '<span class="tag">' + esc(p.type) + '</span>' +
          (p.award ? '<span class="tag award">★ ' + esc(p.award) + '</span>' : '') +
        '</div>' +
        (p.link ? '<a class="arrow" href="' + esc(p.link) + '" target="_blank" rel="noopener" aria-label="Open publication">↗</a>' : '<span></span>') +
      '</li>';
    }).join('');
    var btn = $('pub-more');
    btn.hidden = state.all || total <= PUB_LIMIT;
    btn.textContent = 'Show all ' + total;
  }
  renderPubs();

  /* ---------- talks ---------- */
  $('talk-list').innerHTML = list(S.talks).map(function (t) {
    return '<li class="row reveal">' +
      '<span class="when">' + esc(t.date) + '</span>' +
      '<div>' +
        '<h3 class="title">' + linkOpen(t.link) + esc(t.title) + linkClose(t.link) + '</h3>' +
        (t.where ? '<p class="authors">' + esc(t.where) + '</p>' : '') +
        (t.type ? '<span class="tag">' + esc(t.type) + '</span>' : '') +
      '</div>' +
      (t.link ? '<a class="arrow" href="' + esc(t.link) + '" target="_blank" rel="noopener" aria-label="Open link">↗</a>' : '<span></span>') +
    '</li>';
  }).join('');

  /* ---------- teaching & awards ---------- */
  $('teach-list').innerHTML = list(S.teaching).map(function (t) {
    return '<li><span class="t">' + esc(t.title) + '<span class="w">' + esc(t.where) + '</span></span><span class="y">' + esc(t.years) + '</span></li>';
  }).join('');
  $('award-list').innerHTML = list(S.awards).map(function (a) {
    return '<li><span class="t">' + esc(a.title) + '</span><span class="y">' + esc(a.year) + '</span></li>';
  }).join('');

  /* ---------- contact ---------- */
  var em = $('email');
  if (S.email) { em.href = 'mailto:' + S.email; em.textContent = S.email; }
  $('links').innerHTML = list(S.links).map(function (l) {
    return '<li><a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + '</a></li>';
  }).join('');

  /* ---------- hide empty sections ---------- */
  [['projects', S.projects], ['publications', S.publications], ['talks', S.talks]].forEach(function (x) {
    if (!list(x[1]).length) {
      $(x[0]).hidden = true;
      var a = document.querySelector('.nav a[href="#' + x[0] + '"]'); if (a) a.hidden = true;
    }
  });

  /* ---------- nav highlight + reveal ---------- */
  if ('IntersectionObserver' in window) {
    var links = document.querySelectorAll('.nav a');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { io.observe(s); });

    var rv = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); rv.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { rv.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- background colour per section ----------
     Each section of the page gets its own colour, set in style.css (--section-colours).
     The colour fades over when a section reaches the middle of the screen. */
  (function () {
    var root = document.documentElement;
    var sections = [].slice.call(document.querySelectorAll('main > section[id]')).filter(function (s) { return !s.hidden; });
    function colours() {
      return getComputedStyle(root).getPropertyValue('--section-colours').split(',')
        .map(function (c) { return c.trim(); }).filter(Boolean);
    }
    function setFor(section) {
      var list = colours(); if (!list.length) return;
      var i = sections.indexOf(section);
      root.style.setProperty('--paper', list[Math.max(0, i) % list.length]);
    }
    setFor(sections[0]);
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) setFor(en.target); });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(function (s) { io.observe(s); });
  })();

  /* =================================================================
     Placeholder drawings (shown until you add your own images)
     ================================================================= */
  function heroDrawing() {
    var g = '', x, y;
    for (x = 0; x <= 1400; x += 50) g += '<line class="faint" x1="' + x + '" y1="0" x2="' + x + '" y2="600"/>';
    for (y = 0; y <= 600; y += 50) g += '<line class="faint" x1="0" y1="' + y + '" x2="1400" y2="' + y + '"/>';
    var earth = '';
    for (x = 0; x < 1400; x += 14) earth += '<line x1="' + x + '" y1="470" x2="' + (x - 14) + '" y2="484" stroke-width=".8"/>';
    var mesh = function (x1, y1, w, h) {
      var m = '';
      for (var i = x1; i <= x1 + w; i += 5) m += '<line x1="' + i + '" y1="' + y1 + '" x2="' + i + '" y2="' + (y1 + h) + '" stroke-width=".5"/>';
      for (var j = y1; j <= y1 + h; j += 5) m += '<line x1="' + x1 + '" y1="' + j + '" x2="' + (x1 + w) + '" y2="' + j + '" stroke-width=".5"/>';
      return m;
    };
    return '<svg class="drawing" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Section drawing of a ventilated, screened house">' +
      '<g fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="square">' +
      '<g stroke-width=".6">' + g + '</g>' +
      // ground
      '<line x1="0" y1="470" x2="1400" y2="470" stroke-width="2"/>' + earth +
      // plinth / raised floor
      '<rect x="450" y="425" width="500" height="45" stroke-width="1.6"/>' +
      '<line x1="450" y1="440" x2="950" y2="440" stroke-width=".6"/>' +
      // walls
      '<path d="M470 425 V262 M930 425 V262" stroke-width="2.4"/>' +
      '<path d="M490 425 V262 M910 425 V262" stroke-width=".8"/>' +
      // windows (mesh)
      '<rect x="470" y="320" width="20" height="60" fill="var(--paper)"/>' + mesh(470, 320, 20, 60) +
      '<rect x="910" y="300" width="20" height="80" fill="var(--paper)"/>' + mesh(910, 300, 20, 80) +
      // ceiling + eave gap mesh
      '<line x1="490" y1="262" x2="910" y2="262" stroke-width=".8"/>' +
      mesh(470, 236, 20, 24) + mesh(910, 236, 20, 24) +
      // roof
      '<path d="M395 252 L700 118 L1005 252" stroke-width="2.4"/>' +
      '<path d="M410 252 L700 126 L990 252" stroke-width=".7"/>' +
      // ridge vent
      '<path d="M670 120 L700 96 L730 120" stroke-width="1.4"/>' +
      // airflow (accent)
      '<path class="acc" d="M250 360 C 380 360, 420 350, 480 350 C 620 350, 650 300, 700 200 C 712 170, 705 140, 700 80" stroke-width="1.6" stroke-dasharray="6 6"/>' +
      '<path class="acc" d="M690 92 L700 76 L710 92" stroke-width="1.6"/>' +
      '<path class="acc" d="M250 240 C 360 240, 420 246, 480 246" stroke-width="1.6" stroke-dasharray="6 6"/>' +
      // sun
      '<circle class="acc" cx="210" cy="110" r="26" stroke-width="1.6"/>' +
      '<line class="acc" x1="236" y1="128" x2="430" y2="258" stroke-width=".8" stroke-dasharray="2 5"/>' +
      // person (scale)
      '<circle cx="610" cy="352" r="7" stroke-width="1.2"/>' +
      '<path d="M610 359 V395 M610 395 L600 425 M610 395 L620 425 M596 372 L624 372" stroke-width="1.2"/>' +
      // tree
      '<path d="M1170 470 V360" stroke-width="2"/>' +
      '<path d="M1170 380 C 1090 380, 1080 300, 1120 280 C 1110 220, 1190 200, 1210 240 C 1270 240, 1270 330, 1220 350 C 1210 380, 1180 385, 1170 380 Z" stroke-width="1"/>' +
      // dimension line
      '<line x1="450" y1="530" x2="950" y2="530" stroke-width=".8"/>' +
      '<path d="M444 536 L456 524 M944 536 L956 524 M450 520 V540 M950 520 V540" stroke-width=".8"/>' +
      // leaders
      '<path d="M480 236 L420 180 H330" stroke-width=".6"/><path d="M930 400 L1020 430 H1100" stroke-width=".6"/>' +
      '<path d="M700 96 L760 50 H850" stroke-width=".6"/>' +
      '</g>' +
      '<g font-family="IBM Plex Mono, monospace" font-size="12" letter-spacing=".6" fill="currentColor">' +
      '<text x="330" y="172">SCREENED EAVES</text>' +
      '<text x="1020" y="422">RAISED FLOOR</text>' +
      '<text x="770" y="42">RIDGE VENT</text>' +
      '<text x="680" y="552" text-anchor="start">7 200</text>' +
      '<text class="acc" x="250" y="384" fill="var(--accent)">CROSS-VENTILATION</text>' +
      '<text x="40" y="580" fill="var(--muted)">SECTION A–A · 1:50</text>' +
      '</g></svg>';
  }

  function planDrawing(seed) {
    // A small, slightly different floor plan for each project
    var v = [
      { w: [0, 140, 260, 400], h: [0, 170, 300] },
      { w: [0, 200, 400], h: [0, 110, 200, 300] },
      { w: [0, 120, 280, 400], h: [0, 150, 300] },
    ][seed % 3];
    var ox = 60, oy = 45, W = 280, H = 210, sx = W / 400, sy = H / 300;
    var s = '<rect x="' + ox + '" y="' + oy + '" width="' + W + '" height="' + H + '" stroke-width="3"/>';
    v.w.slice(1, -1).forEach(function (x) { s += '<line x1="' + (ox + x * sx) + '" y1="' + oy + '" x2="' + (ox + x * sx) + '" y2="' + (oy + H) + '" stroke-width="1.6"/>'; });
    v.h.slice(1, -1).forEach(function (y) { s += '<line x1="' + ox + '" y1="' + (oy + y * sy) + '" x2="' + (ox + W) + '" y2="' + (oy + y * sy) + '" stroke-width="1.2"/>'; });
    // door swing
    var dx = ox + 30 + seed * 40, dy = oy + H;
    s += '<line x1="' + dx + '" y1="' + dy + '" x2="' + (dx + 30) + '" y2="' + dy + '" stroke="var(--paper-2)" stroke-width="4"/>';
    s += '<path d="M' + dx + ' ' + dy + ' V' + (dy - 30) + ' A30 30 0 0 1 ' + (dx + 30) + ' ' + dy + '" stroke-width=".8"/>';
    // veranda + columns
    s += '<rect x="' + (ox - 20) + '" y="' + (oy - 20) + '" width="' + (W + 40) + '" height="' + (H + 40) + '" class="faint" stroke-dasharray="4 4"/>';
    // north arrow
    s += '<circle cx="372" cy="40" r="12" stroke-width=".8"/><path class="acc" d="M372 30 L377 46 L372 42 L367 46 Z" fill="var(--accent)" stroke="none"/>';
    return '<svg class="drawing" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' +
      '<g fill="none" stroke="currentColor">' + s + '</g>' +
      '<text x="20" y="288" font-family="IBM Plex Mono, monospace" font-size="10" fill="var(--muted)" letter-spacing=".5">PLAN · PLACEHOLDER</text></svg>';
  }

  function placeholderBox(label) {
    return '<svg class="drawing" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden="true">' +
      '<g fill="none" stroke="currentColor" stroke-width="1"><rect x=".5" y=".5" width="399" height="499"/>' +
      '<line x1="0" y1="0" x2="400" y2="500" class="faint"/><line x1="400" y1="0" x2="0" y2="500" class="faint"/></g>' +
      '<text x="200" y="255" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="13" fill="var(--muted)" letter-spacing="1">' + label + '</text></svg>';
  }
})();
