const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


document.getElementById('twelveDigitInput').addEventListener('input', function(e) {
  // Remove any non-digit characters
  this.value = this.value.replace(/\D/g, '');
  
  // Check if input is valid
  const validationIcon = document.getElementById('validationIcon');
  
  if (this.value.length === 12) {
      validationIcon.className = "validation-icon valid";
      this.setCustomValidity('');
  } else if (this.value.length > 0) {
      validationIcon.className = "validation-icon invalid";
      this.setCustomValidity(this.dataset.validate);
  } else {
      validationIcon.className = "validation-icon";
      this.setCustomValidity(this.dataset.validate);
  }
});

/*  password view js  */


function togglePassword() {
  const passwordField = document.getElementById('passwordField');
  const toggleIcon = document.getElementById('toggleIcon');
  
  if (passwordField.type === 'password') {
    passwordField.type = 'text';
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
  } else {
    passwordField.type = 'password';
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
  }
}
