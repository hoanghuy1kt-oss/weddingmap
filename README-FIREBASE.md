# Hướng dẫn kết nối Firebase (Wedding Map)

Ứng dụng có thể lưu **danh sách khách** và **sơ đồ bàn** lên Firebase Firestore để đồng bộ giữa nhiều thiết bị hoặc không mất dữ liệu khi xóa cache.

---

## Bước 1: Tạo project Firebase

1. Vào [Firebase Console](https://console.firebase.google.com/).
2. Bấm **Create a project** (hoặc chọn project có sẵn).
3. Đặt tên project (vd: `wedding-map`) và làm theo hướng dẫn (có thể tắt Google Analytics nếu không cần).

---

## Bước 2: Đăng ký app Web và lấy cấu hình

1. Trong project vừa tạo, bấm icon **Web** `</>` để thêm app.
2. Đặt **App nickname** (vd: `Wedding Map Web`), không cần chọn Firebase Hosting nếu bạn đang chạy bằng Vite/local.
3. Bấm **Register app**, sau đó copy object cấu hình (hoặc để trang mở).
4. Mở file **`firebase-config.js`** trong thư mục dự án và thay toàn bộ giá trị `YOUR_...` bằng thông tin từ Firebase:

```js
var firebaseConfig = {
  apiKey: 'AIza...',           // thay YOUR_API_KEY
  authDomain: 'wedding-xxx.firebaseapp.com',
  projectId: 'wedding-xxx',    // thay YOUR_PROJECT_ID
  storageBucket: 'wedding-xxx.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:xxx'
};
```

Lưu file.

---

## Bước 3: Bật Firestore Database

1. Trên menu trái Firebase Console: **Build** → **Firestore Database**.
2. Bấm **Create database**.
3. Chọn chế độ:
   - **Test mode** (trong 30 ngày, dễ test): cho phép đọc/ghi cho mọi người. Sau này nhớ chuyển sang Production.
   - **Production**: phải cấu **Rules** (bước 4).
4. Chọn region (vd: `asia-southeast1` cho gần Việt Nam) rồi **Enable**.

---

## Bước 4: Cấu quy tắc bảo mật (Rules)

1. Vào **Firestore Database** → tab **Rules**.
2. Nếu bạn chọn **Test mode** lúc tạo, có thể tạm dùng rule mặc định (chỉ nên dùng để test).
3. Khi dùng thật, nên đổi sang rule an toàn hơn, ví dụ:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /weddingMap/{document=**} {
      allow read, write: if true;
    }
  }
}
```

- `if true` = ai cũng đọc/ghi được (phù hợp app chỉ dùng nội bộ, không có đăng nhập).
- Nếu sau này bạn thêm Firebase Auth, có thể đổi thành `if request.auth != null`.

4. Bấm **Publish**.

---

## Bước 5: Chạy app và kiểm tra

1. Chạy lại app (vd: `npm run dev`).
2. Mở **Cài đặt** → đăng nhập → thêm/sửa khách hoặc sơ đồ bàn.
3. Mở Firebase Console → **Firestore Database** → tab **Data**: sẽ thấy collection **weddingMap**, document **data** với các trường `guests` và `tablePositions`.

---

## Cấu trúc dữ liệu trên Firestore

- **Collection:** `weddingMap`
- **Document:** `data`
- **Trường:**
  - `guests`: mảng các object `{ id, name, table, group }`.
  - `tablePositions`: mảng các object `{ id, x, y }` (số bàn và tọa độ %).

App vẫn lưu thêm bản copy vào **localStorage**; khi có Firebase, lúc mở trang sẽ ưu tiên tải từ Firestore rồi ghi đè localStorage để lần sau offline vẫn dùng được.

---

## Lưu ý

- **Không** commit file `firebase-config.js` có API key thật lên GitHub/public. Có thể thêm `firebase-config.js` vào `.gitignore` và chỉ chia sẻ `firebase-config.example.js`.
- Nếu chưa dùng Firebase: không sửa `firebase-config.js` (giữ `YOUR_API_KEY`), app sẽ chỉ dùng localStorage như trước.
