import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RHFCodes2 from 'src/components/hook-form/RHFCodes2';
import { Icon } from '@iconify/react';
import FormProvider from 'src/components/hook-form/FormProvider';
import { LoadingButton } from '@mui/lab';
import { ClientInterface } from 'src/@types/clients';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { apiErrorToast } from 'src/utils/toastFire';
import { useSnackbar } from 'notistack';

type PopOverType = {
  tpin: any;
  id: any;
  user: ClientInterface;
}

const KycUpdationPopover = (props: PopOverType) => {
  const { user } = props;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [status, setStatus] = useState<number>(); 
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
  });

  const defaultValues = {
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

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: any) => {
    const { code1, code2, code3, code4, code5, code6 } = data;
    const tpin = `${code1}${code2}${code3}${code4}${code5}${code6}`;
    
    const postData = {
      id: user.id,
      status: status,
      tpin: tpin,
    };
    console.log("This is your API data", postData);

    postJsonData(
      Apiendpoints.UPDATE_USER_STATUS,
      postData,
      setLoading,
      (res) => {
        enqueueSnackbar("Status Updated Successfully");
        handleCloseConfirm();
        reset();
      },
      (err) => {
        reset();
        apiErrorToast(err);
      }
    );
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    reset();
  };

  const handleOpenConfirm = () => {
    const statusVal = user?.status ==1 ? 0 : 1;
    setStatus(statusVal);
    setOpenConfirm(true);
  };

  return (
    <div>
      <Button onClick={handleOpenConfirm}>
        {user?.status == 1 ? (
          <Icon icon="mdi:unlocked-outline" style={{ color: 'green', fontSize: '25px' }} />
        ) : (
          <Icon icon="material-symbols:lock-outline" style={{ color: 'red', fontSize: '25px' }} />
        )}
      </Button>
      <Dialog
        maxWidth="xs"
        fullWidth
        open={openConfirm}
        onClose={handleCloseConfirm}
      >
        <DialogTitle sx={{ m: "0 auto" }} typography={"h4"}>
          {`(${(user?.role)?.toUpperCase()}) ${user?.name}`}
        </DialogTitle>
        <Icon 
          icon="entypo:info-with-circle" 
          style={{ color: 'white', fontSize: '6rem', margin: '0 auto 25px auto', backgroundColor: 'black', borderRadius: '49%' }} 
        />
        <DialogContent sx={{ typography: 'h6', m: "0 auto 10px auto" }}>
          {`Enter TPIN to ${user?.status === 1 ? 'Block' : 'Unblock'} ${user?.name}`}
        </DialogContent>
        <FormProvider methods={methods}>
          <Stack spacing={1} direction={"column"} justifyContent={"center"} alignItems={"center"}>
            <RHFCodes2
              fullWidth
              variant="outlined"
              keyName="code"
              inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']}
            />
          </Stack>
          <DialogActions>
            <Button color="inherit" variant="outlined" onClick={handleCloseConfirm}>
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" loading={loading} onClick={handleSubmit(onSubmit)}>
              Proceed
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </div>
  );
}

export default KycUpdationPopover;
