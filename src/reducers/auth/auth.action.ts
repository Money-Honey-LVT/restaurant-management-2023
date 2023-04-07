import { NavigateFunction } from 'react-router-dom';
import { AuthActionType, AuthThunkAction, LoginValues } from './auth.types';
import { AppDispatch } from '../../redux/store';
import { API_URLS } from '../../config/constants/api';
import { errorHandler, useCallApi } from '../../utils/api';
import { data } from '../../components/Home/Home';
import ROUTER from '../../config/router';
import consts from '../../config/constants';
import { notiType, renderNotification } from '../../utils/helpers';

const setUser = (data: any) => {
  localStorage.setItem('authUser', JSON.stringify(data.User));
  localStorage.setItem('token', data.Token);
  localStorage.setItem('isManager', data.User.role);
};

const Login =
  (payload: LoginValues, navigate: NavigateFunction): AuthThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({
      type: AuthActionType.LOGIN_PENDING,
    });

    const api = API_URLS.AUTH.LOGIN();

    const { response, error } = await useCallApi({ ...api, payload });
    console.log(response);
    if (!error && response?.status === 200) {
      const data = response.data;
      dispatch({
        type: AuthActionType.LOGIN_SUCCESS,
        payload: data,
      });
      setUser(data);
      navigate(ROUTER.HOME.INDEX);
      renderNotification('Thành công', 'Đăng nhập thành công', notiType.SUCCESS);
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

export const authActions = {
  Login,
};
