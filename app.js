import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  deleteDoc, 
  serverTimestamp 
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

let isAdmin = false;

// إدارة التبويبات
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    btn.classList.add('active');
    const tabId = btn.getAttribute('data-tab');
    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');
  });
});

// إظهار/إخفاء شريط الإحصائيات
const toggleStatsBtn = document.getElementById('toggleStatsBtn');
const analyticsBar = document.querySelector('.analytics-bar');

if (toggleStatsBtn && analyticsBar) {
  toggleStatsBtn.addEventListener('click', () => {
    analyticsBar.classList.toggle('show');
  });
}

// تحميل قائمة المشاكل
async function loadIssues() {
  const issuesList = document.getElementById('issuesList');
  if (!issuesList) return;

  try {
    const snap = await getDocs(collection(db, "ark_issues"));
    issuesList.innerHTML = '';

    if (snap.empty) {
      issuesList.innerHTML = '<div class="empty-state">لا توجد مشاكل مسجلة حالياً.</div>';
      return;
    }

    snap.forEach(docSnap => {
      const issue = docSnap.data();
      const issueId = docSnap.id;

      const card = document.createElement('div');
      card.className = 'issue-card';
      card.innerHTML = `
        <div class="issue-header">
          <h3>${issue.title || 'بدون عنوان'}</h3>
          ${isAdmin ? `<button class="delete-btn" data-id="${issueId}"><i class="fas fa-trash"></i></button>` : ''}
        </div>
        <p class="issue-desc">${issue.description || ''}</p>
        ${issue.solution ? `<div class="issue-solution"><strong>الحل:</strong> ${issue.solution}</div>` : ''}
      `;

      issuesList.appendChild(card);
    });

    // تفعيل أزرار الحذف للأدمن
    if (isAdmin) {
      document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          if (confirm('هل أنت تأكد من حذف هذه المشكلة؟')) {
            try {
              await deleteDoc(doc(db, "ark_issues", id));
              loadIssues();
            } catch (err) {
              console.error("خطأ في الحذف:", err);
            }
          }
        });
      });
    }

  } catch (err) {
    console.error("خطأ في تحميل المشاكل:", err);
    issuesList.innerHTML = '<div class="error-state">حدث خطأ أثناء تحميل البيانات.</div>';
  }
}

// زر الأدمن
const adminBtn = document.getElementById('adminBtn');
if (adminBtn) {
  adminBtn.addEventListener('click', async () => {
    if (isAdmin) {
      isAdmin = false;
      adminBtn.classList.remove('unlocked');
      alert('تم تسجيل الخروج من لوحة الأدمن.');
      loadIssues();
      return;
    }

    const inputPass = prompt('أدخل كلمة سر الأدمن:');
    if (!inputPass) return;

    try {
      const configRef = doc(db, "admin_settings", "config");
      const configSnap = await getDoc(configRef);
      let actualPass = "123456";

      if (configSnap.exists() && configSnap.data().pass) {
        actualPass = configSnap.data().pass;
      }

      if (inputPass === actualPass) {
        isAdmin = true;
        adminBtn.classList.add('unlocked');
        alert('تم الدخول كـ أدمن بنجاح!');
        loadIssues();
      } else {
        alert('كلمة السر غير صحيحة!');
      }
    } catch (err) {
      console.error("خطأ في التحقق من كلمة السر:", err);
      alert('حدث خطأ أثناء التحقق.');
    }
  });
}

// إضافة مشكلة جديدة
const openAddIssueModal = document.getElementById('openAddIssueModal');
if (openAddIssueModal) {
  openAddIssueModal.addEventListener('click', async () => {
    const title = prompt('أدخل عنوان المشكلة:');
    if (!title) return;
    
    const description = prompt('أدخل وصف المشكلة:');
    const solution = prompt('أدخل الحل (اختياري):');

    try {
      await addDoc(collection(db, "ark_issues"), {
        title: title,
        description: description || '',
        solution: solution || '',
        createdAt: serverTimestamp()
      });
      alert('تمت إضافة المشكلة بنجاح!');
      loadIssues();
    } catch (err) {
      console.error("خطأ في إضافة المشكلة:", err);
      alert('حدث خطأ أثناء حفظ البيانات.');
    }
  });
}

loadIssues();