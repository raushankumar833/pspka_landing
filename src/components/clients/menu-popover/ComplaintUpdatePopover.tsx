import React, { useState } from 'react'
import { Button, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material';
import * as Yup from 'yup';
// import ConfirmDialog from 'src/components/confirm-dialog';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// import { appContext } from 'src/context/appContext';
import { patchJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { apiErrorToast } from 'src/utils/toastFire';
// import RHFCodes2 from 'src/components/hook-form/RHFCodes2';
import { Icon } from '@iconify/react';
import FormProvider from 'src/components/hook-form/FormProvider';
import { LoadingButton } from '@mui/lab';
import ComplaintInterface from 'src/@types/complaint';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import useResponsive from 'src/hooks/useResponsive';
import { useSnackbar } from 'notistack';
// import { AnyAction } from 'redux';

type PopOverType = {
    row: ComplaintInterface;
}

const STATUS_CHOICES = [
  {label: 'PENDING', value: 'PENDING'},
  {label: 'RESOLVED', value: 'RESOLVED'},
]

const ComplaintUpdatePopover = ({row}: PopOverType) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    // const { userName } = useContext(appContext)
    const [loading, setLoading] = useState(false);
    // const { reset } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    const isMobile = useResponsive('down', 'md');

    const VerifyCodeSchema = Yup.object().shape({
      status: Yup.string().required('Complaint Status is required.'),
    //   code2: Yup.string().required('Code is required'),
    //   code3: Yup.string().required('Code is required'),
    //   code4: Yup.string().required('Code is required'),
    //   code5: Yup.string().required('Code is required'),
    //   code6: Yup.string().required('Code is required'),
    });

    console.log("loading", loading)

    // const defaultValues = {
    //   code1: '',
    //   code2: '',
    //   code3: '',
    //   code4: '',
    //   code5: '',
    //   code6: '',
    // };
  
    const methods = useForm({
      mode: 'onSubmit',
      resolver: yupResolver(VerifyCodeSchema),
      // defaultValues,
    });

    const {
      handleSubmit,
      reset,
      // formState: {  },
    } = methods;

    const onSubmit = async (data: any) => {
        // console.log("This is your username in the context", userName)
        data.id = row?.id
        patchJsonData(
          Apiendpoints.UPDATE_COMPLAINT,
          data,
          '',
          setLoading,
          (res) => {
            enqueueSnackbar("Status Updated Successfully");
            handleCloseConfirm();
            reset()
          },
          (err) => {
            console.log("This is your error", err)
            apiErrorToast(err);

            // enqueueSnackbar("Something went Wrong", { variant : 'error'});
          }
        );
      };
    
    const handleCloseConfirm = () => {
    // onSubmit();
    reset();
    setOpenConfirm(false);
    };

    const handleOpenConfirm = () => {
    setOpenConfirm(true);
    };

  return (
    <div>
      <Button onClick={handleOpenConfirm}>
            <Icon icon="ic:baseline-apps" style={{ color: 'green', fontSize: '25px' }} />
      </Button>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={openConfirm}
        onClose={handleCloseConfirm}
        classes={{ root: 'MuiDialog-custom' }} // Add your custom class here
      >
        <DialogTitle sx={{m: "0 auto"}} typography={"h4"}>Update Complaint</DialogTitle>

        <FormProvider methods={methods} >
        <Stack spacing={3} direction={"column"} justifyContent={"center"} alignItems={"center"}>
            <RHFTextField style={{ width: isMobile ? '206px' : '546px'}} name="remark" label="Remarks" />
            <RHFSelect size="medium" name="status" label="Status" variant="filled"
                        style={{ width: isMobile ? '206px' : '546px'}}>
                          <option value="" />
                          {STATUS_CHOICES.map((option) => (
                            <option key={option.label} value={option.label}>
                              {option.label}
                            </option>
                          ))}
            </RHFSelect>
            {/* <RHFCodes2
              variant="outlined"
              keyName="code"
              inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']}
            /> */}
        </Stack>
          <DialogActions>
            <Button color="inherit" variant="outlined" onClick={handleCloseConfirm}>
              Cancel
            </Button>
            {/* <LoadingButton type="submit" variant="contained" loading={isSubmitting || loading}> */}
            <LoadingButton type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
              Proceed
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
      {/* <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="KYC Updation"
        content={<>KYC Updation</>}
        action={
          <Button
            variant="contained"
            color="success"
            onClick={() => {
            //   onSubmit();
            }}
            disabled={loading}
          >
            Submit
          </Button>
        }
        /> */}
    </div>
  )
}

// export const notificationButton = {
//     px: 2,
//     py: 2.5,
//     mx: 2,
//     my: 0
//   };

export default ComplaintUpdatePopover;
