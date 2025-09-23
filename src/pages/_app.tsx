// i18n
import '../locales/i18n';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// rsuite
import 'rsuite/dist/rsuite.min.css';

// ----------------------------------------------------------------------

import { CacheProvider, EmotionCache } from '@emotion/react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
// redux
import { Provider as ReduxProvider } from 'react-redux';
// @mui
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// redux
import { store } from '../redux/store';
// utils
import createEmotionCache from '../utils/createEmotionCache';
// theme
import ThemeProvider from '../theme';
// locales
import ThemeLocalization from '../locales';
// components
import { StyledChart } from '../components/chart';
import ProgressBar from '../components/progress-bar';
import SnackbarProvider from '../components/snackbar';
import { MotionLazyContainer } from '../components/animate';
import { ThemeSettings, SettingsProvider } from '../components/settings';

// Check our docs
// https://docs.minimals.cc/authentication/ts-version

import { AuthProvider } from '../auth/JwtContext';
import Loader from 'src/components/loading-screen/loader';
import { AppContextProvider } from 'src/context/appContext';
import 'src/css/style.scss';
import { DomainProvider } from 'src/components/domain-host-provider/DomainHostContext';
import ErrorBoundary from 'src/auth/ErrorBoundary';
import { AepsContextProvider } from 'src/context/aepsContext';
// import { AuthProvider } from '../auth/Auth0Context';
// import { AuthProvider } from '../auth/FirebaseContext';
// import { AuthProvider } from '../auth/AwsCognitoContext';

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ErrorBoundary>
        <AuthProvider>
          <AepsContextProvider>
            <AppContextProvider>
              <ReduxProvider store={store}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DomainProvider>
                    <SettingsProvider>
                      <MotionLazyContainer>
                        <ThemeProvider>
                          <ThemeSettings>
                            <ThemeLocalization>
                              <SnackbarProvider>
                                <Loader>
                                  <StyledChart />
                                  <ProgressBar />
                                  {getLayout(<Component {...pageProps} />)}
                                </Loader>
                              </SnackbarProvider>
                            </ThemeLocalization>
                          </ThemeSettings>
                        </ThemeProvider>
                      </MotionLazyContainer>
                    </SettingsProvider>
                  </DomainProvider>
                </LocalizationProvider>
              </ReduxProvider>
            </AppContextProvider>
          </AepsContextProvider>
        </AuthProvider>
      </ErrorBoundary>
    </CacheProvider>
  );
}
