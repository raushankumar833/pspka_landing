import { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  Box,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Mount from '../component-mount/Mount';
// import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

export default function FetchBillDialog({
  openDialog,
  setOpenDialog,
  billDetails,
  setBillDetails,
  openTpin,
}: any) {
  // console.log('data in fetch bill', billDetails);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  //   const isMobile = useResponsive('down', 'md');

  // const { billerDetails } = useSelector((state) => state.recharge_bills);
  // console.log('billersss', billerDetails);

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDialog('');
    setBillDetails({});
    reset(defaultValues);
  };

  const defaultValues = useMemo(
    () => ({}),

    []
  );
  const creditSchema = Yup.object().shape({});

  const methods = useForm({
    resolver: yupResolver(creditSchema),
    defaultValues,
  });

  const {
    // handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  // FORM SUBMIT API CALL . . .
  const onSubmit = () => {
    setLoading(false)
    if (openTpin) openTpin();
  };

  useEffect(() => {
    if (openDialog === 'open') {
      handleOpen();
    }
  }, [openDialog]);

  return (
    <>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
        classes={{ root: 'MuiDialog-custom' }} // Add your custom class here
      >
        <DialogTitle>Bill Details</DialogTitle>

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
                <Mount visible={billDetails?.BillAmount}>
                  <Typography>Amount</Typography>
                  <Typography>{billDetails?.BillAmount}</Typography>
                </Mount>
                <Mount visible={billDetails?.CustomerName}>
                  <Typography>Customer Number</Typography>
                  <Typography>{billDetails?.CustomerName}</Typography>
                </Mount>
                <Typography>{billDetails?.CustomerParamsDetails[0]?.Name}</Typography>
                <Typography>{billDetails?.CustomerParamsDetails[0]?.Value}</Typography>
                <Mount visible={billDetails?.BillDate}>
                  <Typography>Bill Date</Typography>
                  <Typography>{billDetails?.BillDate}</Typography>
                </Mount>
                <Mount visible={billDetails?.BillDueDate}>
                  <Typography>Bill Due Date</Typography>
                  <Typography>{billDetails?.BillDueDate}</Typography>
                </Mount>
                <Mount visible={billDetails?.BillNumber}>
                  <Typography>Bill Number</Typography>
                  <Typography>{billDetails?.BillNumber}</Typography>
                </Mount>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            // type="submit"
            variant="contained"
            loading={isSubmitting || loading}
            onClick={onSubmit}
          >
            Proceed
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

