import { useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import useResponsive from 'src/hooks/useResponsive';
import { RHFTextField } from 'src/components/hook-form';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { apiErrorToast } from 'src/utils/toastFire';
// ----------------------------------------------------------------------

export default function ChangeTpinDialogue({ refresh }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useResponsive('down', 'md');
  console.log(loading);

  const handleOpen = async () => {
    // try {
    //   const resp = await myAxios.get(Apiendpoints.GET_ADMIN_BANKS);
    //   const cr_modes = await myAxios.get(Apiendpoints.GET_MODES);
    // console.log('resp', resp.data)
    //   setBanks(resp.data.data);
    //   setModes(cr_modes.data.data);
    setOpen(true);
    // } catch (error) {
    //   apiErrorToast(error);
    // }
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  const defaultValues = useMemo(
    () => ({
      oldTpin: '',
      newTpin: '',
      verifyNewTpin: '',
    }),

    []
  );
  const creditSchema = Yup.object().shape({
    oldTpin: Yup.number().required('Old TPIN required'),
    newTpin: Yup.number().required('New TPIN is required'),
    veridyNewTpin: Yup.number().required('Verify New TPIN'),
  });

  const methods = useForm({
    resolver: yupResolver(creditSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: {},
  } = methods;

  // FORM SUBMIT API CALL . . .
  const onSubmit = async (data: any) => {
    postJsonData(
      Apiendpoints.CREATE_NOTIFICATION,
      data,
      setLoading,
      (res) => {
        console.log('res', res);
        handleClose();
        if (refresh) refresh();
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  return (
    <>
      <Button
        // size="small"
        // variant="contained"
        // startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleOpen}
        // sx={notificationButton}
      >
        Change TPIN
      </Button>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
        classes={{ root: 'MuiDialog-custom' }} // Add your custom class here
      >
        <DialogTitle>Change TPIN</DialogTitle>

        <FormProvider methods={methods}>
          <DialogContent sx={{ overflow: 'unset' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <RHFTextField
                      style={{ width: isMobile ? '400px' : '480px', margin: '5px' }}
                      name="oldTpin"
                      label="Old TPIN"
                    />
                    <RHFTextField
                      style={{ width: isMobile ? '400px' : '480px', margin: '5px' }}
                      name="newTpin"
                      label="New TPIN"
                    />
                    <RHFTextField
                      style={{ width: isMobile ? '400px' : '480px', margin: '5px' }}
                      name="verifyNewTpin"
                      label="Verify New TPIN"
                    />
                  </div>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button color="inherit" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            {/* <LoadingButton type="submit" variant="contained" loading={isSubmitting || loading}> */}
            <LoadingButton type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
              Proceed
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
