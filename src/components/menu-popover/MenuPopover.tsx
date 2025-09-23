// @mui
import { IconButton, Popover, PopoverOrigin } from '@mui/material';
//
import getPosition from './getPosition';
import { StyledArrow } from './styles';
import { MenuPopoverProps } from './types';
import Iconify from '../iconify';

// ----------------------------------------------------------------------
interface Props extends MenuPopoverProps {
  isDots?: boolean;
  handleOpenPopover?: (event: React.MouseEvent<HTMLElement>) => void;
}
export default function MenuPopover({
  open,
  children,
  arrow = 'top-right',
  disabledArrow,
  isDots = false,
  handleOpenPopover,
  sx,
  ...other
}: Props) {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow);

  return (
    <>
      {isDots && (
        <IconButton color={open ? 'inherit' : 'default'} onClick={handleOpenPopover}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      )}
      <Popover
        open={Boolean(open)}
        anchorEl={open}
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
            ...sx,
          },
        }}
        {...other}
      >
        {!disabledArrow && <StyledArrow arrow={arrow} />}

        {children}
      </Popover>
    </>
  );
}
