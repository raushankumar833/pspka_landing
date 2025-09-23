import Head from 'next/head';
import { Container, styled } from '@mui/material';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { SERVICE_TYPE, TRAVEL_TYPE } from 'src/utils/constants';
import { dispatch, useSelector } from 'src/redux/store';
import { StyledIcon } from 'src/components/nav-section/vertical/styles';
import SvgColor from 'src/components/svg-color';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import useResponsive from 'src/hooks/useResponsive';
import { changeTravelType } from 'src/redux/my-slices/travel';
import { myAxios } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { useEffect, useState } from 'react';
// import { changeTransferType } from 'src/redux/my-slices/recharge_bills';
import Mount from 'src/components/component-mount/Mount';
import MyLoader from 'src/components/loading-screen/MyLoader';
import { checklength } from 'src/utils/flattenArray';
import { TabIconImg } from '../money-transfer';
import IrctcContainer from 'src/sections/@dashboard/travel/IrctcContainer';

// ----------------------------------------------------------------------

Travel.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const CustomTabPanel = styled(TabPanel)({
  padding: '24px 0px',
});

export default function Travel() {
  const { themeStretch } = useSettingsContext();
  const ismobile = useResponsive('down', 'md');
  const { travelType } = useSelector((state) => state.travel);
  const [serviceTypeLoading, setServiceTypeLoading] = useState(false);
  const [bannerList, setBannerList] = useState<string[]>([]);
  const [serviceSubTypeList, setServiceSubTypeList] = useState([]);

  const getServiceType = async () => {
    setServiceTypeLoading(true);
    try {
      const response = await myAxios.get(
        `${Apiendpoints.GET_SERVICETYPE}?service=${SERVICE_TYPE.travel}`
      );

      console.log('response', response);

      const serviceTypeList = response?.data?.data;
      serviceTypeList.forEach((item: any) => {
        setBannerList((prev: string[]) => [...prev, item.banner]);

        if (item.is_selected) {
          dispatch(
            changeTravelType(TRAVEL_TYPE[item.service_type as keyof typeof TRAVEL_TYPE]?.value)
          );
        }
      });

      setServiceSubTypeList(serviceTypeList);
      setServiceTypeLoading(false);
    } catch (error) {
      setServiceTypeLoading(false);
    }
  };

  useEffect(() => {
    getServiceType();

    return () => {};
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(changeTravelType(newValue));
  };

  return (
    <>
      <Head>
        <title> Travel Booking | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <TabContext value={travelType}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 0.5,
            }}
          >
            <Tabs
              value={travelType}
              onChange={handleChange}
              variant={!ismobile ? 'fullWidth' : 'scrollable'}
              scrollButtons="auto"
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="scrollable type selection"
            >
              {checklength(serviceSubTypeList) &&
                serviceSubTypeList.map((item: any, index: number) => (
                  <Tab
                    key={index}
                    label={TRAVEL_TYPE[item.service_type as keyof typeof TRAVEL_TYPE]?.label}
                    value={TRAVEL_TYPE[item.service_type as keyof typeof TRAVEL_TYPE]?.value}
                    icon={<TabIconImg icon={item.icon} />}
                  />
                ))}
              {/* <Tab icon={<TabIcon icon="ic_train" />} label="Train" value={TRAVEL_TYPE.train} />
              <Tab icon={<TabIcon icon="ic_flight" />} label="Flight" value={TRAVEL_TYPE.flight} />
              <Tab icon={<TabIcon icon="ic_bus" />} label="Bus" value={TRAVEL_TYPE.bus} /> */}
            </Tabs>
          </Box>
          <Scrollbar>
            <Box>
              <Mount visible={!travelType}>
                <MyLoader loading={serviceTypeLoading} />
              </Mount>
              <CustomTabPanel value={TRAVEL_TYPE['IRCTC'].value}>
                <IrctcContainer bannerList={bannerList} />
              </CustomTabPanel>
              <CustomTabPanel value={TRAVEL_TYPE['FLIGHT'].value}>
                <IrctcContainer bannerList={bannerList} />
              </CustomTabPanel>
              <CustomTabPanel value={TRAVEL_TYPE['BUS'].value}>
                <IrctcContainer bannerList={bannerList} />
              </CustomTabPanel>
            </Box>
          </Scrollbar>
        </TabContext>
      </Container>
    </>
  );
}

export function TabIcon({ icon = 'ic_nepal' }) {
  return (
    <StyledIcon>
      <SvgColor src={`/assets/icons/navbar/${icon}.svg`} sx={{ width: 1, height: 1 }} />
    </StyledIcon>
  );
}
