import { Container, Grid, Typography } from '@mui/material';
// import moment from 'moment';
import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { AdTransactionInterface } from 'src/@types/clients';
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

  const columns: TableColumn<AdTransactionInterface>[] = [
    {
      name: 'Date/Time',
      cell: (row) => (
        <>
          <Typography variant="body2">{datemonthYear(row?.created_at)}</Typography>
        </>
      ),
    },
    {
      name: 'Operator',
      cell: (row) => <Typography variant="body2">{row?.op_code}</Typography>,
    },
    {
      name: 'Establishment',
      cell: (row) => <Typography variant="body2">{row?.user_business_name}</Typography>,
      width: '150px',
    },
    {
      name: 'Number',
      cell: (row) => <Typography variant="body2">{row?.number}</Typography>,
    },

    {
      name: 'Amount',
      cell: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'green' }}>
          {currencySetter(Number(row?.amount))}
        </Typography>
      ),
    },
    {
      name: 'Comm',
      cell: (row) => <Typography variant="body2">{row?.ad_comm}</Typography>,
    },
    {
      name: 'Tds',
      // cell: (row) => <Typography variant="body2">{row?.tds}</Typography>,
      cell: (row) => <Typography variant="body2">{'ad_tds'}</Typography>,
      // (
      // <ClientActivateSwitch
      //   getData={() => refresh()}
      //   username={row.username}
      //   status={row.status}
      // />
      // ),
    },
    {
      name: 'Closing',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="body2">{currencySetter(Number(row?.w1))}</Typography>
          </div>
          <div>
            {/* <Typography variant="body2">{currencySetter(Number(row?.w2))}</Typography> */}
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#F29132' }}>
              {currencySetter(Number(row?.w2))}
            </Typography>
          </div>
        </div>
      ),
    },
    {
      name: 'Status',

      cell: (row) => (
        <div>
          <Label
            variant="soft"
            color={
              row.status === 'SUCCESS' ? 'success' : row.status === 'PENDING' ? 'warning' : 'error'
            }
            sx={{ textTransform: 'capitalize', mb: 0.2 }}
          >
            {row.status}
          </Label>
          <div>
            <Typography variant="overline">{row?.op_id}</Typography>
          </div>
        </div>
      ),
    },
    // {
    //   name: 'Action',
    //   cell: (row) => <ClientMenuPopover row={row} />,
    // },
  ];

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Transactions"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.distributor.root },
          { name: 'Transactions', href: PATH_DASHBOARD.distributor.transactions },
        ]}
        //   action={<MakeCreditReqDialogue />}
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
