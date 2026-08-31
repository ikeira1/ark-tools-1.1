// بيانات أداة ملفات السيرفر (Game.ini و GameUserSettings.ini) مع الشرح العربي والقيم الافتراضية
const arkConfigs = {
    gameini: {
        title: "إعدادات Game.ini (الحصاد، الخبرة، وتكديس العناصر)",
        description: "هذا الملف يتحكم بخصائص اللعب العميقة، معدلات الحصاد، ترويض الديناصورات، والخبرة.",
        settings: [
            { key: "HarvestResourceMultiplier", default: "2.0", label: "معدل الحصاد العام (Harvest Resource Multiplier)", desc: "يتحكم بكمية الموارد المستخرجة عند ضرب الأشجار أو الصخور." },
            { key: "TamingSpeedMultiplier", default: "3.0", label: "سرعة الترويض (Taming Speed Multiplier)", desc: "يحدد مدى سرعة ترويض الديناصورات والوحوش." },
            { key: "XPMultiplier", default: "2.0", label: "معدل اكتساب الخبرة (XP Multiplier)", desc: "يضاعف سرعة حصول اللاعب والديناصور على نقاط الخبرة." },
            { key: "BabyMatureSpeedMultiplier", default: "10.0", label: "سرعة نضج الصغار (Baby Mature Speed)", desc: "يتحكم بسرعة نمو وتربية صغار الديناصورات حتى تصبح بالغة." },
            { key: "MatingIntervalMultiplier", default: "0.5", label: "فترة الانتظار للتزاوج (Mating Interval)", desc: "يقلل الوقت اللازم بين كل عملية تزاوج للديناصورات." }
        ]
    },
    usersettings: {
        title: "إعدادات GameUserSettings.ini (خيارات السيرفر والعالم)",
        description: "هذا الملف يتحكم بإعدادات الخريطة، الصعوبة، ظهور اللاعبين، ومنع أو السماح ببناء أشياء معينة.",
        settings: [
            { key: "DifficultyOffset", default: "1.0", label: "مستوى الصعوبة (Difficulty Offset)", desc: "يحدد مستوى صعوبة الديناصورات البرية وظهور المستويات العالية." },
            { key: "ServerDifficulty", default: "5.0", label: "صعوبة السيرفر الرقمية (Server Difficulty)", desc: "يحدد الحد الأقصى لمستوى الديناصورات البرية (مثال: 5 يعني لفل 150 كحد أقصى)." },
            { key: "DayCycleSpeedScale", default: "1.0", label: "سرعة دورة اليوم والليلة", desc: "يتحكم بسرعة مرور الوقت داخل اللعبة (الليل والنهار)." },
            { key: "PvPStructureDecal", default: "True", label: "تآكل الهياكل والبناء", desc: "تحديد ما إذا كانت المباني تتأثر بالتآكل بمرور الوقت أم لا." },
            { key: "GlobalVoiceChat", default: "True", label: "الدردشة الصوتية العامة", desc: "تفعيل أو تعطيل الدردشة الصوتية المرئية للجميع." }
        ]
    }
};

// تحميل وتشغيل إعدادات ملفات السيرفر
function loadConfigFile() {
    const selectedType = document.getElementById('fileSelector').value;
    const configData = arkConfigs[selectedType];
    
    document.getElementById('configDescription').innerText = configData.description;
    
    const container = document.getElementById('configEditorContainer');
    container.innerHTML = '';
    
    configData.settings.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'config-option-item';
        row.innerHTML = `
            <label>${item.label}</label>
            <div class="config-desc">${item.desc}</div>
            <input type="text" class="config-input-field" data-key="${item.key}" data-default="${item.default}" value="${item.default}" placeholder="القيمة الافتراضية: ${item.default}" oninput="updateServerConfigOutput()">
        `;
        container.appendChild(row);
    });
    
    updateServerConfigOutput();
}

// تحديث معاينة الكود في الصندوق بناءً على التعديلات
function updateServerConfigOutput() {
    const selectedType = document.getElementById('fileSelector').value;
    const inputs = document.querySelectorAll('#configEditorContainer .config-input-field');
    
    let fullOutput = `[/script/shootergame.shootergamegamemode]\n`;
    let modifiedOutput = `/* التعديلات المخصصة فقط */\n`;
    let hasChanges = false;
    
    inputs.forEach(input => {
        const key = input.getAttribute('data-key');
        const defaultValue = input.getAttribute('data-default');
        const val = input.value.trim() !== '' ? input.value : defaultValue;
        
        fullOutput += `${key}=${val}\n`;
        
        if (val !== defaultValue) {
            modifiedOutput += `${key}=${val}\n`;
            hasChanges = true;
        }
    });
    
    if (!hasChanges) {
        modifiedOutput += `; لم يتم تعديل أي قيمة، جميع القيم على وضعها الافتراضي.\n`;
    }
    
    // تخزين مؤقت للنسخ المزدوج
    window.currentFullConfigText = fullOutput;
    window.currentModifiedConfigText = modifiedOutput;
    
    document.getElementById('serverConfigOutput').innerText = fullOutput;
}

