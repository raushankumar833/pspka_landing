import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material';
import * as Yup from 'yup';
// import ConfirmDialog from 'src/components/confirm-dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material/styles';
// import { appContext } from 'src/context/appContext';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { apiErrorToast } from 'src/utils/toastFire';
// import RHFCodes2 from 'src/components/hook-form/RHFCodes2';
// import { Icon } from '@iconify/react';
import FormProvider from 'src/components/hook-form/FormProvider';
import { LoadingButton } from '@mui/lab';
// import ComplaintInterface from 'src/@types/complaint';
import { RHFTextField } from 'src/components/hook-form';
// import useResponsive from 'src/hooks/useResponsive';
import { useSnackbar } from 'notistack';
// import Iconify from 'src/components/iconify';
import { TransactionInterface } from 'src/@types/clients';
// import { AnyAction } from 'redux';

type PopOverType = {
    row: TransactionInterface | undefined;
    open: boolean;
    setDrawer: any;
}

// const STATUS_CHOICES = [
//   {label: 'PENDING', value: 'PENDING'},
//   {label: 'RESOLVED', value: 'RESOLVED'},
// ]

const RaiseComplaintPopover = (props: PopOverType) => {
    // const [openConfirm, setOpenConfirm] = useState(true);
    const [loading, setLoading] = useState(false);
    const { reset } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    // const isMobile = useResponsive('down', 'md');

    const VerifyCodeSchema = Yup.object().shape({
      // status: Yup.string().required('Complaint Status is required.')
    });

    console.log("loading", loading)
  
    const methods = useForm({
      mode: 'onSubmit',
      resolver: yupResolver(VerifyCodeSchema),
    });

    const {
      handleSubmit
    } = methods;

    const onSubmit = async (data: any) => {
        console.log("Called create complaint", data.message)
        data = {
          id: props.row?.id,
          message: data.message
        }
        postJsonData(
          Apiendpoints.CREATE_COMPLAINT,
          data,
          setLoading,
          (res) => {
            enqueueSnackbar("Status Updated Successfully");
            handleCloseConfirm();
            reset()
          },
          (err) => {
            apiErrorToast(err);
            enqueueSnackbar("Something went Wrong", { variant : 'error'});
          }
        );
      };

    const theme = useTheme();
    
    const handleCloseConfirm = () => {
    // onSubmit();
    props.setDrawer(false);
    };

    // const handleOpenConfirm = () => {
    // props.setDrawer(true);
    // // setDrawer(false);
    // };

  return (
        <div>
        {/* <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography variant="h5" sx={{mx: 'auto', display: 'inline'}}>
                Transaction Detail
            <Tooltip title='Raise Complaint'>
            <IconButton color={'default'} onClick={handleOpenConfirm}>
                <Iconify icon="emojione-monotone:raised-back-of-hand" />
            </IconButton>
            </Tooltip>
            </Typography>
        </div> */}
      <Dialog
        maxWidth="xs"
        fullWidth
        open={props.open}
        onClose={handleCloseConfirm}
        classes={{ root: 'MuiDialog-custom' }} // Add your custom class here
        sx={{backgroundColor: theme.palette.primary.light + 18}}
        // sx={{position: 'absolute', zIndex: 1001}}
        // PaperProps={{ style: { zIndex: 10000 } }}
      >
        <DialogTitle sx={{m: "0 auto"}} typography={"h4"}>Raise Complaint</DialogTitle>
        <div
                style={{
                  // width: '40%',
                  margin: '0 2rem 1rem 2rem',
                  // padding: '1rem',
                  color: 'black',
                  fontSize: '1rem',
                  borderRadius: '5px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  // alignItems: 'flex-end',
                  // gap: 1
                }}
          >
            <div style={{display: 'flex', flexDirection: 'column' }}>
              <p>Number</p>
              <p>Operator</p>
              <p>Charge</p>
              <p>Commission</p>
              <p>TDS</p>
              <p>Closing</p>
              <p>MOP</p>
              <p>Order Id</p>
            </div>
            <div style={{
              fontWeight: 'bold',
              textAlign: 'right'
              }}>
              <p>{(props.row && props.row.number) ? props.row.number : '-'}</p>
              {/* <p>{(props.row && props.row.op_code) ? props.row.op_code : '-'}</p> */}
              <p>1235485412312</p>
              <p>{(props.row && props.row.ret_charge) ? props.row.ret_charge : '-'}</p>
              <p>{(props.row && props.row.ret_comm) ? props.row.ret_comm : '-'}</p>
              <p>{(props.row && props.row.tds) ? props.row.tds : '-'}</p>
              <p>{(props.row && props.row.ad_closing) ? props.row.ad_closing : '-'}</p>
              <p>{(props.row && props.row.mop) ? props.row.mop : '-'}</p>
              <p>{(props.row && props.row.order_id) ? props.row.order_id : '-'}</p>
              {/* <p>{(row && row.status) ? row.status : '-'}</p>
              <p>{(row && row.amount) ? currencySetter(Number(row.amount)) : '-'}</p> */}
            </div>
          </div>
        <FormProvider methods={methods} >
        <Stack spacing={3} direction={"column"} justifyContent={"center"} alignItems={"center"}>
            {/* <RHFTextField style={{ width: isMobile ? '206px' : '546px'}} name="remarks" label="Remarks" /> */}
            <RHFTextField style={{ width: '90%'}} name="message" label="Message" />
            {/* <RHFSelect size="medium" name="status" label="Status" variant="filled"
                        style={{ width: isMobile ? '206px' : '546px'}}>
                          <option value="" />
                          {STATUS_CHOICES.map((option) => (
                            <option key={option.label} value={option.label}>
                              {option.label}
                            </option>
                          ))}
            </RHFSelect> */}
        </Stack>
          <DialogActions>
            <Button color="inherit" variant="outlined" onClick={handleCloseConfirm}>
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
              Proceed
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </div>
  )
}

export default RaiseComplaintPopover;
