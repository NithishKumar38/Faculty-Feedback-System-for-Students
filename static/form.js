document.addEventListener('DOMContentLoaded', function () {
    // Initialize progress tracking
    updateProgress();

    const radioInputs = document.querySelectorAll('input[type="radio"]');
    const reviewButton = document.querySelector(".review-btn");
    const submitButton = document.querySelector(".submit-btn");
    const totalQuestions = 20;

    radioInputs.forEach(input => {
        input.addEventListener('change', function () {
            updateProgress();
            highlightRow(this);
        });
    });

    function highlightRow(radioButton) {
        document.querySelectorAll('tbody tr').forEach(row => {
            row.classList.remove('highlighted-row');
            row.style.backgroundColor = '';
        });

        const row = radioButton.closest('tr');
        row.classList.add('highlighted-row');

        const rating = parseInt(radioButton.value);
        let color;

        switch (rating) {
            case 5: color = 'rgba(46, 204, 113, 0.2)'; break;
            case 4: color = 'rgba(52, 152, 219, 0.2)'; break;
            case 3: color = 'rgba(241, 196, 15, 0.2)'; break;
            case 2: color = 'rgba(230, 126, 34, 0.2)'; break;
            case 1: color = 'rgba(231, 76, 60, 0.2)'; break;
            default: color = '';
        }

        row.style.backgroundColor = color;
        row.style.transition = 'background-color 0.3s ease';
    }

    function updateProgress() {
        const answeredQuestions = document.querySelectorAll("input[type='radio']:checked").length;
        const progressPercentage = (answeredQuestions / totalQuestions) * 100;

        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');

        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }

        if (progressText) {
            progressText.textContent = `${answeredQuestions}/${totalQuestions} Questions Answered`;
        }

        if (answeredQuestions === totalQuestions) {
            reviewButton.disabled = false;
            reviewButton.style.backgroundColor = "green";
            reviewButton.textContent = "Review";
        } else {
            reviewButton.disabled = true;
            reviewButton.style.backgroundColor = "gray";
            reviewButton.textContent = "Review";
        }
    }

    reviewButton.addEventListener("click", function () {
        reviewButton.textContent = "Reviewed";
        reviewButton.disabled = true;
        reviewButton.style.backgroundColor = "gray";
        submitButton.disabled = false;
        submitButton.style.backgroundColor = "blue";
    });

    // Initialize buttons state
    reviewButton.disabled = true;
    reviewButton.style.backgroundColor = "gray";
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "red";
});
