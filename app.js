let currentActiveConfigType = 'usersettings';

const arkConfigs = {
    usersettings: {
        title: "GameUserSettings.ini",
        description: "إعدادات السيرفر، الصعوبة، الحفظ التلقائي، والاتصال (مرجع Pastebin 1)",
        pastebinUrl: "https://pastebin.com/U0LX4r6i",
        headerTag: "[ServerSettings]",
        settings: [
            { key: "SessionName", default: "PUT YOUR SERVER NAME HERE!!!!!!!!!", label: "SessionName", desc: "اسم السيرفر الذي يظهر للاعبين في قائمة السيرفرات." },
            { key: "ServerAdminPassword", default: "PUT YOUR PASSWORD HERE!!!!!!!!!", label: "ServerAdminPassword", desc: "كلمة مرور الأدمن (للحصول على صلاحيات المشرف بالسيرفر)." },
            { key: "ServerPassword", default: "PUT YOUR PASSWORD HERE!!!!!!", label: "ServerPassword", desc: "كلمة مرور خاصة لدخول السيرفر (اختيارية)." },
            { key: "DifficultyOffset", default: "1.0", label: "DifficultyOffset", desc: "مستوى صعوبة ظهور الديناصورات البرية بالعالم." },
            { key: "ServerDifficulty", default: "5.0", label: "ServerDifficulty", desc: "مستوى الصعوبة الرقمي لتحديد أقصى لفل للديناصورات (مثال: 5 يعني لفل 150)." },
            { key: "DayCycleSpeedScale", default: "1.0", label: "DayCycleSpeedScale", desc: "سرعة مرور الوقت ودورة النهار والليل داخل اللعبة." },
            { key: "NightTimeSpeedScale", default: "1.0", label: "NightTimeSpeedScale", desc: "سرعة مرور فترة الليل مقارنة بالنهار." },
            { key: "AutoSavePeriodMinutes", default: "15.0", label: "AutoSavePeriodMinutes", desc: "الفترة الزمنية بالدقائق بين كل حفظ تلقائي لعالم السيرفر." },
            { key: "MaxTamedDinos", default: "5000.0", label: "MaxTamedDinos", desc: "الحد الأقصى لعدد الديناصورات المروضة المسموحة في السيرفر." },
            { key: "HarvestAmountMultiplier", default: "1.0", label: "HarvestAmountMultiplier", desc: "مضاعف كمية الموارد المكتسبة عند تجميعها." },
            { key: "HarvestHealthMultiplier", default: "1.0", label: "HarvestHealthMultiplier", desc: "مضاعف صحة الموارد (كمية ضربات الصخرة أو الشجرة قبل أن تختفي)." },
            { key: "TamingSpeedMultiplier", default: "1.0", label: "TamingSpeedMultiplier", desc: "مضاعف سرعة ترويض الديناصورات." },
            { key: "XPMultiplier", default: "1.0", label: "XPMultiplier", desc: "مضاعف نقاط الخبرة المكتسبة للاعبين والديناصورات." },
            { key: "AllowThirdPersonPlayer", default: "true", label: "AllowThirdPersonPlayer", desc: "السماح للاعبين باستخدام منظور الشخص الثالث (الكميرا البعيدة)." },
            { key: "ShowMapPlayerLocation", default: "true", label: "ShowMapPlayerLocation", desc: "إظهار موقع اللاعب الحالي على الخريطة." },
            { key: "ServerCrosshair", default: "true", label: "ServerCrosshair", desc: "تفعيل علامة التصويب (الخصية) في منتصف الشاشة." },
            { key: "PvEAllowStructuresAtSupplyDrops", default: "false", label: "PvEAllowStructuresAtSupplyDrops", desc: "السماح بالبناء بالقرب من مناطق دروبات الإمداد." },
            { key: "PreventOfflinePvP", default: "false", label: "PreventOfflinePvP", desc: "حماية القواعد والديناصورات من التدمير عندما يكون التباين أوفلاين." }
        ]
    },
    gameini: {
        title: "game.ini",
        description: "إعدادات اللعب المتقدمة، الحصاد، التزاوج، وتربية الصغار (مرجع Pastebin 2)",
        pastebinUrl: "https://pastebin.com/QWHcTF2p",
        headerTag: "[/script/shootergame.shootergamemode]",
        settings: [
            { key: "BabyMatureSpeedMultiplier", default: "1.0", label: "BabyMatureSpeedMultiplier", desc: "سرعة نمو وتربية صغار الديناصورات حتى تصبح بالغة." },
            { key: "EggHatchSpeedMultiplier", default: "1.0", label: "EggHatchSpeedMultiplier", desc: "سرعة فقس البيض." },
            { key: "MatingIntervalMultiplier", default: "1.0", label: "MatingIntervalMultiplier", desc: "الفترة الزمنية الفاصلة بين عمليات تزاوج الديناصورات." },
            { key: "MatingSpeedMultiplier", default: "1.0", label: "MatingSpeedMultiplier", desc: "سرعة عملية التزاوج نفسه." },
            { key: "BabyCuddleIntervalMultiplier", default: "1.0", label: "BabyCuddleIntervalMultiplier", desc: "الفاصل الزمني بين طلبات الرعاية والعناية (Cuddle) للصغار." },
            { key: "BabyImprintAmountMultiplier", default: "1.0", label: "BabyImprintAmountMultiplier", desc: "نسبة زيادة الإمبرنت (البصمة) في كل مرة يتم الاعتناء بالصغير." },
            { key: "BabyFoodConsumptionSpeedMultiplier", default: "1.0", label: "BabyFoodConsumptionSpeedMultiplier", desc: "سرعة استهلاك صغار الديناصورات للطعام." },
            { key: "DinoHarvestingDamageMultiplier", default: "3.2", label: "DinoHarvestingDamageMultiplier", desc: "قوة حصاد الديناصورات للموارد عند جمعها." },
            { key: "CropGrowthSpeedMultiplier", default: "1.0", label: "CropGrowthSpeedMultiplier", desc: "سرعة نمو المحاصيل الزراعية في الحقول." },
            { key: "CropDecaySpeedMultiplier", default: "1.0", label: "CropDecaySpeedMultiplier", desc: "سرعة تلف المحاصيل والموارد في الحقول." },
            { key: "GlobalSpoilingTimeMultiplier", default: "1.0", label: "GlobalSpoilingTimeMultiplier", desc: "وقت فساد الأكل واللحوم (كلما زاد الرقم تأخر فساد الطعام)." },
            { key: "FuelConsumptionIntervalMultiplier", default: "1.0", label: "FuelConsumptionIntervalMultiplier", desc: "معدل استهلاك الوقود في الشناور والمولدات (كلما زاد، قل استهلاك الوقود)." },
            { key: "bAllowFlyerSpeedLeveling", default: "false", label: "bAllowFlyerSpeedLeveling", desc: "السماح بتطوير وزيادة سرعة الديناصورات الطائرة بنقاط اللفل." },
            { key: "bAllowUnlimitedRespecs", default: "false", label: "bAllowUnlimitedRespecs", desc: "السماح بإعادة توزيع نقاط مهارات اللاعب بلا حدود." },
            { key: "bUseCorpseLocator", default: "true", label: "bUseCorpseLocator", desc: "إظهار مؤشر أو علامة على الخريطة لمكان وفاة اللاعب." }
        ]
    }
};

