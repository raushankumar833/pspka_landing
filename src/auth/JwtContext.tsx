/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useReducer, useCallback, useState } from 'react';
import { ActionMapType, AuthStateType, AuthUserType, JWTContextType, Location } from './types2';
import { useRouter } from 'next/router';
import { deleteCookie, setCookie } from 'cookies-next';
import { decryptData, encryptData } from 'src/utils/validation';
import { myAxios } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
  SET_IDENTIFIER = 'SET_IDENTIFIER',
  SET_CURRENT_SESSION = 'SET_CURRENT_SESSION',
}

type Payload = {
  [Types.INITIAL]: {
    wallet: any;
    navList: any;
    isAuthenticated: boolean;
    user: AuthUserType;
    currentSession: string[];
  };
  [Types.LOGIN]: {
    wallet: any;
    navList: any;
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    wallet: any;
    navList: any;
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;
  [Types.SET_IDENTIFIER]: {
    identifier: string;
    role: string;
  };
  [Types.SET_CURRENT_SESSION]: {
    currentSession: string[];
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  isLoggedOut: false,
  user: null,
  identifier: '',
  currentSession: [],
  role: null,
  wallet: 0,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      ...state,
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
      wallet: action.payload.wallet,

      currentSession: action.payload.currentSession,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      isLoggedOut: false,
      user: action.payload.user,
      wallet: action.payload.wallet,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      isAuthenticated: true,
      isLoggedOut: false,
      user: action.payload.user,
      wallet: action.payload.wallet,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      isLoggedOut: true,
      user: null,
      wallet: null,
    };
  }
  if (action.type === Types.SET_IDENTIFIER) {
    return {
      ...state,
      identifier: action.payload.identifier,
      role: action.payload.role,
    };
  }
  if (action.type === Types.SET_CURRENT_SESSION) {
    return {
      ...state,
      currentSession: action.payload.currentSession,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: React.ReactNode;
};

let logoutTimer: any;

const calculateRemainingTime = (expirationTime: any) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = decryptData('paramA');
  const storedExpirationDate = decryptData('paramT');

  const remainingTime = calculateRemainingTime(storedExpirationDate);
  if (remainingTime <= 6000) {
    deleteCookie('paramA');
    deleteCookie('kiop');
    deleteCookie('paramT');
    return null;
  }
  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [state] = useReducer(reducer, initialState);
  // const [currentRemitter, setCurrentRemitter] = useState();
  const { push } = useRouter();
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData && tokenData.token;
  }
  const initialUser = decryptData('kiop');
  const initialWallet = decryptData('wallet');
  const initialNav = decryptData('nav');
  // console.log('initialNav', initialNav);

  const [token, setToken] = useState(initialToken);
  const [location, setLocation] = useState<Location | null>({ latitude: null, longitude: null });
  
  const [user, setUser] = useState(initialUser ? initialUser : '');
  const [wallet, setWallet] = useState(initialWallet ? initialWallet : '');
  const [navList, setNavList] = useState(initialNav ? initialNav : []);

  // const role = initialUser ? initialUser.role : '';
  const userIsLoggedIn = !!token && !!user;

  const userHandler = (user: any) => {
    const encrypted = encryptData(user);
    setCookie('kiop', encrypted);
    setUser(user);
  };
  const walletHandler = (wallet: any) => {
    const encrypted = encryptData(wallet);
    setCookie('wallet', encrypted);
    setWallet(wallet);
  };

  const navHandler = (nav: any) => {
    const encrypted = encryptData(nav);
    console.log('navin jwt', nav);

    setCookie('nav', encrypted);
    setNavList(nav);
  };
  const fetchWallet = async () => {
    try {
      const response = await myAxios.get(`${Apiendpoints.GET_WALLET}`);

      const data = response?.data?.data;
      walletHandler(data);
    } catch (error) {}
  };
  // const getServiceType = async () => {
  //   try {
  //     const response = await myAxios.get(
  //       `${Apiendpoints.GET_SERVICETYPE}?service=${SERVICE_TYPE.utility}`
  //     );
  //     setServiceSubTypeList(response.data.data);
  //   } catch (error) {}
  // };
  // const logoutSession=async ()=>{
  //   try {
  //     const response = await myAxios.get(
  //       `${Apiendpoints.LOGOUT}`
  //     )
  //   }
  // }


  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);



  const logOutHandler = useCallback(() => {
    // logout()
    setToken(null);
    setUser(null);
    setWallet(null);
    setLocation(null)
    setNavList([]);
    deleteCookie('paramA');
    deleteCookie('location');
    deleteCookie('kiop');
    deleteCookie('paramT');
    deleteCookie('defaultDateFormat');
    deleteCookie('user');
    deleteCookie('wallet');
    deleteCookie('nav');
    push('/auth/login');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const setDefaultDateFormat = (format = 'DD-MM-YYYY') => {
    setCookie('defaultDateFormat', format);
  };
  const loginHandler = (usertoken: any, expirationTime: any) => {
    const eToken = encryptData(usertoken);
    const eTime = encryptData(expirationTime);

    setCookie('paramA', eToken);
    setCookie('paramT', eTime);
    setToken(usertoken);
    setDefaultDateFormat();
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logOutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logOutHandler, tokenData.duration);
      
    }

    return () => {};
  }, [tokenData, logOutHandler]);

  const contextValue = {
    ...state,
    token: token,
    user: user,
    wallet: wallet,
    role: user?.role?.toLowerCase(),
    navList: navList,
    location:location,
    setUser: setUser,
    setLocation:setLocation, // Add this line
    isLoggedIn: userIsLoggedIn,
    saveLogin: loginHandler,
    logout: logOutHandler,
    saveUser: userHandler,
    saveWallet: fetchWallet,
    saveNavAuth: navHandler,
    };

  return (
    <AuthContext.Provider
    value={{
      ...state,
      method: 'jwt',
      ...contextValue,
    }}
  >
    {children}
  </AuthContext.Provider>  );
}
