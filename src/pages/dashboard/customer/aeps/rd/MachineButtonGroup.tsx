import { Button } from '@mui/material';
import MachineDetectButton from './MachineDetectButton';

const MachineButtonGroup = ({ onScan, onRdDeviceInfo, ...other }: any) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '8px',
        display: 'flex',
        justifyContent: 'between',
        alignItems: 'center',
      }}
    >
      <Button
        size="small"
        onClick={onScan}
        variant="outlined"
        sx={{
          mr: 1,
        }}
        {...other}
      >
        Start Scan
      </Button>

      <MachineDetectButton onClick={onRdDeviceInfo} />
    </div>
  );
};

export default MachineButtonGroup;
