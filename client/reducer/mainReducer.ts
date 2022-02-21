import { ROOM_SUCCESS, successRoomsDispatch } from '../actions/mainActionTypes';

interface InitialState {
  success: boolean;
}

const intialState: InitialState = {
  success: false,
};
const roomReducer = (state = intialState, action: successRoomsDispatch) => {
  switch (action.type) {
    case ROOM_SUCCESS:
      return {
        ...state,
        success: false,
      };
  }
};
export default roomReducer;
