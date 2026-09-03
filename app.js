import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, increment, arrayUnion, query, deleteDoc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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

let allIssues = [];
let isAdminLoggedIn = false;

// جلب وتعيين معرف الجهاز
function getDeviceId() {
    let deviceId = localStorage.getItem('user_device_id');
    if (!deviceId) {
        deviceId = 'dev_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('user_device_id', deviceId);
    }
    return deviceId;
}

// التبديل بين صفحة الأدوات والمنتدى
window.showCommunitySection = function() {
    document.getElementById('toolsSection').style.display = 'none';
    if(document.getElementById('sideCommunityCard')) document.getElementById('sideCommunityCard').style.display = 'none';
    if(document.getElementById('sideShareCard')) document.getElementById('sideShareCard').style.display = 'none';
    document.getElementById('communitySection').style.display = 'block';
    document.getElementById('statsBtn').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.showToolsSection = function() {
    document.getElementById('communitySection').style.display = 'none';
    document.getElementById('toolsSection').style.display = 'block';
    if(document.getElementById('sideCommunityCard')) document.getElementById('sideCommunityCard').style.display = 'block';
    if(document.getElementById('sideShareCard')) document.getElementById('sideShareCard').style.display = 'block';
    document.getElementById('statsBtn').style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.openAddIssueView = function() {
    document.getElementById('addIssueForm').style.display = 'block';
    document.getElementById('browseContainer').style.display = 'none';
    document.getElementById('addIssueForm').scrollIntoView({ behavior: 'smooth' });
};

window.openBrowseIssuesView = function() {
    document.getElementById('addIssueForm').style.display = 'none';
    document.getElementById('browseContainer').style.display = 'block';
    document.getElementById('browseContainer').scrollIntoView({ behavior: 'smooth' });
};

window.copySiteLink = function() {
    navigator.clipboard.writeText(window.location.href);
    alert("تم نسخ رابط الموقع بنجاح! شكراً لدعمك ومشاركتك للموقع ❤️");
};

// فحص الحظر
async function checkIfBanned() {
    const devId = getDeviceId();
    const banRef = doc(db, "banned_devices", devId);
    const banSnap = await getDoc(banRef);
    return banSnap.exists();
}

// إضافة مشكلة وحل
window.submitNewIssue = async function() {
    if (await checkIfBanned()) {
        alert('عذراً، تم حظر جهازك من المشاركة بسبب مخالفة الأنظمة.');
        return;
    }

    const author = document.getElementById('authorName').value.trim() || 'لاعب مجهول';
    const title = document.getElementById('issueTitle').value.trim();
    const body = document.getElementById('issueBody').value.trim();

    if (!title || !body) {
        alert('يرجى ملء عنوان المشكلة وتفاصيل الحل أولاً!');
        return;
    }

    try {
        await addDoc(collection(db, "ark_issues"), {
            author: author,
            title: title,
            body: body,
            deviceId: getDeviceId(),
            likes: 0,
            comments: [],
            timestamp: Date.now()
        });

        document.getElementById('issueTitle').value = '';
        document.getElementById('issueBody').value = '';
        alert('تم نشر المشكلة والحل بنجاح!');
        openBrowseIssuesView();
    } catch (error) {
        console.error("خطأ في النشر: ", error);
        alert('حدث خطأ أثناء النشر، حاول مجدداً.');
    }
};

// الاستماع لبنك المشاكل في Firestore
const issuesQuery = query(collection(db, "ark_issues"));
onSnapshot(issuesQuery, (snapshot) => {
    allIssues = [];
    snapshot.forEach((doc) => {
        allIssues.push({ id: doc.id, ...doc.data() });
    });

    allIssues.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    renderIssues(allIssues);
});

function renderIssues(issues) {
    const listContainer = document.getElementById('issuesList');
    if (!listContainer) return;
    
    if (issues.length === 0) {
        listContainer.innerHTML = '<p style="text-align: center; color: #94a3b8;">لا توجد مشاكل أو حلول مطروحة حالياً. كن أول من يضيف حل!</p>';
        return;
    }

    let html = '';
    issues.forEach(issue => {
        const commentsHtml = (issue.comments || []).map(c => `
            <div class="comment-item">
                <span class="comment-author"><i class="fas fa-user-circle"></i> ${c.author}:</span>
                <div class="comment-text">${c.text}</div>
            </div>
        `).join('');

        const adminButtonsHtml = isAdminLoggedIn ? `
            <button class="admin-action-btn delete-btn" onclick="deleteIssue('${issue.id}')">
                <i class="fas fa-trash"></i> حذف
            </button>
            <button class="admin-action-btn ban-btn" onclick="banUserDevice('${issue.deviceId || ''}', '${issue.id}')">
                <i class="fas fa-ban"></i> تبنيد الجهاز
            </button>
        ` : '';

        html += `
            <div class="issue-card" id="issue-${issue.id}">
                <div class="issue-header">
                    <div>
                        <h4 class="issue-title">${issue.title}</h4>
                        <span class="issue-author"><i class="fas fa-user"></i> بواسطة: ${issue.author}</span>
                    </div>
                </div>
                <div class="issue-body">${issue.body}</div>
                <div class="issue-actions">
                    <button class="like-btn" onclick="addLike('${issue.id}')">
                        <i class="fas fa-heart"></i> ${issue.likes || 0} لايك
                    </button>
                    ${adminButtonsHtml}
                </div>

                <div class="comments-section">
                    <h5 style="margin: 0 0 10px 0; color: #00ffff;"><i class="fas fa-comments"></i> النقاشات والردود (${(issue.comments || []).length})</h5>
                    <div>${commentsHtml}</div>
                    <div style="display: flex; gap: 8px; margin-top: 10px;">
                        <input type="text" id="comment-input-${issue.id}" placeholder="اكتب تعليقك أو إضافتك هنا..." style="padding: 8px 12px; font-size: 13px;">
                        <button class="btn btn-primary" onclick="addComment('${issue.id}')" style="padding: 8px 15px; font-size: 13px;">رد</button>
                    </div>
                </div>
            </div>
        `;
    });

    listContainer.innerHTML = html;
}

window.addLike = async function(id) {
    const issueRef = doc(db, "ark_issues", id);
    await updateDoc(issueRef, { likes: increment(1) });
};

window.addComment = async function(id) {
    if (await checkIfBanned()) {
        alert('عذراً، تم حظر جهازك من التعليق بسبب مخالفة الأنظمة.');
        return;
    }

    const input = document.getElementById(`comment-input-${id}`);
    const text = input.value.trim();
    if (!text) return;

    const author = prompt("ادخل اسمك للتعليق:") || "لاعب";
    const issueRef = doc(db, "ark_issues", id);

    await updateDoc(issueRef, {
        comments: arrayUnion({ author: author, text: text })
    });

    input.value = '';
};

window.filterIssues = function() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allIssues.filter(i => 
        i.title.toLowerCase().includes(term) || 
        i.body.toLowerCase().includes(term) || 
        i.author.toLowerCase().includes(term)
    );
    renderIssues(filtered);
};

// إجراءات الأدمن
window.deleteIssue = async function(id) {
    if (confirm("هل أنت تأكد من رغبتك في حذف هذه المشاركة؟")) {
        await deleteDoc(doc(db, "ark_issues", id));
        alert("تم حذف المشاركة بنجاح!");
    }
};

window.banUserDevice = async function(targetDeviceId, issueId) {
    if (!targetDeviceId) {
        alert("تعذر العثور على معرف الجهاز لهذه المشاركة القديمة.");
        return;
    }
    if (confirm("هل أنت متأكد من تبنيد جهاز صاحب هذه المشاركة لحظر مشاركاته المستقبلية؟")) {
        await setDoc(doc(db, "banned_devices", targetDeviceId), { bannedAt: Date.now() });
        await deleteDoc(doc(db, "ark_issues", issueId));
        alert("تم حظر جهاز الشخص وحذف مشاركته بنجاح!");
    }
};

// اختصار لوحة المفاتيح
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.altKey && e.shiftKey) {
        e.preventDefault();
        document.getElementById('adminModal').style.display = 'flex';
        if (!isAdminLoggedIn) {
            document.getElementById('adminPasswordInput').focus();
        }
    }
});

