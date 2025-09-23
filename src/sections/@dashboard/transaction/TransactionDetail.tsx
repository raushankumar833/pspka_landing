import { useState } from 'react';
import { Box, IconButton, Drawer, Typography, Tooltip } from '@mui/material';
import Iconify from 'src/components/iconify';
import { TransactionInterface } from 'src/@types/clients';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import { currencySetter } from 'src/utils/currencyUtil';
import { datemonthYear } from 'src/utils/dateutils';
import RaiseComplaintPopover from 'src/components/clients/menu-popover/RaiseComplaintPopover';

interface Props {
  row?: TransactionInterface;
}

const TransactionDetail = ({row}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openRaiseComplaint, setOpenRaiseComplaint] = useState(false)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(!isOpen);
  };

  const theme = useTheme();

  const StyledDiv = styled('div')({
    background: theme.palette.primary.light + 36,
    // background: `url(/assets/images/transaction/TransactionDetailBackgroundPattern.png)`
    // sx={
      // transform: 'scaleY(-1)',
      // width: '100%', 
      // height: '100%', 
      // backgroundImage: 'url(/assets/images/transaction/TransactionDetailBackgroundPattern2.png)', 
      // backgroundSize: 'cover', 
      // backgroundPosition: 'center', 
      // backgroundRepeat: 'no-repeat', 
    // }
    // height: '50%'
  })

  const handleRaiseComplaint = ()=>{
    setIsOpen(false);
    setOpenRaiseComplaint(true);
  }

  const RaiseComplaintProps = {
    row: row,
    open: openRaiseComplaint,
    setDrawer: setOpenRaiseComplaint
  }

  return (
    <div>
    <Box sx={{ margin: 2, zIndex: 1000}}>
      <IconButton color={'default'} onClick={handleClick}>
        <Iconify icon="fa-solid:eye" />
      </IconButton>
      <Drawer
        anchor="right"
        open={isOpen}
        PaperProps={{ style: { zIndex: 1301 } }}
      >
        <Box
          sx={{ width: '500px',
            margin: '0 auto'}}
          role="presentation"
        >
        <div>
        <StyledDiv>
        <IconButton color={'default'} onClick={handleClick}>
          <Iconify icon="radix-icons:cross-1" />
        </IconButton>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Typography variant="h3" sx={{mx: 'auto'}}>{currencySetter(Number(row?.amount))}</Typography>
        <Typography 
          variant="h4"
          sx={{mx: 'auto'}} 
          color={(row?.status === 'SUCCESS') ? 'green' : (row?.status === 'PENDING') ? '#C4892E' : 'red'}
          >
            {row?.status}
        </Typography>
        <Typography variant="body2" sx={{mx: 'auto'}}>
            {row?.created_at ? datemonthYear(new Date(row?.created_at)) : "Total"}
        </Typography>
        </div>
        {/* <Typography variant="body2">{datemonthYear(row?.created_at)}</Typography> */}
        </StyledDiv>
        
        <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography variant="h5" sx={{mx: 'auto', display: 'inline'}}>
                Transaction Detail
            <Tooltip title='Raise Complaint'>
            <IconButton color={'default'} onClick={handleRaiseComplaint}>
                <Iconify icon="emojione-monotone:raised-back-of-hand" />
            </IconButton>
            </Tooltip>
            </Typography>
        </div>
        </div>
          <div
                style={{
                margin: '0 1.9rem 2rem 1.9rem',
                padding: '1rem',
                color: 'black',
                fontSize: '1rem',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'flex-end',
                gap: 1
                }}
          >
            <div style={{display: 'flex', flexDirection: 'column' }}>
              <p>Number</p>
              <p>Platform</p>
              <p>Service Type</p>
              <p>Route</p>
              <p>Operator Code</p>
              <p>Operator ID</p>
              <p>Charge</p>
              <p>Commission</p>
              <p>Closing</p>
              <p>MOP</p>
              <p>Order Id</p>
              <p>Info</p>
              <p>GST</p>
              <p>TDS</p>
              {/* <p>Company ID</p> */}
            </div>
            <div style={{
              fontWeight: 'bold',
              textAlign: 'right'
              }}>
              <p>{(row?.number) ?? '-'}</p>
              <p>{(row?.platform) ?? '-'}</p>
              <p>{(row?.service_type) ?? '-'}</p>
              <p>{(row?.route) ?? '-'}</p>
              <p>{(row?.op_code) ?? '-'}</p>
              <p>{(row?.op_id) ?? '-'}</p>
              <p>{(row?.ret_charge) ?? '-'}</p>
              <p>{(row?.ret_comm) ?? '-'}</p>
              <p>{(row?.ad_closing) ?? '-'}</p>
              <p>{(row?.mop) ?? '-'}</p>
              <p>{(row?.order_id) ?? '-'}</p>
              <p>{(row?.info) ?? '-'}</p>
              <p>{(row?.gst) ?? '-'}</p>
              <p>{(row?.tds) ?? '-'}</p>
              {/* <p>{(row?.companyId) ?? '-'}</p> */}
              {/* <p>{(row && row.status) ? row.status : '-'}</p>
              <p>{(row && row.amount) ? currencySetter(Number(row.amount)) : '-'}</p> */}
            </div>
          </div>
          {/* <div style={{margin: '0 auto'}}>
          <Button variant="outlined" onClick={handleClick}>Close</Button>
          </div> */}
        </Box>
      </Drawer>
    </Box>
    {openRaiseComplaint && <RaiseComplaintPopover {...RaiseComplaintProps}/>}
    </div>
  );
};

export default TransactionDetail;
