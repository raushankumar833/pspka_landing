// @mui
import { List, Stack } from '@mui/material';
// locales
import { useLocales } from '../../../locales';
//
import { NavSectionProps } from '../types';
import { StyledSubheader } from './styles';
import NavList from './NavList';
import RoleBasedGuard from 'src/auth/RoleBasedGuard';
import { checklength } from 'src/utils/flattenArray';

// ----------------------------------------------------------------------

export default function NavSectionVertical({ data, sx, ...other }: NavSectionProps) {
  // console.log('navlist in nav sec', data);
  const { translate } = useLocales();

  return (
    <Stack sx={sx} {...other}>
      {checklength(data) &&
        data.map((group) => {
          const key = group.subheader.title || group.items[0].title;

          return (
            <List key={key} disablePadding sx={{ px: 2 }}>
              {group.subheader && (
                <RoleBasedGuard roles={group.subheader.roles ?? group.subheader.roles}>
                  <StyledSubheader disableSticky>
                    {translate(group.subheader.title)}
                  </StyledSubheader>
                </RoleBasedGuard>
              )}

              {checklength(group.items) &&
                group.items
                  .filter((navItem: any) => navItem.status === 1)
                  .map((list) => (
                    <NavList
                      key={list.title + list.path}
                      data={list}
                      depth={1}
                      hasChild={!!list.children}
                    />
                  ))}
            </List>
          );
        })}
    </Stack>
  );
}
