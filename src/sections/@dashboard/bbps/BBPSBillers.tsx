import {
  Box,
  Button,
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
import Mount from 'src/components/component-mount/Mount';
import Iconify from 'src/components/iconify';
import { StyledIcon } from 'src/components/nav-section/vertical/styles';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { CARD } from 'src/config';
import useDebounce from 'src/hooks/useDebounce';
import useResponsive from 'src/hooks/useResponsive';
import { useLocales } from 'src/locales';
import {
  changeSelectedBiller,
  changeSelectedCategory,
  getBbpsCategories,
  saveBbpsBillerDetails,
  saveBillers,
} from 'src/redux/my-slices/bbps';
import { useDispatch, useSelector } from 'src/redux/store';
import { bgBlur } from 'src/utils/cssStyles';
import { checklength } from 'src/utils/flattenArray';

const CategoryCard = styled(Card)<any>(({ theme, biller, selectedBiller, ismobile }) => ({
  width: '96%',
  minWidth: '40%',
  borderRadius: CARD.RADIUS,
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  padding: theme.spacing(1.2, 2),
  margin: '8px auto',
  '&:hover': {
    cursor: 'pointer',
  },
  color:
    ismobile && biller.biller_id === selectedBiller?.biller_id ? theme.palette.common.white : '',
  ...bgBlur({
    opacity: 1,
    color:
      ismobile && biller.biller_id === selectedBiller?.biller_id
        ? theme.palette.primary.main
        : theme.palette.common.white,
  }),
}));

export const opicon = (url: string, code: string) => <img src={url} alt={code} />;

const BBPSBillers = ({ usedInCms = false }: any) => {
  const [value, setValue] = useState('');
  const debouceVal = useDebounce(value, 500);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const ismobile = useResponsive('down', 'sm');
  const { bbpsbillers, selectedBiller, selectedCategory } = useSelector((state) => state.bbps);
  // console.log('bbpsbillers', bbpsbillers);

  const [filteredBillers, setFilteredBillers] = useState([]);

  useEffect(() => {
    // console.log('here ineffect');
    if (debouceVal && checklength(bbpsbillers)) {
      // console.log('here in db if');
      const filtered = bbpsbillers.filter((item: any) => {
        if (item?.biller_name?.toLowerCase().includes(debouceVal?.toLowerCase())) {
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

  useEffect(() => {
    dispatch(getBbpsCategories());
  }, [dispatch]);

  return (
    <>
      <Mount visible={!usedInCms}>
        <Button
          startIcon={<Iconify icon="icon-park-solid:back" />}
          onClick={() => {
            dispatch(saveBillers(null));
            dispatch(changeSelectedBiller(null));
            dispatch(changeSelectedCategory(null));
            dispatch(saveBbpsBillerDetails(null));
          }}
        >
          Back to Categories
        </Button>
      </Mount>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={`Search ${usedInCms ? 'CMS' : selectedCategory?.categoryName} Billers here...`}
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
            <Box flexDirection={ismobile ? 'row' : 'column'} display={'flex'} columnGap={2} mt={2}>
              <ErrorWrapper permission={checklength(bbpsbillers)} hasContent>
                {checklength(bbpsbillers) &&
                  (filteredBillers.length > 0 ? filteredBillers : bbpsbillers).map(
                    (biller: any) => (
                      <>
                        <CategoryCard
                          key={biller.biller_id}
                          biller={biller}
                          ismobile={ismobile}
                          selectedCategory={selectedBiller}
                          onClick={() => {
                            dispatch(changeSelectedBiller(biller));
                          }}
                        >
                          <Tooltip title={biller.biller_name}>
                            <Stack
                              flexDirection={'row'}
                              justifyContent={ismobile ? 'flex-start' : 'space-between'}
                            >
                              <StyledIcon color="primary">
                                {opicon(biller.icon_url, biller.biller_id)}
                              </StyledIcon>
                              <ListItemText
                                primary={translate(biller.biller_name)}
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
                                  checked={biller.biller_id === selectedBiller?.biller_id}
                                  onChange={(e) => {
                                    dispatch(changeSelectedBiller(biller));
                                  }}
                                  sx={{
                                    padding: 0,
                                  }}
                                />
                              )}
                            </Stack>
                          </Tooltip>
                        </CategoryCard>
                      </>
                    )
                  )}
              </ErrorWrapper>
            </Box>
          </Box>
        </Scrollbar>
      </Box>
    </>
  );
};

export default BBPSBillers;