window.closeAdminModal = function() {
    document.getElementById('adminModal').style.display = 'none';
};

window.verifyAdminPass = async function() {
    const inputPass = document.getElementById('adminPasswordInput').value;
    const settingsRef = doc(db, "admin_settings", "config");
    const settingsSnap = await getDoc(settingsRef);
    
    let actualPass = "123456";
    if (settingsSnap.exists() && settingsSnap.data().password) {
        actualPass = settingsSnap.data().password;
    }

    if (inputPass === actualPass) {
        isAdminLoggedIn = true;
        alert('تم تسجيل دخول الأدمن بنجاح!');
        document.getElementById('adminLoginState').style.display = 'none';
        document.getElementById('adminControlState').style.display = 'block';
        renderIssues(allIssues);
    } else {
        alert('كلمة السر غير صحيحة!');
    }
};

window.updateAdminPassword = async function() {
    const newPass = document.getElementById('newAdminPasswordInput').value.trim();
    if (!newPass) {
        alert("يرجى إدخال كلمة سر جديدة!");
        return;
    }
    const settingsRef = doc(db, "admin_settings", "config");
    await setDoc(settingsRef, { password: newPass }, { merge: true });
    alert("تم تغيير كلمة سر الأدمن ومزامنتها في الفايربيس بنجاح!");
    document.getElementById('newAdminPasswordInput').value = '';
};

