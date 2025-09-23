import React from 'react';
import CachedIcon from '@mui/icons-material/Cached';
import { IconButton } from '@mui/material';

const MachineDetectButton = ({ onClick, loading = false }: any) => {
  return (
    <IconButton
      className="button-purple"
      //   variant="contained"
      size="small"
      sx={{
        textAlign: 'left',
      }}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <CachedIcon className={`refresh-purple ${loading ? 'hover-rotate' : ''}`} fontSize="small" />
    </IconButton>
  );
};

export default MachineDetectButton;
