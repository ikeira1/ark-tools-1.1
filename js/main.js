// تهيئة الصفحة والأدوات الأساسية
document.addEventListener('DOMContentLoaded', function() {
    // تحميل الوضع الليلي من localStorage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
    }

    // تعريف الأحداث
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('youtubeBtn').addEventListener('click', () => {
        window.open('https://www.youtube.com/@ikeira1');
    });
    document.getElementById('discordBtn').addEventListener('click', () => {
        window.open('https://discord.gg/2rMzBv6zRv');
    });
    document.getElementById('donateBtn').addEventListener('click', () => {
        window.open('https://tip.dokan.sa/keira');
    });
    document.getElementById('statsToolBtn').addEventListener('click', () => {
        window.open('http://arksurvivalevolved.gamewalkthrough-universe.com/dedicatedservers/customizationtools/perlevelstatsmultipliertool/Default.aspx');
    });

    // تحميل الأدوات
    loadTools();
});

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.theme-toggle i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

function loadTools() {
    const tools = [
        {id: 'levelTool', name: 'إنشاء المستويات وحساب الخبرة', icon: 'level-up-alt'},
        {id: 'engramTool', name: 'نقاط الإنغرام', icon: 'scroll'},
        {id: 'craftTool', name: 'تعديل متطلبات الصنع', icon: 'hammer'},
        {id: 'dinoTool', name: 'استدعاء الديناصورات', icon: 'paw'},
        {id: 'adminTool', name: 'أوامر الأدمن', icon: 'terminal'}
    ];

    const toolsContainer = document.getElementById('toolsContainer');
    toolsContainer.innerHTML = '';
    
    tools.forEach(tool => {
        const toolSection = document.createElement('div');
        toolSection.className = 'tool-section';
        toolSection.id = tool.id;
        toolSection.innerHTML = `
            <div class="tool-card">
                <div class="tool-header" onclick="toggleTool('${tool.id}')">
                    <h3><i class="fas fa-${tool.icon}"></i> ${tool.name}</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="tool-content" id="${tool.id}Content"></div>
            </div>
        `;
        toolsContainer.appendChild(toolSection);
        
        // تحميل محتوى الأداة
        loadToolContent(tool.id);
    });
}

function toggleTool(toolId) {
    const content = document.getElementById(`${toolId}Content`);
    const icon = document.querySelector(`#${toolId} .fa-chevron-down`);
    
    if (content.style.display === 'block') {
        content.style.display = 'none';
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    } else {
        content.style.display = 'block';
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    }
}

function loadToolContent(toolId) {
    const contentDiv = document.getElementById(`${toolId}Content`);
    
    switch(toolId) {
        case 'levelTool':
            contentDiv.innerHTML = getLevelToolHTML();
            initLevelTool();
            break;
        case 'engramTool':
            contentDiv.innerHTML = getEngramToolHTML();
            initEngramTool();
            break;
        case 'craftTool':
            contentDiv.innerHTML = getCraftToolHTML();
            initCraftTool();
            break;
        case 'dinoTool':
            contentDiv.innerHTML = getDinoToolHTML();
            initDinoTool();
            break;
        case 'adminTool':
            contentDiv.innerHTML = getAdminToolHTML();
            initAdminTool();
            break;
    }
}

function copyCode(btn) {
    const codeBox = btn.nextElementSibling;
    const text = codeBox.innerText;
    navigator.clipboard.writeText(text);
    
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
    
    setTimeout(() => {
        btn.innerHTML = originalText;
    }, 2000);
}

function showAlert(message, type) {
    // دالة لعرض التنبيهات
}
