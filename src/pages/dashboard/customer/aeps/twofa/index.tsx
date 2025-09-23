import Head from 'next/head';
import { Container, styled } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { AEPS_TYPE } from 'src/utils/constants';
import { capitalize } from 'src/utils/textUtil';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import TwoFactor from 'src/sections/@dashboard/aeps/TwoFactor';
import RDdrivers from 'src/sections/@dashboard/aeps/RDdrivers';
import AePSGuard from 'src/hocs/AePSGuard';
import { useSettingsContext } from 'src/components/settings';
import useResponsive from 'src/hooks/useResponsive';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

// ----------------------------------------------------------------------

Aeps2FA.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const CustomTabPanel = styled(TabPanel)({
  padding: '24px 0px',
});

export default function Aeps2FA() {
  const ismobile = useResponsive('down', 'md');
  const [value, setValue] = useState(AEPS_TYPE.aeps1);
  const { themeStretch } = useSettingsContext();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <AePSGuard>
      <Head>
        <title> AePS Two-FA | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <TabContext value={value}>
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 0.5 }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant={'fullWidth'}
              scrollButtons="auto"
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="scrollable type selection"
            >
              <Tab label={capitalize(AEPS_TYPE.aeps1)} value={AEPS_TYPE.aeps1} />
              <Tab label={capitalize(AEPS_TYPE.aeps2)} value={AEPS_TYPE.aeps2} />
            </Tabs>
          </Box>
          <Scrollbar>
            <Box
              sx={{
                height: ismobile ? '100vh' : 'max-content',
              }}
            >
              <CustomTabPanel value={AEPS_TYPE.aeps1}>
                <TwoFactor />
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
