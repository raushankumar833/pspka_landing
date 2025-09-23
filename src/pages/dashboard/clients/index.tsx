import Head from 'next/head';
import NextLink from 'next/link';
import { Button, Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import DashboardLayout from '../../../layouts/dashboard';
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import ClientsTable from 'src/sections/@dashboard/clients/ClientsTable';

// ----------------------------------------------------------------------

ClientListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function ClientListPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Client: List | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Client List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Client', href: PATH_DASHBOARD.clients.root },
            { name: 'List' },
          ]}
          action={
            <NextLink href={PATH_DASHBOARD.clients.new} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New Client
              </Button>
            </NextLink>
          }
        />

        <ClientsTable />
      </Container>
    </>
  );
}
