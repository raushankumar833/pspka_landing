import { memo } from 'react';
import { Box, Stack } from '@mui/material';
//
import { NavSectionProps, NavListProps } from '../types';
import NavList from './NavList';
import { checklength } from 'src/utils/flattenArray';

// ----------------------------------------------------------------------

function NavSectionMini({ data, sx, ...other }: NavSectionProps) {
  return (
    <Stack
      spacing={0.5}
      alignItems="center"
      sx={{
        px: 0.75,
        ...sx,
      }}
      {...other}
    >
      {checklength(data) &&
        data.map((group) => <Items key={group.subheader.title} items={group.items} />)}
    </Stack>
  );
}

export default memo(NavSectionMini);

// ----------------------------------------------------------------------

type ItemsProps = {
  items: NavListProps[];
};

function Items({ items }: ItemsProps) {
  return (
    <>
      {checklength(items) &&
        items
          .filter((navItem: any) => navItem.status === 1)
          .map((list) => (
            <NavList
              key={list.title + list.path}
              data={list}
              depth={1}
              hasChild={!!list.children}
            />
          ))}

      <Box sx={{ width: 24, height: '1px', bgcolor: 'divider', my: '8px !important' }} />
    </>
  );
}
