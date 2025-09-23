import Axios, { AxiosInstance, AxiosResponse } from 'axios'; //AxiosRequestConfig
import Swal from 'sweetalert2';
import { COMPANY_ID, HOST_API_KEY } from '../config';
import { checkNetwork } from './networkChecker';
import { apiErrorToast } from './toastFire';
import { decryptData } from './validation';
import useAxios, { configure } from 'axios-hooks';
import { PATH_AUTH } from 'src/routes/paths';
import { deleteCookie } from 'cookies-next';

export let myAxios: AxiosInstance;
let eToken: any;
interface Error {
  config: any;
  response: any;
}
export interface MyAxiosResponse extends AxiosResponse {
  results?: any;
  count?: any;
}
const deleteUser = () => {
  window.location.replace(PATH_AUTH.login); // Replace with your login page URL
  deleteCookie('paramA');
  deleteCookie('location');
  deleteCookie('kiop');
  deleteCookie('paramT');
  deleteCookie('defaultDateFormat');
  deleteCookie('user');
};
export const getAxios = (token: any | null = null): AxiosInstance => {
  // eToken = getCookie("token");
  eToken = decryptData('paramA');
  if (!token) {
    eToken = decryptData('paramA');
    token = eToken;
  }
  myAxios = Axios.create({
    baseURL: HOST_API_KEY,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token && token}`,
    },
  });
  // configure({ axios: axios, cache: cache });
  configure({ axios: myAxios });
  myAxios.interceptors.request.use(
    function (config: any) {
      if (config && config.headers) {
        config.headers['companyid'] = COMPANY_ID;
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    },
    function (error: Error) {
      // return Promise.reject(error);
    }
  );
  myAxios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error: Error) {
      if (Axios.isCancel(error)) {
        // Handle canceled request error
        // Perform any necessary actions or show a message to the user
        // Resolve the promise to handle the error
        // return Promise.resolve(error.response);
        // Create a new promise that resolves with a dummy response
        const dummyResponse = {
          data: null,
          status: 0,
          statusText: 'Canceled',
          headers: {},
          config: error.config,
        };
        return Promise.resolve(dummyResponse);
      } else if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized error
        // Redirect the user to the login page
        deleteUser();
        return Promise.reject(error);
      } else if (error.response && error.response.status === 503) {
        // Handle 503 maintenance
        // Redirect the user to the login page
        deleteUser();
        window.open('/maintenance');
        return Promise.reject(error);
      } else {
        // Handle other errors
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    }
  );
  return myAxios;
};

getAxios();

export const useAx = (endpoint: string) => useAxios(endpoint);

export const onInValidAuth = (error: any, next?: (error: any) => void): void => {
  if (error.response && error.response.status === 401) {
    Swal.fire('Unauthorized, you need to Relogin.');
    deleteUser();
  }
  if (next) {
    next(error);
  } else {
    apiErrorToast(error, '');
  }
};

export const postFormData = (
  endpoint: string,
  formData: FormData,
  setIsProgress?: (value: boolean) => void,
  onSuccess?: (data: MyAxiosResponse) => void,
  onError?: (error: any) => void
): void => {
  if (setIsProgress) setIsProgress(true);
  myAxios
    .post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${eToken}`,
      },
    })
    .then((response: MyAxiosResponse) => {
      const data = response;
      if (onSuccess) onSuccess(data);
      if (setIsProgress) setIsProgress(false);
    })
    .catch((error: any) => {
      if (setIsProgress) setIsProgress(false);
      onInValidAuth(error, onError);
    });
};

