import { ApexOptions } from 'apexcharts';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Typography,
  Stack,
  Divider,
  CardProps,
  Tabs,
  Tab,
  CardHeader,
  Box,
} from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';
import Chart, { useChart } from 'src/components/chart';
import { fNumber } from 'src/utils/formatNumber';
import Iconify from 'src/components/iconify';
import { useState } from 'react';
import { TXNFILTER } from 'src/utils/constants';
import { bgBlur } from 'src/utils/cssStyles';

// ----------------------------------------------------------------------

const CHART_SIZE = { width: 92, height: 92 };

interface Props extends CardProps {
  chart: {
    colors?: string[];
    series: {
      label: string;
      color: string;
      percent: number;
      total: number;
    }[];
    options?: ApexOptions;
  };
  title?: string;
  subheader?: string;
}

export default function TransactionCount({ chart, title, subheader, ...other }: Props) {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState('0');

  const isDesktop = useResponsive('up', 'sm');

  const { colors, series, options } = chart;

  const chartOptionsCheckIn = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    grid: {
      padding: {
        top: -9,
        bottom: -9,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '68%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            fontSize: theme.typography.subtitle2.fontSize as string,
          },
        },
      },
    },
    ...options,
  });

  const TABS = [
    {
      value: TXNFILTER.today,
      label: 'Today',
      icon: <Iconify icon="material-symbols:today" />,
    },
    {
      value: TXNFILTER.this,
      label: 'This',
      icon: <Iconify icon="mingcute:calendar-month-fill" />,
    },
    {
      value: TXNFILTER.last,
      label: 'Last',
      icon: <Iconify icon="quill:snooze-month" />,
    },
  ];

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box
        sx={{
          px: 3,
        }}
      >
        <Tabs
          variant="fullWidth"
          value={currentTab}
          onChange={(event, newValue) => setCurrentTab(newValue)}
          sx={{}}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
        <Stack
          direction={{ xs: 'column', sm: 'column' }}
          divider={
            <Divider
              orientation={isDesktop ? 'vertical' : 'horizontal'}
              flexItem
              sx={{ borderStyle: 'dashed' }}
            />
          }
        >
          {series.map((item, index) => (
            <Stack
              key={item.label}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                width: 1,
                my: 1,
                pb: 1,
                px: 3,
                ...bgBlur({
                  opacity: 0.48,
                  color: item.color,
                }),
                borderRadius: 4,
              }}
            >
              <Chart
                type="radialBar"
                series={[item.percent]}
                options={chartOptionsCheckIn}
                {...CHART_SIZE}
              />

              <div>
                <Typography variant="h4" sx={{ mb: 0.5 }}>
                  {fNumber(item.total)}
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.72 }}>
                  {item.label}
                </Typography>
              </div>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Card>
  );
}
