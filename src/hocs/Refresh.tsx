import { IconButton, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import Iconify from 'src/components/iconify';

interface Props {
  refresh?: () => Promise<void>; // Modify the refresh function to return a Promise
  width?: number;
  color?: any;
}

const Refresh = ({ refresh, width = 25, color = "primary" }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    if (refresh) {
      setLoading(true); // Set loading state to true when refresh is initiated
      try {
        await refresh(); // Await the refresh function
      } finally {
        setLoading(false); // Set loading state back to false after refresh is completed (or failed)
      }
    }
  };

  return (
    <IconButton
      color={color}
      disabled={loading} // Disable the button when loading is true to prevent multiple clicks
      onClick={handleRefresh}
    >
      {loading ? (
        <CircularProgress size={width} /> // Show circular progress indicator when loading
      ) : (
        <Iconify className="refresh-bg" icon="tabler:refresh" width={width} />
      )}
    </IconButton>
  );
};

export default Refresh;