export const postFormDataQuery = (
  endpoint: string,
  formData: FormData,
  setIsProgress?: (value: boolean) => void,
  onSuccess?: (data: MyAxiosResponse) => void,
  onError?: (error: any) => void,
  query?: Record<string, string | number>
): void => {
  if (setIsProgress) setIsProgress(true);
  myAxios
    .post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${eToken}`,
      },
      params: query,
    })
    .then((response: MyAxiosResponse) => {
      const data = response;
      if (onSuccess) onSuccess(data);
      if (setIsProgress) setIsProgress(false);
    })
    .catch((error: any) => {
      if (setIsProgress) setIsProgress(false);
      onInValidAuth(error, onError);
    });
};

export const putFormData = (
  id: string,
  endpoint: string,
  formData: FormData,
  setIsProgress: (value: boolean) => void,
  onSuccess: (data: unknown) => void,
  onError: (error: any) => void
): void => {
  setIsProgress(true);
  myAxios
    .put(endpoint + '/' + id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${eToken}`,
      },
    })
    .then((response: MyAxiosResponse) => {
      const data = response.data;
      onSuccess(data);
      setIsProgress(false);
    })
    .catch((error: any) => {
      setIsProgress(false);
      onInValidAuth(error, onError);
    });
};

export const putJsonData = (
  endpoint: string,
  jsonData: unknown,
  pathParam: string | null,
  setIsProgress: (value: boolean) => void,
  onSuccess: (data: MyAxiosResponse) => void,
  onError: (error: any) => void
): void => {
  setIsProgress(true);
  myAxios
    .put(`${endpoint}${pathParam && pathParam + '/'}`, jsonData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${eToken}`,
      },
    })
    .then((response: MyAxiosResponse) => {
      setIsProgress(false);
      const data = response;
      onSuccess(data);
    })
    .catch((error: any) => {
      setIsProgress(false);
      onInValidAuth(error, onError);
    });
};

export const postJsonData = (
  endpoint: string,
  jsonData: unknown,
  setIsProgress?: (value: boolean | null | any) => void | null | any,
  onSuccess?: (data: MyAxiosResponse) => void,
  onError?: (error: any) => void
): Promise<boolean | void> | undefined => {
  if (setIsProgress) setIsProgress(true);
  if (!checkNetwork()) {
    if (setIsProgress) setIsProgress(false);
    Swal.fire('Check your network Connection!!!');
    return;
  }
  return myAxios
    .post(endpoint, jsonData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${eToken}`,
      },
    })
    .then((response: MyAxiosResponse) => {
      const data = response;
      onSuccess && onSuccess(data);
      if (setIsProgress) setIsProgress(false);
    })
    .catch((error: any) => {
      if (error && error.message === 'Network Error') {
        // history.pushState(history.state, "login", "/login");
        // location.reload();
      } else {
        if (setIsProgress) setIsProgress(false);
        onInValidAuth(error, onError);
      }
      if (setIsProgress) setIsProgress(false);
    });
};

