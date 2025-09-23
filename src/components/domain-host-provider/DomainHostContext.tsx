import { useRouter } from 'next/router';
import {
  useMemo,
  useState,
  ReactNode,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';
//

// ----------------------------------------------------------------------
interface DomainHostContextProps {
  onDomainChange: () => void;
  onResetSetting: () => void;
  domainName: string;
}

const initialState: DomainHostContextProps = {
  onDomainChange: () => {},
  onResetSetting: () => {},
  domainName: '',
};

// ----------------------------------------------------------------------

export const DomainHostContext = createContext(initialState);

export const useDomainHostContext = () => {
  const context = useContext(DomainHostContext);

  if (!context) throw new Error('useDomainHostContext must be use inside DomainProvider');

  return context;
};

// ----------------------------------------------------------------------

type DomainProviderProps = {
  children: ReactNode;
};

export function DomainProvider({ children }: DomainProviderProps) {
  const [domainName, setDomainName] = useState('');
  const { asPath } = useRouter();

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const domainName = getCookie('domainName') || window.location.hostname;
  //     if (getCookie('domainName') === undefined) {
  //       setCookie('domainName', domainName);
  //     }

  //     setDomainName(domainName);
  //   }
  // }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const domainName = getCookie('domainName') || window.location.hostname;
      if (getCookie('domainName') === undefined) {
        setCookie('domainName', domainName);
      }

      setDomainName(domainName);
    }
    return () => {};
  }, [asPath]);

  const onDomainChange = useCallback(() => {
    setCookie('domainName', domainName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset
  const onResetSetting = useCallback(() => {
    setDomainName('');
    removeCookie('domainName');
  }, []);

  const value = useMemo(
    () => ({
      domainName,
      onDomainChange,
      onResetSetting,
    }),
    [domainName, onDomainChange, onResetSetting]
  );

  return <DomainHostContext.Provider value={value}>{children}</DomainHostContext.Provider>;
}

// ----------------------------------------------------------------------

function getCookie(name: string) {
  if (typeof document === 'undefined') {
    throw new Error(
      'getCookie() is not supported on the server. Fallback to a different value when rendering on the server.'
    );
  }

  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts[1].split(';').shift();
  }

  return undefined;
}

function setCookie(name: string, value: string, exdays = 3) {
  const date = new Date();
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

function removeCookie(name: string) {
  document.cookie = `${name}=;path=/;max-age=0`;
}