// تبديل نوع الملف عند الضغط على الأزرار العلوية
function switchConfigFile(type) {
    currentActiveConfigType = type;
    
    const btnUS = document.getElementById('btnUserSettings');
    const btnGI = document.getElementById('btnGameIni');
    
    if (type === 'usersettings') {
        btnUS.className = "btn btn-primary";
        btnGI.className = "btn btn-gray";
    } else {
        btnGI.className = "btn btn-primary";
        btnUS.className = "btn btn-gray";
    }
    
    const configData = arkConfigs[type];
    document.getElementById('configDescription').innerText = configData.description;
    
    const pbLink = document.getElementById('pastebinLink');
    pbLink.href = configData.pastebinUrl;
    pbLink.innerHTML = `<i class="fas fa-external-link-alt"></i> مرجع Pastebin (${type === 'usersettings' ? '1' : '2'})`;
    
    const container = document.getElementById('configEditorContainer');
    container.innerHTML = '';
    
    configData.settings.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'config-option-item';
        row.innerHTML = `
            <label>${item.label}</label>
            <div class="config-desc">${item.desc}</div>
            <input type="text" class="config-input-field" data-key="${item.key}" data-default="${item.default}" value="${item.default}" placeholder="القيمة: ${item.default}">
        `;
        container.appendChild(row);
    });
    
    // إفراغ صندوق المخرجات بالبداية تماماً
    document.getElementById('serverConfigOutput').innerText = "";
    window.currentFullConfigText = "";
    window.currentModifiedConfigText = "";
}

