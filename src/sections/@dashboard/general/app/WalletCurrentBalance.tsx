import { useState } from 'react';
import { styled, useTheme, Theme } from '@mui/material/styles';
import { Box, Typography, Stack, MenuItem, IconButton, SxProps, alpha } from '@mui/material';
import { bgGradient } from '../../../../utils/cssStyles';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import Carousel, { CarouselDots } from '../../../../components/carousel';
import Refresh from 'src/hocs/Refresh';
import { useAuthContext } from 'src/auth/useAuthContext';
import PaymentsContainer from '../../nav-vertical-right/PaymentsContainer';
import { currencySetter } from 'src/utils/currencyUtil';

// ----------------------------------------------------------------------

const HEIGHT = 276;

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  height: HEIGHT,
  '& .slick-list': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
}));

const StyledCard = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.9),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  position: 'relative',
  height: HEIGHT - 16,
  padding: theme.spacing(3),
  backgroundRepeat: 'no-repeat',
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const shadowStyle = {
  mx: 'auto',
  width: 'calc(100% - 16px)',
  borderRadius: 2,
  position: 'absolute',
  height: 200,
  zIndex: 8,
  bottom: 8,
  left: 0,
  right: 0,
  bgcolor: 'grey.500',
  opacity: 0.32,
} as const;

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  cardType: string;
  balance: number;
  cardHolder: string;
  cardNumber: string;
  cardValid: string;
};

type Props = {
  list: ItemProps[];
  sx?: SxProps<Theme>;
};

export default function WalletCurrentBalance({ list, sx }: Props) {
  const theme = useTheme();

  const carouselSettings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      sx: {
        right: 16,
        bottom: 16,
        position: 'absolute',
      },
    }),
  };

  return (
    <StyledRoot sx={sx}>
      <Box sx={{ position: 'relative', zIndex: 9 }}>
        <Carousel {...carouselSettings}>
          {list.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </Carousel>
      </Box>

      <Box sx={{ ...shadowStyle }} />

      <Box
        sx={{
          ...shadowStyle,
          opacity: 0.16,
          bottom: 0,
          zIndex: 7,
          width: 'calc(100% - 40px)',
        }}
      />
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

type CardItemProps = {
  card: ItemProps;
};

function CardItem({ card }: CardItemProps) {
  const { id, cardType, balance } = card;
  // const theme = useTheme();
  const { saveWallet } = useAuthContext();
  const [showCurrency, setShowCurrency] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleShowCurrency = () => {
    setShowCurrency(!showCurrency);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleDelete = () => {
    handleClosePopover();
    console.log('DELETE', id);
  };

  const handleEdit = () => {
    handleClosePopover();
    console.log('EDIT', id);
  };
  const handleRefresh = async () => {
    await saveWallet();
  };

  return (
    <>
      <StyledCard>
        <IconButton
          color="inherit"
          onClick={handleOpenPopover}
          sx={{
            top: 16,
            right: 16,
            zIndex: 9,
            opacity: 0.48,
            position: 'absolute',
            ...(openPopover && {
              opacity: 1,
            }),
          }}
        >
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <div>
          <Typography sx={{ mb: 2, typography: 'subtitle2', opacity: 0.72 }}>
            {cardType} <Refresh refresh={() => handleRefresh()} width={20} color="white" />
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography sx={{ typography: 'h3' }}>
              {showCurrency ? '********' : currencySetter(balance)}
            </Typography>

            <IconButton color="inherit" onClick={handleShowCurrency} sx={{ opacity: 0.48 }}>
              <Iconify icon={showCurrency ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
            </IconButton>
          </Stack>
        </div>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={4}>
          <PaymentsContainer />
          {/* <Tooltip title="add money" placement="top">
            <IconButton color="warning">
              <Iconify icon="mdi:wallet-plus" width={24} color={theme.palette.warning.lighter} />
            </IconButton>
          </Tooltip>
          <Tooltip title="send money" placement="top">
            <IconButton color="warning">
              <Iconify
                icon="clarity:bank-outline-alerted"
                width={24}
                color={theme.palette.warning.lighter}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="paytm transfer" placement="top">
            <IconButton color="warning">
              <Iconify icon="simple-icons:paytm" width={24} color={theme.palette.warning.lighter} />
            </IconButton>
          </Tooltip> */}
        </Stack>

        {/* <Stack direction="row" spacing={5}>
          <div>
            <Typography sx={{ mb: 1, typography: 'caption', opacity: 0.48 }}>
              Card Holder
            </Typography>

            <Typography sx={{ typography: 'subtitle1' }}>{cardHolder}</Typography>
          </div>

          <div>
            <Typography sx={{ mb: 1, typography: 'caption', opacity: 0.48 }}>
              Valid Dates
            </Typography>

            <Typography sx={{ typography: 'subtitle1' }}>{cardValid}</Typography>
          </div>
        </Stack> */}
      </StyledCard>

      <MenuPopover open={openPopover} onClose={handleClosePopover}>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" />
          Delete card
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" />
          Edit card
        </MenuItem>
      </MenuPopover>
    </>
  );
}
