import { Container, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { ClientInterface } from 'src/@types/clients';
import ApiPaginateSearch from 'src/components/api-paginate-table/ApiPaginateSearch';
import { UserStatus } from 'src/components/api-paginate-table/constants';
import ClientMenuPopover from 'src/components/clients/menu-popover/ClientMenuPopover';
import { useSettingsContext } from 'src/components/settings';
import Refresh from 'src/hocs/Refresh';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { Apiendpoints } from 'src/utils/Apiendpoints';


UserListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

let refresh: () => void;
export default function UserListPage() {
  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState([]);
  const { themeStretch } = useSettingsContext();

  const columns: TableColumn<ClientInterface>[] = [
    {
      name: 'Id',
      cell: (row) =>row?.id,
    },
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
      name: 'Created at',
      cell: (row) => (
        <>
          {moment(row?.updated_at).format('DD-MM-YYYY')} <br />
          {moment(row?.updated_at).format('HH:mm:ss')}
        </>
      ),
    },
    {
      name: 'Name',
      cell: (row) => (
        <Typography variant="caption">
          {row?.firstName} {row?.name}
        </Typography>
      ),
    },
    {
      name: 'Mobile',
      cell: (row) => <Typography variant="caption">{row?.username}</Typography>,
    },
    {
      name: 'Company',
      cell: (row) => <Typography variant="caption">{row?.user_detail?.business_name}</Typography>,
    },
    {
      name: 'Emial id',
      cell: (row) => <Typography variant="caption">{row?.email}</Typography>,
    },
    {
      name: 'Status',
      cell: (row) =>  row.status?UserStatus[row?.status]:"NA",
    },
    {
      name: 'Action',
      cell: (row) => <ClientMenuPopover row={row}/>,
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
            apiEnd={Apiendpoints.GET_USERS}
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

