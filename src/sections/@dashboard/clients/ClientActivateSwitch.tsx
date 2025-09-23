import React, { useMemo, useState } from 'react';
import { SnackbarMessage, useSnackbar } from '../../../components/snackbar';
import { ClientInterface } from 'src/@types/clients';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import ConfirmationDialogue from './ConfirmationDialogue';

export interface ExtendedClientTableInterface extends ClientInterface {
  getData: () => void;
}

const ClientActivateSwitch = ({ id, status, getData, username }: ExtendedClientTableInterface) => {
  const [request, setRequest] = useState(false);

  const active = useMemo(() => {
    const st = status;
    return st;
  }, [status]);

  const { enqueueSnackbar } = useSnackbar();

  const updateStatus = () => {
    postJsonData(
      `${Apiendpoints.CLIENT_BLOCK_UNBLOCK}${username}/`,
      '',
      setRequest,
      (res) => {
        enqueueSnackbar(res.data.message, {
          variant: 'success',
        });
        if (getData) getData();
      },
      (err) => {
        const errorMessage = err?.response?.data || 'Something went wrong!';
        enqueueSnackbar(errorMessage as SnackbarMessage, {
          variant: 'error',
        });
      }
    );
  };

  return (
    <ConfirmationDialogue
      status={active}
      updateStatus={() => updateStatus()}
      username={username}
      request={request} tpin={undefined}    />
  );
};

export default ClientActivateSwitch;
