import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { myAxios } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';

export interface IBBPS {
  isLoading: boolean;
  error: Error | string | null;
  status: string;
  message: string;
  categories: any;
  selectedCategory: any;
  selectedBiller: any;
  bbpsbillers: any;
  bbpsbillerDetails: any;
}
const initialState: IBBPS = {
  isLoading: false,
  error: null,
  status: '',
  message: '',
  categories: null,
  selectedCategory: null,
  selectedBiller: null,
  bbpsbillers: null,
  bbpsbillerDetails: null,
};

const slice = createSlice({
  name: 'bbps',
  initialState,
  reducers: {
    startLoading(state) {
      // console.log('loading slice');
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    changeSelectedCategory(state, action) {
      state.isLoading = false;
      state.selectedCategory = action.payload;
    },
    changeSelectedBiller(state, action) {
      state.isLoading = false;
      state.selectedBiller = action.payload;
    },
    saveCategoriesList(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    },
    saveBillers(state, action) {
      state.isLoading = false;
      state.bbpsbillers = action.payload;
    },
    saveBbpsBillerDetails(state, action) {
      state.isLoading = false;
      state.bbpsbillerDetails = action.payload;
    },
  },
});
export default slice.reducer;

export const { changeSelectedCategory, changeSelectedBiller, saveBillers, saveBbpsBillerDetails } = slice.actions;

export function getBbpsCategories() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await myAxios.get(Apiendpoints.BBPS_CATEGORY);
      dispatch(slice.actions.saveCategoriesList(response.data.data.bbps));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getBbpsBillers({ category_key }: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await myAxios.get(
        `${Apiendpoints.BBPS_BILLERS}?category_key=${category_key}`
      );
      dispatch(slice.actions.saveBillers(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getBbpsBillerDetails({ biller_id }: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await myAxios.get(
        `${Apiendpoints.BBPS_BILLER_DETAILS}?biller_id=${biller_id}`
      );
      dispatch(slice.actions.saveBbpsBillerDetails(response.data.data.param));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
