import { useState } from 'react';
// next
import Head from 'next/head';
import numWords from 'num-words';
// import { useRouter } from 'next/router';
// @mui
import { Container, Grid, Typography } from '@mui/material';
// @types
// import { IUserAccountGeneral } from '../../../../@types/user';
// _mock_
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';

import ApiPaginateSearch from 'src/components/api-paginate-table/ApiPaginateSearch';
import Refresh from 'src/hocs/Refresh';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { TableColumn } from 'react-data-table-component';
import { AsmCreditReqInterface } from 'src/@types/creditReq';
import Label from 'src/components/label';
import { datemonthYear } from 'src/utils/dateutils';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

CreditRequest.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
let refresh: () => void;
export default function CreditRequest() {
  const { themeStretch } = useSettingsContext();

  // const { push } = useRouter();

  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState([]);

  const columns: TableColumn<AsmCreditReqInterface>[] = [
    {
      name: 'Created/Updated',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="body2">{datemonthYear(row?.created_at)}</Typography>
          </div>
          <div>
            <Typography variant="body2">{datemonthYear(row?.updated_at)}</Typography>
          </div>
        </div>
      ),
    },
    {
      name: 'Date',
      cell: (row) => <div>{row.date}</div>,
    },
    {
      name: 'Bank/Mode',
      cell: (row) => (
        <div>
          <div>{row.bank.name}</div> <br />
          <div>{row.mode}</div>
        </div>
      ),
    },
    {
      name: 'Mobile',
      cell: (row) => (
        <>
          <Typography variant="body2">{row?.username}</Typography>
        </>
      ),
    },
    {
      name: 'Establishment',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="body2">{row?.name}</Typography>
          </div>
          <div>
            <Typography variant="body2">{row?.role}</Typography>
          </div>
        </div>
      ),
    },
    {
      name: 'Bank/Mode',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="body2">{row?.bank.name}</Typography>
          </div>
          <div>
            <Typography variant="body2">{row?.mode}</Typography>
          </div>
        </div>
      ),
    },
    {
      name: 'Ref',
      cell: (row) => (
        <div>
          <Typography variant="body2">{row?.ref_id}</Typography>
        </div>
      ),
    },
    {
      name: 'Amount',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="body2">{row?.amount}</Typography>
          </div>
          <div>
            <Typography variant="caption" sx={{ color: 'grey' }}>
              {numWords(row.amount)}
            </Typography>
          </div>
        </div>
      ),
    },
    {
      name: 'Remark',
      cell: (row) => (
        <div>
          <Typography variant="body2">{row?.remark}</Typography>
        </div>
      ),
    },
    {
      name: 'Status',
      cell: (row) => (
        <Label
          variant="soft"
          color={
            row.status === 'SUCCESS' ? 'success' : row.status === 'PENDING' ? 'warning' : 'error'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {row.status}
        </Label>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title> User: List | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Credit Request"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.sales.root },
            { name: 'Credit req', href: PATH_DASHBOARD.sales.creditReq },
          ]}
          // action={<MakeCreditReqDialogue />}
        />
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
