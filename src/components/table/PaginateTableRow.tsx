import { useState } from 'react';
import {
  Stack,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';
import Label from '../label';
import MenuPopover from '../menu-popover';
import ConfirmDialog from '../confirm-dialog';
import { IUserAccountGeneral } from 'src/@types/user';
import Iconify from '../iconify';

// ----------------------------------------------------------------------

type Props = {
  row?: IUserAccountGeneral;
  selected?: boolean;
  onEditRow?: VoidFunction;
  onSelectRow?: VoidFunction;
  onDeleteRow?: VoidFunction;
};

export default function PaginateTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Iconify icon="material-symbols:wind-power-rounded" />

            <Typography variant="subtitle2" noWrap>
              test
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">AD & company</TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          owner
        </TableCell>

        <TableCell align="center">
          <Iconify
            icon={'eva:checkmark-circle-fill'}
            sx={{
              width: 20,
              height: 20,
              color: 'success.main',
            }}
          />
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={(status === 'banned' && 'error') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            active
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClosePopover();
          }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
