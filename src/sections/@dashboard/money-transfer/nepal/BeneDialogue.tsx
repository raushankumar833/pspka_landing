import { useMemo, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

export default function BeneDialogue() {
  const [open, setOpen] = useState(false);
  const ismobile = useResponsive('down', 'md');
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  const defaultValues = useMemo(
    () => ({
      first_name: '',
    }),
    []
  );
  const bankSchema = Yup.object().shape({
    gender: Yup.string().required('Gender is required'),
  });

  const methods = useForm({
    resolver: yupResolver(bankSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  // FORM SUBMIT API CALL . . .
  const onSubmit = async (data: any) => {};

  return (
    <>
      <Button
        size="small"
        startIcon={<Iconify icon="basil:add-outline" />}
        onClick={handleOpen}
        sx={!ismobile ? beneButton : null}
      >
        Add Receiver
      </Button>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Create New Nepal Receiver</DialogTitle>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ overflow: 'unset' }}>hello</DialogContent>
          <DialogActions>
            <Button color="inherit" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Proceed
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}

const beneButton = {
  position: 'absolute',
  bottom: '0px',
  left: '50%',
  zIndex: 9,
  transform: 'translateX(-50%)',
};
