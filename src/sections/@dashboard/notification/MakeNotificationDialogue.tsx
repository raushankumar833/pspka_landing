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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form/FormProvider';
import Iconify from 'src/components/iconify';
import useResponsive from 'src/hooks/useResponsive';
import { RHFTextField, RHFSelect } from 'src/components/hook-form';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { apiErrorToast } from 'src/utils/toastFire';
// import { PATTERNS } from 'src/utils/validation';
import UserSearch from 'src/components/notification/UserSearch';
import Logo from 'src/components/logo';
// import { Height } from '@mui/icons-material';
// ----------------------------------------------------------------------

const PRIORITY_CHOICES = [
  {label: 'LOW', value: 'LOW'},
  {label: 'MEDIUM', value: 'MEDIUM'},
  {label: 'HIGH', value: 'HIGH'}
]

export default function MakeNotificationDialogue({ refresh }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [individual, setIndividual] = useState('SINGLE');
  const [notificationUser, setNotificationUser] = useState();
  const isMobile = useResponsive('down', 'md');
  console.log(loading, setIndividual);
  
  const handleOpen = async () => {
    // try {
    //   const resp = await myAxios.get(Apiendpoints.GET_ADMIN_BANKS);
    //   const cr_modes = await myAxios.get(Apiendpoints.GET_MODES);
      // console.log('resp', resp.data)
    //   setBanks(resp.data.data);
    //   setModes(cr_modes.data.data);
      setOpen(true);
    // } catch (error) {
    //   apiErrorToast(error);
    // }
  };

  const handleClose = () => {
    setOpen(false);
    reset(defaultValues);
  };

  const defaultValues = useMemo(
    () => ({
      user_id: '',
      role: '',
      priority: 'Medium',
      message: '',
    }),

    []
  );
  const creditSchema = Yup.object().shape({
    user_id: Yup.string(),
      // .required('User Id is required')
      // .matches(PATTERNS.NUMERICS, 'User Id should be number'),
    role: Yup.string(),
    // .required('Role is required'),
    priority: Yup.string().required('Priority is required'),
    message: Yup.string().required('Message is required'),
  });

  const methods = useForm({
    resolver: yupResolver(creditSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: {  },
  } = methods;

  const handleChange = (event: any) => {
    setIndividual(event.target.value);
  };

  // FORM SUBMIT API CALL . . .
  const onSubmit = async (data: any) => {
    if (notificationUser){
    data.user_id = notificationUser;}
    data.type = individual;
    postJsonData(
      Apiendpoints.CREATE_NOTIFICATION,
      data,
      setLoading,
      (res) => {
        console.log('res', res);
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
        sx={notificationButton}
      >
        Add Notification
      </Button>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        onClose={handleClose}
        classes={{ root: 'MuiDialog-custom' }} // Add your custom class here
      >
        <DialogTitle>Create Notification</DialogTitle>
        
        <FormProvider methods={methods} >
          <DialogContent sx={{ overflow: 'unset' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="notification-type"
              >
                <FormControlLabel value="SINGLE" checked={individual == 'SINGLE'} control={<Radio />} label="Individual" onChange={handleChange}/>
                <FormControlLabel value="ALL" control={<Radio />} label="All" onChange={handleChange}/>
              </RadioGroup>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <span style={{display: 'flex'}}>
                    {(individual === 'SINGLE') &&
                    <>
                    <UserSearch
                      style={{ width: isMobile ? '200px' : '180px', margin: '2px'}}
                      placeholder="User Id"
                      searchApi={Apiendpoints.GET_USERS}
                      nameKeys={['name']}
                      cb1={(item: any) => {
                        console.log('item', item.id);
                        setNotificationUser(item.id);
                      }}
                    />
                    {/* <RHFTextField style={{ width: isMobile ? '200px' : '180px', margin: '2px' }} name="user_id" label="User Id" /> */}
                    <RHFTextField style={{ width: isMobile ? '200px' : '180px', margin: '2px' }} name="role" label="Role" />
                    </>}
                    <RHFSelect size="medium" name="priority" label="Priority" variant="filled"
                                style={{ width: isMobile ? '200px' : '180px', margin: '2px' }}>
                      <option value="" />
                      {PRIORITY_CHOICES.map((option) => (
                        <option key={option.label} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </RHFSelect>
                    {/* <RHFTextField style={{ width: isMobile ? '200px' : '180px', margin: '2px' }} name="priority" label="Priority" /> */}
                  </span><br />
                  <RHFTextField style={{ width: isMobile ? '206px' : '546px'}} name="message" label="Message" />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo sx={{ width: '50%' }} />
            <Button color="inherit" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            {/* <LoadingButton type="submit" variant="contained" loading={isSubmitting || loading}> */}
            <LoadingButton type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>
              Proceed
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
}

const notificationButton = {
  px: 2,
  py: 2.5,
};
