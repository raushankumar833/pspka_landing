import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { capitalize } from 'lodash';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { apiErrorToast } from 'src/utils/toastFire';
import FormProvider from 'src/components/hook-form/FormProvider';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { IconButton } from '@mui/material';

const AddDmtRemitter = ({ condition, mobileNumber, serviceType, otpReferenceData, otpRefDmt2, sendStatusCode, setCondition = () => { } }: any) => {
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState([]);
  const [showOtpField, setShowOtpField] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  // const [newCondition, setNewCondition] = useState(true)
  const [loading, setLoading] = useState(false);
  const [getOtpRef, setOtpRef] = useState("");


  const getRemitterParam = async () => {
    console.log(loading)
    postJsonData(
      Apiendpoints.REMITTER_PARAMS,
      { type: serviceType, statusCode: sendStatusCode },
      () => { },
      (res) => {
        const fields = res?.data?.fields || [];
        const initialFormData: any = {};

        fields.forEach((field: any) => {
          if (field.desc === "Mobile Number") {
            initialFormData[field.name] = mobileNumber.mobileNumber;
          } else {
            initialFormData[field.name] = "";
          }
        });
        setParams(fields);
        reset(initialFormData);
        // setAddRemittery(false)
        // condition = false;
      },
      (err) => {
        apiErrorToast(err);
      }
    );
  };

  useEffect(() => {
    setCondition(false)
  }, [getRemitterParam])

  useEffect(() => {
    if (condition) {
      setOpen(true);
      getRemitterParam();
    
     
    }
  }, [condition]);

  const handleClose = () => {
    setOpen(false);
    setShowOtpField(false);
  };

  const validationOtp = (otpRefData: any, otp: string) => {
    const apiEnd = serviceType === "dmt1" ? Apiendpoints.DMT1_VALIDATE_OTP : Apiendpoints.DMI2_VALIDATE_OTP;
    postJsonData(
      apiEnd,
      { otpReference: otpRefData, otp: otp },
      setLoading,
      (res) => {
        if (res?.data?.status === "SUCCESS") {
          enqueueSnackbar(res?.data?.message);
        } else {
          handleClose();
        }
      },
      (err) => {
        apiErrorToast(err);
        enqueueSnackbar(err.response.data.message);
      }
    );
  };

  const onSubmit = async (data: any) => {
    if (showOtpField || sendStatusCode === "OTP") {
      const otpRefData = showOtpField ? getOtpRef : otpReferenceData;
      validationOtp(otpRefData, data.otp);
      return;
    }

    const apiEndPoint = serviceType === "dmt1" ? Apiendpoints.DMT1_ADD_REMITTER : Apiendpoints.DMT2_ADD_REMITTER;
    postJsonData(
      apiEndPoint,
      { ...data, otpReference: otpRefDmt2 },
      setLoading,
      (res) => {
        enqueueSnackbar("OTP SENT SUCCESSFULLY");
        const otpRef = res?.data?.data?.otpReference;
        setOtpRef(otpRef);

        if (res?.data?.status === "SUCCESS" && serviceType === "dmt1") {
          if (sendStatusCode !== "OTP") {
            setShowOtpField(true);
          }
        } else {
          handleClose();
        }
      },
      (err) => {
        apiErrorToast(err.response.data.message);
        enqueueSnackbar(err.response.data.message);
      }
    );
  };

  const getValidationSchema = () => {
    const schemaFields = params.reduce((schema: any, field: any) => {
      if (field.mandatory === 1) {
        schema[field.name] = Yup.string().required(`${capitalize(field.desc)} is required`);
      } else {
        schema[field.name] = Yup.string();
      }
      return schema;
    }, {});

    if (showOtpField) {
      schemaFields.otp = Yup.string().required('OTP is required');
    }

    return Yup.object().shape(schemaFields);
  };

  const methods = useForm({
    resolver: yupResolver(getValidationSchema()),
  });

  const { handleSubmit, control, reset, formState: { errors } } = methods;

  return (
    <Dialog
      sx={{ zIndex: 0 }}
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ m: 'auto' }}>Add Remitter</DialogTitle>
      <IconButton color={'default'} onClick={handleClose} sx={{ justifyContent: 'right', position: 'absolute', right: '0' }}>
        <Iconify icon="icons8:cancel" />
      </IconButton>
      <DialogContent>
        <Box sx={{ minWidth: '300px' }}>
          <FormProvider methods={methods}>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {params.length > 0 && params.map((field: any, index: any) => (
                <Controller
                  key={index}
                  name={field.name}
                  control={control}
                  render={({ field: controllerField }) => (
                    <TextField
                      {...controllerField}
                      label={capitalize(field.desc)}
                      required={field.mandatory === 1}
                      placeholder={field.desc === "Mobile Number" ? "Enter dummy mobile number" : ""}
                      error={!!errors[field.name]}
                      helperText={errors[field.name] ? `${errors[field.name]?.message}` : ""}
                    />
                  )}
                />
              ))}
              {showOtpField && (
                <Controller
                  name="otp"
                  control={control}
                  render={({ field: controllerField }) => (
                    <TextField
                      {...controllerField}
                      label="OTP"
                      required
                      placeholder="Enter OTP"
                      error={!!errors.otp}
                      helperText={errors.otp ? `${errors.otp.message}` : ''}
                    />
                  )}
                />
              )}
            </Stack>
            <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Logo sx={{ width: '50%' }} />
              <Button type="submit" color="primary" onClick={handleSubmit(onSubmit)}>
                Proceed
              </Button>
            </DialogActions>
          </FormProvider>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddDmtRemitter;
