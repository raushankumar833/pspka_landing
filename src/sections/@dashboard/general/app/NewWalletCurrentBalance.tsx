import { useState } from 'react';
import { styled, Theme } from '@mui/material/styles';
import { Box, Typography, Stack, MenuItem, SxProps, IconButton } from '@mui/material';
import { bgGradient } from '../../../../utils/cssStyles';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import Refresh from 'src/hocs/Refresh';
import { useAuthContext } from 'src/auth/useAuthContext';
import PaymentsContainer from '../../nav-vertical-right/PaymentsContainer';
import { currencySetter } from 'src/utils/currencyUtil';
import Image from 'src/components/image/Image';
import { USERROLES } from 'src/utils/constants';

// ----------------------------------------------------------------------

const HEIGHT = 276;

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  height: HEIGHT,
  '& .slick-list': {
    borderRadius: Number(theme.shape.borderRadius) * 2,
  },
}));

const InnerStyledCard = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: 'rgb(28, 46, 70)',
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  position: 'relative',
  height: '100%',
  width: '100%',
  padding: theme.spacing(2),
  backgroundRepeat: 'no-repeat',
  color: theme.palette.common.white,
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const StyledCard = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: 'white',
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  position: 'relative',
  height: HEIGHT - 16,
  padding: theme.spacing(3),
  backgroundRepeat: 'no-repeat',
  borderRadius: '10px',
  width: '100%',
  color: theme.palette.common.white,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const PaymentBar = styled('div')(({ theme }) => ({
  marginBottom: '50px',
  height: '40px',
  padding: '12px',
  backgroundRepeat: 'no-repeat',
  width: '65%',
  borderRadius: '5px',
  backgroundColor: 'white',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'auto',
  overflowY: 'hidden',
}));

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

export default function NewWalletCurrentBalance({ list, sx }: Props) {
  return (
    <StyledRoot sx={sx} >
      <Box sx={{ position: 'relative', zIndex: 9 }}>
        <CardItem key={list[0].id} card={list[0]} />
      </Box>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

type CardItemProps = {
  card: ItemProps;
};

function CardItem({ card }: CardItemProps) {
  const { id } = card;
  const { user, wallet } = useAuthContext();
  const { saveWallet } = useAuthContext();
  const [showCurrency, setShowCurrency] = useState(false);
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  // console.log('setShowCurrency', setShowCurrency);

  const handleClosePopover = () => {
    console.log(setShowCurrency);
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
        <InnerStyledCard>
          {
            <Image
              src="/assets/illustrations/AdminWalletIllustration.png"
              sx={{
                position: 'absolute',
                top: '40px',
                left: '6px',
                width: '30%',
                height: 'auto',
                maxWidth: '100px',
              }}
              alt=""
            />
          }
          <div>
            <Stack
              // sx={{alignItems:"center", position: "absolute", right:"0"}}
              direction="row"
              justifyContent="right"
              // textAlign="right"
              spacing="10px"
              width={'100%'}
            >
              <Typography sx={{ typography: 'h5' }}>
                Wallet 1{/* <Refresh refresh={() => handleRefresh()} width={20} color="white" /> */}
                {/* <br /> */}
                <p style={{ fontSize: '0.9rem', fontWeight: 'lighter' }}>
                  {showCurrency ? '********' : currencySetter(wallet?.w1)}
                </p>
              </Typography>

              {[USERROLES.retailer, USERROLES.direct_dealer].includes(user.role) && (
                <Typography sx={{ typography: 'h6' }}>
                  Wallet 2
                  {/* <Refresh refresh={() => handleRefresh()} width={20} color="white" /> */}
                  <br />
                  <p style={{ fontSize: '0.9rem', fontWeight: 'lighter' }}>
                    {showCurrency ? '********' : currencySetter(wallet?.w2)}
                  </p>
                </Typography>
              )}
              <Refresh refresh={() => handleRefresh()} width={20} color="white" />
            </Stack>
          </div>

          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={4}>
            <PaymentBar>
              <PaymentsContainer />
            </PaymentBar>
          </Stack>
        </InnerStyledCard>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="flex-end"
          spacing="40px"
          width={'100%'}
        >
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 'lighter',
              color: 'black',
              margin: '2px 0 0 40%',
            }}
          >
            <IconButton color={'default'}>
              <Iconify icon="fa:mobile" />
            </IconButton>
            {user.Mobile ? user.Mobile : '9999999999'}
          </p>
          <p
            style={{
              fontSize: '1rem',
              fontWeight: 'lighter',
              color: 'black',
              margin: '0 0 -5px 40%',
            }}
          >
            <IconButton color={'default'}>
              <Iconify icon="lets-icons:date-range" />
            </IconButton>
            {'20/05/2024'}
          </p>
        </Stack>
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
