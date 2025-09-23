import {
  Box,
  Card,
  Checkbox,
  Divider,
  InputAdornment,
  ListItemText,
  Stack,
  TextField,
  Tooltip,
  styled,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ErrorWrapper from 'src/auth/ErrorWrapper';
import Iconify from 'src/components/iconify';
import { StyledIcon } from 'src/components/nav-section/vertical/styles';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { CARD } from 'src/config';
import useDebounce from 'src/hooks/useDebounce';
import useResponsive from 'src/hooks/useResponsive';
import { useLocales } from 'src/locales';
import { changeBiller } from 'src/redux/my-slices/recharge_bills';
import { useDispatch, useSelector } from 'src/redux/store';
import { bgBlur } from 'src/utils/cssStyles';
import { checklength } from 'src/utils/flattenArray';

// const BpIcon = styled('span')(({ theme }) => ({
//   borderRadius: '50%',
//   width: 16,
//   height: 16,
//   boxShadow:
//     theme.palette.mode === 'dark'
//       ? '0 0 0 1px rgb(16 22 26 / 40%)'
//       : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
//   backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
//   backgroundImage:
//     theme.palette.mode === 'dark'
//       ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
//       : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
//   '.Mui-focusVisible &': {
//     outline: '2px auto rgba(19,124,189,.6)',
//     outlineOffset: 2,
//   },
//   'input:hover ~ &': {
//     backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
//   },
//   'input:disabled ~ &': {
//     boxShadow: 'none',
//     background: theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
//   },
// }));

// const BpCheckedIcon = styled(BpIcon)({
//   backgroundColor: '#137cbd',
//   backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
//   '&::before': {
//     display: 'block',
//     width: 16,
//     height: 16,
//     backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
//     content: '""',
//   },
//   'input:hover ~ &': {
//     backgroundColor: '#106ba3',
//   },
// });

// function BpRadio(props: RadioProps) {
//   return (
//     <Radio
//       disableRipple
//       color="default"
//       checkedIcon={<BpCheckedIcon />}
//       icon={<BpIcon />}
//       {...props}
//     />
//   );
// }

const OperatorCard = styled(Card)<any>(({ theme, op, selectedBiller, ismobile }) => ({
  width: '96%',
  minWidth: '40%',
  borderRadius: CARD.RADIUS,
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  padding: theme.spacing(1.2, 2),
  margin: '4px auto',
  '&:hover': {
    cursor: 'pointer',
  },
  color: ismobile && op.code === selectedBiller?.code ? theme.palette.common.white : '',
  ...bgBlur({
    opacity: 1,
    color:
      ismobile && op.code === selectedBiller?.code
        ? theme.palette.primary.main
        : theme.palette.common.white,
  }),
}));

export const opicon = (url: string, code: string) => <img src={url} alt={code} style={{width:"100px"}}/>;

const OperatorSearch = ({ isDth = false }: any) => {
  const [value, setValue] = useState('');
  const debouceVal = useDebounce(value, 500);
  // console.log('debouceVal', debouceVal);
  const theme = useTheme();
  const ismobile = useResponsive('down', 'sm');
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const { billers = [], selectedBiller } = useSelector((state) => state.recharge_bills);
  // console.log('billers', billers);

  const [filteredBillers, setFilteredBillers] = useState([]);
  // console.log('filteredBillers', filteredBillers)

  useEffect(() => {
    // console.log('here ineffect');
    if (debouceVal && checklength(billers)) {
      // console.log('here in db if');
      const filtered = billers.filter((item: any) => {
        if (item?.name?.toLowerCase().includes(debouceVal?.toLowerCase())) {
          return item;
        } else {
          return undefined;
        }
      });
      // console.log('filtered', filtered);

      setFilteredBillers(filtered);
    } else {
      setFilteredBillers([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouceVal]);

  // const [category, setCategory] = useState(
  //   isDth ? OPERATOR_CATEGORY.dth : OPERATOR_CATEGORY.prepaid
  // );

  // useEffect(() => {
  //   dispatch(changeBiller(''));
  //   if (category) dispatch(getBillers({ category }));
  // }, [dispatch, category]);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCategory((event.target as HTMLInputElement).value);
  // };

  return (
    <>
      {/* <RadioGroup
        row
        value={category}
        defaultValue="prepaid"
        name="recharge-radios"
        onChange={handleChange}
        sx={{
          ml: 1,
          justifyContent: 'space-between',
        }}
        aria-labelledby="recharge-type-radios"
      >
        {isDth ? (
          <FormControlLabel
            value={OPERATOR_CATEGORY.dth}
            control={<BpRadio />}
            label={OPERATOR_CATEGORY.dth?.toUpperCase()}
          />
        ) : (
          <>
            <FormControlLabel value="prepaid" control={<BpRadio />} label="Prepaid" />
            <FormControlLabel value="postpaid" control={<BpRadio />} label="Postpaid" />
          </>
        )}
      </RadioGroup> */}
      <TextField
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search operator here..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
      <Divider sx={{ backgroundColor: theme.palette.grey[400] }} orientation="horizontal" />

      <Box height={ismobile ? 'auto' : '600px'}>
        <Scrollbar>
          <Box height={ismobile ? 'auto' : '600px'}>
            <Box flexDirection={ismobile ? 'row' : 'column'} display={'flex'} columnGap={2} sx={{mt:1}}>
              <ErrorWrapper permission={checklength(billers)} hasContent>
                {checklength(billers) &&
                  (filteredBillers.length > 0 ? filteredBillers : billers).map((op: any) => (
                    <OperatorCard
                      key={op.code}
                      op={op}
                      ismobile={ismobile}
                      selectedBiller={selectedBiller}
                      onClick={() => {
                        dispatch(changeBiller(op));
                      }}
                    >
                      <Tooltip title={op.name}>
                        <Stack
                          flexDirection={'row'}
                          justifyContent={ismobile ? 'flex-start' : 'space-between'}
                        >
                          {/* <Box
                        sx={{
                          background: 'white',
                        }}
                      >
                        // ADD BG TO THE OPERATOR ICON
                        <StyledIcon color="primary">{opicon(op.img, op.code)}</StyledIcon>
                      </Box> */}
                          <StyledIcon width={45} height={40} color="primary">{opicon(op.img, op.code)}</StyledIcon>
                          <ListItemText
                            primary={translate(op.name)}
                            primaryTypographyProps={{
                              noWrap: true,
                              component: 'span',
                              variant: 'body2',
                            }}
                            secondaryTypographyProps={{
                              noWrap: true,
                              variant: 'caption',
                            }}
                          />
                          {!ismobile && (
                            <Checkbox
                              size={ismobile ? 'small' : 'medium'}
                              checked={op.code === selectedBiller?.code}
                              onChange={(e) => {
                                dispatch(changeBiller(op));
                              }}
                              sx={{
                                padding: 0,
                              }}
                            />
                          )}
                        </Stack>
                      </Tooltip>
                    </OperatorCard>
                  ))}
              </ErrorWrapper>
            </Box>
          </Box>
        </Scrollbar>
      </Box>
    </>
  );
};

export default OperatorSearch;
