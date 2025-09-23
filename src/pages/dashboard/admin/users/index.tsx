import { Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { ClientInterface } from 'src/@types/clients';
import ApiPaginateSearch from 'src/components/api-paginate-table/ApiPaginateSearch';
import ClientMenuPopover from 'src/components/clients/menu-popover/ClientMenuPopover';
import { useSettingsContext } from 'src/components/settings';
import Refresh from 'src/hocs/Refresh';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { Apiendpoints } from 'src/utils/Apiendpoints';
// import Label from 'src/components/label';
// import UserPermissionDialogue from 'src/components/clients/menu-popover/UserPermissionDialogue';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import { PATH_DASHBOARD } from 'src/routes/paths';
import AdminCreateUsers from 'src/components/create-uses/AdminCreateUsers';
import KycUpdationPopover from 'src/components/clients/menu-popover/KycUpdationPopover';
import { datemonthYear } from 'src/utils/dateutils';

UserListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

let refresh: () => void;
export default function UserListPage() {
  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState([]);
  const { themeStretch } = useSettingsContext();

  const columns: TableColumn<ClientInterface>[] = [
    {
      name: 'ID/Date',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="body2">{row?.id}</Typography>
          </div>
          <div>
            <Typography variant="body2">{datemonthYear(row?.created_at)}</Typography>
          </div>
        </div>
      ),
    },
    {
      name: 'Id',
      cell: (row) => row?.id,
    },
    {
      name: 'Mobile',
      cell: (row) => <Typography variant="caption">{row?.username}</Typography>,
    },
    {
      name: 'Name',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="caption">{row?.name}</Typography>
          </div>
          <div>
            <Typography variant="body2">{row?.user_detail?.business_name}</Typography>
          </div>
        </div>
      ),
    },
    {
      name: 'Role',
      cell: (row) => <Typography variant="caption">{row?.role}</Typography>,
    },
    {
      name: 'Parent',
      cell: (row) => <Typography variant="caption">{row?.parent}</Typography>,
    },
    {
      name: 'ASM',
      cell: (row) => <Typography variant="caption">{row?.asm}</Typography>,
    },
    {
      name: 'InActive',
      cell: (row) => (
        <Typography variant="caption">{row.inactive ? row.inactive : 'NA'}</Typography>
      ),
    },
    {
      name: 'Wallet balance',
      cell: (row) =>
        <div>
          <div><Typography variant="caption">W1 : {row?.w1}</Typography></div>
          <div><Typography variant="caption">W2 : {row?.w2}</Typography></div>
        </div>
    },
    {
      name: 'DMT',
      cell: (row) => <Typography variant="caption">{row?.tds_rate}</Typography>,
    },
    {
      name: 'Status',
      cell: (row) => (
        <KycUpdationPopover user={row} tpin={undefined} id={undefined} />
      ),
    },
    // {
    //   name: 'Permission',
    //   cell: (row) => <UserPermissionDialogue user={row} />,
    // },
    {
      name: 'Action',
      cell: (row) => <ClientMenuPopover row={row} />,
    },
  ];

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      {/* <CustomBreadcrumbs
        heading="Users"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.admin.root },
          { name: 'Credit req', href: PATH_DASHBOARD.admin.users },
        ]}
        action={<AdminCreateUsers refresh={refresh} />}
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
                  <AdminCreateUsers refresh={refresh} />
                </Grid>
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
