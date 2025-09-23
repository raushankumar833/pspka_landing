// next
import Head from 'next/head';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// sections
import { Chat } from '../../../sections/@dashboard/chat';

// ----------------------------------------------------------------------

ChatPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function ChatPage() {
  return (
    <>
      <Head>
        <title> Chat | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <Chat />
    </>
  );
}
