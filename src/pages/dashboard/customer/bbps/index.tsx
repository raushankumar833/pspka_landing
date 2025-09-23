import Head from 'next/head';
import { Container } from '@mui/material';
import DashboardLayout from '../../../../layouts/dashboard';
import { useSettingsContext } from '../../../../components/settings';
import BBPSTab from 'src/sections/@dashboard/bbps/BBPSTab';
import { myAxios } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { SERVICE_TYPE } from 'src/utils/constants';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

BBPS.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BBPS() {
  const { themeStretch } = useSettingsContext();
  const [serviceSubType, setServiceSubType] = useState([]);

  const getServiceType = async () => {
    try {
      const response = await myAxios.get(
        `${Apiendpoints.GET_SERVICETYPE}?service=${SERVICE_TYPE.bbps}`
      );
      // console.log('resp', response?.data?.data);

      if (response) {
        response?.data?.data.forEach((item: any) => {
          setServiceSubType(item);
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getServiceType();

    return () => {};
  }, []);

  return (
    <>
      <Head>
        <title> BBPS | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <BBPSTab serviceSubType={serviceSubType} />
      </Container>
    </>
  );
}
