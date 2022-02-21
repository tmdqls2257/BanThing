import axios from 'axios';
import { Dispatch } from 'redux';
import {
  ROOM_SUCCESS,
  ROOM_FAIL,
  successRoomsDispatch,
  successChatsDispatch,
} from './mainActionTypes';
export const fetchRoom =
  (id: number) => async (dispatch: Dispatch<successRoomsDispatch>) => {
    try {
      const res = await axios.get(`http://localhost:80/main`);
      const data = res.data;
      dispatch({
        type: ROOM_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ROOM_FAIL,
      });
    }
  };
export const fetchchat =
  (id: number) => async (dispatch: Dispatch<successChatsDispatch>) => {
    try {
      const res = await axios.get(`http://localhost:80/rooms/chat/${id}`);
      const data = res.data;
      dispatch({
        type: ROOM_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: ROOM_FAIL,
      });
    }
  };
