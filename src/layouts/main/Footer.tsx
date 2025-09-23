import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, Grid, Link, Stack, Container, Typography, IconButton } from '@mui/material';
import { PATH_PAGE } from '../../routes/paths';
import Logo from '../../components/logo';
import Iconify from '../../components/iconify';

const _socials = [
  { name: 'Facebook', icon: 'eva:facebook-fill', href: 'https://facebook.com', color: '#4267B2' },
  { name: 'Twitter', icon: 'eva:twitter-fill', href: 'https://twitter.com', color: '#00ACEE' },
  { name: 'Instagram', icon: 'eva:instagram-fill', href: 'https://instagram.com', color: '#C13584' },
  { name: 'LinkedIn', icon: 'eva:linkedin-fill', href: 'https://linkedin.com', color: '#005983' },
];

type LinkItem = {
  name: string;
  href: string;
  target?: string;
  rel?: string;
};

const LINKS: { headline: string; children: LinkItem[] }[] = [
  {
    headline: `P2PAE`,
    children: [
      { name: 'About us', href: PATH_PAGE.about },
      { name: 'Contact us', href: PATH_PAGE.contact },
      { name: 'FAQs', href: PATH_PAGE.faqs },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: PATH_PAGE.termscondition, target: '_blank', rel: 'noopener noreferrer' },
      { name: 'Privacy Policy', href: PATH_PAGE.privacy, target: '_blank', rel: 'noopener noreferrer' },
    ],
  },
  {
    headline: 'Contact',
    children: [
      { name: 'Support@p2pae.com', href: 'mailto:Support@p2pae.com' },
        { name: '011-47537321 ,7428985999', href: 'tel:7428985999' },

      { name: 'PVT No.-2, B-1, KH No.900/289Ground Floor, Shalimar Village, Delhi, North West Delhi- 110088, Delhi', href: '#' },
    ],
  },
];

export default function Footer() {
  const date = new Date().getFullYear();
  const router = useRouter();

  const isActive = (href: string) => router.pathname === href;

  return (
    <Box component="footer" sx={{ position: 'relative', bgcolor: 'background.default', overflow: 'hidden', py: 2, mt: 2 }}>
      {/* Logo watermark */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.05,
          zIndex: 0,
          width: { xs: '80%', md: '40%' },
          pointerEvents: 'none',
        }}
      >
        <Logo sx={{ width: '100%', height: 'auto' }} />
      </Box>

      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container justifyContent={{ xs: 'center', md: 'space-between' }} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          {/* Logo */}
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Logo sx={{ mx: { xs: 'auto', md: 'inherit' }, zIndex: 2, position: 'relative' }} />
          </Grid>

          {/* Disclaimer and social icons */}
          <Grid item xs={12} md={4} sx={{ mb: { xs: 3, md: 1 } }}>
            <Typography variant="body1" sx={{ pr: { md: 4 }, fontWeight: 500 ,color:"#140a53"}}>
              Disclaimer: Any dispute arising under these terms and conditions shall be subject to
              the jurisdiction of the courts of Delhi.
            </Typography>

            <Stack spacing={1.5} direction="row" justifyContent={{ xs: 'center', md: 'flex-start' }} sx={{ mt: 2 }}>
              {_socials.map((social) => (
                <IconButton
                  key={social.name}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: social.color,
                    transition: '0.3s',
                    '&:hover': { transform: 'scale(1.2)' },
                  }}
                >
                  <Iconify icon={social.icon} width={24} height={24} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Links */}
    <Grid item xs={12} md={7}>
  <Stack
    direction={{ xs: 'column', md: 'row' }}
    justifyContent="flex-start"
    spacing={{ xs: 4, md: 12 }}
    flexWrap="nowrap" // keep all columns in one row
  >
    {LINKS.map((list) => (
      <Stack
        key={list.headline}
        spacing={1}
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{ whiteSpace: 'nowrap' }} // prevents text wrap
      >
        <Typography component="div" variant="subtitle1" sx={{ fontWeight: 700,whiteSpace: 'nowrap',color:"#140a53"  }}>
          {list.headline}
        </Typography>

        {list.children.map((link) =>
          link.target ? (
            <Link
              key={link.name}
              href={link.href}
              target={link.target}
              rel={link.rel}
              sx={{
                fontSize: '1rem',
                color: isActive(link.href) ? '#140a53' : 'inherit',
                transition: '0.3s',
                '&:hover': { color: '#5210c1' },
                whiteSpace: 'nowrap', // prevents wrapping
              }}
            >
              {link.name}
            </Link>
          ) : (
            <NextLink key={link.name} href={link.href} passHref>
              <Link
                sx={{
                  fontSize: '1rem',
                  color: isActive(link.href) ? '#140a53' : 'inherit',
                  fontWeight: isActive(link.href) ? 600 : 400,
                  '&:hover': { color: '#5210c1' },
                  whiteSpace: 'wrap', // prevents wrapping
                }}
              >
                {link.name}
              </Link>
            </NextLink>
          )
        )}
      </Stack>
    ))}
  </Stack>
</Grid>


        </Grid>

        {/* Copyright */}
        <Typography variant="caption" component="div" sx={{color:"#140a53", mt: 2, textAlign: { xs: 'center', md: 'left' }, fontSize: '0.95rem' }}>
          © {date}. All rights reserved
        </Typography>
      </Container>
    </Box>
  );
}
