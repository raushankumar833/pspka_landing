import { UserCredential } from 'firebase/auth';

// ----------------------------------------------------------------------

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};
export type Location = {
  latitude: number | null;
  longitude: number | null;
};

export type AuthUserType = null | Record<string, any> | any;

export type AuthStateType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoggedOut?: boolean;
  user: AuthUserType;
  wallet: any;
  identifier?: string;
  role?: any;
  currentSession: string[];
};

// ----------------------------------------------------------------------

export type JWTContextType = {
  method: 'jwt';
  token?: string;
  user: AuthUserType;
  role?: any;
  wallet?: any;
  isLoggedIn: boolean;
  navList:any;
  saveLogin: (usertoken: any, expirationTime: any) => void;
  logout: () => void;
  saveUser: (data: any) => void;
  saveWallet: () => void;
  refreshToken?: () => Promise<any>;
  location: Location | null;
  setLocation: (location: Location) => void;
  saveNavAuth:(data:any) => void;
  // currentRemitter: any;  // Remitter for DMT transaction
  // setCurrentRemitter: (data: any)=> void;
}

export type FirebaseContextType = {
  method: 'firebase';
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle?: () => Promise<UserCredential>;
  loginWithGithub?: () => Promise<UserCredential>;
  loginWithTwitter?: () => Promise<UserCredential>;
};

export type AWSCognitoContextType = {
  method: 'cognito';
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  login: (email: string, password: string) => Promise<unknown>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<unknown>;
  logout: VoidFunction;
  loginWithGoogle?: () => void;
  loginWithGithub?: () => void;
  loginWithTwitter?: () => void;
};

export type Auth0ContextType = {
  method: 'auth0';
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUserType;
  // login: () => Promise<void>;
  logout: VoidFunction;
  // To avoid conflicts between types this is just a temporary declaration.
  // Remove below when you choose to authenticate with Auth0.
  login: (email?: string, password?: string) => Promise<void>;
  register?: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  loginWithGoogle?: () => void;
  loginWithGithub?: () => void;
  loginWithTwitter?: () => void;
};
