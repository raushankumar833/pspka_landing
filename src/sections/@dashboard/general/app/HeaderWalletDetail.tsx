// import { Typography } from '@mui/material';
// import React, { useMemo } from 'react';
import Refresh from 'src/hocs/Refresh';
import { useAuthContext } from 'src/auth/useAuthContext';
import { USERROLES } from 'src/utils/constants';
import { currencySetter } from 'src/utils/currencyUtil';
import BlinkingDiv from './BlinkingDiv';
import Image from 'src/components/image/Image';
// import { shouldDisplay } from 'rsuite/esm/internals/Picker';
// const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

const SingleWallet = ({ data }: any) => {
  console.log('User object', data);
  return (
    <>
      <Image
        alt="Wallet icon"
        src={data?.imgUrl}
        sx={{ width: 'auto', height: 'auto', padding: '2px', marginRight: '3px' }}
      />
      <p
        style={{
          fontSize: '0.9rem',
          fontWeight: 'lighter',
          color: 'white',
          margin: '3px',
          display: 'flex',
          flexDirection: 'column',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: 'auto',
        }}
      >
        <strong>{data?.alias}</strong>
        {/* {showCurrency ? '********' : currencySetter(wallet?.w1)} */}
        {currencySetter(Number(data?.balance))}
      </p>
    </>
  );
};

const HeaderWalletDetail = () => {
  const { user, saveWallet } = useAuthContext();
  const handleRefresh = async () => {
    await saveWallet();
  };
  const width = user.role === 'admin' ? 'auto' : '310px';
  console.log('user role', user.role);
  console.log('width', width);

  const WalletContent = (
    <div
      style={{
        // background: 'linear-gradient(to right bottom, #C33764, #1D2671)',
        // backgroundColor: "#EBF3FF",
        background: 'transparent',
        padding: '1px',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '10px',
        height: '50px',
        // width: "auto",
        minWidth: width,
        maxWidth: width,
      }}
    >
      {[USERROLES.admin, USERROLES.subadmin].includes(user.role) ? (
        <SingleWallet
          data={{
            alias: 'API Balance',
            balance: user?.w1,
            imgUrl: '/assets/icons/wallet/wallet1icon.png',
          }}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <SingleWallet
            data={{
              alias: 'W1',
              balance: user?.w1,
              imgUrl: '/assets/icons/wallet/wallet1icon.png',
            }}
          />
        </div>
      )}
      {[USERROLES.retailer, USERROLES.direct_dealer].includes(user.role) && (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <SingleWallet
            data={{
              alias: 'W2',
              balance: user?.w2,
              imgUrl: '/assets/icons/wallet/wallet2icon.png',
            }}
          />
        </div>
      )}
      <Refresh refresh={() => handleRefresh()} width={20} color="#b3b3b3" />
    </div>
  );

  return (
    <BlinkingDiv user={user} width={width}>
      {WalletContent}
    </BlinkingDiv>
  );
};

export default HeaderWalletDetail;
