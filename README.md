# Thai Pacific Aquaculture — Website

## โครงสร้างไฟล์

```
tpa-website/
├── index.html                  ← หน้าเว็บหลัก (public)
├── admin/
│   └── index.html              ← หน้า Admin จัดการกิจกรรม
├── assets/
│   ├── css/
│   │   └── style.css           ← CSS ทั้งหมด
│   ├── js/
│   │   ├── main.js             ← JavaScript หน้าเว็บหลัก
│   │   └── admin.js            ← JavaScript หน้า Admin
│   └── images/
│       ├── banner.jpg          ← รูป Banner hero section
│       ├── logo.jpg            ← Logo TPA
│       └── team.png            ← รูปทีมงาน / Facebook profile
└── README.md
```

## การใช้งาน

### หน้าเว็บหลัก
เปิด `index.html` ในเบราว์เซอร์ หรือ deploy ขึ้น GitHub Pages

### หน้า Admin (จัดการกิจกรรม)
เปิด `admin/index.html` — สำหรับพนักงานเท่านั้น
- เพิ่ม / ลบ กิจกรรมที่แสดงบนหน้าแรก
- รองรับอัพโหลดรูปภาพและ Emoji
- ข้อมูลบันทึกใน localStorage ของเบราว์เซอร์

## Deploy บน GitHub Pages

1. สร้าง repository ใหม่บน GitHub
2. Upload ไฟล์ทั้งหมดใน `tpa-website/` ขึ้นไป
3. ไปที่ Settings → Pages → Source: `main` branch → `/root`
4. เว็บจะพร้อมใช้ที่ `https://username.github.io/repo-name`

## ติดต่อ

- 📞 081-861-6886
- ✉️ thai-pacific@hotmail.com
- 📍 999 ม.2 ถ.วิเศษ ราไวย์ ภูเก็ต 83130

ADMIN_USER = 'tpaadmin';
ADMIN_PASS = 'TPA@2025!';
