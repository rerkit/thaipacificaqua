/* =============================================
   Thai Pacific Aquaculture — Admin JavaScript
   (admin/index.html only — not loaded on public site)
   ============================================= */

var SK = 'tpa_activities';
var data = [];
var pendImg = null;

var TMAP = { 't-new': '🆕', 't-ev': '📅', 't-st': '✅' };
var TLTH = { 't-new': 'ใหม่', 't-ev': 'กิจกรรม', 't-st': 'สต็อก' };
var TLEN = { 't-new': 'New', 't-ev': 'Event', 't-st': 'Stock' };

function loadData() {
  var s = localStorage.getItem(SK);
  data = s ? JSON.parse(s) : [];
}
function saveData() { localStorage.setItem(SK, JSON.stringify(data)); }

function fmtDate(s) {
  if (!s) return '';
  var d = new Date(s);
  var m = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  return d.getDate() + ' ' + m[d.getMonth()] + ' ' + (d.getFullYear() + 543);
}

function renderAdmin() {
  var el = document.getElementById('actList');
  if (!el) return;
  if (data.length === 0) {
    el.innerHTML = '<p style="color:#888;text-align:center;padding:24px">ยังไม่มีกิจกรรม</p>';
    return;
  }
  el.innerHTML = '';
  data.slice().reverse().forEach(function (a) {
    var row = document.createElement('div');
    row.className = 'act-row';
    row.innerHTML =
      '<div class="act-row-thumb">' + (a.img ? '<img src="' + a.img + '">' : '<span>' + (a.emoji || '📸') + '</span>') + '</div>' +
      '<div class="act-row-info">' +
        '<div class="act-row-meta">' +
          '<span class="atag ' + a.tag + '">' + (TMAP[a.tag] || '') + ' ' + (TLTH[a.tag] || '') + '</span>' +
          '<span class="adate">' + fmtDate(a.date) + '</span>' +
        '</div>' +
        '<div class="act-row-title">' + a.th + '</div>' +
        '<div class="act-row-title-en">' + a.en + '</div>' +
      '</div>' +
      '<button class="del-btn" onclick="delAct(' + a.id + ')">🗑 ลบ</button>';
    el.appendChild(row);
  });
}

function delAct(id) {
  if (!confirm('ลบกิจกรรมนี้?')) return;
  data = data.filter(function (a) { return a.id !== id; });
  saveData();
  renderAdmin();
  showToast('ลบเรียบร้อยแล้ว');
}

function prevImg(inp) {
  var f = inp.files[0];
  if (!f) return;
  var r = new FileReader();
  r.onload = function (e) {
    pendImg = e.target.result;
    var p = document.getElementById('aPrev');
    p.src = pendImg;
    p.style.display = 'block';
  };
  r.readAsDataURL(f);
}

function addAct() {
  var tth = document.getElementById('aTh').value.trim();
  var ten = document.getElementById('aEn').value.trim();
  if (!tth && !ten) { alert('กรุณาใส่หัวข้อ'); return; }
  data.push({
    id: Date.now(),
    tag: document.getElementById('aTag').value,
    date: document.getElementById('aDate').value || new Date().toISOString().slice(0, 10),
    th: tth || ten, en: ten || tth,
    dth: document.getElementById('aDTh').value,
    den: document.getElementById('aDEn').value,
    emoji: document.getElementById('aEmoji').value || '📸',
    img: pendImg || null
  });
  saveData();
  renderAdmin();
  ['aTh','aEn','aDTh','aDEn','aEmoji'].forEach(function (id) {
    document.getElementById(id).value = '';
  });
  document.getElementById('aFile').value = '';
  document.getElementById('aPrev').style.display = 'none';
  pendImg = null;
  showToast('เพิ่มกิจกรรมเรียบร้อยแล้ว ✅');
}

function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function () { t.classList.remove('show'); }, 2500);
}

document.addEventListener('DOMContentLoaded', function () {
  var dateEl = document.getElementById('aDate');
  if (dateEl) dateEl.value = new Date().toISOString().slice(0, 10);
  loadData();
  renderAdmin();
});
