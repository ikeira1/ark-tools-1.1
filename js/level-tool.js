function getLevelToolHTML() {
    return `
        <div class="xp-formula">
            <h4><i class="fas fa-calculator"></i> معادلة حساب الخبرة:</h4>
            <p>XP = (المستوى^3 × 1.5) + (المستوى × 100) + 100</p>
        </div>

        <div class="input-group">
            <div class="input-row">
                <div class="input-field">
                    <label for="maxLevel"><i class="fas fa-layer-group"></i> المستوى الأقصى</label>
                    <input type="number" id="maxLevel" min="1" max="200" placeholder="مثال: 100">
                </div>
            </div>
            <button class="btn btn-primary" id="generateLevelBtn">
                <i class="fas fa-code"></i> إنشاء كود المستويات
            </button>
        </div>
        
        <div class="code-container">
            <button class="copy-btn" onclick="copyCode(this)"><i class="fas fa-copy"></i> نسخ</button>
            <div class="code-box" id="levelCode"></div>
        </div>

        <button class="btn btn-secondary" id="calculateTotalBtn">
            <i class="fas fa-calculator"></i> حساب الخبرة الكلية
        </button>
        
        <div class="code-container">
            <button class="copy-btn" onclick="copyCode(this)"><i class="fas fa-copy"></i> نسخ</button>
            <div class="code-box" id="totalXP"></div>
        </div>
    `;
}

function initLevelTool() {
    document.getElementById('generateLevelBtn').addEventListener('click', generateLevelCode);
    document.getElementById('calculateTotalBtn').addEventListener('click', calculateTotalXP);
}

function generateLevelCode() {
    const maxLevel = parseInt(document.getElementById('maxLevel').value) || 100;
    let xpArray = [];
    let code = 'LevelExperienceRampOverrides=(';
    
    for(let i = 0; i <= maxLevel; i++) {
        const xp = Math.floor(Math.pow(i, 3) * 1.5 + i * 100 + 100);
        xpArray.push(xp);
        code += `ExperiencePointsForLevel[${i}]=${xp},`;
    }
    
    localStorage.setItem('currentXPArray', JSON.stringify(xpArray));
    code = code.slice(0, -1) + ')';
    document.getElementById('levelCode').innerHTML = code;
}

function calculateTotalXP() {
    const xpArray = JSON.parse(localStorage.getItem('currentXPArray')) || [];
    const totalXP = xpArray.reduce((acc, curr) => acc + curr, 0);
    
    const output = `OverrideMaxExperiencePointsPlayer=70368744177664\n`
                 + `OverrideMaxExperiencePointsPlayer=${totalXP}\n`
                 + `OverrideMaxExperiencePointsDino=2147483647`;
    
    document.getElementById('totalXP').innerHTML = output;
}
