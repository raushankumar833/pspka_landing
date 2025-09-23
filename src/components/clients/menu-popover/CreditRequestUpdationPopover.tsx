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
import RHFCodes2 from 'src/components/hook-form/RHFCodes2';
import { Icon } from '@iconify/react';
import FormProvider from 'src/components/hook-form/FormProvider';
import { LoadingButton } from '@mui/lab';
import { CreditReqInterface } from 'src/@types/creditReq';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'notistack';
import Logo from 'src/components/logo';

type PopOverType = {
    row: CreditReqInterface;
}

const STATUS_OPTIONS = [
  {label: 'PENDING', value: 'PENDING'},
  {label: 'APPROVED', value: 'APPROVED'},
  {label: 'REJECTED', value: 'REJECTED'},
]

const CreditRequestUpdationPopover = (row: PopOverType) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    // const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    // const [formData, setformData] = useState({});
    // const { userName } = useContext(appContext);
    console.log(loading)
    const VerifyCodeSchema = Yup.object().shape({
      amount: Yup.string().required('Amount is required'),
      code1: Yup.string().required('Code is required'),
      code2: Yup.string().required('Code is required'),
      code3: Yup.string().required('Code is required'),
      code4: Yup.string().required('Code is required'),
      code5: Yup.string().required('Code is required'),
      code6: Yup.string().required('Code is required'),
    });

    // console.log("loading", loading)

    const defaultValues = {
      amount: row?.row?.amount,
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      code6: '',
    };
  
    const methods = useForm({
      mode: 'onChange',
      resolver: yupResolver(VerifyCodeSchema),
      defaultValues,
    });

    const {
      handleSubmit,
      reset,
      formState: { },
    } = methods;

    const onSubmit = async (data: any) => {
        data.id = row?.row?.id;
        // data.status = status;
        console.log("This is your data", data)
        reset()
        patchJsonData(
          Apiendpoints.CREDIT_REQ,
          data,
          '',
          setLoading,
          (res) => {
            handleCloseConfirm();
            enqueueSnackbar("Updated Successfully")
          },
          (err) => {
            apiErrorToast(err);
            enqueueSnackbar("Unable to update Credit Request", {variant: 'error'})
          }
        );
      };
      // console.log("This is your amount value", row.row.amount)
    const handleCloseConfirm = () => {
    reset();
    setOpenConfirm(false);
    };

    const handleOpenConfirm = (status: boolean) => {
      // setStatus(status);
    setOpenConfirm(true);
    };

  return (
    //  style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", margin: "auto"}}
    <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", margin: "auto"}}>
      <Button onClick={() => handleOpenConfirm(true)}>
            <Icon icon="la:check-double" style={{ color: 'green', fontSize: '1.8rem' }} />
      </Button>
      <Button onClick={() => handleOpenConfirm(false)}>
            <Icon icon="fluent-mdl2:cancel" style={{ color: 'red', fontSize: '1.8rem' }} />
      </Button>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={openConfirm}
        onClose={handleCloseConfirm}
        classes={{ root: 'MuiDialog-custom' }} // Add your custom class here
      >
        <DialogTitle sx={{m: "0 auto"}} typography={"h4"}>Credit Request Updation</DialogTitle>
        
        <FormProvider methods={methods} >
        <Stack spacing={1} direction={"column"} justifyContent={"center"} alignItems={"center"}>
        <RHFTextField
                style={{
                  width: "70%",
                  margin: "2rem auto"
                }}
                size="medium"
                name="amount"
                label="Amount"
                variant="filled"
                defaultValue={row?.row?.amount}
              />
              {/* <label>
                  Status
                  <select name="status">
                      <option value="PENDING">PENDING</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="REJECTED">REJECTED</option>
                  </select>
              </label> */}
                  <RHFSelect name="status" label="Select Status" variant="filled" style={{
                            width: "70%",
                            margin: "0 auto 1rem auto"
                          }}>
                          <option value="" />
                          {STATUS_OPTIONS.map((option) => (
                            <option key={option.label} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                  </RHFSelect>
                  <RHFCodes2
                    fullWidth
                    variant="outlined"
                    keyName="code"
                    inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']}
                  />
        </Stack>
        <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo sx={{ width: '50%' }} />
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

export const notificationButton = {
    px: 2,
    py: 2.5,
    mx: 2,
    my: 0
  };

export default CreditRequestUpdationPopover;
