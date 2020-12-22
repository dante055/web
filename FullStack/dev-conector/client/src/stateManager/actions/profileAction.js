import {
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from '../constants/action-types';
import { axiosInstance } from '../../utils/axios';
import handleErrors from '../../utils/handleError';
import { setAlert } from './alertAction';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axiosInstance.get('/profiles/my', {
      withCredentials: true,
    });
    dispatch({ type: GET_PROFILE, payload: res.data.profile });
  } catch (error) {
    console.log(error);
    // const errMsg = handleErrors(error);
    // errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: PROFILE_ERROR });
  }
};

// create and edit profile
export const createProfile = (
  body,
  history,
  edit = false
) => async dispatch => {
  try {
    const res = await axiosInstance.post('/profiles/', body, {
      withCredentials: true,
    });
    dispatch({ type: GET_PROFILE, payload: res.data.profile });
    dispatch(
      setAlert(
        edit
          ? 'Profile successfully updated!'
          : 'Profile successfully created!',
        'success'
      )
    );

    if (!edit) {
      history.push('/dashboard');
      window.scrollTo(0, 0);
    }
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: PROFILE_ERROR });
  }
};

// add experience
export const addExperience = (body, history) => async dispatch => {
  try {
    const res = await axiosInstance.post('/profiles/experience', body, {
      withCredentials: true,
    });
    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
    dispatch(setAlert('Experience added successfully!', 'success'));

    history.push('/dashboard');
    window.scrollTo(0, 0);
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: PROFILE_ERROR });
  }
};

// add education
export const addEducation = (body, history) => async dispatch => {
  try {
    const res = await axiosInstance.post('/profiles/education', body, {
      withCredentials: true,
    });
    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
    dispatch(setAlert('Experience added successfully!', 'success'));

    history.push('/dashboard');
    window.scrollTo(0, 0);
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: PROFILE_ERROR });
  }
};

// delete Experience
export const deleteExperience = id => async dispatch => {
  try {
    const res = await axiosInstance.delete(`/profiles/experience/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
    dispatch(setAlert('Experience deleted successfully!', 'success'));

    window.scrollTo(0, 0);
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: PROFILE_ERROR });
  }
};

// delete Education
export const deleteEducation = id => async dispatch => {
  try {
    const res = await axiosInstance.delete(`/profiles/education/${id}`, {
      withCredentials: true,
    });
    console.log(res);
    dispatch({ type: UPDATE_PROFILE, payload: res.data.profile });
    dispatch(setAlert('Education deleted successfully!', 'success'));

    window.scrollTo(0, 0);
  } catch (error) {
    const errMsg = handleErrors(error);
    errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
    dispatch({ type: PROFILE_ERROR });
  }
};

// delete Account
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axiosInstance.delete('/users/me', { withCredentials: true });

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(
        setAlert('Your account has been permanently deleted'),
        'success'
      );
    } catch (error) {
      const errMsg = handleErrors(error);
      errMsg.forEach(msg => dispatch(setAlert(msg, 'danger')));
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  }
};
