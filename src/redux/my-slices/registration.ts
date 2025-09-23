import { createSlice } from '@reduxjs/toolkit';
import { IRegistrationState } from 'src/@types/registration';
import { dispatch } from '../store';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { myAxios } from 'src/utils/axiosController';

const initialState: IRegistrationState = {
  isLoading: false,
  error: null,
  steps: [],
  status: '',
  message: '',
};

const slice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getStepsSuccess(state, action) {
      state.isLoading = false;
      state.steps = action.payload;
    },
  },
});

export default slice.reducer;

export const { getStepsSuccess } = slice.actions;

export function getRegistrationSteps() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await myAxios.get(Apiendpoints.GETCLIENT);
      dispatch(slice.actions.getStepsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
