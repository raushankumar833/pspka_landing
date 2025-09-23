import { PATH_PAGE } from '../../../routes/paths';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon="eva:home-fill" />,
    path: '/',
  },
  {
    title: 'About Us',
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.about,
  },
  {
    title: 'Our Services',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: PATH_PAGE.services,
  },
  {
    title: 'Our Partners',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: PATH_PAGE.ourpartners,
  },
  {
    title: 'Contact Us',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: PATH_PAGE.contact,
  },
];

export default navConfig;
