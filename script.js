(function () {
  var f = document.getElementById('f');
  var roll = document.getElementById('roll');
  var err = document.getElementById('err');
  var overlay = document.getElementById('overlay');
  var modal = document.getElementById('modal');

  function $(id) { return document.getElementById(id); }
  function norm(s) { return String(s == null ? '' : s).trim().toUpperCase(); }

  function closeModal() { overlay.hidden = true; roll.focus(); }
  $('close').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  f.addEventListener('submit', function (e) {
    e.preventDefault();
    err.textContent = '';
    var v = norm(roll.value);
    if (!v) { err.textContent = 'Pehle apna roll number likho.'; return; }

    var list = window.RESULTS;
    if (!Array.isArray(list)) { err.textContent = 'data.js file nahi mili ya usme galti hai.'; return; }

    var found = null;
    for (var i = 0; i < list.length; i++) {
      if (norm(list[i].roll) === v) { found = list[i]; break; }
    }
    if (!found) { err.textContent = 'Is roll number ka result nahi mila. Number check karke dobara try karo.'; return; }
    show(found);
  });

  function show(d) {
    var pass = String(d.result).trim().toLowerCase() === 'pass';
    modal.className = 'modal ' + (pass ? 'pass' : 'fail');
    $('badge').textContent = pass ? '✔' : '✖';
    $('title').textContent = pass ? 'Mubarak ho! Aap PASS ho gaye' : 'Aap is baar FAIL hue hain';
    $('msg').textContent = pass
      ? 'Bahut badhiya! Aise hi mehnat karte raho.'
      : 'Hausla mat haro. Agli baar behtar karne ki koshish karo.';
    $('r-name').textContent = d.name;
    $('r-roll').textContent = d.roll;
    $('r-class').textContent = d.class || '-';
    var hasMarks = d.marks !== null && d.marks !== undefined && d.marks !== '';
    $('row-marks').style.display = hasMarks ? '' : 'none';
    if (hasMarks) $('r-marks').textContent = d.marks + (d.total ? ' / ' + d.total : '');
    $('r-result').textContent = pass ? 'PASS' : 'FAIL';
    overlay.hidden = false;
    if (pass) confetti();
  }

  function confetti() {
    for (var i = 0; i < 40; i++) {
      var s = document.createElement('span');
      s.className = 'conf';
      s.style.left = Math.random() * 100 + 'vw';
      s.style.background = 'hsl(' + Math.floor(Math.random() * 360) + ',80%,60%)';
      s.style.animationDelay = (Math.random() * 0.6) + 's';
      document.body.appendChild(s);
      setTimeout((function (el) { return function () { el.remove(); }; })(s), 3500);
    }
  }
})();
