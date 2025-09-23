import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Stack,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
import useResponsive from 'src/hooks/useResponsive';
import { apiErrorToast } from 'src/utils/toastFire';
import { checklength } from 'src/utils/flattenArray';
import { createDynamicSchema } from 'src/utils/formSchema';
import { capitalize } from 'src/utils/textUtil';
import { RHFTextField } from 'src/components/hook-form';
import BankSearch from 'src/components/bank-search/BankSearch';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { myAxios } from 'src/utils/axiosController';
import { useSelector } from 'src/redux/store';
import PermissionGaurd from 'src/auth/PermissionGaurd';
import Logo from 'src/components/logo';
// import { Theme } from '@fullcalendar/common';
// import { bgBlur } from 'src/utils/cssStyles';

type FormValuesProps = {
  operatorNumber: string;
  ifscCode: string;
  transferAmount: string;

};

// ----------------------------------------------------------------------

export default function BeneDialogue({
  remMobile = '',
  onCompleteCb,
  variant = 'text',
  title = 'Add Beneficiary',
  apiEnd,
  mobileNumber,
  setSendOtpRef,
  open, setOpen= () => { } 

}: any) {
  // const [open, setOpen] = useState(false);
  const [addBeneSchema, setAddBeneSchema] = useState([]);
  const isMobile = useResponsive('down', 'md');
  const [bankObj, setBankObj] = useState<any>(null);
  const [schemaLoading, setSchemaLoading] = useState(false);

  const { moneyTransferType } = useSelector((state: any) => state.recharge_bills);

  const schema = moneyTransferType === 'upi' ? 'addUpiBeneficiary' : 'addBeneficiary';

  useEffect(() => {
    console.log("object of data is here", bankObj)
  }, [bankObj]);

  // Open and close functions
  const handleOpen = async () => {
    setSchemaLoading(true);
    try {
      const resp = await myAxios.get(`${Apiendpoints.GET_SCHEMA}?schema=${schema}`);
      setAddBeneSchema(resp?.data?.data);
      console.log("response data", resp?.data?.data)
      setSchemaLoading(false);
      setOpen(true);
    } catch (error) {
      apiErrorToast(error);
      setSchemaLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAddBeneSchema([]);
    reset();
  };

  // React Hook Form setup
  const Beneschema = useMemo(() => {
    if (checklength(addBeneSchema)) {
      const sch: any = {
        sc: Yup.object().shape(createDynamicSchema(addBeneSchema)),
      };
      return sch;
    }
  }, [addBeneSchema]);

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(Beneschema?.sc),
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  // Dynamic input fields based on schema
  const inputParameters = useMemo(() => {
    if (checklength(addBeneSchema)) {
      return addBeneSchema.map((item: any, index: any) => (
        <RHFTextField
          key={index}
          name={item.name}
          label={capitalize(item.desc.replace(/_/g, ' '))}
        />
      ));
    }
  }, [addBeneSchema]);
  // console.log("sdjhgcsdjh",onCompleteCb);


  // Form submission handler
  const onSubmit = async (data: any) => {
    console.log("response data of add", data);
    const fData = {
      ...data,
      pf: 'web',
      latitude: '12.9716',
      longitude: '77.5946',
      verified: true,
      remitterMobile:
        mobileNumber.mobileNumber,
      // moneyTransferType !== 'vp' && moneyTransferType !== 'upi' ? remMobile : undefined,
      bankId: bankObj?.bankId,
      // bankId: moneyTransferType !== 'upi' ? bankObj?.ifscGlobal : undefined,
      bankName: moneyTransferType === 'vp' ? bankObj?.newValue : undefined,
      vendorType:
        moneyTransferType === 'vp' ? 'ACC' : moneyTransferType === 'upi' ? 'UPI' : undefined,
    };

    try {
      const response = await myAxios.post(apiEnd, fData);
      console.log("data of fdata", response?.data?.data?.otpReference)
      setSendOtpRef(response?.data?.data?.otpReference)
      if (onCompleteCb) onCompleteCb();
      if (moneyTransferType === 'vp' || moneyTransferType === 'upi') {
        handleClose();
      }
    } catch (error) {
      apiErrorToast(error);
    }
  };

  useEffect(() => {
    if (bankObj) {
      setValue('ifscCode', bankObj?.ifscGlobal?.toString());
    }
  }, [bankObj]);

  return (
    <>
      <LoadingButton
        size="small"
        startIcon={<Iconify icon="basil:add-outline" />}
        variant={variant}
        loading={schemaLoading}
        onClick={handleOpen}
        sx={!isMobile && (moneyTransferType === 'dmt1' || moneyTransferType === 'dmt2') ? beneButton : null}
      >
        {title}
      </LoadingButton>

      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} sx={{ zIndex: 0 }}>
        <DialogTitle style={{ textAlign: 'center' }}>Create Beneficiary</DialogTitle>

        <DialogContent sx={{ overflow: 'unset' }}>
          <FormProvider methods={methods}>

            <Stack spacing={3} sx={{ px: 2 }}>
              <PermissionGaurd permission={moneyTransferType !== 'upi'}>
                <BankSearch
                  placeholder="Search bank"
                  searchApi={Apiendpoints.BANK_SEARCH_DMT1}
                  nameKeys={['name']}
                  cb1={(item: any) => {
                    setBankObj(item);
                  }}
                />
              </PermissionGaurd>
              {inputParameters}
            </Stack>
          </FormProvider>
        </DialogContent>

        <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo sx={{ width: '50%' }} />
          <Button color="inherit" variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            loading={isSubmitting}
            sx={{
              bgcolor: (theme) => (theme.palette.mode === 'light' ? theme.palette.primary.darker : theme.palette.primary.light),
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              },
            }}
          >
            Proceed
          </LoadingButton>
        </DialogActions>

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
