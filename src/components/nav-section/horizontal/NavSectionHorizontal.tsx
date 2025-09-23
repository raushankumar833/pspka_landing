import { memo } from 'react';
// @mui
import { Stack } from '@mui/material';
// utils
import { hideScrollbarY } from '../../../utils/cssStyles';
//
import { NavSectionProps, NavListProps } from '../types';
import NavList from './NavList';
import { checklength } from 'src/utils/flattenArray';

// ----------------------------------------------------------------------

function NavSectionHorizontal({ data, sx, ...other }: NavSectionProps) {
  // console.log('items. heres in data data', data);
  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        mx: 'auto',
        ...hideScrollbarY,
        ...sx,
      }}
      {...other}
    >
      {checklength(data) &&
        data.map((group) => <Items key={group.subheader.title} items={group.items} />)}
    </Stack>
  );
}

export default memo(NavSectionHorizontal);

// ----------------------------------------------------------------------

type ItemsProps = {
  items: NavListProps[];
};

function Items({ items }: ItemsProps) {
  // console.log('items. heres in nav', items);

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
    </>
  );
}
