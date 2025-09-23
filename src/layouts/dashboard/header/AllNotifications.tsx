import { Box, Button, Modal, Paper, TableContainer, TableHead, Typography } from '@mui/material'
import React from 'react'
import { NotificationInterface } from 'src/@types/notifications';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { datemonthYear } from 'src/utils/dateutils';
import { useTheme } from '@mui/material/styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    mx:'auto',
    textAlign: 'center',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

type PropType = {
    show: boolean;
    setShow: (v: boolean)=>void;
    notifications: Array<NotificationInterface>;
}

const AllNotifications = ({show, setShow, notifications}: PropType) => {
    const theme = useTheme();

  return (
    <div>
        <Modal
            open={show}
            onClose={()=>setShow(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
              BorderRadius: '10px'}}
            >
            <Box sx={{
                  ...style,
                  borderRadius: '10px'}}>
                <Typography id="modal-modal-title" color={theme.palette['warning'].darker} variant="h3" mb={2}>
                All Notifications
                </Typography>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell width={'20%'}>Created</TableCell>
                        <TableCell width={'15%'} align="center">Priority</TableCell>
                        <TableCell width={'65%'} align="center">Message</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {notifications.map((notification) => (
                        <TableRow
                          key={notification.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {datemonthYear(notification.created_at)}
                          </TableCell>
                          <TableCell align="center">{(notification.priority).toUpperCase()}</TableCell>
                          <TableCell align="center">{notification.message}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button variant='contained' onClick={()=>setShow(false)}>Close</Button>
            </Box>
        </Modal>
    </div>
  )
}

export default AllNotifications
