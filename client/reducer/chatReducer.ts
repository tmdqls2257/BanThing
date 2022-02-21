import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface ChatState {
  id: number;
  rooms_id: number;
  nickname: string;
  chat: string;
  time: string;
}

const initialState: ChatState = {
  id: 1,
  rooms_id: 4,
  nickname: '돼지',
  chat: '안녕하세요',
  time: '2022-02-20T09:48:45.925Z',
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setLon: (state, action: PayloadAction<number>) => {
      state.rooms_id = action.payload;
    },
    setLat: (state, action: PayloadAction<string>) => {
      state.nickname = action.payload;
    },
    setRoomCategory: (state, action: PayloadAction<string>) => {
      state.chat = action.payload;
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
  },
});

export const { setTitle, setLon, setLat, setRoomCategory, setRoomId } =
  roomSlice.actions;
export const roomTitle = (state: RootState) => state.room.id;
export const roomLon = (state: RootState) => state.room.rooms_id;
export const roomLat = (state: RootState) => state.room.nickname;
export const roomCategory = (state: RootState) => state.room.chat;
export const roomId = (state: RootState) => state.room.time;

export default roomSlice.reducer;
