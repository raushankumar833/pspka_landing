import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { apiErrorToast, okSuccessToast } from 'src/utils/toastFire';

const VerifyCodeSchema = Yup.object().shape({
    otp: Yup.string().required('OTP is required').matches(/^\d+$/, 'OTP must be a number'),
});

const defaultValues = {
    otp: '',
};

const SpacedTypoGraphy = ({ head, body }: any) => {
    return (
        <Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {head}<b>{body}</b>
        </Typography>
    );
};

const TEXT = ['Proceed to Delete Beneficiary', 'Enter OTP to Confirm'];

const DeleteBeneDialog = ({ open, setOpen, bene, moneyTransferType, remitterData, chosenBene }: any) => {
    const [buttonContent, setButtonContent] = useState('Proceed');
    const [showOtpField, setShowOtpField] = useState(false);
    const [dialogText, setDialogText] = useState(TEXT[0]);
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    const [beneActionLoading, setBeneActionLoading] = useState(false);
    const [otpRef, setOtpRef] = useState(null);

    const methods = useForm({
        mode: 'onChange',
        resolver: yupResolver(VerifyCodeSchema),
        defaultValues,
    });

    const {
        // handleSubmit,
        reset,
    } = methods;

    useEffect(() => {
        if (!open) {
            reset(defaultValues);
            setShowOtpField(false);
            setButtonContent('Proceed');
            setDialogText(TEXT[0]);
        }
    }, [open, reset]);

    const deleteBeneApi = () => {
        console.log(beneActionLoading)
        setBeneActionLoading(true);
        postJsonData(
            moneyTransferType === 'dmt1' ? Apiendpoints.DELETE_BENE_DMT1 : Apiendpoints.DELETE_BENE_DMT2,
            {
                remitterMobile: moneyTransferType === 'dmt1' ? remitterData?.data?.mobile : remitterData?.data?.data?.mobile,
                beneficiaryId: chosenBene?.id,
            },
            setBeneActionLoading,
            (res) => {
                if (moneyTransferType === 'dmt1') {
                    setOtpRef(res?.data?.data?.otpReference);
                    setShowOtpField(true);
                    setButtonContent('Delete');
                    setDialogText(TEXT[1]);
                    enqueueSnackbar('OTP Sent Successfully');
                } else {
                    okSuccessToast('', res?.data?.message);
                    setOpen(false);
                }
                setBeneActionLoading(false);
            },
            (err) => {
                apiErrorToast(err);
                setBeneActionLoading(false);
            }
        );
    };

    const handleDeleteClick = (data: any) => {
        const apiEnd = moneyTransferType === 'dmt1' ? Apiendpoints.DMT1_VALIDATE_OTP : Apiendpoints.DMI2_VALIDATE_OTP;
        postJsonData(
            apiEnd,
            { "otpReference": otpRef, "otp": data.otp },
            setBeneActionLoading,
            (res) => {
                if (res?.data?.status === 'SUCCESS') {
                    enqueueSnackbar(res?.data?.message);
                    setOpen(false);
                } else {
                    enqueueSnackbar(res?.data?.message);
                }
                setBeneActionLoading(false);
            },
            (err) => {
                apiErrorToast(err);
                enqueueSnackbar(err?.data?.message);
                setBeneActionLoading(false);
            }
        );
    };

    const handleClick = () => {
        if (!showOtpField) {
            deleteBeneApi();
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog fullWidth open={open} sx={{ zIndex: 0 }}>
            <DialogTitle variant='h4' style={{ textAlign: 'center' }}>Delete Beneficiary</DialogTitle>
            <DialogContent>
                <FormProvider {...methods}>
                    <Box
                        sx={{
                            width: '90%',
                            background: `${theme.palette.primary.light}18`,
                            margin: '0 auto 2rem auto',
                            color: 'black',
                            fontSize: '1rem',
                            borderRadius: '5px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: 2,
                            gap: 1,
                        }}
                    >
                        <SpacedTypoGraphy head={'Beneficiary Name'} body={bene?.name || '  -  '} />
                        <SpacedTypoGraphy head={'Account No.'} body={bene?.account || '  -  '} />
                        <SpacedTypoGraphy head={'IFSC'} body={bene?.ifsc || '  -  '} />
                    </Box>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>{dialogText}</Typography>
                    {showOtpField &&
                        <RHFTextField
                            name='otp'
                            placeholder='Enter OTP'
                        />
                    }
                </FormProvider>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button variant='outlined' onClick={handleClose}>Close</Button>
                <Button variant='contained' onClick={showOtpField ? methods.handleSubmit(handleDeleteClick) : handleClick}>
                    {buttonContent}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteBeneDialog;
