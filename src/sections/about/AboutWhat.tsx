import { Grid, Container, Typography, styled } from '@mui/material';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  textAlign: 'center',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    textAlign: 'left',
  },
}));

// ----------------------------------------------------------------------

export default function AboutWhat() {
  return (
    <StyledRoot>
      <Container>
        <Grid container>
          <Grid item>
            <Typography
              textAlign={'center'}
              variant="h4"
              fontWeight="normal"
              px={{ lg: 12, md: 12, sm: 2, xs: 2 }}
              sx={{ color: '#140a53' }}
            >
              We create software that doesn't just function, it inspires. Our dedicated teams
              spend years honing their skills to craft solutions that delight users and elevate
              businesses. For us, software is more than a job—it's a passion.
            </Typography>
            <Typography
              textAlign={'center'}
              pt={4}
              sx={{
                fontSize: { xs: '32px', md: '46px' },
                fontWeight: 'bold',
                color: '#140a53',
              }}
            >
              Excellence is our standard
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </StyledRoot>
  );
}


// ----------------------------------------------------------------------

// type ProgressItemProps = {
//   progress: {
//     label: string;
//     value: number;
//   };
// };

// function ProgressItem({ progress }: ProgressItemProps) {
//   const { label, value } = progress;
//   return (
//     <Box sx={{ mt: 3 }}>
//       <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
//         <Typography variant="subtitle2">{label}&nbsp;-&nbsp;</Typography>
//         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           {fPercent(value)}
//         </Typography>
//       </Box>
//       <LinearProgress
//         variant="determinate"
//         value={value}
//         sx={{
//           '& .MuiLinearProgress-bar': { bgcolor: 'grey.700' },
//           '&.MuiLinearProgress-determinate': { bgcolor: 'divider' },
//         }}
//       />
//     </Box>
//   );
// }
