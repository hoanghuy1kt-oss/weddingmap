/**
 * CẤU HÌNH FIREBASE - Wedding Map
 * ---------------------------------
 * 1. Đổi tên file này thành: firebase-config.js
 * 2. Vào https://console.firebase.google.com/ tạo project (hoặc chọn project có sẵn)
 * 3. Vào Project settings (bánh răng) > General > Your apps > Thêm app Web (icon </>)
 * 4. Copy các giá trị từ Firebase vào dưới đây, thay thế chuỗi 'YOUR_...'
 * 5. Trong Firebase Console: Build > Firestore Database > Create database (chế độ test hoặc production, nhớ cấu quy tắc bảo mật)
 */

// eslint-disable-next-line no-unused-vars
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

// Nếu bạn chưa dùng Firebase, xóa hoặc đừng nạp file firebase-config.js trong home.html
