import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { ClientInterface } from 'src/@types/clients';
import { USERROLES } from 'src/utils/constants';

interface BlinkingDivProps {
  children: React.ReactNode;
  user: ClientInterface;
  width: string;
}

const BlinkingDiv = ({ children, user, width }: BlinkingDivProps) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let interval: any;
    if (user.w1 && user.w1 < 5000) {
      interval = setInterval(() => {
        setBlink((prev) => !prev);
      }, 500);
    } else {
      setBlink(false);
    }

    return () => clearInterval(interval);
  }, [user]);

  const getColor = () => {
    if (user.w1 && (user.w1 < 1000) && !([USERROLES.admin, USERROLES.subadmin].includes(user.role))) return blink ? 'red' : 'linear-gradient(to right bottom, #C33764, #1D2671)';
    if (user.w1 && (user.w1 < 5000) && !([USERROLES.admin, USERROLES.subadmin].includes(user.role))) return blink ? 'yellow' : 'linear-gradient(to right bottom, #C33764, #1D2671)';
    // return 'linear-gradient(to right bottom, #2D4F6A 0%, #5B8BAF 50%, #1E3447 100%)';
    return 'linear-gradient(to right bottom, #2D4F6A 0%, #6A4F2D 100%)'
  };

  return (
    <Box
      sx={{
        background: getColor(),
        // background: 'transparent',
        height: "80%",
        width: "auto",
        minWidth: width,
        maxWidth: width,
        borderRadius: '10px',
        margin: "0",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        animation: blink ? 'blink 1s infinite' : 'none'
      }}
    >
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0 }
          }
        `}
      </style>
      {children}
    </Box>
  );
};

export default BlinkingDiv;
