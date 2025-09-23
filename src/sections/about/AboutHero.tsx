import { m } from 'framer-motion';
import { styled, useTheme } from '@mui/material/styles';
import { Container, Divider, Typography } from '@mui/material';
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/assets/background/overlay_1.svg), url(/assets/images/about/hero1.jpeg)',
  padding: theme.spacing(1, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    bottom: 80,
    textAlign: 'left',
    position: 'absolute',
  },
}));

// ----------------------------------------------------------------------

export default function AboutHero() {
  const theme = useTheme();
  return (
    <StyledRoot>
      <Container component={MotionContainer}>
        <StyledContent>
          <Typography variant="h2" fontWeight="normal" color={theme.palette.common.white}>
            About Us
          </Typography>
          <Divider
            sx={{
              border: `1px solid ${theme.palette.info.main}`,
              display: 'block',
              width: '100px',
              margin: '0',
              mt: 2,
            }}
          />

          <m.div variants={varFade().inRight}>
            <Typography
              variant="h4"
              fontWeight="normal"
              color={theme.palette.common.white}
              sx={{
                mt: 2,
              }}
            >
              Simplify your finances and
              <br /> grow your business effortlessly
            </Typography>
          </m.div>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
