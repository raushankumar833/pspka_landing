import { IconButton, MenuItem, PopoverOrigin } from '@mui/material';
import Popover from '@mui/material/Popover';
import getPosition from './getPosition';
// import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { ClientInterface } from 'src/@types/clients';
import { useState } from 'react';
import Iconify from 'src/components/iconify';
import UserPermissionPopover from './UserPermissionDialogue';
import { useAuthContext } from 'src/auth/useAuthContext';

// ----------------------------------------------------------------------
interface Props {
  row?: ClientInterface;
}
const ClientMenuPopover = ({ row }: Props) => {
  const { style, anchorOrigin, transformOrigin } = getPosition('right-top');
  const { user } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const router = useRouter();
  const queryString = JSON.stringify(row);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton color={'default'} onClick={handleClick}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={anchorOrigin as PopoverOrigin}
        transformOrigin={transformOrigin as PopoverOrigin}
        PaperProps={{
          sx: {
            p: 1,
            width: 'auto',
            overflow: 'inherit',
            ...style,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
              '& svg': { mr: 2, width: 20, height: 20, flexShrink: 0 },
            },
          },
        }}
      >
        {/* <NextLink href={PATH_DASHBOARD.clients.edit(row?.username)} passHref prefetch={false}> */}
        {/* <NextLink href={PATH_DASHBOARD.admin.user_edit(row?.username)} passHref prefetch={false}> */}
          <MenuItem
          onClick={() => {
            // handleClosePopover();
            router.push({
              pathname: PATH_DASHBOARD.admin.user_edit,
              query: {row: queryString}
            });
          }}
          >
            <>
              <Iconify icon="eva:edit-fill" />
              Edit Details
            </>
          </MenuItem>
          <UserPermissionPopover user={user} />
        {/* </NextLink> */}
      </Popover>
    </>
  );
};
export default ClientMenuPopover;
