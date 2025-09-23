import { LoadingButton } from '@mui/lab'
import { Dialog, DialogActions, DialogTitle, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import * as Yup from 'yup';
import { useForm } from 'react-hook-form'
import { RHFTextField } from 'src/components/hook-form'
import FormProvider from 'src/components/hook-form/FormProvider'
import RHFCodes2 from 'src/components/hook-form/RHFCodes2'
import useResponsive from 'src/hooks/useResponsive'
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { useAuthContext } from 'src/auth/useAuthContext';

const OutletRegistrationPopover = () => {
    const {user} = useAuthContext()
    const [open, setOpen] = useState(user.instId)
    // const [open, setOpen] = useState(false)

    const [fetchedOtp, setFetchedOtp] = useState(false)
    const {enqueueSnackbar} = useSnackbar();
    const isMobile = useResponsive('down', 'md');


  const VerifyFormSchema = Yup.object().shape({
    name: Yup.string().required('Name is Required'),
    remark: Yup.string().required('Remark is Required'),
    detail: Yup.string().required('Detail is Required'),
    field1: Yup.string().required('Field1 is Required'),
  })

  const VerifyOtpSchema = Yup.object().shape({
    code1: Yup.number().required(),
    code2: Yup.number().required(),
    code3: Yup.number().required(),
    code4: Yup.number().required(),
    code5: Yup.number().required(),
    code6: Yup.number().required(),
  })

  const methods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(fetchedOtp ? VerifyOtpSchema : VerifyFormSchema)
  })

  const {
    handleSubmit,
    reset,
  } = methods;

  const handleClose = () => {
    setFetchedOtp(false);
    setOpen(false);
    reset();
  };

  const onSubmit = (data: any) => {
    console.log("Data", data)
    // Integrate Submission API here.
    setFetchedOtp(true)
    enqueueSnackbar("OTP sent Successfully.")
  }

  const verifyOtp = (data: any) => {
    console.log("Data", data)
    // Integrate Verify OTP Api here.
    handleClose();
    enqueueSnackbar("OTP verified.")
  }

  const fieldsData = [
    { name: "name", label: "Name" },
    { name: "detail", label: "Details" },
    { name: "field1", label: "Field1" },
    { name: "remark", label: "Remarks" },

    { name: "remark", label: "adhar number" },
    { name: "name", label: "Name" },
    { name: "detail", label: "Details" },
    { name: "field1", label: "Field1" },
    { name: "remark", label: "Remarks" }
  ];

  return (
    <Dialog
      maxWidth="sm"
      sx={{
        height: '75%',
        mt: '5%',

      }}
      fullWidth
      open={open}
      classes={{ root: 'MuiDialog-custom' }} // Add your custom class here
    >
      <DialogTitle sx={{ m: "0 auto", position: 'sticky' }} typography={"h4"}>Outlet Registration </DialogTitle>
      <FormProvider methods={methods} >
        <div>
          <Stack spacing={2} sx={{ overflowY: 'scroll', maxHeight: '40vh', alignItems: 'center',  }} >
            <>
              {fieldsData.map((field, index) => (
                <RHFTextField
              
                  key={index}
                  style={{ width: isMobile ? '206px' : '546px',margin:"4px" }}
                  name={field.name}
                  label={field.label}
                />
              ))}
            </>

            {fetchedOtp ?
              <>
                <Typography variant='h5' sx={{ color: 'text.secondary' }}>Please Enter OTP to proceed</Typography>
                <Stack spacing={3}>
                  <RHFCodes2
                    variant="outlined"
                    keyName="code"
                    inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']}
                  />
                </Stack>
              </>
              :
              ''}
          </Stack>
        </div>
        <DialogActions sx={{ justifyContent: 'center' }}>
          {fetchedOtp ?
            <LoadingButton type="submit" variant="contained" onClick={handleSubmit(verifyOtp)}>
              Verify OTP
            </LoadingButton>
            :
            <LoadingButton type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
              Proceed
            </LoadingButton>
          }
        </DialogActions>
      </FormProvider>
    </Dialog>
  )
}

export default OutletRegistrationPopover
