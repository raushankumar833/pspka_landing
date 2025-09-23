import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Tab, Card, Tabs, Container, Box } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// _mock_
import { _userAbout, _userFollowers } from '../../../_mock/arrays';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import Iconify from '../../../components/iconify';
import { useSettingsContext } from '../../../components/settings';
// sections
import { ProfileCover, ProfileFollowers } from '../../../sections/@dashboard/user/profile';
import { PROFILE_TYPE } from 'src/utils/constants';
import UserNewEditForm from 'src/sections/@dashboard/user/UserNewEditForm';
import ChangePasswordDialogue from 'src/sections/@dashboard/profile/ChangePasswordDialogue';
import ChangeTpinDialogue from 'src/sections/@dashboard/profile/ChangeTpinDialogue';
import ResetTpinDialogue from 'src/sections/@dashboard/profile/ResetTpinDialogue';

// ----------------------------------------------------------------------

UserProfilePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function UserProfilePage() {
  const { themeStretch } = useSettingsContext();

  const { user } = useAuthContext();

  const [currentTab, setCurrentTab] = useState(PROFILE_TYPE.personal);

  const TABS = [
    {
      value: PROFILE_TYPE.personal,
      label: 'Personal Information',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <UserNewEditForm isEdit currentUser={user} />,
    },
    {
      value: PROFILE_TYPE.business,
      label: 'Business Information',
      icon: <Iconify icon="eva:heart-fill" />,
      component: <ProfileFollowers followers={_userFollowers} />,
    },
    {
      value: PROFILE_TYPE.bank,
      label: 'Bank Information',
      icon: <Iconify icon="eva:people-fill" />,
      component: <></>,
    },
    {
      value: PROFILE_TYPE.documents,
      label: 'Documents',
      icon: <Iconify icon="ic:round-perm-media" />,
    },
    {
      value: PROFILE_TYPE.twofa,
      label: 'Two FA',
      icon: <Iconify icon="ic:round-perm-media" />,
    },
    {
      value: PROFILE_TYPE.bc_auth,
      label: 'BC Auth Letter',
      icon: <Iconify icon="ic:round-perm-media" />,
    },
  ];

  return (
    <>
      <Head>
        <title> User: Profile | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover name={user?.name} role={user.role} cover={_userAbout.cover} />

          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            scrollButtons="auto"
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              position: 'absolute',
              bgcolor: 'background.paper',
              '& .MuiTabs-flexContainer': {
                ml: { md: 30 },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
            ))}
          </Tabs>
        </Card>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '10px 10px 10px 420px',
            justifyContent: 'space-evenly',
          }}
        >
          {<ChangePasswordDialogue />}
          {<ChangeTpinDialogue />}
          {<ResetTpinDialogue />}
        </div>
        {TABS.map(
          (tab) => tab.value === currentTab && <Box key={tab.value}> {tab.component} </Box>
        )}
      </Container>
    </>
  );
}
