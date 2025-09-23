import { useForm } from 'react-hook-form';
import BasicDetailsForm from './BasicDetailsForm';
import { ClientInterface } from 'src/@types/clients';
import CompanyDetailsForm from './CompanyDetailsForm';
import PermissionGaurd from 'src/auth/PermissionGaurd';
import { CustomFile } from '../../../components/upload';
import { LoadingButton, TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import FormProvider from '../../../components/hook-form';
import { Alert, Button, Card, Grid, Paper, Stack, Tab, Typography } from '@mui/material';
import CropEasy from 'src/utils/crop/CropEasy';
import { fData } from 'src/utils/formatNumber';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { axiousMultipartFormData } from 'src/utils/axiousMultipartFormData';
import { HOST_API_KEY } from 'src/config';
import { appContext } from 'src/context/appContext';
import { useSnackbar } from '../../../components/snackbar';
import { extractErrors } from 'src/utils/extractError';

// ----------------------------------------------------------------------
export interface FormValuesProps extends Omit<ClientInterface, 'logo'> {
  logo: CustomFile | string | null;
  favicon: CustomFile | string | null;
  squareLogo: CustomFile | string | null;
}

type Props = {
  isEdit?: boolean;
  currentUser?: ClientInterface;
  logos?: ClientInterface;
  tpin?:ClientInterface;
  getLogos?: () => void;
  getData?: () => void;
};

export default function ClientNewEditForm({
  isEdit = false,
  currentUser,
  logos,
  getLogos,
  getData,
}: Props) {
  const { setLoading } = useContext(appContext);
  const [tabValue, setTabValue] = useState('1');
  const [logo1_1, setLogo1_1] = useState(null);
  const [logo20_6, setLogo20_6] = useState(null);
  const [favicon, setFavicon] = useState(null);
  const [error, setError] = useState('');
  const [logo1_1_url, setLogo1_1_url] = useState(logos?.logo ?? '');
  const [logo20_6_url, setLogo20_6_url] = useState(logos?.logo ?? '');
  const [favicon_url, setFavicon_url] = useState(logos?.logo ?? '');
  const [openCropStates, setOpenCropStates] = useState({
    logo1_1: false,
    logo20_6: false,
    favicon: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const defaultValues = useMemo(
    () => ({
      logo: logos?.logo || '',
      favicon: logos?.favicon || '',
      squareLogo: logos?.squareLogo || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [logos]
  );

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });
  const {
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const uploadLogos = () => {
    const formData = new FormData();

    if (logo1_1 && logo20_6 && favicon) {
      formData.append('squareLogo', logo1_1);
      formData.append('logo', logo20_6);
      formData.append('favicon', favicon);
      setError('');
    } else if (!favicon) {
      setError('Upload Favicon before proceeding!');
      return;
    } else if (!logo1_1) {
      setError('Upload Logo of ratio 1 X 1 before proceeding!');
      return;
    } else if (!logo20_6) {
      setError('Upload Logo of ratio 20 X 6 before proceeding!');
      return;
    }

    axiousMultipartFormData(
      `${HOST_API_KEY}user/${currentUser?.username}/${Apiendpoints.LOGO_UPLOAD}`,
      formData,
      setLoading,
      (res: any) => {
        enqueueSnackbar(res.data.message);
        if (getData) getData();
        if (getLogos) getLogos();
      },
      (err: any) => {
        enqueueSnackbar(extractErrors(err), { variant: 'error' });
      }
    );
  };

  useEffect(() => {
    if (logo1_1 || logo20_6 || favicon) setError('');

    return () => {};
  }, [logo1_1, logo20_6, favicon]);

  return (
    <Grid container spacing={3}>
      <PermissionGaurd permission={isEdit}>
        <Grid item xs={12} md={12}>
          <Card sx={{ pt: 1, pb: 2, px: 3 }}>
            <TabContext value="company_logos">
              <Paper
                elevation={0}
                sx={{
                  display: 'flex',
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  flexWrap: 'wrap',
                }}
              >
                <TabList aria-label="company logo tabs">
                  <Tab label={<Button>Company Logos</Button>} value="company_logos" />
                </TabList>
              </Paper>
            </TabContext>
            {error && <Alert severity="error">{error}</Alert>}
            <FormProvider methods={methods}>
              <Grid container mt={2}>
                <Grid item md={4} xs={12}>
                  <CropEasy
                    photoURL={favicon_url}
                    setPhotoURL={setFavicon_url}
                    aspectRatio={1}
                    file={favicon}
                    setFile={setFavicon}
                    openCrop={openCropStates.favicon}
                    setOpenCrop={(value: any) =>
                      setOpenCropStates((prevState) => ({ ...prevState, favicon: value }))
                    }
                    id="favicon"
                    label="Favicon"
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png
                        <br /> max size of {fData(1000000)}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <CropEasy
                    photoURL={logo1_1_url}
                    setPhotoURL={setLogo1_1_url}
                    aspectRatio={1}
                    file={logo1_1}
                    setFile={setLogo1_1}
                    openCrop={openCropStates.logo1_1}
                    setOpenCrop={(value: any) =>
                      setOpenCropStates((prevState) => ({ ...prevState, logo1_1: value }))
                    }
                    id="logo1_1"
                    label="Logo (1 * 1 ratio)"
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png
                        <br /> max size of {fData(1000000)}
                      </Typography>
                    }
                  />
                </Grid>
                <Grid item md={4} xs={12}>
                  <CropEasy
                    photoURL={logo20_6_url}
                    setPhotoURL={setLogo20_6_url}
                    aspectRatio={20 / 6}
                    file={logo20_6}
                    setFile={setLogo20_6}
                    openCrop={openCropStates.logo20_6}
                    setOpenCrop={(value: any) =>
                      setOpenCropStates((prevState) => ({ ...prevState, logo20_6: value }))
                    }
                    id="logo20_6"
                    label="Logo (20 * 6) ratio"
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png
                        <br /> max size of {fData(1000000)}
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  onClick={() => uploadLogos()}
                  variant="contained"
                  loading={isSubmitting}
                >
                  {!isEdit ? 'Create User' : 'Save Changes'}
                </LoadingButton>
              </Stack>
            </FormProvider>
          </Card>
        </Grid>
      </PermissionGaurd>

      <Grid item xs={12} md={isEdit ? 12 : 12}>
        <Card sx={{ p: 3 }}>
          <TabContext value={tabValue}>
            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                border: (theme) => `1px solid ${theme.palette.divider}`,
                flexWrap: 'wrap',
              }}
            >
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label={<Button>Basic Registration Details</Button>} value="1" />
                {isEdit && <Tab label={<Button>Company Details</Button>} value="2" />}
              </TabList>
            </Paper>

            <TabPanel value="1">
              <BasicDetailsForm isEdit={isEdit} currentUser={currentUser} />
            </TabPanel>
            <TabPanel value="2">
              <CompanyDetailsForm isEdit={isEdit} currentUser={currentUser} />
            </TabPanel>
          </TabContext>
        </Card>
      </Grid>
    </Grid>
  );
}
