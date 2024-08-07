document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.querySelector('form');

    const email = form.querySelector('[name="email"]');
    const name = form.querySelector('[name="full_name"]');
    const phone = form.querySelector('[name="phone"]');
    const address = form.querySelector('[name="address"]');
    const upload = form.querySelector('[name="documents"]');

    if (email) email.addEventListener('input', () => verifyField(email, 'email_error', 8));
    if (name) name.addEventListener('input', () => verifyField(name, 'name_error', 1));
    if (phone) phone.addEventListener('input', () => verifyField(phone, 'phone_error', 10));
    if (address) address.addEventListener('input', () => verifyField(address, 'address_error', 10));
    if (upload) upload.addEventListener('change', () => verifyUpload(upload, 'upload_error'));

    form.addEventListener('submit', (event) => {
        let valid = true;

        if (email && !validateEmail(email.value)) {
            showError(email, 'email_error', 'Please enter a valid email.');
            valid = false;
        }
        if (name && name.value.trim() === '') {
            showError(name, 'name_error', 'Full Name is required.');
            valid = false;
        }
        if (phone && phone.value.trim().length < 10) {
            showError(phone, 'phone_error', 'Phone number must be at least 10 digits.');
            valid = false;
        }
        if (address && address.value.trim().length < 10) {
            showError(address, 'address_error', 'Address must be at least 10 characters.');
            valid = false;
        }
        if (upload && upload.files.length === 0) {
            showError(upload, 'upload_error', 'Please select at least one file.');
            valid = false;
        }

        if (!valid) event.preventDefault();
    });
});

function verifyField(field, errorId, minLength) {
    if (field.value.length >= minLength) {
        field.style.border = "1px solid silver";
        document.getElementById(errorId).style.display = "none";
    } else {
        showError(field, errorId, `This field must be at least ${minLength} characters.`);
    }
}

function verifyUpload(field, errorId) {
    if (field.files.length > 0) {
        field.style.border = "1px solid silver";
        document.getElementById(errorId).style.display = "none";
    } else {
        showError(field, errorId, 'Please select at least one file.');
    }
}

function showError(field, errorId, message) {
    field.style.border = "1px solid red";
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = "block";
}

function validateEmail(email) {
    // Simple email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}