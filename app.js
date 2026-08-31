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
        alert('الصندوق فارغ! الرجاء الضغط على أحد أزرار التوليد بالأعلى أولاً.');
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