 
// State variables to track what is currently selected
let currentCourse = 'all';
let currentYear = 'all';
let currentType = 'all';

// Function called when a user clicks a filter button
function setFilter(category, value, buttonElement) {
    // 1. Update the correct state variable
    if (category === 'course') currentCourse = value;
    if (category === 'year') currentYear = value;
    if (category === 'type') currentType = value;

    // 2. Visually highlight the correct button
    let siblingButtons = buttonElement.parentElement.querySelectorAll('.filter-btn');
    siblingButtons.forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');

    // 3. Run the filtering logic
    applyFilters();
}

// Function to show/hide the cards based on selections
function applyFilters() {
    let allCards = document.querySelectorAll('.document-card');
    
    allCards.forEach(card => {
        let cardCourse = card.getAttribute('data-course');
        let cardYear = card.getAttribute('data-year');
        let cardType = card.getAttribute('data-type');
        
        // Check if the card matches the current filters
        let matchCourse = (currentCourse === 'all' || currentCourse === cardCourse);
        let matchYear = (currentYear === 'all' || currentYear === cardYear);
        let matchType = (currentType === 'all' || currentType === cardType);

        // If it matches all criteria, show it. Otherwise, hide it.
        if (matchCourse && matchYear && matchType) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}