export const postJsonDataQuery = (
  endpoint: string,
  jsonData: unknown,
  setIsProgress?: (value: boolean) => void,
  onSuccess?: (data: MyAxiosResponse) => void,
  onError?: (error: any) => void,
  query?: Record<string, string | number>
): Promise<boolean | void> | undefined => {
  if (setIsProgress) setIsProgress(true);
  if (!checkNetwork()) {
    if (setIsProgress) setIsProgress(false);
    Swal.fire('Check your network Connection!!!');
    return;
  }
  return myAxios
    .post(endpoint, jsonData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${eToken}`,
      },
      params: query,
    })
    .then((response: MyAxiosResponse) => {
      const data = response;
      onSuccess && onSuccess(data);
      if (setIsProgress) setIsProgress(false);
    })
    .catch((error: any) => {
      if (error && error.message === 'Network Error') {
        // history.pushState(history.state, "login", "/login");
        // location.reload();
      } else {
        if (setIsProgress) setIsProgress(false);
        onInValidAuth(error, onError);
      }
      if (setIsProgress) setIsProgress(false);
    });
};

export const deleteJsonData = (
  endpoint: string,
  jsonData: unknown,
  queryString: string | null,
  setIsProgress: (value: boolean) => void,
  onSuccess: (data: MyAxiosResponse) => void,
  onError: (error: any) => void
): void => {
  if (setIsProgress) setIsProgress(true);
  if (!checkNetwork()) {
    if (setIsProgress) setIsProgress(false);
    Swal.fire('Check your network Connection!!!');
    return;
  }
  myAxios
    .delete(`${endpoint}${queryString}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${eToken}`,
      },
    })
    .then((response: MyAxiosResponse) => {
      const data = response;
      onSuccess(data);
      if (setIsProgress) setIsProgress(false);
    })
    .catch((error: any) => {
      if (setIsProgress) setIsProgress(false);
      onInValidAuth(error, onError);
    });
};

export const getRequest = (
  endpoint: string,
  setIsProgress: (value: boolean) => void,
  onSuccess: (data: MyAxiosResponse) => void,
  onError: (error: any) => void
): void => {
  if (setIsProgress) setIsProgress(true);
  if (!checkNetwork()) {
    if (setIsProgress) setIsProgress(false);
    Swal.fire('Check your network Connection!!!');
    return;
  }
  myAxios
    .get(endpoint, {
      headers: {
        Authorization: `Bearer ${eToken}`,
      },
    })
    .then((response: MyAxiosResponse) => {
      const data = response;
      onSuccess(data);
      if (setIsProgress) setIsProgress(false);
    })
    .catch((error: any) => {
      if (setIsProgress) setIsProgress(false);
      onInValidAuth(error, onError);
    });
};

export const get = (
  endpoint: any,
  queryString: string | null,
  setIsProgress?: (value: boolean | null | any) => void | null | any,
  onSuccess?: (data: MyAxiosResponse) => void,
  onError?: (error: any) => void
): void => {
  if (setIsProgress) setIsProgress(true);
  // if (!checkNetwork()) {
  //   if (setIsProgress) setIsProgress(false);
  //   Swal.fire('Check your network Connection!!!');
  //   return;
  // }
  myAxios
    .get(`${endpoint}${queryString && `?${queryString}`}`, {
      headers: {
        Authorization: `Bearer ${eToken}`,
      },
    })
    .then((response: MyAxiosResponse) => {
      const data = response?.data;
      onSuccess && onSuccess(data);
      if (setIsProgress) setIsProgress(false);
    })
    .catch((error: any) => {
      if (error && error.message === 'Network Error') {
        // history.pushState(history.state, "login", "/login");
        // location.reload();
      } else {
        if (setIsProgress) setIsProgress(false);
        onInValidAuth(error, onError);
      }
      if (setIsProgress) setIsProgress(false);
    });
};

export const patchJsonData = (
  endpoint: string,
  jsonData: unknown,
  pathParam: string | null,
  setIsProgress: (value: boolean) => void,
  onSuccess: (data: MyAxiosResponse) => void,
  onError: (error: any) => void
): void => {
  setIsProgress(true);
  myAxios
    .patch(`${endpoint}${pathParam && pathParam + '/'}`, jsonData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${eToken}`,
      },
    })
    .then((response: MyAxiosResponse) => {
      setIsProgress(false);
      const data = response;
      onSuccess(data);
    })
    .catch((error: any) => {
      setIsProgress(false);
      onInValidAuth(error, onError);
    });
};

export const noAuthApi = async (
  endpoint: string,
  jsonData: unknown,
  setIsProgress: (value: boolean | unknown) => void,
  onSuccess: (data: MyAxiosResponse) => void,
  onError: (error: any) => void
) => {
  if (setIsProgress) setIsProgress(true);
  await myAxios
    .post(endpoint, jsonData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `null`,
      },
    })
    .then((response) => {
      const data: AxiosResponse<any> = response;
      onSuccess(data);
      if (setIsProgress) setIsProgress(false);
    })
    .catch((error) => {
      onError(error)
      onInValidAuth(error, onError);
      if (setIsProgress) setIsProgress(false);
    });
};
