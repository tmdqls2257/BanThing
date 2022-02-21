export const ROOM_SUCCESS = 'ROOM_SUCCESS';
export const ROOM_FAIL = 'ROOM_FAIL';

export type RoomsData = {
  id: number;
};
export type ChatData = {
  chatLog: [
    {
      id: number;
      rooms_id: number;
      nickname: string;
      chat: string;
      time: string;
    },
  ];
};
export interface successRoomDispatch {
  type: typeof ROOM_SUCCESS;
  payload: {
    data: RoomsData;
  };
}
export interface successChatDispatch {
  type: typeof ROOM_SUCCESS;
  payload: {
    data: ChatData;
  };
}

export interface failDispatch {
  type: typeof ROOM_FAIL;
}

export type successRoomsDispatch = successRoomDispatch | failDispatch;
export type successChatsDispatch = successChatDispatch | failDispatch;
