/* BWIssen: Karteikarten im Anki-Stil für alle Fächer.
   Erwartet window.BWA = {FC:[[kap, begriff, erklärung], ...], CH:{kap:name}, pfx:"bk-"} (setzt tools/anki_mod.py).
   Lernstand: localStorage <pfx>anki; „gekonnt“ wird zusätzlich nach <pfx>fc {known:[...]} geschrieben (Fortschritt auf der Fach-Startseite). */
(function () {
  var A = window.BWA, root = document.getElementById("v-karten");
  if (!A || !A.FC || !root) return;
  var FC = A.FC, CH = A.CH || {}, KEY = A.pfx + "anki", NEWDAY = 20;
  var IV = [0, 1, 3, 5, 8, 14, 21];
  function ld(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function sv(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var S = ld(KEY, null) || {}; S.c = S.c || {};
  // bisher „gekonnt“ markierte Karten übernehmen
  if (!S.mig) { var old = ld(A.pfx + "fc", { known: [] }); var t0 = today(); (old.known || []).forEach(function (i) { if (!S.c[i]) S.c[i] = { box: 2, due: t0 + 3, lrn: false }; }); S.mig = 1; sv(KEY, S); }
  function today() { var n = new Date(); return Math.floor(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) / 864e5); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function save() {
    sv(KEY, S);
    var known = []; Object.keys(S.c).forEach(function (i) { if (S.c[i].box >= 2) known.push(+i); });
    sv(A.pfx + "fc", { known: known });
  }
  function st(i) { return S.c[i]; }
  function newLeft() { return Math.max(0, NEWDAY - (S.newDay === today() ? S.newCount || 0 : 0)); }
  var KAPS = []; FC.forEach(function (c) { if (KAPS.indexOf(c[0]) < 0) KAPS.push(c[0]); });
  function idsOf(k) { var r = []; FC.forEach(function (c, i) { if (k === null || c[0] === k) r.push(i); }); return r; }
  function counts(ids) {
    var t = today(), n = 0, l = 0, d = 0;
    ids.forEach(function (i) { var s = st(i); if (!s) n++; else if (s.due <= t) { if (s.lrn) l++; else d++; } });
    return { nw: Math.min(n, newLeft()), learn: l, due: d };
  }

  // Grundgerüst
  Array.prototype.forEach.call(root.children, function (el) { if (!el.classList.contains("vhero")) { el.hidden = true; el.style.display = "none"; } });
  var W = document.createElement("div"); W.id = "bwa"; root.appendChild(W);
  W.innerHTML =
    '<div class="bwa-v" data-v="decks">' +
      '<div class="bwa-head"><div>Stapel</div><span class="bwa-n">Neu</span><span class="bwa-l">Lern.</span><span class="bwa-d">Fällig</span></div>' +
      '<div class="bwa-list"></div><p class="bwa-note">Tippe auf einen Stapel. Pro Tag kommen bis zu ' + NEWDAY + ' neue Karten dazu, gewusste Karten kommen nach ein paar Tagen wieder.</p>' +
    '</div>' +
    '<div class="bwa-v" data-v="over" hidden>' +
      '<button class="bwa-back" type="button">‹ Stapel</button>' +
      '<h3 class="bwa-ovt"></h3>' +
      '<div class="bwa-ovn"><span>Neu:</span><b class="bwa-n" data-o="n"></b><span>Lernen:</span><b class="bwa-l" data-o="l"></b><span>Wiederholen:</span><b class="bwa-d" data-o="d"></b></div>' +
      '<button class="bwa-btn bwa-study" type="button">Jetzt lernen</button>' +
      '<button class="bwa-btn bwa-cram" type="button">Alle Karten dieses Stapels üben</button>' +
      '<p class="bwa-note bwa-ovnote"></p>' +
    '</div>' +
    '<div class="bwa-v" data-v="rev" hidden>' +
      '<div class="bwa-rtop"><button class="bwa-back" type="button">‹ Stapel</button><span class="bwa-cnt"><span class="bwa-n" data-c="new"></span> + <span class="bwa-l" data-c="learn"></span> + <span class="bwa-d" data-c="due"></span></span></div>' +
      '<div class="bwa-card" tabindex="0"></div>' +
      '<div class="bwa-bar"><button class="bwa-btn bwa-show" type="button">Antwort zeigen</button>' +
        '<div class="bwa-ease" hidden>' +
          '<button type="button" data-r="0" class="e0"><small></small>Nochmal</button>' +
          '<button type="button" data-r="1" class="e1"><small></small>Schwer</button>' +
          '<button type="button" data-r="2" class="e2"><small></small>Gut</button>' +
          '<button type="button" data-r="3" class="e3"><small></small>Einfach</button>' +
        '</div></div>' +
      '<div class="bwa-fin" hidden><h3>Glückwunsch!</h3><p></p><button class="bwa-btn bwa-back" type="button">Zurück zu den Stapeln</button></div>' +
    '</div>';
  function q(s) { return W.querySelector(s); }
  function view(v) { W.querySelectorAll(".bwa-v").forEach(function (x) { x.hidden = x.dataset.v !== v; }); try { root.scrollIntoView({ block: "start" }); } catch (e) {} }
  W.querySelectorAll(".bwa-back").forEach(function (b) { b.onclick = function () { renderDecks(); view("decks"); }; });

  function num(v, c) { return '<span class="' + c + (v ? "" : " z") + '">' + v + "</span>"; }
  function renderDecks() {
    var L = q(".bwa-list"); L.innerHTML = "";
    var rows = [[null, "Alle Karten", true]].concat(KAPS.map(function (k) { return [k, CH[k] || ("Kapitel " + k), false]; }));
    rows.forEach(function (r) {
      var c = counts(idsOf(r[0])), b = document.createElement("button");
      b.type = "button"; b.className = "bwa-row" + (r[2] ? " top" : "");
      b.innerHTML = '<span class="bwa-dn">' + esc(r[1]) + "</span>" + num(c.nw, "bwa-n") + num(c.learn, "bwa-l") + num(c.due, "bwa-d");
      b.onclick = function () { openOver(r[0], r[1]); };
      L.appendChild(b);
    });
  }
  var deck = null, deckName = "";
  function openOver(k, name) {
    deck = k; deckName = name;
    var c = counts(idsOf(k));
    q(".bwa-ovt").textContent = name;
    q('[data-o="n"]').textContent = c.nw; q('[data-o="l"]').textContent = c.learn; q('[data-o="d"]').textContent = c.due;
    var any = c.nw + c.learn + c.due; q(".bwa-study").disabled = !any;
    q(".bwa-ovnote").textContent = any ? "" : "Für heute ist hier alles erledigt. Mit „Alle Karten üben“ kannst du trotzdem weitermachen, das ändert deinen Lernplan nicht.";
    view("over");
  }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  var Q = [], cur = null, cram = false, shown = false;
  function kind(i) { var s = st(i); return !s ? "new" : s.lrn ? "learn" : "due"; }
  function start(isCram) {
    cram = isCram; var ids = idsOf(deck), t = today();
    if (cram) Q = shuffle(ids.slice());
    else {
      var lrn = ids.filter(function (i) { var s = st(i); return s && s.lrn && s.due <= t; });
      var due = shuffle(ids.filter(function (i) { var s = st(i); return s && !s.lrn && s.due <= t; }));
      var nw = ids.filter(function (i) { return !st(i); }).slice(0, newLeft());
      Q = lrn.concat(due); nw.forEach(function (c, k) { Q.splice(Math.min(Q.length, k * 2 + 1), 0, c); });
    }
    q(".bwa-fin").hidden = true; q(".bwa-card").hidden = false; q(".bwa-bar").hidden = false;
    view("rev"); next();
  }
  function plan(i, r) {
    var s = st(i) || { box: 0 }, box = s.box;
    if (r === 0) return { box: 0, d: 0 };
    if (r === 1) return { box: Math.max(1, Math.min(box, 2)), d: 1 };
    box = Math.min(box + (r === 3 ? 2 : 1), IV.length - 1); return { box: box, d: IV[box] };
  }
  function fmt(d) { return d <= 0 ? "<1 Min" : d === 1 ? "1 T" : d + " T"; }
  function upd() {
    var k = { "new": 0, learn: 0, due: 0 };
    Q.forEach(function (i) { k[kind(i)]++; }); if (cur !== null) k[kind(cur)]++;
    ["new", "learn", "due"].forEach(function (x) { var e = q('[data-c="' + x + '"]'); e.textContent = k[x]; e.classList.toggle("cur", cur !== null && kind(cur) === x); });
  }
  function next() {
    shown = false;
    if (!Q.length) return finish();
    cur = Q.shift(); var c = FC[cur];
    q(".bwa-card").innerHTML = '<div class="bwa-tp">' + esc(CH[c[0]] || "") + '</div><div class="bwa-q">' + c[1] + "</div>";
    q(".bwa-show").hidden = false; q(".bwa-ease").hidden = true; upd();
  }
  function showA() {
    if (cur === null || shown) return; shown = true;
    q(".bwa-card").insertAdjacentHTML("beforeend", '<hr><div class="bwa-a">' + FC[cur][2] + "</div>");
    q(".bwa-show").hidden = true; q(".bwa-ease").hidden = false;
    W.querySelectorAll(".bwa-ease small").forEach(function (s, r) { s.textContent = cram && r ? "–" : fmt(plan(cur, r).d); });
  }
  function rate(r) {
    if (cur === null || !shown) return;
    if (cram) { if (r === 0) Q.splice(Math.min(3, Q.length), 0, cur); return next(); }
    var t = today();
    if (!st(cur)) { if (S.newDay !== t) { S.newDay = t; S.newCount = 0; } S.newCount++; }
    var p = plan(cur, r); S.c[cur] = { box: p.box, due: t + p.d, lrn: r === 0 }; save();
    if (r === 0) Q.splice(Math.min(3, Q.length), 0, cur);
    next();
  }
  function finish() {
    cur = null; upd();
    q(".bwa-card").hidden = true; q(".bwa-bar").hidden = true; q(".bwa-fin").hidden = false;
    q(".bwa-fin p").textContent = cram ? "Du bist alle Karten dieses Stapels einmal durchgegangen." : "Du hast diesen Stapel für heute fertig gelernt.";
  }
  q(".bwa-card").onclick = showA;
  q(".bwa-card").onkeydown = function (e) { if (e.key === " " || e.key === "Enter") { e.preventDefault(); showA(); } };
  q(".bwa-show").onclick = showA;
  W.querySelectorAll(".bwa-ease button").forEach(function (b) { b.onclick = function () { rate(+b.dataset.r); }; });
  q(".bwa-study").onclick = function () { start(false); };
  q(".bwa-cram").onclick = function () { start(true); };
  document.addEventListener("keydown", function (e) {
    if (root.hidden || q('[data-v="rev"]').hidden || cur === null) return;
    if (shown && "1234".indexOf(e.key) >= 0 && e.key.length === 1) rate(+e.key - 1);
  });
  window.addEventListener("hashchange", function () { if (location.hash.indexOf("#karten") === 0) { renderDecks(); if (q('[data-v="rev"]').hidden) view("decks"); } });
  renderDecks();
})();
