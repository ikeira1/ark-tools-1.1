import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, updateDoc, increment, onSnapshot, setDoc, getDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDb5bjaL2NukA5DNHzDXUxpvTm1TirLS9s",
    authDomain: "ark-tools.firebaseapp.com",
    projectId: "ark-tools",
    storageBucket: "ark-tools.firebasestorage.app",
    messagingSenderId: "576361005916",
    appId: "1:576361005916:web:4df24f62da976ae2cdb799",
    measurementId: "G-4LD2YGH0TW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// تاريخ اليوم بصيغة YYYY-MM-DD
function getTodayString() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// إنشاء جلسة فريدة لكل فتحة متصفح
const sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();

// 1. تسجيل الزيارات ومتابعتها
async function trackVisits() {
    const statsRef = doc(db, "analytics", "general");
    const todayStr = getTodayString();

    try {
        // تحديث إجمالي الزيارات وزيارات اليوم
        await setDoc(statsRef, {
            totalVisits: increment(1),
            [`visits_${todayStr}`]: increment(1)
        }, { merge: true });

        // الاستماع اللحظي لإجمالي وزيارات اليوم
        onSnapshot(statsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                const total = data.totalVisits || 0;
                const today = data[`visits_${todayStr}`] || 0;

                const totalEl = document.getElementById('totalVisitsCount');
                const todayEl = document.getElementById('todayVisitsCount');

                if (totalEl) totalEl.innerText = total.toLocaleString('ar-EG');
                if (todayEl) todayEl.innerText = today.toLocaleString('ar-EG');
            }
        });
    } catch (e) {
        console.error("خطأ تتبع الزيارات:", e);
    }
}

// 2. نظام المتواجدين الآن (Presence System)
async function setupOnlinePresence() {
    const sessionRef = doc(db, "online_users", sessionId);

    // إشارة الحضور اللحظي
    const pingOnline = async () => {
        try {
            await setDoc(sessionRef, {
                lastSeen: Date.now()
            });
        } catch (e) {
            console.error("خطأ تحديث الحضور:", e);
        }
    };

    await pingOnline();
    setInterval(pingOnline, 15000); // تحديث كل 15 ثانية

    // تنظيف الجلسة عند مغادرة الصفحة
    window.addEventListener('beforeunload', () => {
        deleteDoc(sessionRef);
    });

    // الاستماع لعدد المتواجدين الآن (المتصلين خلال آخر 35 ثانية)
    onSnapshot(doc(db, "analytics", "general"), () => {
        // تحفيز استعلام المتواجدين
        checkOnlineCount();
    });

    setInterval(checkOnlineCount, 10000);
}

async function checkOnlineCount() {
    try {
        const { collection, getDocs, query, where } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
        const cutoffTime = Date.now() - 35000; // آخر 35 ثانية
        const q = query(collection(db, "online_users"), where("lastSeen", ">", cutoffTime));
        const snapshot = await getDocs(q);

        const countEl = document.getElementById('onlineUsersCount');
        if (countEl) {
            countEl.innerText = snapshot.size.toLocaleString('ar-EG');
        }
    } catch (e) {
        console.error("خطأ حساب المتواجدين:", e);
    }
}

// تشغيل التتبع عند التحميل
document.addEventListener('DOMContentLoaded', () => {
    trackVisits();
    setupOnlinePresence();
});