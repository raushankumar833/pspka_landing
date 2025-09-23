import { m } from 'framer-motion';
import { Container, Typography } from '@mui/material';
import { MotionContainer, varBounce } from '../components/animate';
import Image from 'src/components/image/Image';

// ----------------------------------------------------------------------

type ErrorWrapperProp = {
  hasContent?: boolean;
  permission?: boolean;
  children: React.ReactNode;
};

export default function ErrorWrapper({
  hasContent = false,
  permission,
  children,
}: ErrorWrapperProp) {
  if (!permission) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center' }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" paragraph>
            Error detected
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Please try again later after sometime
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Image
            src="/assets/illustrations/illustration_404.jpg"
            sx={{ height: 260, my: { xs: 5, sm: 10 } }}
            alt=""
          />
        </m.div>
      </Container>
    ) : null;
  }

  return <>{children}</>;
}
