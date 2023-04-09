import { API_URLS } from '../../config/constants/api';
import { AppDispatch } from '../../redux/store';
import { Callback } from '../../types/helpers/callback';
import { Staff } from '../../types/models/staff';
import { useCallApi } from '../../utils/api';
import { notiType, renderNotification } from '../../utils/helpers';
import { StaffActionType, StaffThunkAction } from './staff.types';

// const addStaff =
//   (payload: Partial<Staff>, cb?: Callback): StaffThunkAction =>
//   async (dispatch: AppDispatch) => {
//     dispatch({ type: StaffActionType.ADD_STAFF_PENDING });

//     const api = API_URLS.FOOD.addFood();

//     const { response, error } = await useCallApi({ ...api, payload });
//     console.log(response);
//     if (!error && response?.status === 200) {
//       dispatch({
//         type: FoodActionType.ADD_FOOD_SUCCESS,
//       });
//       renderNotification('Thông báo', 'Thêm thành công!', notiType.SUCCESS);
//       cb?.onSuccess?.();
//     } else {
//       dispatch({ type: FoodActionType.ADD_FOOD_FAILURE });
//       renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
//     }
//   };

const getAllStaffs =
  (cb?: Callback): StaffThunkAction =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: StaffActionType.GET_ALL_STAFFS_PENDING });

    const api = API_URLS.STAFF.getAllStaffs();

    const { response, error } = await useCallApi({ ...api });

    console.log(response);
    if (!error && response?.status === 200) {
      dispatch({
        type: StaffActionType.GET_ALL_STAFFS_SUCCESS,
        payload: response.data,
      });
      cb?.onSuccess?.(response.data);
    } else {
      dispatch({ type: StaffActionType.GET_ALL_STAFFS_FAILURE });
      renderNotification('Thông báo', error.response.data.devMsg, notiType.ERROR);
    }
  };

export const staffActions = { getAllStaffs };
