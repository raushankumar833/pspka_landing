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
import CmsTwo from 'src/sections/@dashboard/cms/CmsTwo';
import CmsOne from 'src/sections/@dashboard/cms/CmsOne';

// ----------------------------------------------------------------------

CMS.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const CustomTabPanel = styled(TabPanel)({
  padding: '24px 0px',
});

export default function CMS() {
  const [value, setValue] = useState('1');
  const { themeStretch } = useSettingsContext();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title> CMS | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <TabContext value={value}>
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 0.5 }}>
            <Tabs
              value={value}
              variant="fullWidth"
              scrollButtons="auto"
              textColor="secondary"
              onChange={handleChange}
              indicatorColor="secondary"
              aria-label="scrollable type selection"
            >
              <Tab label="CMS 1" value="1" />
              <Tab label="CMS 2" value="2" />
            </Tabs>
          </Box>
          <CustomTabPanel value="1">
            <CmsOne />
          </CustomTabPanel>
          <CustomTabPanel value="2">
            <CmsTwo value={value} />
          </CustomTabPanel>
        </TabContext>
      </Container>
    </>
  );
}
