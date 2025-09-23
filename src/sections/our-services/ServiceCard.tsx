import { SxProps, styled, useTheme } from '@mui/material/styles';
import { Typography, Button, Stack, Card, Grid } from '@mui/material';
import { m } from 'framer-motion';
import { varFade } from 'src/components/animate';
import Iconify from 'src/components/iconify';
import useResponsive from 'src/hooks/useResponsive';
import project_data from 'project-config.json';
import { useRouter } from 'next/router';

interface StyledCardProps {
  theme?: SxProps;
  bgcolor?: string;
}

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(6, 0),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '8px',
  padding: theme.spacing(1),
  background: '#fff',
  border: '0px',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(20, 10, 83, 0.15)',
  },
}));

const StyledInnerCard = styled(Card)<StyledCardProps>(({ theme, bgcolor }) => ({
  borderRadius: '8px',
  position: 'relative',
  padding: theme.spacing(3),
  background: bgcolor || '#f5f5f5',
  border: '0px',
  boxShadow: 'none',
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  py: 0,
  px: 1,
  top: 8,
  right: 8,
  fontSize: '12px',
  borderRadius: '4px',
  fontWeight: 'bold',
  position: 'absolute',
  textTransform: 'uppercase',
  background: theme.palette.primary.main,
  color: theme.palette.getContrastText(theme.palette.primary.main),
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
}));

export default function ServicesCard() {
  const isMobile = useResponsive('down', 'md');
  const { services } = project_data;
  const { push } = useRouter();
  const textColor = '#140A53';

  return (
    <StyledRoot>
      {services?.length > 0 &&
        services.map((service, index) => (
          <Grid
            key={index}
            direction={{ xs: 'column', md: 'row' }}
            container
            spacing={4}
            mb={4}
          >
            <Grid item xs={12}>
              <Stack spacing={1}>
                <CardTitle title={service.title} color={textColor} />
                <CardSubTitle title={service.sub_title} color={textColor} />
              </Stack>
            </Grid>

            {service?.list?.length > 0 &&
              service.list.map((list, index) => (
                <Grid key={index} item xs={12} sm={12} md={6} lg={4}>
                  <StyledCard>
                    <StyledInnerCard bgcolor={list.bgcolor}>
                      {list.extra && <StyledButton>{list.extra}</StyledButton>}

                      <Iconify icon={list.icon} width={40} height={40} style={{ marginBottom: 16 }} />

                      <Typography
                        variant={isMobile ? 'h6' : 'h5'}
                        fontWeight="bold"
                        fontFamily="'Roboto Slab', serif"
                        marginBottom={isMobile ? 1 : 2}
                        color={textColor}
                      >
                        {list.title}
                      </Typography>

                      <Typography variant="body1" mb={3} textAlign="justify" color={textColor}>
                        {list.intro}
                      </Typography>

                      <m.div variants={varFade().inUp}>
                        <Button
                          size="medium"
                          variant="contained"
                          onClick={() => push(list.link)}
                          sx={{
                            backgroundColor: '#140A53',
                            borderRadius: '6px',
                            textTransform: 'capitalize',
                            '&:hover': { backgroundColor: '#0f083f' },
                          }}
                          endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
                        >
                          Try Now
                        </Button>
                      </m.div>
                    </StyledInnerCard>
                  </StyledCard>
                </Grid>
              ))}
          </Grid>
        ))}
    </StyledRoot>
  );
}

function CardTitle({ title = '', color }: { title: string; color: string }) {
  return (
    <m.div variants={varFade().inRight}>
      <Typography variant="h3" fontWeight="bold" color={color}>
        {title}
      </Typography>
    </m.div>
  );
}

function CardSubTitle({ title = '', color }: { title: string; color: string }) {
  return (
    <m.div variants={varFade().inRight}>
      <Typography variant="h6" fontWeight="medium" color={color}>
        {title}
      </Typography>
    </m.div>
  );
}
