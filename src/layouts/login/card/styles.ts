import { styled, alpha, SxProps } from '@mui/material/styles';
import { bgGradient } from '../../../utils/cssStyles';

// ----------------------------------------------------------------------
interface StyledRootProps {
  theme?: SxProps;
  isDark?: boolean;
}
export const StyledRoot = styled('main')<StyledRootProps>(({ theme, isDark }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  padding: '70px',
  [theme.breakpoints.down('md')]: {
    padding: '0px',
  },
  background: isDark
    ? ''
    : `linear-gradient(45deg, ${alpha(theme.palette.secondary.main, 1)} 5%, ${alpha(
        theme.palette.primary.main,
        1
      )} 50%, ${alpha(theme.palette.primary.dark, 1)} 2%)`,
}));
// `radial-gradient(143.42% 143.42% at 99.3% 99.1%, ${theme.palette.warning.light} 0%, ${theme.palette.warning.light} 3%, ${theme.palette.secondary.main} 28%, ${theme.palette.primary.main} 51%, ${theme.palette.primary.main} 71%, ${theme.palette.primary.dark} 88%, ${theme.palette.primary.darker} 100%)`,

export const StyledSectionBg = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  top: 0,
  left: 0,
  zIndex: -1,
  width: '80%',
  height: '100%',
  position: 'absolute',
  transform: 'scaleX(-1)',
}));
