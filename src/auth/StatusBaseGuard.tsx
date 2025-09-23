import { m } from 'framer-motion';
// @mui
import { Container, Typography } from '@mui/material';
// components
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { ForbiddenIllustration } from '../assets/illustrations';
//
import { useAuthContext } from './useAuthContext';
import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------------

type StatusBaseGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
};

// Utility function to normalize paths by adding a trailing slash if missing
const normalizePath = (path: string) => {
  if (!path) return '';
  return path.endsWith('/') ? path : `${path}/`;
};

export default function StatusBaseGuard({ hasContent, roles = [], children }: StatusBaseGuardProp) {
  const { user, navList } = useAuthContext();
  const pathname = usePathname();
  const currentRole = user?.role;
  
  // Check if pathname is defined before normalizing
  const normalizedPathname = pathname ? normalizePath(pathname) : '';
  // Flatten the navList to handle nested items
  const flattenedNavList = navList.flatMap((item: { items: any; }) => item.items);


  // Find the current navigation item based on the normalized pathname
  const currentNavItem = flattenedNavList.find((item: { path: any; }) => {
    const normalizedItemPath = normalizePath(item.path || ''); // Default to empty string if undefined
    return normalizedItemPath === normalizedPathname;
  });


  // Check if the current user's role is allowed
  const isRoleAllowed = roles && roles.includes(currentRole);
  // Check if the current navigation item exists and its status is 1
  const isStatusAllowed = currentNavItem && currentNavItem.status === 1;

  // Render permission denied message if role is not allowed or status is not allowed
  if (!isRoleAllowed || !isStatusAllowed) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>
      </Container>
    ) : null;
  }

  return <>{children}</>;
}
