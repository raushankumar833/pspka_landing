import { LoadingButton } from '@mui/lab';
import { Box, Dialog, DialogContent, DialogTitle, Typography, useTheme } from '@mui/material'
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { postJsonData } from 'src/utils/axiosController';

// interface DmtConfirmationDialogueProps {
//     data: any;
//     setOpen: (open: boolean) => void; // Define the type for setOpen
//   }
  
  const DmtConfirmationDialogue = ({data}: any) => {
    const [open, setOpen] = useState(true)
    const [loading, setLoading] = useState(false)
    const theme = useTheme();
    const { enqueueSnackbar } = useSnackbar()

    const isLoading = () => loading;
    {console.log("This is completeData", data)}
    const onSubmit = () => {
        console.log("data in postjson", data)
        postJsonData(
            `${Apiendpoints.DMT1_MONEY_TRANSFER}`,
          data,
          isLoading,
          (res) => {
            enqueueSnackbar("Permissions Updated Successfully.");
            setLoading(false)
            setOpen(false);
          },
          (err) => {
            setLoading(false)
            console.error(err);
            enqueueSnackbar('Something went wrong', { variant: 'error' });
          }
        )
    }

  
  return (
    <div>
        <Dialog open={open} onClose={()=>setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle style={{margin: 'auto'}}>TPIN Verify</DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          {/* wallet choose */}
          {/* {console.log("This is your user", completeData)} */}
          <Typography
                sx={{
                background: theme.palette.primary.light + 18,
                margin: '0 auto 2rem auto',
                // py: 0.3,
                // my: 2,
                px: 1.2,
                color: 'black',
                fontSize: '1rem',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1
                }}
            >
                
                <p>NAME : {data?.data?.name || '  -  '}</p>
                <p>Account No. : {data?.data?.accountNumber || '  -  '}</p>
                <p>IFSC : {data?.data?.ifsc || '  -  '}</p>
                <p>Amount : {data?.data?.amount || '  -  '}</p>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <LoadingButton
                  fullWidth
                  size="large"
                  // type="submit"
                  onClick={()=> setOpen(false)}
                  variant="outlined"
                  sx={{
                    // mt: 2,
                  }}
                >
                  Close
                </LoadingButton>
                <LoadingButton
                  fullWidth
                  size="large"
                  // type="submit"
                  onClick={()=>onSubmit()}
                  variant="contained"
                  sx={{
                    // mt: 2,
                  }}
                >
                  Confirm
                </LoadingButton>
              </Box>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default DmtConfirmationDialogue;
