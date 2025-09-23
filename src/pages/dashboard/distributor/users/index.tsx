import { Icon } from '@iconify/react';
import { Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { AdUsersInterface } from 'src/@types/clients';
import ApiPaginateSearch from 'src/components/api-paginate-table/ApiPaginateSearch';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import { UserStatus } from 'src/components/api-paginate-table/constants';
// import ClientMenuPopover from 'src/components/clients/menu-popover/ClientMenuPopover';
import { useSettingsContext } from 'src/components/settings';
import Refresh from 'src/hocs/Refresh';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { currencySetter } from 'src/utils/currencyUtil';
import { dateDifference, datemonthYear } from 'src/utils/dateutils';

UserListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

let refresh: () => void;
export default function UserListPage() {
  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState([]);
  const { themeStretch } = useSettingsContext();

  const columns: TableColumn<AdUsersInterface>[] = [
    {
      name: 'Date/Time',
      cell: (row) => (
        <>
          <Typography variant="body2">{datemonthYear(row?.created_at)}</Typography>
        </>
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
      name: 'Name',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="body2">{row?.name}</Typography>
          </div>
          <div>
            <Typography variant="body2">{row?.user_detail?.business_name}</Typography>
          </div>
        </div>
      ),
    },
    {
      name: 'Role',
      cell: (row) => <Typography variant="body2">{row?.role}</Typography>,
    },
    {
      name: 'In-Active',
      cell: (row) => (
        <Typography variant="body2">{dateDifference(row?.updated_at, new Date())} days</Typography>
      ),
    },
    {
      name: 'Wallet Balance',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="body2">{currencySetter(Number(row?.w1))}</Typography>
          </div>
          <div>
            <Typography variant="body2">{currencySetter(Number(row?.w2))}</Typography>
          </div>
        </div>
      ),
    },
    {
      name: 'Status',
      cell: (row) => (
        <div>
          {row?.status === '1' ? (
            <Icon icon="mdi:unlocked-outline" style={{ color: 'green', fontSize: '25px' }} />
          ) : (
            <Icon icon="material-symbols:lock-outline" style={{ color: 'red', fontSize: '25px' }} />
          )}
        </div>
      ),
    },
  ];

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Users"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.distributor.root },
          { name: 'Users', href: PATH_DASHBOARD.distributor.users },
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
}
