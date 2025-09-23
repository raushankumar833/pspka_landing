import React from 'react'
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';

SettingsPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function SettingsPage(): React.ReactElement {
  return (
    <div>
      Settings page
    </div>
  )
}

