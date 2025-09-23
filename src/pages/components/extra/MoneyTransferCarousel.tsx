import { Card, CardContent, CardHeader } from '@mui/material';
// import _mock from 'src/_mock';
import MainLayout from 'src/layouts/main/MainLayout';
import OurCarousel from 'src/sections/_examples/extra/carousel/OurCarousel';
import { checklength } from 'src/utils/flattenArray';

MoneyTransferCarousel.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

export default function MoneyTransferCarousel({ data }: any) {
  const _carouselsExample =
    checklength(data) &&
    data.map((item: string, index: number) => ({
      id: index,
      image: item,
    }));

  return (
    <>
      <Card sx={{ borderRadius: 1, my: 3 }}>
        <CardHeader title="" />
        <CardContent>
          <OurCarousel data={_carouselsExample} />
        </CardContent>
      </Card>
    </>
  );
}
