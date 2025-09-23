import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { myAxios } from 'src/utils/axiosController';
// import { MONEY_TRANSFER } from 'src/utils/constants';

export interface IRechargeBills {
  isLoading: boolean;
  error: Error | string | null;
  status: string;
  message: string;
  billers: any;
  plans: any;
  selectedBiller:
    | {
        name: string;
        code: string;
        img: string;
        color: string;
      }
    | any;
  billerDetails: any;
  moneyTransferType: string;
}

const initialState: IRechargeBills = {
  isLoading: false,
  error: null,
  status: '',
  message: '',
  billers: null,
  plans: null,
  selectedBiller: {
    name: '',
    code: '',
    img: '',
    color: '',
    
  },
  billerDetails: {},
  // moneyTransferType: MONEY_TRANSFER.dmt1,
  moneyTransferType: "",
};

const slice = createSlice({
  name: 'recharge_bills',
  initialState,
  reducers: {
    startLoading(state) {
      console.log('loading slice');
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    saveBillers(state, action) {
      state.isLoading = false;
      state.billers = action.payload;
    },
    saveBillerDetails(state, action) {
      state.isLoading = false;
      state.billerDetails = action.payload;
    },
    savePlans(state, action) {
      state.isLoading = false;
      state.plans = action.payload;
    },
    changeBiller(state, action) {
      state.isLoading = false;
      state.selectedBiller = action.payload;
    },
    clearSelectedBiller(state, action) {
      state.selectedBiller = action;
    },
    clearPlans(state, action) {
      state.plans = action;
    },
    changeTransferType(state, action) {
      state.moneyTransferType = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  changeBiller,
  clearSelectedBiller,
  changeTransferType,
  clearPlans,
  startLoading,
  hasError,
} = slice.actions;

export function getBillerDetails({ code }: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await myAxios.get(`${Apiendpoints.BILLER_DETAILS}?code=${code}`);
      // console.log('res=>', response);
      // this was old
      // dispatch(slice.actions.saveBillerDetails(response.data.data.param));
      dispatch(slice.actions.saveBillerDetails(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getBillers({ servicesubtype }: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await myAxios.get(`${Apiendpoints.GET_BILLERS}?category=${servicesubtype}`);
      dispatch(slice.actions.saveBillers(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getPlans({ selectedBiller }: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await myAxios.get(`${Apiendpoints.GET_PLANS}?code=${selectedBiller.code}`);
      dispatch(slice.actions.savePlans(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
