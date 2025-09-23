import { Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { PlansInterface } from 'src/@types/plans';
import ApiPaginateSearch from 'src/components/api-paginate-table/ApiPaginateSearch';
import { useSettingsContext } from 'src/components/settings';
import Refresh from 'src/hocs/Refresh';
// import { PATH_DASHBOARD } from '../../../../routes/paths';
// import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import CreatePlanDialogue from 'src/sections/@dashboard/plans/CreatePlanDialogue';
import PlanActionsDialog from 'src/sections/@dashboard/plans/PlanActionsDialog';
import PlanStatusUpdateDialog from 'src/sections/@dashboard/plans/PlanStatusUpdateDialog';

PlansListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

let refresh: () => void;


export default function PlansListPage() {
  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState([]);
  const { themeStretch } = useSettingsContext();
  // const [open, setOpen] = useState(false);

  // const openThis = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const columns: TableColumn<PlansInterface>[] = [
    {
      name: 'Operator',
      cell: (row) => (
        <>
          {row?.operator}
        </>
      ),
    },
    {
      name: 'Plan',
      cell: (row) => (
        <Typography variant="caption">
          {row?.plan}
        </Typography>
      ),
    },
    {
      name: 'Validity',
      cell: (row) => <Typography variant="caption">{row?.validity}</Typography>,
    },
    {
      name: 'Description',
      cell: (row) => <Typography variant="caption">{row?.description}</Typography>,
    },
    {
      name: 'Status',
      cell: (row) => (
        <PlanStatusUpdateDialog row={row} />
      ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <PlanActionsDialog row={row} />
      ),
    },
  ];

  return (
    <Container maxWidth={themeStretch ? false : 'lg'}>
      {/* <CustomBreadcrumbs
        heading="Plans"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Plans', href: PATH_DASHBOARD.plans.root },
        ]}
        action={<CreatePlanDialogue />} // Make Add Plans Dialogue
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
                <CreatePlanDialogue />
                <Refresh refresh={() => Promise.resolve(refresh())} />
              </div>
            }
            apiEnd={Apiendpoints.GET_PLANS}
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
