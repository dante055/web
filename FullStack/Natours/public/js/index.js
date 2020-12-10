import '@babel/polyfill';
import { signup, login, logout } from './auth';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { showAlert } from './alert';

const mapbox = document.querySelector('#map');
const loginForm = document.querySelector('#login-form');
const signUpForm = document.querySelector('#signup-form');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.querySelector('#book-tour');

const cutomConfirmPassValidator = (confirmPassword, password) => {
  confirmPassword.addEventListener('input', function (event) {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity(
        "Password and confirm password don't match."
      );
    } else {
      confirmPassword.setCustomValidity('');
    }
  });
};

// DELEGATION

// ---------- map box ------------
if (mapbox) {
  const tourLocation = JSON.parse(mapbox.dataset.locations);
  displayMap(tourLocation);
}

// ---------- logn in ------------
if (loginForm) {
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');

  loginForm.addEventListener('submit', e => {
    e.preventDefault();

    login(email.value, password.value);
  });
}

// ----------- sign up -------------
if (signUpForm) {
  const fullName = document.querySelector('#fullName');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#password-confirm');

  cutomConfirmPassValidator(confirmPassword, password);

  signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    signup(fullName.value, email.value, password.value, confirmPassword.value);
  });
}

// ------------ log out ---------
if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

// ----------- udate user data (multipart form : to upload file) ---------
if (userDataForm) {
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const photo = document.querySelector('#photo');
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('photo', photo.files[0]);

    updateSettings(formData, 'data');
  });
}

// ---------- update user password --------------------
if (userPasswordForm) {
  const passSaveBtn = document.querySelector('#btn--save-password');
  const currentPassword = document.querySelector('#password-current');
  const newPassword = document.querySelector('#password');
  const newPasswordConfirm = document.querySelector('#password-confirm');

  cutomConfirmPassValidator(newPasswordConfirm, newPassword);

  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    passSaveBtn.disabled = true;
    passSaveBtn.textContent = 'Updating...';

    await updateSettings(
      {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
        newPasswordConfirm: newPasswordConfirm.value,
      },
      'password'
    );

    currentPassword.value = '';
    newPassword.value = '';
    newPasswordConfirm.value = '';
    passSaveBtn.textContent = 'Save password';
    passSaveBtn.disabled = false;
  });
}

// ------------- booking ------------
if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.disabled = true;
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
