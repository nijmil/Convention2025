// firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJqW1l2-AO0Utpszml1r7S9exdcu1IRNo",
  authDomain: "convention-2025-44080.firebaseapp.com",
  projectId: "convention-2025-44080",
  storageBucket: "convention-2025-44080.firebasestorage.app",
  messagingSenderId: "701394776928",
  appId: "1:701394776928:web:61ed15831f15240c56a405",
  measurementId: "G-4ED38LZRH4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('Background Message received: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // Show a notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
