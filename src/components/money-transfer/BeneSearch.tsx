import { Box, InputAdornment, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import Iconify from '../iconify/Iconify';
import useDebounce from 'src/hooks/useDebounce';

const BeneSearch = ({ cbDbValue, title = 'Search beneficiary...' }: any) => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 600);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };

  useEffect(() => {
    if (debouncedValue) {
      if (cbDbValue) cbDbValue(debouncedValue);
    } else {
      if (cbDbValue) cbDbValue('empty');
    }

    return () => {};
  }, [debouncedValue]);

  return (
    <Box sx={{ width: '40%' }}>
      <TextField
        fullWidth
        // id={id}
        size="small"
        value={value}
        onChange={handleChange}
        placeholder={title}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default BeneSearch;
