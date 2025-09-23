import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import FormProvider from '../hook-form/FormProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { RHFTextField } from '../hook-form';
import { LoadingButton } from '@mui/lab';

const defaultValues = {
  message: '',
};

const AdminActionDialogue = ({ row, title }: any) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // RHF

  const actionSchema = Yup.object().shape({
    message: Yup.string().required('Message is required'),
  });

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(actionSchema),
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Icon icon="mi:undo" style={{ fontSize: '15px' }} />
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ p: 3, px: 6, pt: 1 }}>
            <Grid container sx={{ my: 1 }}>
              <Grid item xs={12} md={12}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(1, 1fr)',
                  }}
                >
                  <RHFTextField name="message" label="Message" />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="inherit" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained">
              Proceed
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default AdminActionDialogue;
