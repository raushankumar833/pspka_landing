/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Grid, InputAdornment, Menu, MenuItem, TextField } from '@mui/material';
import useDebounce from 'src/hooks/useDebounce';
import Iconify from '../iconify/Iconify';
// import { appContext } from 'src/context/appContext';

interface SearchOption {
  field: string;
  parameter: string;
}

interface SearchBarProps {
  setQuery?: (value: any | null | string) => void;
  searchOptions?: SearchOption[];
  queryParam?: string;
  ifFilterData?: boolean;
  sendBkDBVal?: (value: string) => void;
  sendBkChoosenVal?: (value: string) => void;
  prefilledQuery?: string | any;
  placeholder?: string;
  id?: any;
  md?: any;
}

const SearchComponent: React.FC<SearchBarProps> = ({
  setQuery,
  searchOptions = [],
  queryParam,
  ifFilterData,
  sendBkDBVal,
  sendBkChoosenVal,
  prefilledQuery,
  md,
  id,
  placeholder = 'Search here',
}) => {
  const [value, setValue] = useState('');
  // const { value, setValue } = useContext(appContext);

  // const [searchIn, setSearchIn] = useState<any[] | null | string | unknown>(
  //   searchOptions.length > 0 ? searchOptions[0].parameter : ''
  // );
  const [searchIn, setSearchIn] = useState({
    parameter: 'search',
  });
  const [pressEnter, setPressEnter] = useState(true);
  const debouncedValue = useDebounce(value, 600);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };

  const handleClearSearch = () => {
    if (debouncedValue === '' && !prefilledQuery) {
      if (setQuery) setQuery(null);
      setValue('');
    } else {
      if (setQuery) setQuery(prefilledQuery);
      setValue('');
    }
  };

  useEffect(() => {
    if (debouncedValue && ifFilterData === false && !prefilledQuery) {
      if (setQuery) {
        setQuery(
          `${
            searchIn && searchIn.parameter
              ? searchIn.parameter
              : searchOptions.length > 0 && searchOptions[0].parameter
          }=` + debouncedValue
        );
      }
    }

    if (debouncedValue && ifFilterData === false && prefilledQuery) {
      if (setQuery) {
        setQuery(
          `${prefilledQuery}&${
            searchIn && searchIn.parameter
              ? searchIn.parameter
              : searchOptions.length > 0 && searchOptions[0].parameter
          }=` + debouncedValue
        );
      }
    }

    if (debouncedValue) {
      if (sendBkDBVal) sendBkDBVal(debouncedValue);
    }

    if (!debouncedValue) {
      if (sendBkDBVal) sendBkDBVal(debouncedValue);
    }

    if (debouncedValue === '' && prefilledQuery) {
      if (setQuery) setQuery(prefilledQuery);
    }

    if (debouncedValue === '' && !prefilledQuery) {
      if (setQuery) setQuery(null);
    }
  }, [pressEnter, debouncedValue]);

  return (
    <Grid
      item
      md={md ? md : 4}
      xs={12}
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: '#FFFFFF',
        border: '1px solid #DDE6EB',
        borderRadius: '10px',
        width: { xs: '100%', md: '60%' },
        mb: { xs: 2, md: 0 },
      }}
    >
      <TextField
        fullWidth
        id={id}
        size="small"
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === 'enter') {
            setPressEnter(!pressEnter);
          }
        }}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      <Menu
        id="menu-appbar"
        anchorEl={null}
        keepMounted
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={false}
        onClose={handleClearSearch}
      >
        {searchOptions.map((item: any, index: any) => (
          <MenuItem
            key={index}
            dense
            onClick={() => {
              // setSearchIn(item);
              // if (sendBkChoosenVal) sendBkChoosenVal(item.parameter);
            }}
          >
            {item.field}
          </MenuItem>
        ))}
      </Menu>
    </Grid>
  );
};

export default SearchComponent;
