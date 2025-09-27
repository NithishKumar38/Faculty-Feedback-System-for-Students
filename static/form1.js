document.addEventListener('DOMContentLoaded', function() {


    // Initialize progress tracking
    updateProgress();
    const urlParams = new URLSearchParams(window.location.search);
    const facultyId = urlParams.get('facultyId');
    if (facultyId) {
        // You can use this to populate faculty information
        updateFacultyInfo(facultyId);
    }
    // Track form progress as user fills out questions
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            updateProgress();
            highlightRow(this);
        });
    });
    
    // Highlight table row when selected
    function highlightRow(radioButton) {
        // Remove highlight from all rows
        document.querySelectorAll('tbody tr').forEach(row => {
            row.classList.remove('highlighted-row');
            row.style.backgroundColor = '';
        });
        
        // Add highlight to selected row
        const row = radioButton.closest('tr');
        row.classList.add('highlighted-row');
        
        // Highlight color based on rating
        const rating = parseInt(radioButton.value);
        let color;
        
        switch (rating) {
            case 5:
                color = 'rgba(46, 204, 113, 0.2)'; // Light green for Excellent
                break;
            case 4:
                color = 'rgba(52, 152, 219, 0.2)'; // Light blue for Very Good
                break;
            case 3:
                color = 'rgba(241, 196, 15, 0.2)'; // Light yellow for Good
                break;
            case 2:
                color = 'rgba(230, 126, 34, 0.2)'; // Light orange for Satisfactory
                break;
            case 1:
                color = 'rgba(231, 76, 60, 0.2)'; // Light red for Poor
                break;
            default:
                color = ''; // Default, no color
        }
        
        row.style.backgroundColor = color;
        
        // Add animation to show selection
        row.style.transition = 'background-color 0.3s ease';
    }
    
    // Update progress bar and text
    function updateProgress() {
        const totalQuestions = document.querySelectorAll('tbody tr').length;
        const answeredQuestions = document.querySelectorAll('input[type="radio"]:checked').length;
        const progressPercentage = (answeredQuestions / totalQuestions) * 100;
        
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill) {
            progressFill.style.width = `${progressPercentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${answeredQuestions}/${totalQuestions} Questions Answered`;
        }
    }
    
    // Initialize faculty information if available

});

function updateFacultyInfo(facultyId) {
    const facultyData = {
        1: {
            name: "Mrs. S. Anuba",
            department: "Course : Big Data Analytics",
            course: "Course-Code : CCS334",
            image: "/static/image/anuba.png"
        },
        2: {
            name: "Mrs. S.S. Jaya",
            department: "Course : Cloud Computing",
            course: "Course-Code : CCS335",
            image: "/static/image/jaya.png"
        },
        3: {
            name: "Ms. K.P. Mythili",
            department: "Course : Embedded Systems & IOT",
            course: "Course-Code : CC3691",
            image: "/static/image/mythili.png"
        },
        4: {
            name: "Ms. R. Thenmalar",
            department: "Course : Network Security",
            course: "Course-Code : CCS354",
            image: "/static/image/thenmalar.png"
        },
        5: {
            name: "Ms. G. Pavithra",
            department: "Course : Digital Marketing",
            course: "Course-Code : CCW332",
            image: "/static/image/pavithra.png"
        },
        6: {
            name: "Ms. P. Arunadevi",
            department: "Course : Object Oriented Software Engineering",
            course: "Course-Code : CCS356",
            image: "/static/image/arunadevi.png"
        }
    };

    const faculty = facultyData[facultyId];
    if (faculty) {
        document.querySelector('.faculty-name').textContent = faculty.name;
        document.querySelector('.faculty-department').textContent = faculty.department;
        document.querySelector('span').textContent = faculty.course;
        document.getElementById('facultyImage').src = faculty.image;
    }
}