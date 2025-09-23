import { createSlice } from '@reduxjs/toolkit';
import { TRAVEL_TYPE } from 'src/utils/constants';

export interface ITravel {
  isLoading: boolean;
  error: Error | string | null;
  status: string;
  message: string;
  travelType: string;
}

const initialState: ITravel = {
  isLoading: false,
  error: null,
  status: '',
  message: '',
  travelType: TRAVEL_TYPE.train,
};

const slice = createSlice({
  name: 'travel',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    changeTravelType(state, action) {
      state.travelType = action.payload;
    },
  },
});

export default slice.reducer;

export const { changeTravelType } = slice.actions;
