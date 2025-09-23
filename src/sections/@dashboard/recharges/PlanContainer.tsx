import { Box, Button, Card, Stack, Typography, styled } from '@mui/material';
import React, { useEffect } from 'react';
import PermissionGaurd from 'src/auth/PermissionGaurd';
import CardTitle from 'src/components/card/CardTitle';
import EmptyContent from 'src/components/empty-content/EmptyContent';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { CARD } from 'src/config';
import useResponsive from 'src/hooks/useResponsive';
import { getPlans } from 'src/redux/my-slices/recharge_bills';
import { dispatch, useSelector } from 'src/redux/store';
import { bgBlur } from 'src/utils/cssStyles';
import { currencySetter } from 'src/utils/currencyUtil';
import { checklength } from 'src/utils/flattenArray';
// import { InnerCard } from './MobileRecharge';

const PCard = styled(Card)<any>(({ theme, bg = '#08509E' }) => ({
  width: '100%',
  position: 'relative',
  borderRadius: CARD.RADIUS_8,
  boxShadow: 'none',
  padding: theme.spacing(2),
  margin: theme.spacing(0, 0, 2, 0),
  ...bgBlur({
    color: theme.palette.grey[600],
    blur: 5,
    opacity: 0.1,
  }),
}));

const PlanContainer = ({ setValue }: any) => {
  const { selectedBiller, plans } = useSelector((state) => state.recharge_bills);

  useEffect(() => {
    if (selectedBiller?.code) dispatch(getPlans({ selectedBiller }));

    return () => {};
  }, [selectedBiller]);

  return (
    // <InnerCard bg={selectedBiller?.color}>
    <Box
      mt={2}
      sx={{
        maxHeight: '400px',
      }}
    >
      <CardTitle
        title={`Browse ${selectedBiller?.name ?? ``} Plan` || 'Select Operator'}
        sx={{
          padding: '10px 0 0 0',
        }}
      />
      <Stack
        flexDirection="row"
        alignItems="center"
        sx={{
          pb: 3,
        }}
      >
        <Iconify icon="material-symbols-light:info" color="red" />
        <Typography variant="caption" ml={0.5} color="error" fontWeight="bold">
          Plans may have changed. kindly verify with your service provider before continuing.
        </Typography>
      </Stack>
      <PermissionGaurd permission={checklength(plans)}>
        <Scrollbar>
          <Box maxHeight="350px">
            {checklength(plans) &&
              plans.map((item: any, index: any) => (
                <PlanItem key={index} item={item} setValue={setValue} />
              ))}
          </Box>
        </Scrollbar>
      </PermissionGaurd>
      <PermissionGaurd permission={!checklength(plans)}>
        <EmptyContent title="No Plans Found!" />
      </PermissionGaurd>
    </Box>
    // </InnerCard>
  );
};

export default PlanContainer;

function PlanItem({ item, setValue }: any) {
  const ismobile = useResponsive('down', 'sm');
  const { selectedBiller } = useSelector((state) => state.recharge_bills);
  const setAmount = (amt: any) => {
    setValue('amount', amt);
  };
  return (
    <PCard
      bg={selectedBiller?.color}
      onClick={() => {
        setAmount(item.plan);
      }}
    >
      <Stack columnGap={2} flexDirection={ismobile ? 'row' : 'row'} justifyContent="space-between">
        <Stack>
          <Typography variant="caption" color="text.secondary">
            Validity
          </Typography>
          <Typography variant="body2">{item.validity}</Typography>
        </Stack>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: 'max-content',
            minWidth: '250px',
            maxWidth: '250px',
            textAlign: 'left',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Data
          </Typography>
          <Typography variant="body2" textAlign={'left'}>
            {item.description}
          </Typography>
        </Stack>
        {!ismobile && (
          <Stack>
            <Button
              variant="outlined"
              onClick={() => {
                setAmount(item.plan);
              }}
            >
              {currencySetter(item.plan)}
            </Button>
          </Stack>
        )}
      </Stack>
      {ismobile && (
        <Stack mt={1}>
          <Button
            variant="outlined"
            onClick={() => {
              setAmount(item.plan);
            }}
          >
            {currencySetter(item.plan)}
          </Button>
        </Stack>
      )}
    </PCard>
  );
}
