import { createContext, useContext, useEffect, useState } from 'react';

const defaultValue: any = {};
const AepsContext = createContext(defaultValue);

export const AepsContextProvider = ({ children }: any) => {
  const [isTwoFa, setIsTwoFa] = useState(false);

useEffect(()=>{
  setIsTwoFa(false)
},[])

  return (
    <AepsContext.Provider
      value={{
        isTwoFa,
      }}
    >
      {children}
    </AepsContext.Provider>
  );
};

const useAepsContext = () => useContext(AepsContext);

export default useAepsContext;
