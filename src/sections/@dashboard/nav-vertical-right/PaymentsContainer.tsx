import { Button, Stack, styled } from '@mui/material';
import React from 'react';
import SvgColor from 'src/components/svg-color';
import { USERROLES } from 'src/utils/constants';
import { useAuthContext } from '../../../auth/useAuthContext';
import SendMoneyDialogue from '../recharges/SendMoneyDialogue';
import AddBalanceDialogue from '../recharges/AddBalanceDialogue';
import BankTransferDialogue from '../recharges/BankTransferDialogue';
import WalletToWalletDialogue from '../recharges/WalletToWalletDialogue';
// import { CARD } from 'src/config';

// const StyledCard = styled(Card)(({ theme }) => ({
//   borderRadius: CARD.RADIUS,
// }));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: '5%',
  height: '35px',
  margin: '-10px -8px',
  display: 'flex',
  borderRadius: 0,
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
  rowGap: theme.spacing(2),
  // padding: theme.spacing(0.5),
  backgroundColor: 'transparent',
  // color: theme.palette.secondary.light,
  color: 'black',
}));

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/payments-container/${name}.svg`} sx={{ width: 0.9, height: 0.9 }} />
);

const buttons = [
  {
    icon: 'send_money',
    text: 'Send Money',
  },
  {
    icon: 'add_money',
    text: 'Add Balance',
  },
  {
    icon: 'bank_transfer',
    text: 'Bank Transfer',
  },
  {
    icon: 'wallet_transfer',
    text: 'W1 to W2 Transfer',
  },
];

const PaymentsContainer = () => {
  const { user } = useAuthContext();

  return (
    <div>
      <Stack flexDirection={'row'}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly',
          }}
        >
          <SendMoneyDialogue icon={icon(buttons[0].icon)} name={buttons[0].text} />

          <AddBalanceDialogue icon={icon(buttons[1].icon)} name={buttons[1].text} />

          {[USERROLES.retailer, USERROLES.direct_dealer].includes(user.role) && (
            <BankTransferDialogue icon={icon(buttons[2].icon)} name={buttons[2].text} />
          )}

          <WalletToWalletDialogue icon={icon(buttons[3].icon)} name={buttons[3].text} />
        </div>
      </Stack>
    </div>
  );
};
export default PaymentsContainer;
