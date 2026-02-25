# Deploy Wedding Map lên Vercel (từ GitHub)

## Bước 1: Đẩy code lên GitHub

1. Tạo repository mới trên GitHub (ví dụ: `weddingmap`).
2. Trong thư mục dự án, chạy:

```bash
git init
git add .
git commit -m "Wedding map app"
git branch -M main
git remote add origin https://github.com/TEN-CUA-BAN/weddingmap.git
git push -u origin main
```

(Lưu ý: File `firebase-config.js` chứa API key — nếu repo **public**, nên thêm `firebase-config.js` vào `.gitignore` và cấu hình biến môi trường trên Vercel.)

---

## Bước 2: Kết nối Vercel với GitHub

1. Vào [vercel.com](https://vercel.com) và đăng nhập (nên dùng **Continue with GitHub**).
2. Bấm **Add New…** → **Project**.
3. Chọn repository **weddingmap** (hoặc tên repo bạn tạo) từ danh sách GitHub.
4. Vercel tự nhận **Framework Preset: Vite** và:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Bấm **Deploy**.

---

## Bước 3: Sau khi deploy

- Trang chủ sẽ mở tại **/** (Vercel tự rewrite `/` → `/home.html` nhờ `vercel.json`).
- Link dạng: `https://weddingmap-xxx.vercel.app`.

---

## Cấu trúc hỗ trợ deploy

- **vercel.json**: Cấu hình build và rewrite `/` → `/home.html`.
- **vite.config.js**: Build ra `dist/home.html` và copy `Logo.ico`, `firebase-config.js` vào `dist`.
- **.gitignore**: Bỏ qua `node_modules`, `dist` khi push GitHub.

Nếu bạn ẩn `firebase-config.js` (không đẩy lên GitHub), cần cấu hình Firebase bằng **Environment Variables** trên Vercel và tạo file cấu hình lúc build (nâng cao).
