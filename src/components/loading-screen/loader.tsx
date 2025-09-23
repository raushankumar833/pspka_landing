import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { appContext } from 'src/context/appContext';
import { alpha, styled } from '@mui/material/styles';

const StyledRoot = styled('div')(() => ({
  right: 0,
  bottom: 0,
  zIndex: 9998,
  width: '100%',
  height: '100%',
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(1px)',
  background: 'rgb(0, 0, 0,0.2)',
}));

const Loader = (props: any) => {
  const { pathname } = useRouter();
  const { loading, saasTheme } = useContext(appContext);
  const getColor = () => (pathname?.includes('client') ? saasTheme.brandColor : '#2169d3');

  return (
    <div>
      {loading ? (
        <StyledRoot>
          <m.div
            animate={{
              scale: [1, 0.9, 0.9, 1, 1],
              opacity: [1, 0.48, 0.48, 1, 1],
            }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeatDelay: 1,
              repeat: Infinity,
            }}
          >
            <img
              src="/favicon/favicon.ico"
              style={{ cursor: 'pointer', width: 80 }}
              alt="favicon"
            />
          </m.div>

          <Box
            component={m.div}
            animate={{
              scale: [1.6, 1, 1, 1.6, 1.6],
              rotate: [270, 0, 0, 270, 270],
              opacity: [0.25, 1, 1, 1, 0.25],
              borderRadius: ['25%', '25%', '50%', '50%', '25%'],
            }}
            transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
            sx={{
              width: 100,
              height: 100,
              position: 'absolute',
              border: `solid 3px ${alpha(getColor(), 0.24)}`,
            }}
          />

          <Box
            component={m.div}
            animate={{
              scale: [1, 1.2, 1.2, 1, 1],
              rotate: [0, 270, 270, 0, 0],
              opacity: [1, 0.25, 0.25, 0.25, 1],
              borderRadius: ['25%', '25%', '50%', '50%', '25%'],
            }}
            transition={{
              ease: 'linear',
              duration: 3.2,
              repeat: Infinity,
            }}
            sx={{
              width: 120,
              height: 120,
              position: 'absolute',
              border: `solid 8px ${alpha(getColor(), 0.24)}`,
            }}
          />
        </StyledRoot>
      ) : null}
      {props.children}
    </div>
  );
};
Loader.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Loader;
