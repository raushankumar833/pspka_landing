import { Container, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { NotificationInterface } from 'src/@types/notifications';
import ApiPaginateSearch from 'src/components/api-paginate-table/ApiPaginateSearch';
import { useSettingsContext } from 'src/components/settings';
import Refresh from 'src/hocs/Refresh';
// import { PATH_DASHBOARD } from '../../../../routes/paths';
// import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import MakeNotificationDialogue from 'src/sections/@dashboard/notification/MakeNotificationDialogue';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { Apiendpoints } from 'src/utils/Apiendpoints';

TransactionListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

let refresh: () => void;
export default function TransactionListPage() {
  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState([]);
  const { themeStretch } = useSettingsContext();

  const columns: TableColumn<NotificationInterface>[] = [
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
      cell: (row) => (
        <Typography variant="caption">
          {row?.id}
        </Typography>
      ),
    },
    {
      name: 'User Id',
      cell: (row) => <Typography variant="caption">{row?.user_id}</Typography>,
    },
    {
      name: 'Priority',
      cell: (row) => <Typography variant="caption">{row?.priority.toUpperCase()}</Typography>,
    },
    {
      name: 'Message',
      cell: (row) => <Typography variant="caption">{row?.message}</Typography>,
    },
    {
      name: 'Role',
      cell: (row) => <Typography variant="caption">{row?.role}</Typography>,
    },
    {
      name: 'Is Read',
      cell: (row) => <Typography variant="caption">{row?.is_read ? "Read" : "Unread"}</Typography>,
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
      {/* <CustomBreadcrumbs
          heading="Notifications"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Notifications', href: PATH_DASHBOARD.notifications.root },
          ]}
          action={<MakeNotificationDialogue />}
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
                <Grid item sm={12} xs={12} lg={12} textAlign="right" >
                  <MakeNotificationDialogue />
                </Grid>
                <Refresh refresh={() => Promise.resolve(refresh())} />
              </div>
            }
            apiEnd={Apiendpoints.GET_NOTIFICATION}
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

