import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

export interface RoomState {
  title: string;
  location_latitude: number;
  location_longitude: number;
  category: string;
  room_Id: number;
  host_nickname: string;
  content: string;
  host_role: number;
  host_rating_score: number;
  host_rating_count: number;
}

const initialState: RoomState = {
  title: '',
  location_latitude: -1,
  location_longitude: -1,
  category: '',
  room_Id: 4,
  host_nickname: '김코딩',
  content: '원하시는 브랜드 먹겠습니다.',
  host_role: 1,
  host_rating_score: 10,
  host_rating_count: 1,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setLon: (state, action: PayloadAction<number>) => {
      state.location_latitude = action.payload;
    },
    setLat: (state, action: PayloadAction<number>) => {
      state.location_longitude = action.payload;
    },
    setRoomCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setRoomId: (state, action: PayloadAction<number>) => {
      state.room_Id = action.payload;
    },
    setHostNickname: (state, action: PayloadAction<string>) => {
      state.host_nickname = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    sethostRole: (state, action: PayloadAction<number>) => {
      state.host_role = action.payload;
    },
    setHostRatingScore: (state, action: PayloadAction<number>) => {
      state.host_rating_score = action.payload;
    },
    setHostRatingCount: (state, action: PayloadAction<number>) => {
      state.host_rating_count = action.payload;
    },
  },
});

export const {
  setTitle,
  setLon,
  setLat,
  setRoomCategory,
  setRoomId,
  setHostNickname,
  setContent,
  sethostRole,
  setHostRatingScore,
  setHostRatingCount,
} = roomSlice.actions;
export const roomTitle = (state: RootState) => state.room.title;
export const roomLon = (state: RootState) => state.room.location_longitude;
export const roomLat = (state: RootState) => state.room.location_latitude;
export const roomCategory = (state: RootState) => state.room.category;
export const roomId = (state: RootState) => state.room.room_Id;
export const roomHostNickname = (state: RootState) => state.room.host_nickname;
export const roomContent = (state: RootState) => state.room.host_role;
export const roomhostRole = (state: RootState) => state.room.host_role;
export const roomHostRatingScore = (state: RootState) =>
  state.room.host_rating_score;
export const roomHostRatingCount = (state: RootState) =>
  state.room.host_rating_count;

export default roomSlice.reducer;
