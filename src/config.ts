import { PATH_DASHBOARD } from './routes/paths';
import projectConfig from '../project-config.json';
// API
// ----------------------------------------------------------------------

// export const HOST_API_KEY = 'http://192.168.1.12:80/PSPKASaas/';
// export const HOST_API_KEY = 'https://PSPKAsaas.impsguru.com/';
export const HOST_API_KEY = process.env.HOST_API_KEY || '';
export const SECRET_KEY = process.env.ENCODING_KEY || 'dt3w3r7$#%RDCG';
export const PROJECT_TITLE = projectConfig?.project?.title || process.env.REACT_APP_PROJECT_TITLE;
export const COMPANY_ID = projectConfig?.project?.company_id || process.env.REACT_APP_COMPANY_ID;
export const PROJECT_DESCRIPTION =
  projectConfig?.project?.description || process.env.REACT_APP_PROJECT_DESCRIPTION;
export const HERO_DESCRIPTION =
  projectConfig?.project?.hero_description || process.env.REACT_APP_HERO_DESCRIPTION;
export const PROJECT_VERSION =
  projectConfig?.project?.version || process.env.REACT_APP_PROJECT_VERSION;

export const FIREBASE_API = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APPID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const COGNITO_API = {
  userPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.AWS_COGNITO_CLIENT_ID,
};

export const AUTH0_API = {
  clientId: process.env.AUTH0_CLIENT_ID,
  domain: process.env.AUTH0_DOMAIN,
};

export const MAPBOX_API = process.env.MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 72,
  H_DASHBOARD_DESKTOP_OFFSET: 72 - 12,
};
export const CARD = {
  RADIUS: 4,
  RADIUS_8: 8,
  RADIUS_10: 10,
  H_200: 200,
  H_400: 400,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 220,
  W_DASHBOARD_RIGHT: 300,
  W_DASHBOARD_MAIN: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};
