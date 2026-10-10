/* =============================================
   Thai Pacific Aquaculture — Main JavaScript
   ============================================= */

/* ── Language ── */
function setLang(l) {
  document.documentElement.setAttribute('data-lang', l);
  document.getElementById('btn-th').classList.toggle('active', l === 'th');
  document.getElementById('btn-en').classList.toggle('active', l === 'en');
  localStorage.setItem('tpa_lang', l);
}
(function () {
  var s = localStorage.getItem('tpa_lang');
  if (s) setLang(s);
})();

/* ── Product filter ── */
function filterCat(cat, el) {
  document.querySelectorAll('.pcat').forEach(function (b) { b.classList.remove('active'); });
  el.classList.add('active');
  document.querySelectorAll('.pcard').forEach(function (card) {
    card.style.display = (cat === 'all' || card.dataset.cat.includes(cat)) ? '' : 'none';
  });
}

/* ── Activity feed (read-only on public site) ── */
var SK = 'tpa_activities';
var DEFAULT_ACTIVITIES = [
  { id: 1, tag: 't-st', date: '2025-06-01',
    th: 'กุ้งขาวแวนนาไม SURE® PL12 พร้อมจำหน่าย', en: 'Whiteleg SURE® PL12 Ready',
    dth: 'ลูกกุ้ง PL12 ล็อตใหม่ตรวจ PCR แล้ว สต็อกจำนวนมาก ติดต่อได้เลยครับ',
    den: 'Fresh PCR-cleared PL12 batch available. Large stock. Contact us now.',
    emoji: '🦐', img: null },
  { id: 2, tag: 't-ev', date: '2025-05-28',
    th: 'คณะดูงานจากเวียดนามเยี่ยมชมฟาร์ม', en: 'Vietnamese Delegation Farm Visit',
    dth: 'ต้อนรับคณะผู้ประกอบการจากเวียดนาม ชมกระบวนการเพาะฟักและห้อง PCR',
    den: 'Welcomed Vietnamese operators to tour hatchery and PCR laboratory.',
    emoji: '🎉', img: null },
  { id: 3, tag: 't-new', date: '2025-05-15',
    th: 'ต่ออายุใบรับรอง GAP ปี 2568 เรียบร้อยแล้ว', en: 'GAP Certification Renewed 2025',
    dth: 'ผ่านการตรวจประเมิน GAP โดยกรมประมง ต่อเนื่องเป็นปีที่ 10',
    den: 'Passed DoF GAP audit for the 10th consecutive year.',
    emoji: '📜', img: null },
  { id: 4, tag: 't-ev', date: '2025-05-01',
    th: 'ต้อนรับคณะเกษตรกรจากสุราษฎร์ธานี', en: 'Surat Thani Farmers Study Visit',
    dth: 'ต้อนรับคณะเกษตรกร 25 ท่าน ชมฟาร์มและพูดคุยเรื่องสายพันธุ์ SURE®',
    den: 'Welcomed 25 farmers to tour our farm and discuss SURE® genetics.',
    emoji: '🌾', img: null }
];

var data = [];
var TMAP = { 't-new': '🆕', 't-ev': '📅', 't-st': '✅' };
var TLTH = { 't-new': 'ใหม่', 't-ev': 'กิจกรรม', 't-st': 'สต็อก' };
var TLEN = { 't-new': 'New', 't-ev': 'Event', 't-st': 'Stock' };
var ACTBG = [
  'linear-gradient(135deg,#0d1b3e,#1a2d5a)',
  'linear-gradient(135deg,#0a2a18,#1a4a2e)',
  'linear-gradient(135deg,#1a0d0d,#3a1a1a)',
  'linear-gradient(135deg,#1a1a0d,#2a2a1a)'
];

function loadData() {
  var s = localStorage.getItem(SK);
  data = s ? JSON.parse(s) : DEFAULT_ACTIVITIES.slice();
}

function fmtDate(s) {
  if (!s) return '';
  var d = new Date(s);
  var m = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  return d.getDate() + ' ' + m[d.getMonth()] + ' ' + (d.getFullYear() + 543);
}

function renderFeed() {
  var el = document.getElementById('feedEl');
  if (!el) return;
  el.innerHTML = '';
  var reversed = data.slice().reverse();
  reversed.forEach(function (a) {
    var bg = ACTBG[a.id % ACTBG.length];
    var thumbContent = a.img
      ? '<img src="' + a.img + '" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">'
      : '<span>' + (a.emoji || '📸') + '</span>';
    var card = document.createElement('div');
    card.className = 'act-card';
    card.innerHTML =
      '<div class="act-thumb" style="background:' + bg + '">' + thumbContent + '</div>' +
      '<div class="act-body">' +
        '<div class="act-meta">' +
          '<span class="atag ' + a.tag + '">' + (TMAP[a.tag] || '') +
            ' <span class="th">' + (TLTH[a.tag] || '') + '</span>' +
            '<span class="en">' + (TLEN[a.tag] || '') + '</span></span>' +
          '<span class="adate">' + fmtDate(a.date) + '</span>' +
        '</div>' +
        '<h4 class="th">' + a.th + '</h4>' +
        '<h4 class="en">' + a.en + '</h4>' +
        '<p class="th">' + (a.dth || '') + '</p>' +
        '<p class="en">' + (a.den || '') + '</p>' +
      '</div>';
    el.appendChild(card);
  });
}

/* ── Scroll reveal ── */
function initReveal() {
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (e.isIntersecting) {
        setTimeout(function () { e.target.classList.add('visible'); }, i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
}

/* ── Contact form submit ── */
function submitForm(lang) {
  var msg = lang === 'th'
    ? 'ขอบคุณครับ! ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง\n📞 081-861-6886\n✉️ thai-pacific@hotmail.com'
    : 'Thank you! Our team will contact you within 24 hours.\n📞 081-861-6886\n✉️ thai-pacific@hotmail.com';
  alert(msg);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function () {
  loadData();
  renderFeed();
  initReveal();
});
