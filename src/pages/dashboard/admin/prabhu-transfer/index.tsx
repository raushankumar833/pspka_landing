import { Container, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { TransactionInterface } from 'src/@types/clients';
import ApiPaginateSearch from 'src/components/api-paginate-table/ApiPaginateSearch';
import Label from 'src/components/label/Label';
import { useSettingsContext } from 'src/components/settings';
import Refresh from 'src/hocs/Refresh';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { currencySetter } from 'src/utils/currencyUtil';

TransactionListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

let refresh: () => void;
export default function TransactionListPage() {
  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState([]);
  const { themeStretch } = useSettingsContext();

  const columns: TableColumn<TransactionInterface>[] = [
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
      name: 'Id',
      cell: (row) => <Typography variant="caption">{row?.id}</Typography>,
    },
    {
      name: 'User Id',
      cell: (row) => <Typography variant="caption">{row?.user_id}</Typography>,
    },
    {
      name: 'Number',
      cell: (row) => <Typography variant="caption">{row?.number}</Typography>,
    },
    {
      name: 'Amount',
      cell: (row) => (
        <Typography variant="caption">{currencySetter(Number(row?.amount))}</Typography>
      ),
    },
    {
      name: 'Route',
      cell: (row) => <Typography variant="caption">{row?.route}</Typography>,
    },
    {
      name: 'Status',
      cell: (row) => (
        <Label
          variant="soft"
          color={
            row.status
              ? row.status === 'SUCCESS'
                ? 'success'
                : row.status === 'PENDING'
                ? 'warning'
                : 'error'
              : 'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {row.status ? row.status : ''}
        </Label>
      ),
      // (
      // <ClientActivateSwitch
      //   getData={() => refresh()}
      //   username={row.username}
      //   status={row.status}
      // />
      // ),
    },
    // {
    //   name: 'Action',
    //   cell: (row) => <ClientMenuPopover row={row} />,
    // },
  ];

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
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
