import { m } from 'framer-motion';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Typography, Stack, Container, Grid, GridDirection } from '@mui/material';
import { MotionViewport, varFade } from '../../components/animate';

import Image from '../../components/image';
import project_data from 'project-config.json';
import { ListType } from 'src/pages/our-partners';
import HomeCount from '../home/HomeCount';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(4, 0),
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8, 0),
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(1.5, 0),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2, 0),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(2.5),
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    paddingLeft: theme.spacing(5),
    paddingTop: theme.spacing(15),
  },
}));

// ----------------------------------------------------------------------

export default function WhyPartner() {
  const {
    ourpartner: { why_partner },
  } = project_data;
  const theme = useTheme();
  return (
    <StyledRoot>
      {why_partner?.length > 0 &&
        why_partner.map((why_partner, index) => (
          <>
            <Box component={MotionViewport}>
              <Stack
                spacing={1}
                sx={{
                  m: '0 auto',
                  width: { md: 700 },
                  textAlign: 'center',
                }}
              >
                <m.div variants={varFade().inRight}>
                  <Typography variant="h2" fontWeight="600" color="#140a53">
                    {why_partner?.title}
                  </Typography>
                </m.div>
              </Stack>
            </Box>

            {/* WHY POINTS MAPPING */}
            <Container component={MotionViewport}>
              {why_partner.list.length > 0 &&
                why_partner.list.map((list, index) => (
                  <Grid
                    key={index}
                    direction={{ xs: 'column', md: list?.grid_direction as GridDirection }}
                    container
                    spacing={4}
                    mt={2}
                  >
                    <Grid item xs={12} md={5}>
                      <Description list={list} />
                    </Grid>

                    <Grid item xs={12} md={7}>
                      <Content list={list} />
                    </Grid>
                  </Grid>
                ))}
            </Container>
          </>
        ))}

      <HomeCount />
    </StyledRoot>
  );
}

function Description({ list }: { list: ListType }) {
  return (
    <StyledDescription>
      <ParaHeading title={list?.title} />

      <m.div variants={varFade().inRight}>
        <Typography
          mt={4}
          variant="h6"
          fontWeight="600"
          color="#140a53"
          lineHeight={'2rem'}
          letterSpacing={'0.005rem'}
        >
          {list?.intro}
        </Typography>
      </m.div>
    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

function Content({ list }: { list: ListType }) {
  return (
    <StyledContent>
      <m.div variants={varFade().inLeft}>
        <Image src={list.icon} alt="services" sx={{
    width: {
      xs: '100%',
      sm: '100%',
      md: '80%',
    },
    height: {
      xs: 'auto',
      sm: 'auto',
      md: '65%',
    },
  }}/>
      </m.div>
    </StyledContent>
  );
}

function ParaHeading({ title = `${process.env.REACT_APP_PROJECT_TITLE} for Retails` }) {
  const theme = useTheme();
  return (
    <m.div variants={varFade().inRight}>
      <Typography variant="h3" fontWeight="600" color="#140a53">
        {title}
      </Typography>
    </m.div>
  );
}
