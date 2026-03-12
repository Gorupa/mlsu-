// --- 1. YOUR DATABASE ---
const filesDatabase = [
    {
        course: "llb",
        year: "1",
        subject: "language", // Matches the ID in the dropdown data below
        type: "Study Material Folder",
        title: "Paper 10: Legal Language & General English",
        description: "Complete study material folder including notes and resources for Legal Language.",
        link: "https://drive.google.com/drive/folders/1U4olrQWqI2yiphbtWYF-sYSF6Ty9eAe9",
        icon: "folder" // Material design icon name
    }
    // To add the next subject, just copy the block above, paste it here, and change the details!
];

// --- 2. DROPDOWN DATA ---
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
            { id: "hindi", name: "Paper 11: General Hindi" }
        ],
        "2": [{ id: "all", name: "-- All 2nd Year Subjects --" }],
        "3": [{ id: "all", name: "-- All 3rd Year Subjects --" }]
    },
    "ballb": {
        "1": [{ id: "all", name: "-- All Semester 1 Subjects --" }],
        "2": [{ id: "all", name: "-- All Semester 2 Subjects --" }]
    }
};

// --- 3. THE LOGIC ---
function updateYears() {
    const course = document.getElementById("courseSelect").value;
    const yearSelect = document.getElementById("yearSelect");
    const subjectSelect = document.getElementById("subjectSelect");

    yearSelect.innerHTML = '<option value="">--Select Year/Semester--</option>';
    subjectSelect.innerHTML = '<option value="">--Select Subject--</option>';
    subjectSelect.disabled = true;

    if (course) {
        yearSelect.disabled = false;
        const yearsCount = course === "llb" ? 3 : 10;
        const label = course === "llb" ? "Year" : "Semester";
        
        for (let i = 1; i <= yearsCount; i++) {
            yearSelect.innerHTML += `<option value="${i}">${label} ${i}</option>`;
        }
    } else {
        yearSelect.disabled = true;
    }
}

function updateSubjects() {
    const course = document.getElementById("courseSelect").value;
    const year = document.getElementById("yearSelect").value;
    const subjectSelect = document.getElementById("subjectSelect");

    subjectSelect.innerHTML = '<option value="">--Select Subject--</option>';

    if (course && year && curriculumData[course] && curriculumData[course][year]) {
        subjectSelect.disabled = false;
        curriculumData[course][year].forEach(sub => {
            subjectSelect.innerHTML += `<option value="${sub.id}">${sub.name}</option>`;
        });
    } else {
        subjectSelect.disabled = true;
    }
}

function searchDatabase() {
    const course = document.getElementById("courseSelect").value;
    const year = document.getElementById("yearSelect").value;
    const subject = document.getElementById("subjectSelect").value;
    const resultsContainer = document.getElementById("results-container");

    resultsContainer.innerHTML = "";

    if (!course || !year || !subject) {
        resultsContainer.innerHTML = `<div style="text-align:center; padding: 20px; color: #5f6368;">Please select Course, Year, and Subject to view materials.</div>`;
        return;
    }

    const results = filesDatabase.filter(file => 
        file.course === course && 
        file.year === year && 
        (file.subject === subject || subject === "all")
    );

    if (results.length === 0) {
        resultsContainer.innerHTML = `<div style="text-align:center; padding: 20px; color: #5f6368;">No materials found for this selection yet. Be the first to contribute!</div>`;
        return;
    }

    results.forEach(file => {
        const cardHTML = `
            <div class="md-card animate-in" style="margin-bottom: 16px;">
                <div class="card-header">
                    <div class="card-icon-wrapper"><span class="material-icons-round">${file.icon}</span></div>
                    <div>
                        <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 4px; color: var(--md-on-surface);">${file.title}</h3>
                        <p style="font-size: 0.875rem; color: #5f6368;">${file.type}</p>
                    </div>
                </div>
                <p class="card-description">${file.description}</p>
                <a href="${file.link}" class="download-btn ripple" target="_blank" style="background: var(--md-primary); color: white;">
                    <span class="material-icons-round">folder_open</span> Open Folder
                </a>
            </div>
        `;
        resultsContainer.innerHTML += cardHTML;
    });
}
