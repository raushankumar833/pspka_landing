import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Container, Grid } from '@mui/material';
// routes
// import { PATH_DASHBOARD } from '../../../../routes/paths';
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
// import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
// sections
import ApiPaginateSearch from 'src/components/api-paginate-table/ApiPaginateSearch';
import Refresh from 'src/hocs/Refresh';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { TableColumn } from 'react-data-table-component';
import { CreditReqInterface } from 'src/@types/creditReq';
import moment from 'moment';
import Label from 'src/components/label';
// import { Icon } from '@iconify/react';
import CreditRequestUpdationPopover from 'src/components/clients/menu-popover/CreditRequestUpdationPopover';
import { UserStatus } from 'src/components/api-paginate-table/constants';

// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

CreditRequest.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
let refresh: () => void;
export default function CreditRequest() {
  const { themeStretch } = useSettingsContext();
  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState([]);

  const columns: TableColumn<CreditReqInterface>[] = [
    {
      name: 'Created at',
      cell: (row) => (
        <>
          {moment(row?.created_at).format('DD-MM-YYYY')} <br />
          {moment(row?.created_at).format('HH:mm:ss')}
        </>
      ),
    },
    {
      name: 'Date',
      cell: (row) => <div>{row.date}</div>
    },
    {
      name: 'Bank/Mode',
      cell: (row) => (
        <div>
          <div>{row?.bank?.name}</div> <br />
          <div>{row?.mode}</div>
        </div>
      ),
    },
    {
      name: 'Ref',
      cell: (row) => (
        <>
          <div>{row?.ref_id}</div>
        </>
      ),
    },
    {
      name: 'Amount',
      cell: (row) => (
        <>
          <div>{row?.amount}</div>
        </>
      ),
    },
    {
      name: 'Remark',
      cell: (row) => (
        <>
          <div>{row?.remark}</div>
        </>
      ),
    },
    {
      name: 'Status',
      cell: (row) => (
        <Label
          variant="soft"
          color={row.status === 'SUCCESS' ? 'success' : row.status === 'PENDING' ? 'warning' : 'error'}
          sx={{ textTransform: 'capitalize' }}
        >
       { row.status?UserStatus[row?.status]:"NA"}
        </Label>
      ),
    },
    {
      name: 'Actions',
      cell: (row) => (
        <CreditRequestUpdationPopover row={row} />
      ),
    },
  ];

  return (
    <>
      <Head>
        <title> User: List | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/* <CustomBreadcrumbs
          heading="Credit Request"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Credit req', href: PATH_DASHBOARD.creditReq.root },
          ]}
          // action={<MakeCreditReqDialogue />}
        /> */}
        <Grid container>
          <Grid item sm={12} xs={12} lg={12}>
            <ApiPaginateSearch
              actionButtons={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                >
                  <Refresh refresh={() => Promise.resolve(refresh())} />
                </div>
              }
              apiEnd={Apiendpoints.CREDIT_REQ}
              columns={columns}
              apiData={apiData}
              queryParam={query}
              setQuery={setQuery}
              setApiData={setApiData}
              returnRefetch={(ref: any) => {
                refresh = ref;
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

