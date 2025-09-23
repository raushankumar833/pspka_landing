import Head from 'next/head';
import { Container, styled } from '@mui/material';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { SERVICE_SUBTYPE, SERVICE_TYPE } from 'src/utils/constants';
import { myAxios } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { dispatch } from 'src/redux/store';
import { changeBiller, getBillers } from 'src/redux/my-slices/recharge_bills';
import { checklength } from 'src/utils/flattenArray';
import useResponsive from 'src/hooks/useResponsive';
import BillPaymentsTab from 'src/sections/@dashboard/bill-payments/BillPaymentsTab';
import { TabIconImg } from '../money-transfer';

// ----------------------------------------------------------------------

BillPayments.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const CustomTabPanel = styled(TabPanel)({
  padding: '24px 0px',
});

export default function BillPayments() {
  const ismobile = useResponsive('down', 'md');
  const { themeStretch } = useSettingsContext();
  const [serviceSubTypeList, setServiceSubTypeList] = useState([]);
  const [servicesubtype, setServiceSubType] = useState(SERVICE_SUBTYPE.electricity);
  const [bannerList, setBannerList] = useState<string[]>([]);
  const getServiceType = async () => {
    try {
      const response = await myAxios.get(
        `${Apiendpoints.GET_SERVICETYPE}?service=${SERVICE_TYPE.utility}`
      );
      const serviceTypeList = response?.data?.data;
      serviceTypeList.forEach((item: any) => {
        setBannerList((prev: string[]) => [...prev, item.banner]);
      });
      setServiceSubTypeList(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getServiceType();
    return () => {};
  }, []);

  useEffect(() => {
    dispatch(changeBiller(''));
    if (servicesubtype) dispatch(getBillers({ servicesubtype }));
  }, [servicesubtype]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setServiceSubType(newValue);
  };
  return (
    <>
      <Head>
        <title> Bill Payments | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <TabContext value={servicesubtype}>
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 0.5 }}>
            <Tabs
              value={servicesubtype}
              variant={!ismobile ? 'fullWidth' : 'scrollable'}
              scrollButtons="auto"
              textColor="secondary"
              onChange={handleChange}
              indicatorColor="secondary"
              aria-label="scrollable type selection"
            >
              {checklength(serviceSubTypeList) &&
                serviceSubTypeList.map((item: any, index: any) => (
                  <Tab
                    key={index}
                    label={item.service_type}
                    value={item.service_type}
                    icon={<TabIconImg icon={item.icon} />}
                  />
                ))}
            </Tabs>
          </Box>
          <>
            {checklength(serviceSubTypeList) &&
              serviceSubTypeList.map((item: any, index: any) => (
                <CustomTabPanel key={index} value={item.service_type}>
                  <BillPaymentsTab bannerList={bannerList} />
                </CustomTabPanel>
              ))}
          </>
        </TabContext>
      </Container>
    </>
  );
}
