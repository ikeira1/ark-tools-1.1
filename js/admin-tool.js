let adminCommandsData = {
    pc: [],
    xbox: [],
    playstation: []
};

function getAdminToolHTML() {
    return `
        <div class="admin-tools">
            <div class="command-controls">
                <div class="filter-buttons">
                    <button class="filter-btn active" data-filter="all">الكل</button>
                    <button class="filter-btn" data-filter="top">الأعلى تقييماً</button>
                    <button class="filter-btn" data-filter="newest">الأحدث</button>
                    <button class="filter-btn" data-filter="oldest">الأقدم</button>
                </div>
                
                <select class="platform-select" id="platformSelect">
                    <option value="all">جميع المنصات</option>
                    <option value="pc">PC</option>
                    <option value="xbox">Xbox</option>
                    <option value="playstation">PlayStation</option>
                </select>
            </div>
            
            <div id="adminCommands" class="command-grid"></div>
            
            <div class="add-command-section">
                <h3 class="form-title"><i class="fas fa-plus-circle"></i> إضافة أمر جديد</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="newCommandPlatform">المنصة</label>
                        <select class="form-control" id="newCommandPlatform">
                            <option value="pc">PC</option>
                            <option value="xbox">Xbox</option>
                            <option value="playstation">PlayStation</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="newCommandText">الأمر</label>
                        <input type="text" class="form-control" id="newCommandText" placeholder="أدخل الأمر...">
                    </div>
                    
                    <div class="form-group" style="grid-column: span 2;">
                        <label for="newCommandDesc">الشرح</label>
                        <textarea class="form-control" id="newCommandDesc" placeholder="أدخل شرحاً مفصلاً للأمر..."></textarea>
                    </div>
                    
                    <button class="submit-btn" id="addCommandBtn">
                        <i class="fas fa-save"></i> حفظ الأمر الجديد
                    </button>
                </div>
            </div>
        </div>
    `;
}

function initAdminTool() {
    // هنا ستضيف دمج Firebase لتحميل البيانات
    loadCommands();
    
    // تعريف الأحداث
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });
    
    document.getElementById('platformSelect').addEventListener('change', filterCommands);
    document.getElementById('addCommandBtn').addEventListener('click', addNewCommand);
}

function loadCommands() {
    // هذه الدالة ستستبدلها باتصال Firebase
    adminCommandsData = {
        pc: [
            {id: 1, command: "cheat god", description: "تفعيل وضع الإله", votes: 15, date: "2023-05-10", platform: "pc"}
        ],
        xbox: [],
        playstation: []
    };
    filterCommands();
}

// باقي دوال أداة الأدمن كما هي في الكود السابق
