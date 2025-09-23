import React, { useEffect, useMemo, useState } from 'react';
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
import { RHFTextField } from 'src/components/hook-form';
import useResponsive from 'src/hooks/useResponsive';
import EditIcon from '@mui/icons-material/Edit';
import { patchJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { apiErrorToast } from 'src/utils/toastFire';

type PopType = {
  row: any;
};

export default function UpdatePlanDialogue({ row }: PopType) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = useResponsive('down', 'md');

  const handleOpen = () => {
    setOpen(true);
    console.log(loading)
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  const defaultValues = useMemo(
    () => ({
      operator: row?.operator || '',
      plan: row?.id || '',
      validity: row?.validity || '',
      description: row?.description || '',
    }),
    [row]
  );

  const creditSchema = Yup.object().shape({
    operator: Yup.string(),
    plan: Yup.string(),
    validity: Yup.string().required('Validity is required'),
    description: Yup.string().required('Description is required'),
  });

  const methods = useForm({
    resolver: yupResolver(creditSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue } = methods;

  useEffect(() => {
    setValue('operator', row?.operator || '');
    setValue('plan', row?.id || '');
    setValue('validity', row?.validity || '');
    setValue('description', row?.description || '');
  }, [setValue, row]);

  const onSubmit = async (data: any) => {
    data.id = row?.id;
    patchJsonData(
      Apiendpoints.UPDATE_PLAN,
      data,
      '',
      setLoading,
      (res) => {
        console.log('res', res);
        handleClose();
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  return (
    <>
      <EditIcon color="primary" onClick={handleOpen} />

      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
        classes={{ root: 'MuiDialog-custom' }}
      >
        <DialogTitle style={{ textAlign: "center", fontSize: "1.7rem" }}>Update Plan</DialogTitle>

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
                  <span style={{ display: 'flex' }}>
                    <RHFTextField
                      style={{ width: isMobile ? '200px' : '180px', margin: '2px' }}
                      name="operator"
                      label="Operator"
                    />
                    <RHFTextField
                      style={{ width: isMobile ? '200px' : '180px', margin: '2px' }}
                      name="plan"
                      label="Plan"
                    />
                    <RHFTextField
                      style={{ width: isMobile ? '200px' : '180px', margin: '2px' }}
                      name="validity"
                      label="Validity"
                    />
                  </span>
                  <br />
                  <RHFTextField
                    style={{ width: isMobile ? '206px' : '546px' }}
                    name="description"
                    label="Description"
                  />
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
              Update
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}
