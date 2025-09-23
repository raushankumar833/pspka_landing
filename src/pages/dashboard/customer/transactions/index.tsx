import { Container, Grid, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { TransactionInterface } from 'src/@types/clients';
import ApiPaginateSearch from 'src/components/api-paginate-table/ApiPaginateSearch';;
import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';
import Refresh from 'src/hocs/Refresh';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import TransactionDetail from 'src/sections/@dashboard/transaction/TransactionDetail';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { currencySetter } from 'src/utils/currencyUtil';

TransactionListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

let refresh: () => void;
export default function TransactionListPage() {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState([]);
  const { themeStretch } = useSettingsContext();

  const columns: TableColumn<TransactionInterface>[] = [
    {
      name: 'Date/Time',
      cell: (row) => (
        <>
          {/* <Typography variant="body2">{datemonthYear(row?.created_at)}</Typography> */}
          <Typography variant="body2">
            {row.created_at ? new Date(row?.created_at).toLocaleDateString("en-US") : "Total"}
            <br />
            {row.created_at ? new Date(row?.created_at).toLocaleTimeString("en-US") : ""}
          </Typography>
        </>
      ),
    },

    {
      name: 'Number',
      cell: (row) => <Typography variant="body2">{row?.number}</Typography>,
      width: '150px',
    },
    {
      name: 'Operator',
      cell: (row) => <Typography variant="body2" style={{color:"#2a2b2b"}}><b>{row?.operator?.code}</b></Typography>,
      width: '100px',
    },
    // {
    //   name: 'Info',
    //   cell: (row) => <>
    //    <div>{row.ben_name}</div>
    //       <div>{row.ben_acc}</div>
    //       <div>{row.ifsc}</div>
    //   </>,
    // },
    {
      name: 'Amount',
      cell: (row) => (
        <Typography variant="body2" sx={{ color: 'green', fontWeight: 'bold' }}>
          {currencySetter(Number(row?.amount))}
        </Typography>
      ),
    },
    {
      name: 'Charge',
      cell: (row) => (
        <Typography variant="body2" sx={{ color: 'red', fontWeight: 'bold' }}>
          {currencySetter(Number(row?.ret_charge))}
        </Typography>
      ),
      wrap:true,
    },
    {
      name: 'GST',
      cell: (row) => (
        <Typography variant="body2" sx={{ color: 'red', fontWeight: 'bold' }}>
        {row.gst?currencySetter(Number(row?.gst)): currencySetter(0)}       
        </Typography>
      ),
      wrap:true,
    },
    {
      name: 'Comm',
      cell: (row) => (
        <Typography variant="body2" sx={{ color: 'black' }}>
          {currencySetter(Number(row?.ret_comm))}
        </Typography>
      ),

      wrap:true,
    },
    {
      name: 'TDS',
      cell: (row) => (
        <Typography variant="body2" sx={{ color: 'black' }}>
          {currencySetter(row?.ret_tds)}
          {/* {row?.ret_tds ? `${currencySetter(row?.ret_tds)}` : 'NA'} */}
        </Typography>
      ),
    wrap:true,
    },
    {
      name: 'Closing',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="body2" sx={{ color: 'black' }}>
              {currencySetter(Number(row?.w1))}
            </Typography>{' '}
          </div>
          <div>
            <Typography
              variant="body2"
              sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
            >
              {currencySetter(Number(row?.w2))}
            </Typography>
          </div>
        </div>
      ),
      wrap:true,

    },
    {
      name: 'Status',

      cell: (row) => (row.status) ? 
        <Label
          variant="soft"
          color={(row.status) ? 
            (row.status === 'SUCCESS' ? 'success' : row.status === 'PENDING' ? 'warning' : 'error'): 'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {row.status ? row.status : ""}
        </Label>
         : <></>
      ,
    },
    {
      name: 'View',
      cell: (row) => (row.created_at) ? <TransactionDetail row={row}/> : <></>,
    },
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
