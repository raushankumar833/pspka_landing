// components/PopoverComponent.js
import React, { useState } from 'react';
// import { , Popover, Typography, , FormControlLabel, Checkbox } from '@mui/material';
import { getRequest, postJsonData } from 'src/utils/axiosController';
import { Apiendpoints } from 'src/utils/Apiendpoints';
import { ClientInterface } from 'src/@types/clients';
import { useSnackbar } from 'notistack';
import {
  Button,
  Box,
  Popover,
  Typography,
  FormControlLabel,
  Checkbox,
  MenuItem,
  // DialogActions
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Iconify from 'src/components/iconify';

type UserInterface = {
    user: ClientInterface
}

type PDataItem =  {
  id: number,
  name: string,
  status: number
}

const UserPermissionPopover = ({ user }: UserInterface) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [Loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [pData, setPData] = useState<PDataItem[]>([]);
  const {control, handleSubmit} = useForm();

  // const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  //   color: theme.palette.primary.main,
  //   '&.Mui-checked': {
  //     color: theme.palette.secondary.main,
  //   },
  //   '& .MuiSvgIcon-root': {
  //     fontSize: 28,
  //   },
  //   textAlign: "right"
  // }));

  const isLoading = () => Loading;
  console.log(setLoading)

  const handleClick = (event: any) => {
    setLoading(true);
    setAnchorEl(event.currentTarget);
    console.log("This is your user id", {user});
    getRequest(
        `${Apiendpoints.MENUS}?user_id=${user?.id}`,
      isLoading,
      (res) => {
        // const permission = res?.data?.permission;
        console.log("This is your response", res)
        setPData(res?.data?.data);
        console.log("This is your permission Data", pData)
        setLoading(false);
      },
      (err) => {
        console.error(err);
        enqueueSnackbar('Unable to Fetch User!', { variant: 'error' });
        setLoading(false);
        handleClose();
      }
    )
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const convertBooleanToNumber = (obj: { [key: string]: boolean }) => {
    return Object.keys(obj).reduce((acc: { [key: string]: number }, key) => {
        acc[key] = obj[key] ? 1 : 0;
        return acc;
    }, {});
};

  const onSubmit = (data: any) => {
    setLoading(true);
    console.log('Submit button clicked');
    console.log("This is your form data", data)
    const convertedData = convertBooleanToNumber(data)
    const jsonData = {user_id: user?.id, permissions: convertedData}
    postJsonData(
      `${Apiendpoints.MENUS}`,
    jsonData,
    isLoading,
    (res) => {
      // const permission = res?.data?.permission;
      console.log("This is your response", res)
      setPData(res?.data?.data);
      enqueueSnackbar("Permissions Updated Successfully.");
      console.log("This is your permission Data", res?.data?.data)
      setLoading(false)
      handleClose();
    },
    (err) => {
      setLoading(false)
      console.error(err);
      enqueueSnackbar('Unable to Fetch User!', { variant: 'error' });
    }
  )
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Edit
      </Button> */}
      {/* <LoadingButton aria-describedby={id} variant="contained" loading={Loading} onClick={handleClick} >
              Edit
      </LoadingButton> */}
      {/* <Button
            variant="text"
            // color="success"
            onClick={() => {
              // onSubmit();
            }}
            disabled={Loading}
          > */}
          <MenuItem onClick={handleClick}>
            <Iconify icon="eva:edit-fill" />
            Update Permission
          </MenuItem>
          {/* </Button> */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2} display={"flex"} flexDirection={"column"}>
          <Typography variant="h6">User Permission Updation</Typography>
          {(pData && pData.length > 0) &&
          pData.map((item) => (
              <Controller
                  key={item?.id}
                  name={item?.name}
                  control={control}
                  defaultValue={item.status}
                  render={({ field }) => (
                      <FormControlLabel
                          control={<Checkbox {...field} checked={field.value}/>}
                          label={item.name}
                      /> 
                  )}
              />
          ))}
          <Box mt={2} display="flex" justifyContent="space-between">
            {/* <Button variant="contained" color="primary" type="submit" onClick={handleSubmit(onSubmit)}>
              Submit
            </Button> */}
            <LoadingButton
            // type="submit"
            variant="contained"
            loading={Loading}
            onClick={handleSubmit(onSubmit)}
            >
              Submit
            </LoadingButton>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default UserPermissionPopover;