// تحضير النصوص عند الضغط على أزرار النسخ
function prepareConfigTexts() {
    const configData = arkConfigs[currentActiveConfigType];
    const inputs = document.querySelectorAll('#configEditorContainer .config-input-field');
    
    let fullOutput = `${configData.headerTag}\n`;
    let modifiedOutput = `/* التعديلات المخصصة فقط (${currentActiveConfigType}) */\n`;
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
        modifiedOutput += `; لم يتم تعديل أي قيمة عن الوضع الافتراضي.\n`;
    }
    
    window.currentFullConfigText = fullOutput;
    window.currentModifiedConfigText = modifiedOutput;
}

function copyFullConfig() {
    prepareConfigTexts();
    navigator.clipboard.writeText(window.currentFullConfigText || '');
    document.getElementById('serverConfigOutput').innerText = window.currentFullConfigText;
    alert('تم نسخ الملف كاملاً وعرضه في الصندوق بنجاح!');
}

function copyModifiedConfigOnly() {
    prepareConfigTexts();
    navigator.clipboard.writeText(window.currentModifiedConfigText || '');
    document.getElementById('serverConfigOutput').innerText = window.currentModifiedConfigText;
    alert('تم نسخ التعديلات المخصصة فقط وعرضها في الصندوق بنجاح!');
}

// باقي دوال الأدوات الأخرى
function generateLevelCode() {
    const maxLevel = parseInt(document.getElementById('maxLevel').value) || 100;
    let xpArray = [];
    let code = 'LevelExperienceRampOverrides=(';
    
    for(let i = 0; i <= maxLevel; i++) {
        let xp = i <= 10 ? Math.floor(5 + (i * 5)) : Math.floor(50 + Math.pow(i-10, 2) * 0.8);
        xpArray.push(xp);
        code += `ExperiencePointsForLevel[${i}]=${xp},`;
    }
    localStorage.setItem('currentXPArray', JSON.stringify(xpArray));
    code = code.slice(0, -1) + ')';
    document.getElementById('levelCode').innerText = code;
}

function calculateTotalXP() {
    const xpArray = JSON.parse(localStorage.getItem('currentXPArray')) || [];
    const totalXP = xpArray.reduce((acc, curr) => acc + curr, 0);
    const output = `OverrideMaxExperiencePointsPlayer=70368744177664\nOverrideMaxExperiencePointsPlayer=${totalXP}\nOverrideMaxExperiencePointsDino=2147483647`;
    document.getElementById('totalXP').innerText = output;
}

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
    const code = `ConfigOverrideItemCraftingCosts=(ItemClassString="${itemId}",BaseCraftingResourceRequirements=(${requirements.slice(0, -1)}))`;
    document.getElementById('craftingOutput').innerText = code;
}

function generateDinoCode() {
    const dinoId = document.getElementById('dinoId').value || 'Gigant_Character_BP_C';
    const level = document.getElementById('dinoLevel').value || 60;
    document.getElementById('dinoOutput').innerText = `cheat gmsummon "${dinoId}" ${level} 1 0`;
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.theme-toggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
}

function copyCustomCodeBox(btn) {
    const codeBox = btn.nextElementSibling;
    if (!codeBox.innerText.trim()) {
        alert('الصندوق فارغ! الرجاء الضغط على أحد أزرار النسخ بالأعلى أولاً.');
        return;
    }
    navigator.clipboard.writeText(codeBox.innerText);
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
}

function toggleTool(header) {
    const content = header.parentElement.querySelector('.tool-content');
    const icon = header.querySelector('.fa-chevron-up, .fa-chevron-down');
    content.classList.toggle('collapsed');
    icon.classList.toggle('fa-chevron-up');
    icon.classList.toggle('fa-chevron-down');
}

document.addEventListener('DOMContentLoaded', function() {
    addResource();
    switchConfigFile('usersettings');
    
    // إغلاق جميع الأقسام تلقائياً عند فتح الموقع لأول مرة
    document.querySelectorAll('.tool-content').forEach(content => {
        content.classList.add('collapsed');
    });
    document.querySelectorAll('.tool-header i.fa-chevron-up').forEach(icon => {
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    });

    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
    }
});