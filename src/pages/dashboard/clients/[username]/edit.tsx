import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { get } from 'src/utils/axiosController';
import { appContext } from 'src/context/appContext';
import { ClientInterface } from 'src/@types/clients';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { useSnackbar } from 'src/components/snackbar';
import { extractErrors } from 'src/utils/extractError';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import { useCallback, useContext, useEffect, useState } from 'react';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import ClientNewEditForm from 'src/sections/@dashboard/clients/ClientNewEditForm';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const { themeStretch } = useSettingsContext();
  const { setLoading } = useContext(appContext);
  const { enqueueSnackbar } = useSnackbar();
  const [logos, setLogos] = useState<ClientInterface>();
  const [currentUser, setCurrentUser] = useState<ClientInterface>();

  const {
    query: { username },
  } = useRouter();

  const getData = useCallback(() => {
    get(
      `${Apiendpoints.GETCLIENT}${username}`,
      '',
      setLoading,
      (res) => {
        setCurrentUser(res.data);
      },
      (err) => {
        enqueueSnackbar(extractErrors(err), { variant: 'error' });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const getLogos = useCallback(() => {
    get(
      `${Apiendpoints.LOGO_GET}${currentUser?.companyId}`,
      '',
      setLoading,
      (res) => {
        setLogos(res.data.data);
      },
      (err) => {
        enqueueSnackbar(extractErrors(err), { variant: 'error' });
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (username) getData();
    return () => {};
  }, [username, getData]);

  useEffect(() => {
    if (currentUser) getLogos();

    return () => {};
  }, [currentUser, getLogos]);

  return (
    <>
      <Head>
        <title> Client: Edit client | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Edit client"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Client',
              href: PATH_DASHBOARD.clients.root,
            },
            { name: currentUser?.username },
          ]}
        />

        <ClientNewEditForm
          isEdit
          currentUser={currentUser}
          logos={logos}
          getLogos={() => getLogos()}
          getData={() => getData()}
        />
      </Container>
    </>
  );
}
