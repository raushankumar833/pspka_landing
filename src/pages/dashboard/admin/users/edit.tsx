import Head from 'next/head';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { ClientInterface } from 'src/@types/clients';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import { useState } from 'react';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import ClientNewEditForm from 'src/sections/@dashboard/clients/ClientNewEditForm';

// ----------------------------------------------------------------------

UserEditPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const router = useRouter();
  let currentUser: ClientInterface = {
    tpin: '' // Initialize tpin to an empty string or a default value
  };


  if (router.query && typeof router.query.row === 'string') {
    try {
      currentUser = JSON.parse(router.query.row);
      if (!currentUser.tpin) {
        currentUser.tpin = ''; // Ensure tpin is included
      }
    } catch (error) {
      console.error("Error parsing currentUser:", error);
    }
  }

  // console.log("Current user in edit file ", currentUser)
  const { themeStretch } = useSettingsContext();
  const [logos, setLogos] = useState<ClientInterface>();
  console.log(setLogos);

  // const [currentUser, setCurrentUser] = useState<ClientInterface>();
  // console.log("currentUser in edit file ", currentUser)
  // const {
  //   query: { username },
  // } = useRouter();

  // const getData = useCallback(() => {
  //   get(
  //     `${Apiendpoints.GETCLIENT}${username}`,
  //     '',
  //     setLoading,
  //     (res) => {
  //       setCurrentUser(res.data);
  //     },
  //     (err) => {
  //       enqueueSnackbar(extractErrors(err), { variant: 'error' });
  //     }
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [username]);

  // const getLogos = useCallback(() => {
  //   get(
  //     `${Apiendpoints.LOGO_GET}${currentUser?.companyId}`,
  //     '',
  //     setLoading,
  //     (res) => {
  //       setLogos(res.data.data);
  //     },
  //     (err) => {
  //       enqueueSnackbar(extractErrors(err), { variant: 'error' });
  //     }
  //   );
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentUser]);

  // useEffect(() => {
  //   if (username) getData();
  //   return () => {};
  // }, [username, getData]);

  // useEffect(() => {
  //   if (currentUser) getLogos();

  //   return () => {};
  // }, [currentUser, getLogos]);

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
              name: 'Users',
              href: PATH_DASHBOARD.admin.users,
            },
            // { name: currentUser?.name },
            { name: '' },
          ]}
        />

        <ClientNewEditForm
          isEdit
          currentUser={currentUser}
          logos={logos}
          // getLogos={() => getLogos()}
          // getData={() => getData()}
        />
      </Container>
    </>
  );
}
