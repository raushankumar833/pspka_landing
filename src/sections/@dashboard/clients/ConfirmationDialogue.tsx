import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Switch, Typography } from '@mui/material';
import { ClientInterface } from 'src/@types/clients';
import { LoadingButton } from '@mui/lab';

interface Props extends ClientInterface {
  updateStatus: () => void;
  request: boolean;
}
export default function ConfirmationDialogue({ status, updateStatus, username, request }: Props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Switch
        type="switch"
        id="status"
        checked={status}
        onClick={() => {
          handleClickOpen();
        }}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open responsive dialog
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="status-switch-title"
      >
        <DialogTitle
          id="status-switch-title"
          sx={{
            color: (theme) => (status ? theme.palette.error.main : theme.palette.primary.main),
          }}
        >
          {`Are you sure to ${status ? 'Block' : 'Unblock'}`}{' '}
          <Typography
            variant="body1"
            component="a"
            href={`mailto:${username}`}
            sx={{
              color: (theme) => (status ? theme.palette.error.dark : theme.palette.primary.dark),
            }}
          >
            {username}
          </Typography>{' '}
          ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Continuing will proceed with the provided action for the Client!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="error">
            Close
          </Button>
          <LoadingButton loading={request} onClick={updateStatus} autoFocus variant="outlined">
            Continue
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
