import { styled } from '@mui/material/styles';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(10, 0),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    // backgroundImage: `url('/assets/background/overlay_4.jpg')`,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(20, 0),
    },
  }));
    

      
// ----------------------------------------------------------------------

export default function HeroSectionLayout1({children}:any) {
  return (
    <StyledRoot>
        {children}
    </StyledRoot>
  );
}
