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
      location.replace('/logout');
    }
  } catch (err) {
    showAlert('error', 'Error logging out. Try again!');
  }
};
