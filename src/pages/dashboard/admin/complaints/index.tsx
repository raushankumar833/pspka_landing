import { Container, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import ComplaintInterface from 'src/@types/complaint';
import ApiPaginateSearch from 'src/components/api-paginate-table/ApiPaginateSearch';
import ComplaintUpdatePopover from 'src/components/clients/menu-popover/ComplaintUpdatePopover';
import { useSettingsContext } from 'src/components/settings';
import Refresh from 'src/hocs/Refresh';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { Apiendpoints } from 'src/utils/Apiendpoints';

ComplaintListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

let refresh: () => void;
export default function ComplaintListPage() {
  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState([]);
  const { themeStretch } = useSettingsContext();


  const columns: TableColumn<ComplaintInterface>[] = [
    {
      name: 'Date/Time',
      cell: (row) => (
        <>
          {moment(row?.created_at).format('DD-MM-YYYY')} <br />
          {moment(row?.created_at).format('HH:mm:ss')}
        </>
      ),
    },
    {
      name: 'Est',
      cell: (row) => <Typography variant="caption">{row?.establishment}</Typography>,
    },
    {
      name: 'Operator/Route',
      cell: (row) => <Typography variant="caption">{row?.operator}</Typography>,
    },
    {
      name: 'Number',
      cell: (row) => (
        <Typography variant="caption">
          {row?.number}
        </Typography>
      ),
    },
    {
      name: 'Amount',
      cell: (row) => <Typography variant="caption">{row?.amount}</Typography>,
    },
    {
      name: 'Txn Date',
      cell: (row) => (
        <>
          {moment(row?.txn_date).format('DD-MM-YYYY')} <br />
          {moment(row?.txn_date).format('HH:mm:ss')}
        </>
      )
      // <Typography variant="caption">{row?.txn_date}</Typography>,
    },
    {
      name: 'Txn Id',
      cell: (row) => <Typography variant="caption">{row?.txnId}</Typography>,
    },
    {
      name: 'Txn Status',
      cell: (row) => <Typography variant="caption">{row?.txn_status}</Typography>,
    },
    {
      name: 'Message',
      cell: (row) => <Typography variant="caption">{row?.msg}</Typography>,
    },
    {
      name: 'Remark',
      cell: (row) => <Typography variant="caption">{row?.remark}</Typography>,
    },
    {
      name: 'Handler',
      cell: (row) => <Typography variant="caption">{row?.handler}</Typography>,
    },
    {
      name: 'Status',
      cell: (row) => <Typography variant="caption">{row?.status}</Typography>,
    },
    // {
    //   name: 'Status',
    //   cell: (row) => <Typography variant="caption">{row?.status}</Typography>,
    //     (
    //     <ClientActivateSwitch
    //       getData={() => refresh()}
    //       username={row.username}
    //       status={row.status}
    //     />
    //   ),
    // },
    {
      name: 'Action',
      cell: (row) => <ComplaintUpdatePopover row={row} />,
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
            apiEnd={Apiendpoints.GET_COMPLAINTS}
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
};

