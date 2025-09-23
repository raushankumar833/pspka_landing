import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

type ItemProps = {
  id: string;
  name: string;
  status: string;
  number: number;
  amount: number;
  review: number;
  created_at: string;
};

type ApplicationItemProps = {
  app: ItemProps;
};

const RecentActivityItem = ({ app }: ApplicationItemProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return '/assets/icons/payments-container/checkmark.svg';
      case 'FAILED':
        return '/assets/icons/payments-container/checkmark.svg'; // Update with the correct path to the failed icon
      default:
        return '/assets/icons/payments-container/default.svg'; // Update with a default icon path if needed
    }
  };

  const getColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return { text: 'success.main', background: 'background.success' };
      case 'FAILED':
        return { text: 'error.main', background: 'background.error' };
      default:
        return { text: 'text.secondary', background: 'background.neutral' };
    }
  };

  const statusColor = getColor(app?.status);

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mt={2}
      sx={{
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Box sx={{ ...iconStyle, bgcolor: statusColor.background }}>
        <Box
          component="img"
          src={getStatusIcon(app?.status)}
          sx={{ width: 16, height: 16 }}
        />
      </Box>

      <Box sx={bodyStyle}>
        <Typography variant="subtitle2">{app?.name}</Typography>
        <Stack direction="row" alignItems="center" sx={{ mt: 0.5, color: 'text.secondary' }}>
          <Stack>
            <Typography variant="caption">{app?.number}</Typography>
            <Typography variant="caption">{app?.created_at}</Typography>
          </Stack>
        </Stack>
      </Box>

      <Stack flexDirection="column" justifyContent="flex-end">
        <Typography variant="caption" sx={{ color: statusColor.text }}>
          {app?.amount}
        </Typography>
        <Typography variant="caption" sx={{ color: statusColor.text }}>
          {app?.status}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default RecentActivityItem;

const iconStyle = {
  width: 40,
  height: 40,
  flexShrink: 0,
  display: 'flex',
  borderRadius: 1.5,
  alignItems: 'center',
  justifyContent: 'center',
};

const bodyStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: 'max-content',
  maxWidth: '150px',
};
