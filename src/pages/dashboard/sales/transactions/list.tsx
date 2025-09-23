import { Container, Grid, Typography } from '@mui/material';
// import moment from 'moment';
import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { AsmTransactionInterface } from 'src/@types/clients';
import ApiPaginateSearch from 'src/components/api-paginate-table/ApiPaginateSearch';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';
import Refresh from 'src/hocs/Refresh';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { currencySetter } from 'src/utils/currencyUtil';
import { datemonthYear } from 'src/utils/dateutils';

TransactionListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

let refresh: () => void;
export default function TransactionListPage() {
  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState([]);
  const { themeStretch } = useSettingsContext();

  const columns: TableColumn<AsmTransactionInterface>[] = [
    {
      name: 'Date/Time',
      cell: (row) => (
        <>
          <Typography variant="body2">{datemonthYear(row?.created_at)}</Typography>
        </>
      ),
      // width: '150px',
    },
    {
      name: 'MOP',
      cell: (row) => <Typography variant="caption">{row?.mop}</Typography>,
    },
    {
      name: 'Order Id',
      cell: (row) => <Typography variant="caption">{row?.order_id}</Typography>,
      width: '150px',
    },
    {
      name: 'Operator',
      cell: (row) => <Typography variant="caption">{row?.op_code}</Typography>,
    },
    {
      name: 'Establishment',
      cell: (row) => <Typography variant="body2">{row?.user_business_name}</Typography>,
      width: '150px',
    },
    {
      name: 'Number',
      cell: (row) => <Typography variant="caption">{row?.number}</Typography>,
      width: '120px',
    },
    {
      name: 'Info',
      cell: (row) => <Typography variant="caption">{row?.status}</Typography>,
      // (
      // <ClientActivateSwitch
      //   getData={() => refresh()}
      //   username={row.username}
      //   status={row.status}
      // />
      // ),
    },
    {
      name: 'Amount',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="body2">{currencySetter(Number(row?.amount))}</Typography>
          </div>
          <div>
            {/* <Typography variant="body2">{currencySetter(Number(row?.w2))}</Typography> */}
            <Typography variant="body2">{'net_amt'}</Typography>
          </div>
        </div>
      ),
      width: '100px',
    },
    {
      name: 'Closing',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="body2">{currencySetter(Number(row?.w1))}</Typography>
          </div>
          <div>
            <Typography variant="body2" sx={{ color: '#F29132', fontWeight: 'bold' }}>
              {currencySetter(Number(row?.w2))}
            </Typography>
          </div>
        </div>
      ),
      width: '80px',
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
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Transactions"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.sales.root },
          { name: 'Transactions', href: PATH_DASHBOARD.sales.transactions },
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
            apiEnd={Apiendpoints.GET_TRANSACTIONS}
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
  );
}
