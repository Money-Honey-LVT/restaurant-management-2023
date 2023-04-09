import { NavigateFunction } from 'react-router-dom';
import { AuthActionType, AuthThunkAction, LoginValues } from './auth.types';
import { AppDispatch } from '../../redux/store';
import { API_URLS } from '../../config/constants/api';
import { errorHandler, useCallApi } from '../../utils/api';
import { data } from '../../components/Home/Home';
import ROUTER from '../../config/router';
import consts from '../../config/constants';
import { notiType, renderNotification } from '../../utils/helpers';
import { Staff } from '../../types/models/staff';

const setUser = (data: any) => {
  localStorage.setItem('token', data.token);
};

const Login =
  (payload: LoginValues, navigate: NavigateFunction): AuthThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: AuthActionType.LOGIN_PENDING,
    });

    const api = API_URLS.AUTH.LOGIN();

    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      const data = response.data;
      dispatch({
        type: AuthActionType.LOGIN_SUCCESS,
        payload: data,
      });
      setUser(data);
      navigate(ROUTER.HOME.INDEX);
      renderNotification('Thông báo', 'Đăng nhập thành công', notiType.SUCCESS);
      dispatch({
        type: AuthActionType.LOGIN_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: AuthActionType.LOGIN_FAILURE,
      });
      errorHandler(error);
    }
  };

const signUp =
  (payload: Partial<Staff>): AuthThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: AuthActionType.SIGNUP_PENDING });

    const api = API_URLS.AUTH.signup();
    const { response, error } = await useCallApi({ ...api, payload });

    if (!error && response?.status === 200) {
      const data = response.data;
      dispatch({
        type: AuthActionType.SIGNUP_SUCCESS,
        payload: data,
      });
      renderNotification('Thông báo', 'Đăng nhập thành công', notiType.SUCCESS);
    } else {
      dispatch({
        type: AuthActionType.SIGNUP_FAILURE,
      });
      errorHandler(error);
    }
  };

export const authActions = {
  Login,
  signUp,
};
