/*
 * Spine Exchange - js/script.js
 * Optimized dynamic logic for Marketplace & Resources.
 * Mobile-first workflow from Udaipur.
 */

// --- 0. PWA SERVICE WORKER REGISTRATION ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./serviceWorker.js')
            .then(reg => console.log('Spine Exchange SW Registered', reg))
            .catch(err => console.error('SW Registration Failed', err));
    });
}


// --- 1. RESOURCE HUB DATABASE ---
// (Your Google Drive folder links are preserved here)
const filesDatabase = [
    {
        course: "llb", year: "1", subject: "contract", type: "Study Material Folder", 
        title: "Paper 1: Contract Law", description: "Access all notes, past papers, and resources for Contract Law.", 
        link: "https://drive.google.com/drive/folders/1zy6GZA6Y3oHaxQVmYGFrrFYvU53ulQiJ", icon: "folder"
    },
    {
        course: "llb", year: "1", subject: "torts", type: "Study Material Folder", 
        title: "Paper 2: Law of Torts", description: "Access all notes, past papers, and resources for Law of Torts.", 
        link: "https://drive.google.com/drive/folders/1hmqvsScePYycdeoVvCAMwahfPO7ou3R5", icon: "folder"
    },
    {
        course: "llb", year: "1", subject: "hindu", type: "Study Material Folder", 
        title: "Paper 3: Family Law I (Hindu Law)", description: "Access all notes, past papers, and resources for Hindu Law.", 
        link: "https://drive.google.com/drive/folders/1X41NLws_G1XeVH11E5xCCdF3yulREhBT", icon: "folder"
    },
    {
        course: "llb", year: "1", subject: "muslim", type: "Study Material Folder", 
        title: "Paper 4: Family Law II (Muslim Law)", description: "Access all notes, past papers, and resources for Muslim Law.", 
        link: "https://drive.google.com/drive/folders/1aA-1VidtMF-64DD2gebxf6klAe55m2Xj", icon: "folder"
    },
    {
        course: "llb", year: "1", subject: "constitution", type: "Study Material Folder", 
        title: "Paper 5: Constitutional Law", description: "Access all notes, past papers, and resources for Constitutional Law.", 
        link: "https://drive.google.com/drive/folders/1Fca1DNK8Yq2TkG7mOh3cP4tyRjsS0WCg", icon: "folder"
    },
    {
        course: "llb", year: "1", subject: "environment", type: "Study Material Folder", 
        title: "Paper 7: Environmental Law", description: "Access all notes, past papers, and resources for Environmental Law.", 
        link: "https://drive.google.com/drive/folders/1hbtI0xzGDo51ecqyR5AyAN-2K6YJKSCm", icon: "folder"
    },
    {
        course: "llb", year: "1", subject: "interpretation", type: "Study Material Folder", 
        title: "Paper 9: Interpretation of Statutes", description: "Access all notes, past papers, and resources for Interpretation of Statutes.", 
        link: "https://drive.google.com/drive/folders/1Mptc98c3YLu1eC6TN0zb8vUKDXe61bFF", icon: "folder"
    },
    {
        course: "llb", year: "1", subject: "language", type: "Study Material Folder", 
        title: "Paper 10: Legal Language & General English", description: "Access all notes, past papers, and resources for Legal Language.", 
        link: "https://drive.google.com/drive/folders/1U4olrQWqI2yiphbtWYF-sYSF6Ty9eAe9", icon: "folder"
    },
    {
        course: "llb", year: "1", subject: "hindi", type: "Study Material Folder", 
        title: "Paper 11: General Hindi", description: "Access all notes, past papers, and resources for General Hindi.", 
        link: "https://drive.google.com/drive/folders/11B9Kx7GyNxqgiL4PEwCVQ8XiLtv5xbp1", icon: "folder"
    },
    {
        course: "llb", year: "1", subject: "ethics", type: "Study Material Folder", 
        title: "Professional Ethics", description: "Access all notes, past papers, and resources for Professional Ethics.", 
        link: "https://drive.google.com/drive/folders/1kW0bMLmojiwksLp_NweCx6UpbDjWU2jT", icon: "folder"
    }
];

// --- 2. DROPDOWN CONFIGURATION DATA ---
const curriculumData = {
    "llb": {
        "1": [
            { id: "all", name: "-- All 1st Year Subjects --" },
            { id: "contract", name: "Paper 1: Contract Law" },
            { id: "torts", name: "Paper 2: Law of Torts" },
            { id: "hindu", name: "Paper 3: Family Law I (Hindu Law)" },
            { id: "muslim", name: "Paper 4: Family Law II (Muslim Law)" },
            { id: "constitution", name: "Paper 5: Constitutional Law" },
            { id: "jurisprudence", name: "Paper 6: Jurisprudence" },
            { id: "environment", name: "Paper 7: Environmental Law" },
            { id: "crimes", name: "Paper 8: Law of Crimes (IPC)" },
            { id: "interpretation", name: "Paper 9: Interpretation of Statutes" },
            { id: "language", name: "Paper 10: Legal Language & General English" },
            { id: "hindi", name: "Paper 11: General Hindi" },
            { id: "ethics", name: "Professional Ethics" }
        ],
        "2": [{ id: "all", name: "-- All 2nd Year Subjects --" }],
        "3": [{ id: "all", name: "-- All 3rd Year Subjects --" }]
    },
    "ballb": {
        "1": [{ id: "all", name: "-- All Semester 1 Subjects --" }],
        "2": [{ id: "all", name: "-- All Semester 2 Subjects --" }]
    }
};

