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
import Iconify from 'src/components/iconify';
import useResponsive from 'src/hooks/useResponsive';
import { RHFTextField } from 'src/components/hook-form';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { apiErrorToast } from 'src/utils/toastFire';
// ----------------------------------------------------------------------


export default function CreatePlanDialogue({ refresh }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useResponsive('down', 'md');
  console.log(loading)
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
      operator: '',
      plan: '',
      validity: '',
      description: '',
    }),

    []
  );
  const creditSchema = Yup.object().shape({
    operator: Yup.string().required("Operator is required"),
    plan: Yup.number().required("Plan is required"),
    validity: Yup.string().required('Validity is required'),
    description: Yup.string().required('Description is required'),
  });

  const methods = useForm({
    resolver: yupResolver(creditSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { },
  } = methods;

  // FORM SUBMIT API CALL . . .
  const onSubmit = async (data: any) => {
    postJsonData(
      Apiendpoints.CREATE_PLAN,
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
        size="small"
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleOpen}
        sx={planButton}
      >
        Create Plan
      </Button>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
        classes={{ root: 'MuiDialog-custom' }} // Add your custom class here
      >
        <DialogTitle style={{ fontSize: "1.7rem", textAlign: "center" }}>Create Plan</DialogTitle>

        <FormProvider methods={methods} >
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
                  <span style={{ display: 'flex' }}>
                    <RHFTextField style={{ width: isMobile ? '200px' : '180px', margin: '2px' }} name="operator" label="Operator" />
                    <RHFTextField style={{ width: isMobile ? '200px' : '180px', margin: '2px' }} name="plan" label="Plan" />
                    <RHFTextField style={{ width: isMobile ? '200px' : '180px', margin: '2px' }} name="validity" label="Validity" />
                  </span><br />
                  <RHFTextField style={{ width: isMobile ? '206px' : '546px' }} name="description" label="Description" />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Box sx={{ flexGrow: 1 }}>
              <Button color="inherit" variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
            </Box>
            <LoadingButton type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
              Proceed
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}

const planButton = {
  px: 2,
  py: 2.5,
};