window.logoutAdmin = function() {
    isAdminLoggedIn = false;
    alert("تم تسجيل الخروج من لوحة الأدمن.");
    document.getElementById('adminLoginState').style.display = 'block';
    document.getElementById('adminControlState').style.display = 'none';
    document.getElementById('adminPasswordInput').value = '';
    closeAdminModal();
    renderIssues(allIssues);
};

// دال الأدوات الكلاسيكية
window.generateLevelCode = function() {
    const maxLevel = parseInt(document.getElementById('maxLevel').value) || 100;
    let xpArray = [];
    let code = 'LevelExperienceRampOverrides=(';
    for(let i = 0; i <= maxLevel; i++) {
        let xp;
        if (i <= 10) { xp = Math.floor(5 + (i * 5)); }
        else if (i <= 30) { xp = Math.floor(50 + Math.pow(i-10, 2) * 0.8); }
        else if (i <= 60) { xp = Math.floor(400 + Math.pow(i-30, 2) * 1.5); }
        else { xp = Math.floor(2000 + Math.pow(i-60, 3) * 0.5); }
        xpArray.push(xp);
        code += `ExperiencePointsForLevel[${i}]=${xp},`;
    }
    localStorage.setItem('currentXPArray', JSON.stringify(xpArray));
    code = code.slice(0, -1) + ')';
    document.getElementById('levelCode').innerHTML = code;
};

window.calculateTotalXP = function() {
    const xpArray = JSON.parse(localStorage.getItem('currentXPArray')) || [];
    const totalXP = xpArray.reduce((acc, curr) => acc + curr, 0);
    const output = `OverrideMaxExperiencePointsPlayer=70368744177664\nOverrideMaxExperiencePointsPlayer=${totalXP}\nOverrideMaxExperiencePointsDino=2147483647`;
    document.getElementById('totalXP').innerHTML = output;
};

window.generateEngramPoints = function() {
    const maxLevel = parseInt(document.getElementById('engramLevel').value) || 60;
    const basePoints = parseInt(document.getElementById('engramPoints').value) || 8;
    const boostLevel = parseInt(document.getElementById('engramBoostLevel').value) || 10;
    const boostPoints = parseInt(document.getElementById('engramBoostPoints').value) || 14;
    let code = '';
    for(let i = 0; i <= maxLevel; i++) {
        const points = i < boostLevel ? basePoints : boostPoints;
        code += `OverridePlayerLevelEngramPoints=${points}\n`;
    }
    document.getElementById('engramOutput').innerHTML = code;
};

window.addResource = function() {
    const container = document.getElementById('resourceRequirements');
    const newRow = document.createElement('div');
    newRow.className = 'input-row resource-row';
    newRow.innerHTML = `
        <div class="input-field">
            <label>مادة ${container.children.length + 1}</label>
            <div class="input-row">
                <input type="text" class="resource-id" placeholder="ID المادة">
                <input type="number" class="resource-amount" placeholder="الكمية" min="1" value="100">
                <button class="btn btn-accent" onclick="removeResource(this)"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `;
    container.appendChild(newRow);
};

window.removeResource = function(btn) {
    btn.closest('.resource-row').remove();
    updateResourceLabels();
};

function updateResourceLabels() {
    document.querySelectorAll('.resource-row').forEach((row, index) => {
        row.querySelector('label').textContent = `مادة ${index + 1}`;
    });
}

window.generateCraftingCode = function() {
    const itemId = document.getElementById('itemId').value || 'SoulTerminal_DS_C';
    const resources = [];
    document.querySelectorAll('.resource-row').forEach(row => {
        const id = row.querySelector('.resource-id').value;
        const amount = row.querySelector('.resource-amount').value;
        if (id && amount) resources.push({ id: id, amount: parseFloat(amount) });
    });
    if (resources.length === 0) { alert('الرجاء إضافة مواد على الأقل'); return; }
    let requirements = '';
    resources.forEach(res => { requirements += `(ResourceItemTypeString="${res.id}",BaseResourceRequirement=${res.amount},bCraftingRequireExactResourceType=false),`; });
    const code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemId}",BaseCraftingResourceRequirements=(${requirements.slice(0, -1)}))`;
    document.getElementById('craftingOutput').innerHTML = code;
};

window.generateDinoCode = function() {
    const dinoId = document.getElementById('dinoId').value || 'Gigant_Character_BP_C';
    const level = document.getElementById('dinoLevel').value || 60;
    document.getElementById('dinoOutput').innerHTML = `cheat gmsummon "${dinoId}" ${level} 1 0`;
};

window.copyCode = function(btn) {
    const text = btn.nextElementSibling.innerText;
    navigator.clipboard.writeText(text);
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
};

window.toggleTool = function(header) {
    const content = header.parentElement.querySelector('.tool-content');
    const icon = header.querySelector('.fa-chevron-down, .fa-chevron-up');
    if (content.style.display === 'block') {
        content.style.display = 'none';
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    } else {
        content.style.display = 'block';
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    }
};