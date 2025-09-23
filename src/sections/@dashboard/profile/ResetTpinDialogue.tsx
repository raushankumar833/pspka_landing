import React, { useContext, useState } from 'react'
import { Button } from '@mui/material';
import ConfirmDialog from 'src/components/confirm-dialog';
import { appContext } from 'src/context/appContext';
import { postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { apiErrorToast } from 'src/utils/toastFire';

const ResetTpinDialogue = () => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const { userName } = useContext(appContext)
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        // console.log("This is your username in the context", userName)
        postJsonData(
          Apiendpoints.RESET_TPIN,
          {username: userName},
          setLoading,
          (res) => {
            handleCloseConfirm();
          },
          (err) => {
            apiErrorToast(err);
          }
        );
      };
    
    const handleCloseConfirm = () => {
    // onSubmit();
    setOpenConfirm(false);
    };

    const handleOpenConfirm = () => {
    setOpenConfirm(true);
    };

  return (
    <div>
      <Button 
        // size="small"
        // variant="contained"
        // sx={notificationButton}
        onClick={handleOpenConfirm}>Reset TPIN</Button>
      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Reset"
        content={<>Are you sure want to reset T-PIN</>}
        action={
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              onSubmit();
            }}
            disabled={loading}
          >
            Reset
          </Button>
        }
        />
    </div>
  )
}

export const notificationButton = {
    px: 2,
    py: 2.5,
    mx: 2,
    my: 0
  };

export default ResetTpinDialogue
