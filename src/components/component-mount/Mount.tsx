import React from 'react';

interface MountProps {
  visible: any;
  children: React.ReactNode;
}
const Mount = ({ visible, children }: MountProps) => {
  if (!visible) return <></>;
  return <>{children}</>;
};

export default Mount;
