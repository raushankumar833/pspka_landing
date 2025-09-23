import * as Yup from 'yup';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import { useSnackbar } from '../../components/snackbar';
import FormProvider from '../../components/hook-form';
import RHFCodes2 from 'src/components/hook-form/RHFCodes2';
import { get, getAxios, noAuthApi } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { useContext, useState } from 'react';
import { appContext } from 'src/context/appContext';
import { useAuthContext } from 'src/auth/useAuthContext';
import { expirationTime } from 'src/utils/constants';
import { deleteCookie, getCookie } from 'cookies-next';
import navConfig from 'src/layouts/dashboard/nav/config';
import { checklength } from 'src/utils/flattenArray';

// ----------------------------------------------------------------------

type FormValuesProps = {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
  afterSubmit?: string;
};

export default function AuthVerifyCodeForm() {
  const [wrongTpin, setWrongTpin] = useState(false);
  const [attemptLeft, setAttemptLeft] = useState(4);
  const { push } = useRouter();
  const { saveLogin, saveUser, saveWallet, saveNavAuth } = useAuthContext();
  const { setLoading } = useContext(appContext);
  const { enqueueSnackbar } = useSnackbar();

  const makeDynamicSideNav = (role: any, apiNav: any) => {
    const filteredNav = navConfig.find((filteritem: any) =>
      filteritem?.subheader?.roles?.includes(role)
    );
    // console.log('apiNav', apiNav);

    //
    const navWithStatus =
      checklength(apiNav) &&
      filteredNav?.items?.map((item: any) => {
        const similarNav = apiNav.find((navItem: any) => navItem.name === item.title);

        if (similarNav) {
          item.status = similarNav.status;
          item.icon = similarNav.name;
        }
        return item;
      });

    // console.log('finalNav', [{ subheader: { title: '', roles: [role] }, items: navWithStatus }]);
    const finalArr = [{ subheader: { title: '', roles: [role] }, items: navWithStatus }];
    //

    return new Promise((resolve, reject) => {
      resolve(finalArr);
    });
  };

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

  const {
    // setError,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    // console.log('DATA', Object.values(data).join(''));
    const tpin = Object.values(data).join('');
    const login_data = getCookie('login-data');
    if (typeof login_data === 'string') {
      const login_parse: { username: string; password: string } = JSON.parse(login_data);
      noAuthApi(
        Apiendpoints.VERIFY_MPIN,
        { ...login_parse, tpin: tpin },
        setLoading,
        (res) => {
          const token = res.data.data.api_token;
          const user = res.data.data;
          saveLogin(token, expirationTime);
          getAxios(token);
          saveUser(user);
          if (user.role !== 'admin' || user.role !== 'sub_admin') {
            saveWallet();
          }
          deleteCookie('login-data');
          // api call for getting the side nav

          get(
            Apiendpoints.GET_NAV,
            '',
            () => {},
            (res) => {
              const apiNav = res?.data;
              makeDynamicSideNav(user.role, apiNav).then((res) => {
                if (checklength(res)) saveNavAuth(res);
                if (user.role === 'ret' || user.role === 'dd') {
                  push(PATH_DASHBOARD.customer.root);
                } else if (user.role === 'asm' || user.role === 'zsm') {
                  push(PATH_DASHBOARD.sales.root);
                } else if (user.role === 'md' || user.role === 'ad') {
                  push(PATH_DASHBOARD.distributor.root);
                } else if (user.role === 'admin' || user.role === 'sub_admin') {
                  push(PATH_DASHBOARD.admin.root);
                } else {
                  enqueueSnackbar('error');
                }
              });
            },
            (err) => {}
          );

          enqueueSnackbar('login success!');
        },
        (err) => {
          setWrongTpin(true);
          setAttemptLeft(err?.response?.data?.data);
          // displayError(err);
        }
      );
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFCodes2
          variant="outlined"
          keyName="code"
          inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']}
        />

        <FormHelperText error sx={{ px: 2 }}>
          {wrongTpin && 'Wrong TPIN, ' + (5 - Number(attemptLeft)) + ' attempts left'}
        </FormHelperText>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3, mb: 3 }}
        >
          Verify
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
