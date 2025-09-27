document.addEventListener('DOMContentLoaded', function() {

    // Add click handlers to all review buttons
    document.querySelectorAll('.review-btn').forEach(button => {
        button.addEventListener('click', function() {
            const facultyCard = this.closest('.faculty-card');
            const facultyId = facultyCard.dataset.facultyId;
            const facultyName = facultyCard.querySelector('h3').textContent;

            // Redirect to feedback form with faculty ID
            window.location.href = '/form1.html?facultyId=' + facultyId;

            // Store the faculty name in localStorage to track completion
            
            sessionStorage.setItem(facultyId, facultyName);
        });
    });

    // Check completed reviews and update UI
    updateReviewProgress();
});

function updateReviewProgress() {
    const facultyCards = document.querySelectorAll('.faculty-card');
    let completedCount = 0;

    facultyCards.forEach((card) => {
        const facultyName = card.querySelector('h3').textContent;
        const facultyId = card.dataset.facultyId; // Fixed incorrect `this`

        const hasCompleted = sessionStorage.getItem(facultyId) === facultyName;

        if (hasCompleted) {
            completedCount++;
            card.querySelector('.review-btn').textContent = 'Completed';
            card.querySelector('.review-btn').textCon = 'Completed';
            card.querySelector('.review-btn').disabled = true

        }
    });

    // Update progress bar
    const progressFill = document.getElementById('overallProgress');
    const progressPercentage = (completedCount / facultyCards.length) * 100;
    progressFill.style.width = `${progressPercentage}%`;

    // Update progress text
    document.getElementById('completedCount').textContent = completedCount;

    // Enable submit all button if all reviews are completed
    const submitAllButton = document.getElementById('submitAllButton');
    if (completedCount === facultyCards.length) {
        submitAllButton.disabled = false;

        // Instead of clearing all localStorage, remove only the faculty-related entries
        facultyCards.forEach((card) => {
            const facultyId = card.dataset.facultyId;
            localStorage.removeItem(facultyId);
        });
    }
}
