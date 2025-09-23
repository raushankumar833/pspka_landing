// eslint-disable-next-line @typescript-eslint/no-var-requires
const projectConfig = require('./project-config.json');

/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
    
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint checks during build
  },
 distDir: 'build', 
  env: {
    // HOST
    HOST_API_KEY: 'https://p2pae.com/',
    REACT_APP_PROJECT_TITLE: projectConfig.project.title,
    REACT_APP_COMPANY_ID: projectConfig.project.company_id,
    REACT_APP_PROJECT_DESCRIPTION: projectConfig.project.description,
    REACT_APP_HERO_DESCRIPTION: projectConfig.project.hero_description,
    REACT_APP_PROJECT_VERSION: projectConfig.project.version,
    // MAPBOX
    MAPBOX_API: '',
    // FIREBASE
    FIREBASE_API_KEY: '',
    FIREBASE_AUTH_DOMAIN: '',
    FIREBASE_PROJECT_ID: '',
    FIREBASE_STORAGE_BUCKET: '',
    FIREBASE_MESSAGING_SENDER_ID: '',
    FIREBASE_APPID: '',
    FIREBASE_MEASUREMENT_ID: '',
    // AWS COGNITO
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0
    AUTH0_DOMAIN: '',
    AUTH0_CLIENT_ID: '',
  },
});