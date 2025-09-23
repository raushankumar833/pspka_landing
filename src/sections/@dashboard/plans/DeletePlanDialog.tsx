import React, { useMemo, useState } from 'react';
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
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { apiErrorToast } from 'src/utils/toastFire';
import DeleteIcon from '@mui/icons-material/Delete';

// type DeletePop = {
//   row: any;
// };

export default function DeletePlanDialog({ refresh, row }: { refresh: any; row: any }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  // const isMobile = useResponsive('down', 'md');
  console.log(loading)
  const handleOpen = () => {
    setOpen(true);
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

  const { handleSubmit, reset } = methods;

  const onSubmit = async (id: any) => {

    postJsonData(
      Apiendpoints.DELETE_PLAN,
      { id: row?.id },
      setLoading,
      (res) => {
        console.log('res', res);
        handleClose();
        if (refresh) refresh();
      },
      (err) => {
        apiErrorToast(err);
        handleClose();
      }
    );
  };

  return (
    <>
      <DeleteIcon color="warning" style={{ margin: 6 }} onClick={handleOpen} />

      <Dialog
        maxWidth="xs"

        open={open}
        onClose={handleClose}
        classes={{ root: 'MuiDialog-custom' }}
      >
        <DialogTitle style={{ textAlign: "center", fontSize: "1.7rem" }}>Delete Plan</DialogTitle>

        <FormProvider methods={methods}>
          <DialogContent sx={{ overflow: 'unset' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Box
                  rowGap={1}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <p style={{ textAlign: 'left', marginLeft: "15px" }}>Operator</p>
                  <h5 style={{ textAlign: 'right', marginRight: "15px", fontWeight: 'bold' }}>{row?.operator}</h5>
                  <p style={{ textAlign: 'left', marginLeft: "15px" }}>plan</p>
                  <h5 style={{ textAlign: 'right', marginRight: "15px", fontWeight: 'bold' }}>{row?.plan}</h5>
                  <p style={{ textAlign: 'left', marginLeft: "15px" }}>validity</p>
                  <h5 style={{ textAlign: 'right', marginRight: "15px", fontWeight: 'bold' }}>{row?.validity}</h5>
                  <p style={{ textAlign: 'left', marginLeft: "15px" }}>description</p>
                  <h5 style={{ textAlign: 'right', marginRight: "15px", fontWeight: 'bold' }}>{row?.description}</h5>

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

            <LoadingButton type="submit" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
              Delete
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}

// const planButton = {
//   px: 2,
//   py: 2.5,
// };
