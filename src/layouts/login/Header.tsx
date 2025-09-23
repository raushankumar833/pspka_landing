import React, { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface HeaderProps extends BoxProps {
  svg?: boolean;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(({ sx, svg, ...other }, ref) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const INFO_LIGHT = theme.palette.info.light;
  const boxStyle = {
    zIndex: 1,
    display: isDark ? 'none' : '',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  };
  return (
    <Box sx={boxStyle}>
      {/* WAVE DESIGN FOR MOBILE APP */}
      <svg
        className="card-login_header"
        viewBox="0 0 1440 670"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_55_2763)">
          <g style={{ mixBlendMode: 'multiply' }} filter="url(#filter0_if_55_2763)">
            <path
              d="M-119.076 896.214C-148.525 754.208 -66.1644 622.927 38.7113 567.755C143.587 512.582 266.818 513.759 385.127 504.562C503.437 495.365 626.958 471.256 708.603 378.056C779.587 297.038 841.004 206.702 934.565 164.419C1070.09 103.227 1183.81 120.838 1331.53 101.712C1419.66 90.3246 1487.31 17.4626 1543.82 -58.1547C1600.33 -133.772 1614.73 -154.399 1692.47 -198.091C1770.2 -241.784 1945.33 -192.33 2004.21 -103.19L1782.17 -462.704L-207.919 12.1231L-119.076 896.214Z"
              fill={INFO_LIGHT}
            />
          </g>
          <g style={{ mixBlendMode: 'multiply' }} filter="url(#filter1_if_55_2763)">
            <path
              d="M-90.8882 636.46C-49.9546 531.763 48.492 457.433 153.746 417.338C258.999 377.242 372.279 366.292 483.688 352.313C595.098 338.334 708.589 320.206 808.388 267.74C1019.12 156.975 1138.81 -90.0776 1358.58 -181.103C1453.64 -220.448 1558.66 -226.355 1656.85 -256.788C1755.04 -287.221 1854.32 -354.382 1873.43 -454.925L1788.48 -458.839L620.381 -180.136L-236.92 24.4121L-90.8882 636.46Z"
              // fill={PRIMARY_LIGHTER}
            />
          </g>
          <g style={{ mixBlendMode: 'multiply' }} filter="url(#filter2_if_55_2763)">
            <path
              d="M-87.7954 517.38C-22.864 581.385 20.9278 627.971 122.286 619.35C223.643 610.729 324.819 560.393 392.05 485.145C459.541 409.6 491.238 314.629 552.227 234.934C638.799 121.808 785.677 46.0775 929.847 40.2367C1010.22 36.9779 1090.68 53.7366 1169.75 32.0806C1293.03 -1.69476 1372.11 -115.04 1471.71 -194.035C1657.1 -341.09 1911.68 -354.948 2089.1 -234.815L1787.26 -463.899L-207.906 12.1385L-87.7954 517.38Z"
              // fill={SECONDARY_LIGHT}
            />
          </g>
        </g>
        <defs>
          <filter
            id="filter0_if_55_2763"
            x="-208.919"
            y="-463.703"
            width="2214.13"
            height="1360.92"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="15.1417" />
            <feGaussianBlur stdDeviation="0.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_55_2763" />
            <feGaussianBlur stdDeviation="0.5" result="effect2_foregroundBlur_55_2763" />
          </filter>
          <filter
            id="filter1_if_55_2763"
            x="-237.92"
            y="-459.84"
            width="2112.35"
            height="1097.3"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="15.1417" />
            <feGaussianBlur stdDeviation="0.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_55_2763" />
            <feGaussianBlur stdDeviation="0.5" result="effect2_foregroundBlur_55_2763" />
          </filter>
          <filter
            id="filter2_if_55_2763"
            x="-208.906"
            y="-464.898"
            width="2299.01"
            height="1086.28"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="15.1417" />
            <feGaussianBlur stdDeviation="0.5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_55_2763" />
            <feGaussianBlur stdDeviation="0.5" result="effect2_foregroundBlur_55_2763" />
          </filter>
          <clipPath id="clip0_55_2763">
            <rect width="1777" height="966" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
});

export default Header;
