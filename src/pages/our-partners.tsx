import Head from 'next/head';
import MainLayout from '../layouts/main';
import PartnerHero from 'src/sections/our-partners/PartnerHero';
import WhyPartner from 'src/sections/our-partners/WhyPartner';

// ----------------------------------------------------------------------
OurPartnersPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;
// ----------------------------------------------------------------------

export interface OurPartnerInterface {
  title: string;
  list: ListType[];
}

export interface ListType {
  icon: string;
  title: string;
  intro: string;
  grid_direction: string;
}

export default function OurPartnersPage() {
  return (
    <>
      <Head>
        <title> Partners | {process.env.REACT_APP_PROJECT_TITLE}</title>
      </Head>

      <PartnerHero />
      <WhyPartner />
    </>
  );
}
