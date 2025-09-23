import { Container, Grid, Tooltip, Typography, useTheme } from '@mui/material';
// import moment from 'moment';
import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { TransactionInterface } from 'src/@types/transaction';
import ApiPaginateSearch from 'src/components/api-paginate-table/ApiPaginateSearch';
import { useSettingsContext } from 'src/components/settings';
import Refresh from 'src/hocs/Refresh';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { datemonthYear } from 'src/utils/dateutils';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import LaptopIcon from '@mui/icons-material/Laptop';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { currencySetter } from 'src/utils/currencyUtil';
import Label from 'src/components/label';
import AdminActionDialogue from 'src/components/confirm-dialog/AdminActionDialogue';

TransactionListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

let refresh: () => void;
export default function TransactionListPage() {
  const [query, setQuery] = useState('');
  const [apiData, setApiData] = useState([]);
  const { themeStretch } = useSettingsContext();
  const theme = useTheme();

  const columns: TableColumn<TransactionInterface>[] = [
    {
      name: 'Date/Time',
      cell: (row) => (
        <>
          <div style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '5px' }}>{datemonthYear(row.created_at)}</div>
            <div>{datemonthYear(row.updated_at)}</div>
          </div>
        </>
      ),
      wrap: true,
      width: '130px',
    },
    {
      name: 'Route',
      cell: (row) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
          }}
        >
          <div>
            {row.platform === 'APP' ? (
              <Tooltip title="APP">
                <InstallMobileIcon fontSize="small" />
              </Tooltip>
            ) : row.platform === 'WEB' ? (
              <Tooltip title="WEB">
                <LaptopIcon fontSize="small" />
              </Tooltip>
            ) : row.platform === 'ANDROID' ? (
              <Tooltip title="ANDROID">
                <AndroidIcon fontSize="small" />
              </Tooltip>
            ) : row.platform === 'IOS' ? (
              <Tooltip title="IOS">
                <AppleIcon fontSize="small" />
              </Tooltip>
            ) : (
              <Tooltip title="API">
                <SyncAltIcon fontSize="small" />
              </Tooltip>
            )}
          </div>
          <div className="fw-bold">{row.route}</div>
        </div>
      ),
      width: '100px',
    },
    {
      name: 'MOP',
      cell: (row) => <Typography variant="caption">{row?.mop}</Typography>,
      width: '70px',
    },
    {
      name: 'Order Id',
      cell: (row) => (
        <Typography variant="caption" className="fw-bold">
          {row?.order_id}
        </Typography>
      ),
      width: '150px',
    },
    {
      name: 'Operator',
      cell: (row) => <Typography variant="caption">{row?.op_code}</Typography>,
    },
    {
      name: 'EST',
      cell: (row) => (
        <div
          style={{
            textAlign: 'left',
          }}
        >
          <Tooltip title={row?.user?.user_detail?.business_name}>
            <div className="d-flex" style={{ textAlign: 'left' }}>
              <Typography variant="body2">{row?.user?.user_detail?.business_name}</Typography>
            </div>
          </Tooltip>
        </div>
      ),
      wrap: true,
      width: '120px',
    },
    {
      name: 'Number',
      cell: (row) => <div className="fw-bold">{row.number}</div>,
      width: '120px',
    },
    {
      name: 'Info',
      cell: (row) => <Typography variant="caption">{row?.info}</Typography>,
    },
    {
      name: 'Amount',
      cell: (row) => (
        <div>
          <Typography variant="caption" className="fw-bold" sx={{ fontSize: '13px' }}>
            {currencySetter(Number(row?.amount))}
          </Typography>
          <div style={{ color: theme.palette.primary.dark, fontSize: '13px' }} className="fw-bold">
            {currencySetter(row.ad_comm)} / {currencySetter(row.md_comm)}
          </div>
        </div>
      ),
    },
    {
      name: 'GST/TDS',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="caption" sx={{ fontSize: '12px' }} className="fw-bold">
              {row.gst ? currencySetter(Number(row.gst)) : 'NA'}
            </Typography>
          </div>
          <Typography variant="caption" sx={{ fontSize: '12px' }} className="fw-bold">
            {row.ret_tds ? Number(row.ret_tds) : 'NA'}
          </Typography>
        </div>
      ),
    },
    {
      name: 'Closing',
      cell: (row) => (
        <div>
          <div>
            <Typography variant="caption" className="fw-bold" sx={{ fontSize: '13px' }}>
              {row?.w1}
            </Typography>
          </div>
          <div>
            <Typography
              variant="caption"
              className="fw-bold"
              sx={{ fontSize: '13px', color: theme.palette.primary.main }}
            >
              {row?.w2}
            </Typography>
          </div>
          <div>
            <Typography
              variant="caption"
              className="fw-bold"
              sx={{ fontSize: '13px', color: theme.palette.secondary.main }}
            >
              {row?.ad_closing}
            </Typography>
          </div>
        </div>
      ),
    },
    {
      name: 'Adm Comm.',
      cell: (row) => (
        <Typography variant="body2">{currencySetter(Number(row?.admin_comm))}</Typography>
      ),
    },
    {
      name: 'Status',
      cell: (row) => (
        <Label
          variant="soft"
          color={
            row.status === 'SUCCESS' ? 'success' : row.status === 'PENDING' ? 'warning' : 'error'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {row?.status||"NA"}
        </Label>
      ),
    },
    {
      name: 'Action',
      cell: (row) => <AdminActionDialogue row={row} title="Change Status" />,
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
