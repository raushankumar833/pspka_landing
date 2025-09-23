// @mui
import { enUS, hiIN } from '@mui/material/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'Hindi',
    value: 'hi',
    systemValue: hiIN,
    icon: '/assets/icons/flags/ic_flag_in.svg',
  },
 
  
];

export const defaultLang = allLangs[0]; // English
