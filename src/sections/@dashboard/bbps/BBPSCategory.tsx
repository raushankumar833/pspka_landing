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
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import ErrorWrapper from 'src/auth/ErrorWrapper';
import Iconify from 'src/components/iconify';
import { StyledIcon } from 'src/components/nav-section/vertical/styles';
import Scrollbar from 'src/components/scrollbar/Scrollbar';
import { CARD } from 'src/config';
import useResponsive from 'src/hooks/useResponsive';
import { useLocales } from 'src/locales';
import { changeSelectedCategory, getBbpsCategories } from 'src/redux/my-slices/bbps';
import { changeBiller } from 'src/redux/my-slices/recharge_bills';
import { useDispatch, useSelector } from 'src/redux/store';
import { bgBlur } from 'src/utils/cssStyles';
import { checklength } from 'src/utils/flattenArray';

const CategoryCard = styled(Card)<any>(({ theme, category, selectedCategory, ismobile }) => ({
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
    ismobile && category.categoryKey === selectedCategory?.categoryKey
      ? theme.palette.common.white
      : '',
  ...bgBlur({
    opacity: 1,
    color:
      ismobile && category.categoryKey === selectedCategory?.categoryKey
        ? theme.palette.primary.main
        : theme.palette.common.white,
  }),
}));

export const opicon = (url: string, code: string) => <img src={url} alt={code} />;

const BBPSCategory = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { translate } = useLocales();
  const ismobile = useResponsive('down', 'sm');
  const { categories, selectedCategory } = useSelector((state) => state.bbps);

  useEffect(() => {
    dispatch(getBbpsCategories());
  }, [dispatch]);

  return (
    <>
      <TextField
        fullWidth
        placeholder="Search BBPS category here..."
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
              <ErrorWrapper permission={checklength(categories)}>
                {checklength(categories) &&
                  categories.map((op: any) => (
                    <>
                      {!ismobile && <Typography variant="caption">{op.title}</Typography>}
                      {checklength(op.data) &&
                        op.data.map((category: any) => (
                          <CategoryCard
                            key={category.categoryKey}
                            category={category}
                            ismobile={ismobile}
                            selectedCategory={selectedCategory}
                            onClick={() => {
                              dispatch(changeSelectedCategory(category));
                            }}
                          >
                            <Tooltip title={category.categoryName}>
                              <Stack
                                flexDirection={'row'}
                                justifyContent={ismobile ? 'flex-start' : 'space-between'}
                              >
                                <StyledIcon color="primary">
                                  {opicon(category.iconUrl, category.categoryKey)}
                                </StyledIcon>
                                <ListItemText
                                  primary={translate(category.categoryName)}
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
                                    checked={category.categoryKey === selectedCategory?.categoryKey}
                                    onChange={(e) => {
                                      dispatch(changeBiller(category));
                                    }}
                                    sx={{
                                      padding: 0,
                                    }}
                                  />
                                )}
                              </Stack>
                            </Tooltip>
                          </CategoryCard>
                        ))}
                    </>
                  ))}
              </ErrorWrapper>
            </Box>
          </Box>
        </Scrollbar>
      </Box>
    </>
  );
};

export default BBPSCategory;