// --- 3. UI GENERATION & FILTER LOGIC ---

// Optimized: Populations of Year/Semester Dropdown
function updateYears() {
    const course = document.getElementById("courseSelect").value;
    const yearSelect = document.getElementById("yearSelect");
    const subjectSelect = document.getElementById("subjectSelect");

    // Clear downstream dropdowns
    yearSelect.innerHTML = '<option value="">--Select Year/Semester--</option>';
    subjectSelect.innerHTML = '<option value="">--Select Subject--</option>';
    subjectSelect.disabled = true;

    if (course) {
        yearSelect.disabled = false;
        
        // Configuration: LLB = Years, BA.LLB = Semesters
        const yearsCount = course === "llb" ? 3 : 10;
        const labelText = course === "llb" ? "Year" : "Semester";
        
        // High-Performance: Use DocumentFragment for single DOM insertion
        const fragment = document.createDocumentFragment();
        
        for (let i = 1; i <= yearsCount; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${labelText} ${i}`;
            fragment.appendChild(option);
        }
        
        yearSelect.appendChild(fragment);
    } else {
        yearSelect.disabled = true;
    }
}

// Optimized: Population of Subjects Dropdown
function updateSubjects() {
    const course = document.getElementById("courseSelect").value;
    const year = document.getElementById("yearSelect").value;
    const subjectSelect = document.getElementById("subjectSelect");

    // Clear subject dropdown
    subjectSelect.innerHTML = '<option value="">--Select Subject--</option>';

    if (course && year && curriculumData[course] && curriculumData[course][year]) {
        subjectSelect.disabled = false;
        
        const fragment = document.createDocumentFragment();
        
        curriculumData[course][year].forEach(sub => {
            const option = document.createElement('option');
            option.value = sub.id;
            option.textContent = sub.name;
            fragment.appendChild(option);
        });
        
        subjectSelect.appendChild(fragment);
    } else {
        subjectSelect.disabled = true;
    }
}

// Optimized & Styled: Search and Render MLSU Resources
function searchDatabase() {
    const courseSelect = document.getElementById("courseSelect");
    const yearSelect = document.getElementById("yearSelect");
    const subjectSelect = document.getElementById("subjectSelect");
    const resultsContainer = document.getElementById("results-container");

    const course = courseSelect.value;
    const year = yearSelect.value;
    const subject = subjectSelect.value;

    // Clear previous results immediately
    resultsContainer.innerHTML = "";

    // Error Handling: Not all parameters selected
    if (!course || !year || !subject) {
        // High-Performance styled placeholder for error
        const placeholder = document.createElement('div');
        placeholder.className = 'book-grid-placeholder';
        placeholder.innerHTML = `
            <span class="material-icons-round">manage_search</span>
            <p>Please select <strong>Course, Year, and Subject</strong> to view materials.</p>
        `;
        resultsContainer.appendChild(placeholder);
        return;
    }

    // High-Performance Filtering of the database array
    const results = filesDatabase.filter(file => 
        file.course === course && 
        file.year === year && 
        (file.subject === subject || subject === "all")
    );

    // Error Handling: No results found
    if (results.length === 0) {
        const placeholder = document.createElement('div');
        placeholder.className = 'book-grid-placeholder';
        placeholder.style.borderColor = 'var(--brand-danger)'; // Red border for 'not found'
        placeholder.innerHTML = `
            <span class="material-icons-round" style="color:var(--brand-danger)">sentiment_very_dissatisfied</span>
            <p style="color:var(--brand-danger)">No materials found for this selection yet.</p>
            <p>We need your help! Be the first to <a href="#" style="color:var(--brand-primary); font-weight:600; text-decoration:underline;">contribute notes</a> or old papers!</p>
        `;
        resultsContainer.appendChild(placeholder);
        return;
    }

    // High-Performance Rendering Loop using DocumentFragment & Styled Cards
    const fragment = document.createDocumentFragment();

    results.forEach(file => {
        // High-Impact Styled Card Template (Matches Spine Exchange design identity)
        const card = document.createElement('div');
        card.className = 'md-card animate-in';
        card.style.marginBottom = '16px';
        
        card.innerHTML = `
            <div class="bio-card" style="margin-bottom: 16px;">
                <div class="bio-avatar" style="background:var(--brand-primary-bg);">
                    <span class="material-icons-round" style="color:var(--brand-primary)">${file.icon}</span>
                </div>
                <div class="bio-info">
                    <h3 style="color:var(--brand-primary)">${file.title}</h3>
                    <p style="text-transform:uppercase; font-size:0.7rem; color:var(--brand-text-soft)">${file.type}</p>
                </div>
            </div>
            <p class="section-subhead" style="margin-left:0; margin-bottom: 20px;">${file.description}</p>
            <a href="${file.link}" class="lucrative-btn ripple" target="_blank" style="width:100%; animation:none; justify-content:center;">
                <span class="material-icons-round">folder_open</span> Open Google Drive Folder
            </a>
        `;
        
        fragment.appendChild(card);
    });

    // Single DOM insertion point for the aggregate results fragment
    resultsContainer.appendChild(fragment);
    
    // Smooth scroll results into view for mobile users
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
