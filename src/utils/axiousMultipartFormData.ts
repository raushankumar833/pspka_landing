import axios from 'axios';
import { onInValidAuth } from './axiosController';
import { decryptData } from './validation';

const eToken = decryptData('paramA');

export const axiousMultipartFormData = async (
  url: string,
  data: any,
  setRequest: any,
  onSuccess: any,
  onError: any
) => {
  setRequest(true);
  try {
    const res = await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${eToken && eToken}`,
      },
    });
    if (res) {
      onSuccess(res);
      setRequest(false);
    }
  } catch (error) {
    onInValidAuth(error, onError);

    setRequest(false);
  }
};
