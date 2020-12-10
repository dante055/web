import '@babel/polyfill';
import { signup, login, logout } from './auth';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';

const mapbox = document.querySelector('#map');
const loginForm = document.querySelector('#login-form');
const signUpForm = document.querySelector('#signup-form');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.querySelector('#book-tour');

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

if (signUpForm || userPasswordForm) {
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#password-confirm');

  confirmPassword.addEventListener('input', function (event) {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity(
        "Password and confirm password don't match."
      );
    } else {
      confirmPassword.setCustomValidity('');
    }
  });
}

// ----------- sign up -------------
if (signUpForm) {
  const fullName = document.querySelector('#fullName');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#password-confirm');

  confirmPassword.addEventListener('input', function (event) {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity(
        "Password and confirm password don't match."
      );
    } else {
      confirmPassword.setCustomValidity('');
    }
  });

  signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    signup(fullName.value, email.value, password.value, confirmPassword.value);
  });
}

// ------------ log out ---------
if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}

if (userDataForm) {
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const photo = document.querySelector('#photo');
  userDataForm.addEventListener('submit', e => {
    e.preventDefault();

    // multipart form data
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('photo', photo.files[0]);

    updateSettings(formData, 'data');

    // updateSettings({ name: name.value, email: email.value }, 'data');
  });
}

if (userPasswordForm) {
  const passSaveBtn = document.querySelector('#btn--save-password');
  const currentPassword = document.querySelector('#password-current');
  const newPassword = document.querySelector('#password');
  const newPasswordConfirm = document.querySelector('#password-confirm');

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

if (bookBtn) {
  bookBtn.addEventListener('click', e => {
    e.target.disabled = true;
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
    /* 
    // we are redirecting so we dont need this
    e.target.disabled = false;
    e.target.textContent = 'Book a Tour!'; 
    */
  });
}
