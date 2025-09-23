import Head from 'next/head';
// import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import { Container, Grid, Stack } from '@mui/material';
import { useAuthContext } from '../../../auth/useAuthContext';
import DashboardLayout from '../../../layouts/dashboard';
import { _appAuthors, _appInstalled, _appRelated, _appInvoices } from '../../../_mock/arrays';
import { useSettingsContext } from '../../../components/settings';
import {
  AppWidget,
  AppWelcome,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../../sections/@dashboard/general/app';
import { SeoIllustration } from '../../../assets/illustrations';
import RoleBasedGuard from 'src/auth/RoleBasedGuard';
import { USERROLES } from 'src/utils/constants';
// import { PATH_DASHBOARD } from 'src/routes/paths';
import TransactionCount from 'src/sections/@dashboard/general/app/TransactionCount';
import _mock from 'src/_mock';
import NewWalletCurrentBalance from 'src/sections/@dashboard/general/app/NewWalletCurrentBalance';

// ----------------------------------------------------------------------

GeneralAppPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function GeneralAppPage() {
  const { user, wallet } = useAuthContext();

  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  const _bankingCreditCard = [];

  // Add Wallet 1 data to the array
  _bankingCreditCard.push({
    id: _mock.id(2),
    balance: wallet.w1,
    cardType: 'Wallet 1',
    cardHolder: _mock.name.fullName(2),
    cardNumber: '**** **** **** 3640',
    cardValid: '11/22',
  });

  // Conditionally add Wallet 2 data to the array if wallet type is dual
  if (wallet.walletType === 'dual') {
    _bankingCreditCard.push({
      id: _mock.id(3),
      balance: wallet.w2,
      cardType: 'Wallet 2',
      cardHolder: _mock.name.fullName(3),
      cardNumber: '**** **** **** 8864',
      cardValid: '11/25',
    });
  }

  return (
    <RoleBasedGuard hasContent roles={[USERROLES.md, USERROLES.ad]}>
      <Head>
        <title> General: App | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome
              title={`Welcome back! \n ${user?.name}`}
              description="Enjoy our rapid and secure money transfer services"
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <NewWalletCurrentBalance list={_bankingCreditCard} />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppNewInvoice
              title="Product Sale"
              tableData={_appInvoices}
              tableLabels={[
                { id: 'id', label: 'Invoice ID' },
                { id: 'category', label: 'Category' },
                { id: 'price', label: 'Price' },
                { id: 'status', label: 'Status' },
                { id: '' },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TransactionCount
              title="Transactions"
              chart={{
                series: [
                  {
                    label: 'Success',
                    percent: 72,
                    total: 38566,
                    color: theme.palette.success.light,
                  },
                  {
                    label: 'Pending',
                    percent: 72,
                    total: 38566,
                    color: theme.palette.warning.light,
                  },
                  { label: 'Failed', percent: 72, total: 38566, color: theme.palette.error.main },
                  {
                    label: 'Total',
                    percent: 72,
                    total: 38566,
                    color: theme.palette.secondary.light,
                  },
                ],
                colors: [theme.palette.common.black],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Active Users"
              percent={2.6}
              total={18765}
              chart={{
                colors: [theme.palette.primary.main],
                series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Installed"
              percent={0.2}
              total={4876}
              chart={{
                colors: [theme.palette.info.main],
                series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
              }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="Total Downloads"
              percent={-0.1}
              total={678}
              chart={{
                colors: [theme.palette.warning.main],
                series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload
              title="Current Download"
              chart={{
                colors: [
                  theme.palette.primary.main,
                  theme.palette.info.main,
                  theme.palette.error.main,
                  theme.palette.warning.main,
                ],
                series: [
                  { label: 'Mac', value: 12244 },
                  { label: 'Window', value: 53345 },
                  { label: 'iOS', value: 44313 },
                  { label: 'Android', value: 78343 },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled
              title="Area Installed"
              subheader="(+43%) than last year"
              chart={{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                series: [
                  {
                    year: '2019',
                    data: [
                      { name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
                      { name: 'America', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
                    ],
                  },
                  {
                    year: '2020',
                    data: [
                      { name: 'Asia', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
                      { name: 'America', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated title="Top Related Applications" list={_appRelated} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries title="Top Installed Countries" list={_appInstalled} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors title="Top Authors" list={_appAuthors} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget
                title="Conversion"
                total={38566}
                icon="eva:person-fill"
                chart={{
                  series: 48,
                }}
              />

              <AppWidget
                title="Applications"
                total={55566}
                icon="eva:email-fill"
                color="info"
                chart={{
                  series: 75,
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RoleBasedGuard>
  );
}
