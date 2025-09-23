import { useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  Box,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import { useSnackbar } from 'notistack';
import { PATTERNS } from 'src/utils/validation';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { apiErrorToast } from 'src/utils/toastFire';
import Iconify from '../iconify';
import FormProvider from '../hook-form/FormProvider';
import { RHFSelect, RHFTextField } from '../hook-form';
// Assuming you have this utility function
import Logo from '../logo';
import { convertINRToWords } from 'src/utils/currencyUtil';

// ----------------------------------------------------------------------

export default function AdminCreateUsers({ refresh }: any) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const [modes, setModes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amountInWords, setAmountInWords] = useState('');

  const handleOpen = async () => {
    setOpen(true);
    console.log(setBanks, setModes);
    // Fetch banks and modes here
    // Example code:
    // try {
    //   const resp = await myAxios.get(Apiendpoints.GET_ADMIN_BANKS);
    //   const cr_modes = await myAxios.get(Apiendpoints.GET_MODES);
    //   setBanks(resp.data.data);
    //   setModes(cr_modes.data.data);
    //   setOpen(true);
    // } catch (error) {
    //   apiErrorToast(error);
    // }
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
    setAmountInWords('');
  };

  const defaultValues = useMemo(
    () => ({
      remark: '',
      amount: '',
      bank: '',
      mode: '',
    }),
    []
  );

  const creditSchema = Yup.object().shape({
    amount: Yup.string()
      .required('Amount is required')
      .matches(PATTERNS.NUMERICS, 'Amount should be in number'),
    remark: Yup.string().required('Remark is required'),
    bank: Yup.string().required('Bank is required'),
    mode: Yup.string().required('Mode is required'),
  });

  const methods = useForm({
    resolver: yupResolver(creditSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = methods;

  const handleAmountChange = (value: any) => {
    setAmountInWords(convertINRToWords(Number(value)));
  };

  const onSubmit = async (data: any) => {
    postJsonData(
      Apiendpoints.CREDIT_REQ,
      data,
      setLoading,
      (res) => {
        enqueueSnackbar(res?.data?.message);
        handleClose();
        if (refresh) refresh();
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        startIcon={<Iconify icon="eva:plus-fill" />}
        onClick={handleOpen}
        sx={creditButton}
      >
        Create User
      </Button>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
        classes={{ root: 'MuiDialog-custom' }} // Add your custom class here
      >
        <DialogTitle>Create User</DialogTitle>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
                  <RHFSelect name="bank" label="Select Bank" defaultValue="">
                    <option label="" value="" />
                    {banks.map((option: any) => (
                      <option key={option.id} value={option.id} label={option.name} />
                    ))}
                  </RHFSelect>
                  <RHFSelect name="mode" label="Select Mode" defaultValue="">
                    <option label="" value="" />
                    {modes?.map((option: any, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </RHFSelect>

                  <Controller
                    name="amount"
                    control={control}
                    render={({ field }) => (
                      <>
                        <RHFTextField
                          {...field}
                          label="Amount"
                          onChange={(e) => {
                            field.onChange(e);
                            handleAmountChange(e.target.value);
                          }}
                        />
                        {/* Conditionally show amount in words */}

                      </>
                    )}
                  />

                  <RHFTextField name="remark" label="Remark" />
                  <p style={{ color: "green", marginTop: "-8%" }} > {amountInWords}</p>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Logo sx={{ width: '50%' }} />
            <Button color="inherit" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting || loading}>
              Proceed
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}

const creditButton = {
  px: 2,
  py: 2.5,
};
