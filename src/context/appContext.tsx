import axios from 'axios';
import { HOST_API_KEY } from 'src/config';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { useAuthContext } from 'src/auth/useAuthContext';
import { createContext, useCallback, useState } from 'react';

const defaultValue: any = {};

const appContext = createContext(defaultValue);

const AppContextProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUsername] = useState("")
  const [paginateDataCount, setPaginateDataCount] = useState();
  const { token, saveUser, logout, isLoggedIn } = useAuthContext();

  const [saasTheme, setSaaSTheme] = useState<any>({
    brandColor: '#2169d3',
    brandSecondaryColor: '#fff',
    titleColor: '#000',
  });

  // const MINUTE_MS = 90000;

  const refreshUser = useCallback(async () => {
    try {
      if (isLoggedIn) {
        const response = await axios.get(`${HOST_API_KEY}${Apiendpoints.GETUSER}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data.data;
        saveUser(data);
      }
    } catch (error) {
      logout();
    }
  }, [isLoggedIn, token, saveUser, logout]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (isLoggedIn) refreshUser();
  //   }, MINUTE_MS);

  //   return () => clearInterval(interval);
  // }, [isLoggedIn, refreshUser]);

  const contextvalue = {
    loading,
    saasTheme,
    setLoading,
    refreshUser,
    setSaaSTheme,
    paginateDataCount,
    setPaginateDataCount,
    userName,
    setUsername
  };

  return <appContext.Provider value={contextvalue}>{children}</appContext.Provider>;
};

export { appContext, AppContextProvider };
