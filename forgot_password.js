let generatedOTP;

function validateEmail() {
    const email = document.getElementById('email').value;
    if (email.length < 8 || !email.includes('@')) {
        document.getElementById('email_error').textContent = "Please enter a valid email address.";
        return false;
    } else {
        document.getElementById('email_error').textContent = "";
        return true;
    }
}

function sendOTP() {
    if (validateEmail()) {
        generatedOTP = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
        alert("Your OTP is: " + generatedOTP); // In a real application, send this OTP via email

        document.querySelector('.forgot_form').style.display = 'none';
        document.getElementById('otp_section').style.display = 'block';
    }
}

function validateOTP() {
    const otpInput = document.getElementById('otp_input').value;
    if (otpInput == generatedOTP) {
        document.getElementById('otp_error').textContent = "";
        document.getElementById('otp_section').style.display = 'none';
        document.getElementById('new_password_section').style.display = 'block';
    } else {
        document.getElementById('otp_error').textContent = "Invalid OTP. Please try again.";
    }
}

function resetPassword() {
    const newPassword = document.getElementById('new_password').value;
    if (newPassword.length >= 6) {
        document.getElementById('password_error').textContent = "";
        alert("Your password has been reset successfully!");
        window.location.href = "login.html"; // Redirect to login page
    } else {
        document.getElementById('password_error').textContent = "Password must be at least 6 characters long.";
    }
}