// خيار نسخ الملف كامل
function copyFullConfig() {
    navigator.clipboard.writeText(window.currentFullConfigText || '');
    alert('تم نسخ الملف كاملاً بنجاح!');
}

// خيار نسخ التعديلات فقط
function copyModifiedConfigOnly() {
    navigator.clipboard.writeText(window.currentModifiedConfigText || '');
    alert('تم نسخ التعديلات المخصصة فقط بنجاح!');
}

// توليد كود المستويات
function generateLevelCode() {
    const maxLevel = parseInt(document.getElementById('maxLevel').value) || 100;
    let xpArray = [];
    let code = 'LevelExperienceRampOverrides=(';
    
    for(let i = 0; i <= maxLevel; i++) {
        let xp;
        if (i <= 10) {
            xp = Math.floor(5 + (i * 5));
        } else if (i <= 30) {
            xp = Math.floor(50 + Math.pow(i-10, 2) * 0.8);
        } else if (i <= 60) {
            xp = Math.floor(400 + Math.pow(i-30, 2) * 1.5);
        } else {
            xp = Math.floor(2000 + Math.pow(i-60, 3) * 0.5);
        }
        xpArray.push(xp);
        code += `ExperiencePointsForLevel[${i}]=${xp},`;
    }
    
    localStorage.setItem('currentXPArray', JSON.stringify(xpArray));
    code = code.slice(0, -1) + ')';
    document.getElementById('levelCode').innerText = code;
}

// حساب الخبرة الكلية
function calculateTotalXP() {
    const xpArray = JSON.parse(localStorage.getItem('currentXPArray')) || [];
    const totalXP = xpArray.reduce((acc, curr) => acc + curr, 0);
    
    const output = `OverrideMaxExperiencePointsPlayer=70368744177664\n`
                 + `OverrideMaxExperiencePointsPlayer=${totalXP}\n`
                 + `OverrideMaxExperiencePointsDino=2147483647`;
    
    document.getElementById('totalXP').innerText = output;
}

// توليد نقاط الإنغرام
function generateEngramPoints() {
    const maxLevel = parseInt(document.getElementById('engramLevel').value) || 60;
    const basePoints = parseInt(document.getElementById('engramPoints').value) || 8;
    const boostLevel = parseInt(document.getElementById('engramBoostLevel').value) || 10;
    const boostPoints = parseInt(document.getElementById('engramBoostPoints').value) || 14;
    
    let code = '';
    for(let i = 0; i <= maxLevel; i++) {
        const points = i < boostLevel ? basePoints : boostPoints;
        code += `OverridePlayerLevelEngramPoints=${points}\n`;
    }
    
    document.getElementById('engramOutput').innerText = code;
}

// إدارة متطلبات الصنع
function addResource() {
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
}

function removeResource(btn) {
    btn.closest('.resource-row').remove();
    updateResourceLabels();
}

function updateResourceLabels() {
    document.querySelectorAll('.resource-row').forEach((row, index) => {
        row.querySelector('label').textContent = `مادة ${index + 1}`;
    });
}

function generateCraftingCode() {
    const itemId = document.getElementById('itemId').value || 'SoulTerminal_DS_C';
    let requirements = '';
    
    document.querySelectorAll('.resource-row').forEach(row => {
        const id = row.querySelector('.resource-id').value;
        const amount = row.querySelector('.resource-amount').value;
        if (id && amount) {
            requirements += `(ResourceItemTypeString="${id}",BaseResourceRequirement=${amount},bCraftingRequireExactResourceType=false),`;
        }
    });
    
    if (!requirements) {
        alert('الرجاء إضافة مواد على الأقل');
        return;
    }
    
    const code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemId}",BaseCraftingResourceRequirements=(${requirements.slice(0, -1)}))`;
    document.getElementById('craftingOutput').innerText = code;
}

// كود استدعاء الديناصورات
function generateDinoCode() {
    const dinoId = document.getElementById('dinoId').value || 'Gigant_Character_BP_C';
    const level = document.getElementById('dinoLevel').value || 60;
    document.getElementById('dinoOutput').innerText = `cheat gmsummon "${dinoId}" ${level} 1 0`;
}

// تبديل الثيم الليلي والنهاري
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.theme-toggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
}

// زر النسخ السريع للمربعات البرمجية
function copyCustomCodeBox(btn) {
    const codeBox = btn.nextElementSibling;
    navigator.clipboard.writeText(codeBox.innerText);
    
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
}

// طي وتوسيع الكروت
function toggleTool(header) {
    const content = header.parentElement.querySelector('.tool-content');
    const icon = header.querySelector('.fa-chevron-up, .fa-chevron-down');
    
    content.classList.toggle('collapsed');
    icon.classList.toggle('fa-chevron-up');
    icon.classList.toggle('fa-chevron-down');
}

// تهيئة أولية عند فتح الصفحة
document.addEventListener('DOMContentLoaded', function() {
    addResource();
    loadConfigFile();
    
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
    }
});