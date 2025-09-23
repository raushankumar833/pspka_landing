import React, { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps, Grid, Stack, Typography, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';
import { PROJECT_VERSION } from 'src/config';
import NextLink from 'next/link';
import { PATH_PAGE } from 'src/routes/paths';

// ----------------------------------------------------------------------

export interface FooterProps extends BoxProps {
  svg?: boolean;
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(({ sx, svg, ...other }, ref) => {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const SECONDARY_LIGHT = theme.palette.secondary.light;
  const year = new Date().getFullYear();
  const isDark = theme.palette.mode === 'dark';
  return (
    <>
      <Box
        ref={ref}
        component="div"
        className="card-login_footer"
        sx={{
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
          boxShadow: isDark
            ? '0px -1px 4px 0px rgba(255,255,255,1)'
            : '0px -1px 2px 0px rgba(255,255,255,1)',
          background: isDark ? '' : theme.palette.common.white,
          px: 3,
          ...sx,
        }}
        {...other}
      >
        <Grid container>
          <Grid item md={7}>
            <Stack flexDirection="column">
              <Stack
                flexDirection="row"
                spacing={2}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& .list-item': {
                    textDecoration: 'none',
                    listStyle: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    margin: 0,
                  },
                }}
              >
                <div className="list-item">
                  <IconButton>
                    <Iconify icon="ri:instagram-fill" />
                  </IconButton>
                </div>
                <div className="list-item">
                  <IconButton>
                    <Iconify icon="devicon:linkedin" />
                  </IconButton>
                </div>
              </Stack>
              <Typography variant="body1">
                © Copyright {year} {process.env.REACT_APP_PROJECT_TITLE} All right reserved.
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item
            md={5}
            sx={{
              textAlign: 'right',
            }}
          >
            <Stack flexDirection="column">
              <Typography variant="body1">v {PROJECT_VERSION}</Typography>
              <Typography variant="body1">
                <NextLink href={PATH_PAGE.about} passHref>
                  <Typography component={'span'} variant="body1" fontWeight="bold">
                    About
                  </Typography>
                </NextLink>{' '}
                {process.env.REACT_APP_PROJECT_TITLE}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* WAVW DESIGN FOR MOBILE APP */}
      <Box
        ref={ref}
        component="div"
        sx={{
          [theme.breakpoints.up('md')]: {
            display: 'none',
          },
          ...sx,
        }}
        {...other}
      >
        <svg
          className="card-login_footer"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink" // Correct xmlnsXlink attribute
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0
     58-18 88-18s
     58 18 88 18
     58-18 88-18
     58 18 88 18
     v44h-352z"
            />
          </defs>
          <g className="parallax1">
            <use xlinkHref="#gentle-wave" x="50" y="3" fill={PRIMARY_DARK} />{' '}
            {/* Correct xlinkHref attribute */}
          </g>
          <g className="parallax2">
            <use xlinkHref="#gentle-wave" x="50" y="0" fill={PRIMARY_LIGHT} />
          </g>
          <g className="parallax3">
            <use xlinkHref="#gentle-wave" x="50" y="9" fill={PRIMARY_MAIN} />
          </g>
          <g className="parallax4">
            <use xlinkHref="#gentle-wave" x="50" y="6" fill={SECONDARY_LIGHT} />
          </g>
        </svg>
      </Box>
    </>
  );
});

export default Footer;
