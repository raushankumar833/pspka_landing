import Head from 'next/head';
import { Container, styled } from '@mui/material';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import DMTContainer from 'src/sections/@dashboard/money-transfer/DMTContainer';
import { MONEY_TRANSFER, SERVICE_TYPE } from 'src/utils/constants';
import { changeTransferType } from 'src/redux/my-slices/recharge_bills';
import { dispatch, useSelector } from 'src/redux/store';
import { StyledIcon } from 'src/components/nav-section/vertical/styles';
import SvgColor from 'src/components/svg-color';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import useResponsive from 'src/hooks/useResponsive';
import UpiContainer from 'src/sections/@dashboard/money-transfer/UpiContainer';
import NepalContainer from 'src/sections/@dashboard/money-transfer/NepalContainer';
import VendorContainer from 'src/sections/@dashboard/money-transfer/VendorContainer';
import Mount from 'src/components/component-mount/Mount';
import { useEffect, useState } from 'react';
import { get, myAxios } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { checklength } from 'src/utils/flattenArray';
import MyLoader from 'src/components/loading-screen/MyLoader';
import { apiErrorToast } from 'src/utils/toastFire';

// ----------------------------------------------------------------------

interface Services {
  service_type: string;
  icon: string;
}

MoneyTransfer.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

const CustomTabPanel = styled(TabPanel)({
  padding: '24px 0px',
});

export default function MoneyTransfer() {
  const [isLoadingVendor, setIsLoadingVendor] = useState(false);
  const [vendorsData, setVendorsData] = useState<any>(null);
  // console.log('vendor in main', vendorsData);

  const { themeStretch } = useSettingsContext();
  const ismobile = useResponsive('down', 'md');
  const { moneyTransferType } = useSelector((state) => state.recharge_bills);
  const [serviceTypeLoading, setServiceTypeLoading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    dispatch(changeTransferType(newValue));
  };

  const [serviceSubTypeList, setServiceSubTypeList] = useState([]);
  const [bannerList, setBannerList] = useState<string[]>([]);

  const getServiceType = async () => {
    setServiceTypeLoading(true);
    try {
      const response = await myAxios.get(
        `${Apiendpoints.GET_SERVICETYPE}?service=${SERVICE_TYPE.money_transfer}`
      );

      const serviceTypeList = response?.data?.data;
      serviceTypeList.forEach((item: any) => {
        setBannerList((prev: string[]) => [...prev, item.banner]);

        if (item.is_selected) {
          dispatch(
            changeTransferType(
              MONEY_TRANSFER[item.service_type as keyof typeof MONEY_TRANSFER]?.value
            )
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

    return () => { };
  }, []);

  // get remitter api call with watch of RHF
  const getVendors = () => {
    get(
      moneyTransferType === 'vp' || moneyTransferType === 'upi' ? Apiendpoints.GET_VENDORS : '',
      `${moneyTransferType === 'vp'
        ? 'vendorType=ACC'
        : moneyTransferType === 'upi'
          ? 'vendorType=UPI'
          : ''
      }`,
      setIsLoadingVendor,
      (res) => {
        // console.log('data', res);
        setVendorsData(res);
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  useEffect(() => {
    if (moneyTransferType === 'vp' || moneyTransferType === 'upi') {
      getVendors();
    }
  }, [moneyTransferType]);

  return (
    <>
      <Head>
        <title> MoneyTransfer | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <TabContext value={moneyTransferType}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: 0.5,
              px: 1.5,
            }}
          >
            <Tabs
              value={moneyTransferType}
              onChange={handleChange}
              variant={!ismobile ? 'fullWidth' : 'scrollable'}
              scrollButtons="auto"
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="scrollable type selection"
            >
              {checklength(serviceSubTypeList) &&
                serviceSubTypeList.map((item: Services, index: number) => (
                  <Tab
                    key={index}
                    label={MONEY_TRANSFER[item.service_type as keyof typeof MONEY_TRANSFER]?.label}
                    value={MONEY_TRANSFER[item.service_type as keyof typeof MONEY_TRANSFER]?.value}
                    icon={<TabIconImg icon={item.icon} width="42px" />}
                  />
                ))}
              {/* <Tab
                icon={<TabIcon icon="ic_money_transfer" />}
                label="DMT 1"
                value={MONEY_TRANSFER.dmt1}
              />
              <Tab
                icon={<TabIcon icon="ic_money_transfer2" />}
                label="DMT 2"
                value={MONEY_TRANSFER.dmt2}
              />
              <Tab
                icon={<TabIcon icon="ic_upi_transfer" />}
                label="UPI Transfer"
                value={MONEY_TRANSFER.upi}
              />
              <Tab
                icon={<TabIcon icon="ic_nepal" />}
                label="Nepal Transfer"
                value={MONEY_TRANSFER.nepal}
              />
              <Tab
                icon={<TabIcon icon="ic_vendor_payments" />}
                label="Vendor Payments"
                value={MONEY_TRANSFER.vendor}
                sx={{
                  textAlign: 'left',
                }}
              /> */}
            </Tabs>
          </Box>

          <Scrollbar>
            <Mount visible={!moneyTransferType}>
              <MyLoader loading={serviceTypeLoading} />
            </Mount>
            <Box
            // sx={{
            //   height: '300px',
            // }}
            >
              <CustomTabPanel value={MONEY_TRANSFER['DMT1'].value}  >
                <DMTContainer bannerList={bannerList} serviceType={MONEY_TRANSFER['DMT1'].value} />
              </CustomTabPanel>
              <CustomTabPanel value={MONEY_TRANSFER['DMT2'].value}>
                <DMTContainer bannerList={bannerList} serviceType={MONEY_TRANSFER['DMT2'].value} />
              </CustomTabPanel>
              <CustomTabPanel value={MONEY_TRANSFER['UPI TRANSFER'].value}>
                <UpiContainer
                  vendorsData={vendorsData}
                  setVendorsData={setVendorsData}
                  isLoading={isLoadingVendor}
                  getVendors={getVendors}
                />
              </CustomTabPanel>
              <CustomTabPanel value={MONEY_TRANSFER['NEPAL TRANSFER'].value}>
                <NepalContainer />
              </CustomTabPanel>
              <CustomTabPanel value={MONEY_TRANSFER['VENDOR PAYMENTS'].value}>
                {vendorsData && (
                  <VendorContainer
                    vendorsData={vendorsData}
                    setVendorsData={setVendorsData}
                    // setOpen={set}
                    isLoading={isLoadingVendor}
                    getVendors={getVendors}
                  />
                )}
              </CustomTabPanel>
            </Box>
          </Scrollbar>
        </TabContext>
      </Container>
    </>
  );
}

export function TabIcon({ icon }: any) {
  return (
    <StyledIcon>
      <SvgColor src={`/assets/icons/navbar/${icon}.svg`} sx={{ width: 1, height: 1 }} />
    </StyledIcon>
  );
}

export function TabIconImg({ icon, width = '32px' }: any) {
  return (
    // <StyledIcon>
    //   <SvgColor src={`/assets/icons/navbar/${icon}.svg`} sx={{ width: 1, height: 1 }} />
    // </StyledIcon>
    <img src={icon} style={{ height: width, width: width, margin: '0 10px' }} alt="" />
  );
}
