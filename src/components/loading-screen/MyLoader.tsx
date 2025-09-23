import { Backdrop } from '@mui/material';
import React from 'react';

const MyLoader = ({ loading = false }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: 9998,
          position: 'absolute',
          top: 0,
          background: 'rgba(0,0,0,0.5)',
        }}
        open={loading || open}
        onClick={handleClose}
      >
        <div className="loader" />
      </Backdrop>
    </>
  );
};

export default MyLoader;
