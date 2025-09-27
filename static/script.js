// Global variables
let completedReviews = 0;
const totalFaculty = 5;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const reviewButtons = document.querySelectorAll('.review-btn');
    const submitAllButton = document.getElementById('submitAllButton');
    const progressFill = document.getElementById('overallProgress');
    const completedCountElement = document.getElementById('completedCount');
    
    // Disable all review buttons except the first one
    reviewButtons.forEach((button, index) => {
        if (index !== 0) button.disabled = true;
    });
    
    // Load completed reviews from localStorage
    if (localStorage.getItem('completedReviews')) {
        completedReviews = parseInt(localStorage.getItem('completedReviews'));
        updateProgressBar();
    }
    
    reviewButtons.forEach((button, index) => {
        const facultyCard = button.closest('.faculty-card');
        const facultyId = parseInt(facultyCard.dataset.facultyId);

        if (localStorage.getItem(`faculty_${facultyId}_reviewed`) === 'true') {
            markReviewed(button);
        } else {
            button.addEventListener('click', function () {
                navigateToFeedbackPage(facultyId, index);
            });
        }
    });

    submitAllButton.addEventListener('click', function () {
        if (completedReviews === totalFaculty) {
            this.innerHTML = '<i class="fas fa-check"></i> All Feedback Submitted!';
            this.style.backgroundColor = '#4CAF50';
            showThankYouMessage();
            setTimeout(() => {
                localStorage.clear();
                resetUI();
            }, 2000);
        }
    });

    animateFacultyCards();
});

function navigateToFeedbackPage(facultyId, index) {
    localStorage.setItem('currentFacultyId', facultyId);
    localStorage.setItem('currentFacultyIndex', index);
    window.location.href = 'forms';
}

function handleFormCompletion() {
    const facultyId = parseInt(localStorage.getItem('currentFacultyId'));
    const facultyIndex = parseInt(localStorage.getItem('currentFacultyIndex'));
    
    localStorage.setItem(`faculty_${facultyId}_reviewed`, 'true');
    completedReviews++;
    localStorage.setItem('completedReviews', completedReviews);
    
    updateProgressBar();
    disableReviewedButton(facultyIndex);
}

function disableReviewedButton(index) {
    const reviewButtons = document.querySelectorAll('.review-btn');
    markReviewed(reviewButtons[index]);
    if (index + 1 < reviewButtons.length) {
        reviewButtons[index + 1].disabled = false;
    }
}

function markReviewed(button) {
    button.textContent = 'Reviewed ✓';
    button.classList.add('reviewed');
    button.style.backgroundColor = '#4CAF50';
    button.disabled = true;
}

function updateProgressBar() {
    const progressPercentage = (completedReviews / totalFaculty) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    completedCountElement.textContent = completedReviews;
    const submitAllButton = document.getElementById('submitAllButton');
    submitAllButton.disabled = completedReviews !== totalFaculty;
}

function showThankYouMessage() {
    const overlay = document.createElement('div');
    overlay.className = 'thank-you-overlay';
    overlay.innerHTML = `
        <div class="thank-you-modal">
            <h2>Thank You!</h2>
            <p>Your feedback has been successfully submitted.</p>
            <div class="checkmark-container">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => document.body.removeChild(overlay), 3000);
}

function animateFacultyCards() {
    document.querySelectorAll('.faculty-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}
