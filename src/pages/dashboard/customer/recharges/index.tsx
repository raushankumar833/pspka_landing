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
import MobileRecharge from 'src/sections/@dashboard/recharges/MobileRecharge';
import DthRecharge from 'src/sections/@dashboard/recharges/DthRecharge';
import { myAxios } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { SERVICE_SUBTYPE, SERVICE_TYPE } from 'src/utils/constants';
import { checklength } from 'src/utils/flattenArray';
import { dispatch } from 'src/redux/store';
import { changeBiller, getBillers } from 'src/redux/my-slices/recharge_bills';
import { TabIconImg } from '../money-transfer';

// ----------------------------------------------------------------------

Recharges.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const CustomTabPanel = styled(TabPanel)({
  padding: '24px 0px',
});

export default function Recharges() {
  const { themeStretch } = useSettingsContext();
  const [serviceSubTypeList, setServiceSubTypeList] = useState([]);
  const [servicesubtype, setServiceSubType] = useState(SERVICE_SUBTYPE.mobile);
  const [serviceIllustration, setServiceIllustration] = useState();
  const [bannerImg, setBannerImg] = useState('');
  
  const getServiceType = async () => {
    try {
      const response = await myAxios.get(
        `${Apiendpoints.GET_SERVICETYPE}?service=${SERVICE_TYPE.recharge}`
      );
      if (response) {
        response?.data?.data.map((item: any) => {
          setServiceIllustration(item?.ref_img);
          setBannerImg(item?.banner);
        });
        setServiceSubTypeList(response?.data?.data);
      }
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
        <title> Recharges | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <TabContext value={servicesubtype}>
          <Box sx={{ bgcolor: 'background.paper', borderRadius: 0.5 }}>
            <Tabs
              value={servicesubtype}
              variant="fullWidth"
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
            <CustomTabPanel value={SERVICE_SUBTYPE.mobile}>
              <MobileRecharge serviceIllustration={serviceIllustration} />
            </CustomTabPanel>
            <CustomTabPanel value={SERVICE_SUBTYPE.dth}>
              <DthRecharge serviceIllustration={serviceIllustration} bannerImg={bannerImg} />
            </CustomTabPanel>
          </>
        </TabContext>
      </Container>
    </>
  );
}
