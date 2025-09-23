import { useMemo } from 'react';
import { Dialog, DialogTitle, DialogActions, DialogContent, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import { RHFTextField } from 'src/components/hook-form';
// import { Stack } from 'rsuite';
import Logo from 'src/components/logo/Logo';
// import Icon from 'src/components/color-utils/Icon';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type AddCustomerDialogProps = {
    open: boolean;
    setOpen: any;
};

export default function AddCustomerDialog(props: Readonly<AddCustomerDialogProps>) {

    const handleClose = () => {
        props.setOpen(false);
        reset(defaultValues);
    };

    const defaultValues = useMemo(
        () => ({
            amount: '',
            name: '',
            dob: ''
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
    const onSubmit = async (data: any) => { };

    return (
        <Dialog
            maxWidth='md'
            fullWidth
            open={props.open}
            onClose={handleClose}
            classes={{ root: 'MuiDialog-custom' }} // Add your custom class here
        >
            <DialogTitle sx={{ m: 'auto' }}>
                Add Customer
            </DialogTitle>
            <IconButton color={'default'} onClick={handleClose} sx={{ justifyContent: 'right', position: 'absolute', right: '0' }}>
                <Iconify icon="icons8:cancel" />
            </IconButton>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <RHFTextField fullWidth name="amount" label="Amount" variant='standard' sx={{ m: 1 }} />
                        <RHFTextField fullWidth name="name" label="Name" variant='standard' sx={{ m: 1 }} />
                        <RHFTextField fullWidth name="dob" label="DOB" type='' variant='standard' sx={{ m: 1 }} />
                        {false && <RHFTextField fullWidth name="otp" label="OTP" variant='standard' sx={{ m: 1 }} />}
                    </div>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Logo sx={{ width: '50%' }} />
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Get OTP
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Dialog >
    );
}
