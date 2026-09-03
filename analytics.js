import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  increment, 
  serverTimestamp, 
  deleteDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD27a-WhhKdvblKUduPrZkBcmUr-uYkED4",
  authDomain: "ark-tools.firebaseapp.com",
  projectId: "ark-tools",
  storageBucket: "ark-tools.firebasestorage.app",
  messagingSenderId: "576361005916",
  appId: "1:576361005916:web:4df24f62da976ae2cdb799",
  measurementId: "G-4LD2YGH0TW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sessionId = 'user_' + Math.random().toString(36).substring(2, 9);

async function initAnalytics() {
  const userRef = doc(db, "online_users", sessionId);
  const viewsRef = doc(db, "analytics", "views");

  await setDoc(userRef, {
    lastSeen: serverTimestamp()
  });

  await setDoc(viewsRef, {
    count: increment(1)
  }, { merge: true });

  setInterval(async () => {
    await setDoc(userRef, {
      lastSeen: serverTimestamp()
    });
  }, 30000);

  window.addEventListener("beforeunload", async () => {
    await deleteDoc(userRef);
  });

  fetchTotalViews();
  checkOnlineCount();
  setInterval(checkOnlineCount, 10000);
}

async function fetchTotalViews() {
  try {
    const viewsRef = doc(db, "analytics", "views");
    const snap = await getDoc(viewsRef);
    if (snap.exists()) {
      const data = snap.data();
      const viewsElem = document.getElementById("totalViews");
      if (viewsElem) viewsElem.textContent = data.count || 0;
    }
  } catch (err) {
    console.error("خطأ في جلب عدد الزيارات:", err);
  }
}

async function checkOnlineCount() {
  try {
    const usersRef = collection(db, "online_users");
    const snap = await getDocs(usersRef);
    const onlineElem = document.getElementById("onlineCount");
    if (onlineElem) {
      onlineElem.textContent = snap.size || 1;
    }
  } catch (err) {
    console.error("خطأ في جلب عدد المتواجدين:", err);
  }
}

initAnalytics();