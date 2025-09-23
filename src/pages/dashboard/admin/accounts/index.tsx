import { Container, Grid, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
// import { PlansInterface } from 'src/@types/plans';
import ApiPaginateSearch from 'src/components/api-paginate-table/ApiPaginateSearch';
import { useSettingsContext } from 'src/components/settings';
import Refresh from 'src/hocs/Refresh';
// import { PATH_DASHBOARD } from '../../../../routes/paths';
// import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { Apiendpoints } from 'src/utils/Apiendpoints';
// import { Icon } from '@iconify/react';
// import CreatePlanDialogue from 'src/sections/@dashboard/plans/CreatePlanDialogue';
// import PlanActionsDialog from 'src/sections/@dashboard/plans/PlanActionsDialog';
// import PlanStatusUpdateDialog from 'src/sections/@dashboard/plans/PlanStatusUpdateDialog';
import { BankInterface } from 'src/@types/Bank';

AccountsListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

let refresh: () => void;


export default function AccountsListPage() {
  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState([]);
  const { themeStretch } = useSettingsContext();

  const columns: TableColumn<BankInterface>[] = [

    {
      name: 'ID',
      cell: (row) => (
        <>
          {row?.id}
        </>
      ),
    },
    {
      name: 'Name',
      cell: (row) => (
        <>
          {row?.name}
        </>
      ),
    },

    {
      name: 'Account',
      cell: (row) => (
        <Typography variant="caption">
          {row?.account}
        </Typography>
      ),
    },
    {
      name: 'Balance',
      cell: (row) => <Typography variant="caption">{row?.balance}</Typography>,
    },
    {
      name: 'Status',
      cell: (row) => <Typography variant="caption">{row?.status}</Typography>,
    },
    {
      name: 'Statement',
      cell: (row) => (
        <>
          <Button variant='contained' >Statement</Button>
        </>
      ),
    },

  ];

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      {/* <CustomBreadcrumbs
        heading="Banks"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Banks', href: PATH_DASHBOARD.banks.root },
        ]}
      // action={<CreatePlanDialogue />} // Make Add Plans Dialogue
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
                <Refresh refresh={() => Promise.resolve(refresh())} />
              </div>
            }
            apiEnd={Apiendpoints.GET_ACCOUNTS}
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
