import { axiosInstance } from './axios';
import { showAlert } from './alert';

export const signup = (fullname, email, password, confirmPassword) => {
  console.log(fullname, email, password, confirmPassword);
};

export const login = async (email, password) => {
  try {
    const res = await axiosInstance.post('/users/login', {
      email,
      password,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

// ---- overtire the cookie
export const logout = async () => {
  try {
    const res = await axiosInstance.get('/users/log-out');
    if (res.data.status === 'success') {
      // relod from server no the browse cache
      // location.reload(true);
      location.replace('/logout');
    }
  } catch (err) {
    showAlert('error', 'Error logging out. Try again!');
  }
};

/// ------ login -------------
/* (function () {
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3000/api/v1',
  });

  const login = async (email, password) => {
    console.log(email, password);

    try {
      const res = await axiosInstance.post('/users/login', {
        email,
        password,
      });
      console.log(res);

      if (res.data.status === 'success') {
        // showAlert('success', 'Logged in successfully!');
        alert('Logged in successfully!');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }

      //  const res = await axios({
      //   method: 'POST',
      //   url: 'http://127.0.0.1:3000/api/v1/users/login',
      //   data: {
      //     email,
      //     password,
      //   },
      // });

      //  const res = await axios.post(
      //   'http://127.0.0.1:3000/api/v1/users/login',
      //   {
      //     email,
      //     password,
      //   }
      // );

    } catch (err) {
      console.log(err.response.data);
      //   showAlert('error', err.response.data.message);
    }
  };

  document.querySelector('#login-form').addEventListener('submit', e => {
    e.preventDefault();
    console.log('isn');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    login(email.value, password.value);
  });
})();
 */

/// ----------- sign up --------------
/* (function () {
  const fullName = document.querySelector('#fullName');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const confirmPassword = document.querySelector('#confirmPassword');

  const signup = (fullname, email, password, confirmPassword) => {
    console.log(fullname, email, password, confirmPassword);
  };

  confirmPassword.addEventListener('input', function (event) {
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity(
        "Password and confirm password don't match."
      );
    } else {
      confirmPassword.setCustomValidity('');
    }
  });

  document.querySelector('#signup-form').addEventListener('submit', e => {
    e.preventDefault();

    signup(fullName.value, email.value, password.value, confirmPassword.value);
  });
})();
 */
