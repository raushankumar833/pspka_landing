import Head from 'next/head';
import { Container, styled } from '@mui/material';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { AEPS_TYPE } from 'src/utils/constants';
import { capitalize } from 'src/utils/textUtil';
import CashWithdrawal from 'src/sections/@dashboard/aeps/CashWithdrawal';
import useResponsive from 'src/hooks/useResponsive';
import RDdrivers from 'src/sections/@dashboard/aeps/RDdrivers';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { TabIcon } from '../money-transfer';
import AePSGuard from 'src/hocs/AePSGuard';

// ----------------------------------------------------------------------

Aeps.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const CustomTabPanel = styled(TabPanel)({
  padding: '24px 0px',
});

export default function Aeps() {
  const ismobile = useResponsive('down', 'md');
  const [value, setValue] = useState(AEPS_TYPE.cw);
  const { themeStretch } = useSettingsContext();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <AePSGuard>
      <Head>
        <title> AePS | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <TabContext value={value}>
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 0.5 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant={!ismobile ? 'fullWidth' : 'scrollable'}
              scrollButtons="auto"
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="scrollable type selection"
            >
              <Tab
                icon={<TabIcon icon="ic_cash" />}
                label={capitalize(AEPS_TYPE.cw)}
                value={AEPS_TYPE.cw}
              />
              <Tab
                icon={<TabIcon icon="ic_money_transfer" />}
                label={capitalize(AEPS_TYPE.be)}
                value={AEPS_TYPE.be}
              />
              <Tab
                icon={<TabIcon icon="ic_statement" />}
                label={capitalize(AEPS_TYPE.ms)}
                value={AEPS_TYPE.ms}
              />
              <Tab
                icon={<TabIcon icon="ic_aadhaar" />}
                label={capitalize(AEPS_TYPE.ap)}
                value={AEPS_TYPE.ap}
              />
            </Tabs>
          </Box>
          <Scrollbar>
            <Box
              sx={{
                height: ismobile ? '100vh' : 'max-content',
              }}
            >
              <CustomTabPanel value={AEPS_TYPE.cw}>
                <CashWithdrawal />
              </CustomTabPanel>
            </Box>
          </Scrollbar>
        </TabContext>
      </Container>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <RDdrivers />
      </Container>
    </AePSGuard>
  );
}
