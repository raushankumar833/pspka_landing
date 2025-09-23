import { Autocomplete, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import useDebounce from 'src/hooks/useDebounce';
import { get } from 'src/utils/axiosController';

// function genQuery(row: any, keys, value, apiCallKey:string) {
//     let query = "";
//     if (value) {
//       query = apiCallKey ? `${apiCallKey}=${value}` : `search=${value}`;
//     }
//     if (keys && row) {
//       for (let i = 0; i < keys.length; i++) {
//         if (typeof row[keys[i]] === "number")
//           query += `&${keys[0]}=${row[keys[0]]}`;
//         if (typeof row[keys[i]] === "string")
//           query += `&${keys[1]}=${row[keys[0]]}`;
//       }
//     }
//     return query;
//   }

function searchApiCall(
  searchApi: any,
  setMyOptions: (options: any) => void,
  nameKeys: string[],
  setApiResponse: (response: any) => void
  //   text: string, // debounce value
  //   searchParamKeys: string[],
  //   row: any,
  //   myOptions: any,
  //   apiCallKey: string
): void {
  get(
    searchApi,
    // genQuery(row, searchParamKeys, text, apiCallKey),
    '',
    () => {},
    (res) => {
      //   console.log('res', res);
      setApiResponse(res?.data);
      const myList = res?.data;
      //   console.log('myList', myList);

      const filterList = myList.map((item: any) => {
        let name = item;
        // console.log('name', name);

        if (typeof name === 'string' || typeof name === 'number') {
          return { label: name, id: name, item: item };
        }
        for (let i = 0; i < nameKeys.length; i++) {
          name = name[nameKeys[i]];
        }
        return name;
      });
      //   console.log('filterList', filterList);

      setMyOptions(filterList);
    },
    (error) => {
      console.log('erro', error);
    }
  );
}

const BankSearch = ({
  type,
  nameKeys = ['first_name'],
  label,
  placeholder,
  cb1,
  defaultValue = '',
  searchApi,
  row,
  searchParamKeys = [],
  name,
  className,
  sx,
  variant,
  apiCallKey,
  required = false,
  ...other
}: any) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : '');
  const [apiResponse, setApiResponse] = useState([]);
  const [myOptions, setMyOptions] = useState([]);
  const debouncedValue = useDebounce(value, 300);

  //   console.log('apiResponse', apiResponse);
  //   console.log('myOptions', myOptions);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (defaultValue === '') setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    searchApiCall(
      searchApi,
      setMyOptions,
      nameKeys,
      setApiResponse
      //   debouncedValue,
      //   searchParamKeys,
      //   row,
      //   myOptions,
      //   apiCallKey
    );
  }, [debouncedValue]);

  return (
    <Autocomplete
      className={className}
      {...other}
      freeSolo
      options={myOptions}
      autoHighlight
      blurOnSelect
      clearIcon={false}
      clearOnBlur
      value={value}
      isOptionEqualToValue={(option, v) => {
        if (v && value === option) {
          if (apiResponse?.length > 0) {
            let found = 0;
            for (let i = 0; i < apiResponse.length; i++) {
              const list: any = apiResponse[i];
              for (let j = 0; j < nameKeys.length && found === 0; j++) {
                const key = nameKeys[j];
                if (v === list[key]) {
                  setValue(v);
                  const id = list?.id;
                  const ifsc = list?.ifsc;
                  const bankId = list?.bankId;
                  const ifscGlobal = list?.ifscGlobal;
                  if (cb1) cb1({ newValue: v, id, ifsc, bankId, ifscGlobal });
                  found = 1;
                  break;
                } else {
                  if (found === 0) {
                    continue;
                  } else {
                    break;
                  }
                }
              }
            }
          }
        } else {
          setValue(v);
        }
      }}
      onChange={(event, newValue) => {
        if (newValue) {
          if (apiResponse?.length > 0) {
            let found = 0;
            for (let i = 0; i < apiResponse.length; i++) {
              const list: any = apiResponse[i];
              for (let j = 0; j < nameKeys.length && found === 0; j++) {
                const key = nameKeys[j];
                if (newValue === list[key]) {
                  setValue(newValue);
                  const id = list?.id;
                  const ifsc = list?.ifsc;
                  const bankId = list?.bankId;
                  const ifscGlobal = list?.ifscGlobal;
                  if (cb1) cb1({ newValue, id, ifsc, bankId, ifscGlobal });
                  found = 1;
                  break;
                } else {
                  if (found === 0) {
                    continue;
                  } else {
                    break;
                  }
                }
              }
            }
          } else {
            setValue(newValue);
            if (cb1) cb1(newValue);
          }
        } else {
          setValue('');
          if (cb1) cb1('');
        }
      }}
      clearText="No Value"
      noOptionsText="No Data Found"
      fullWidth
      sx={{
        ...sx,
      }}
      renderInput={(params) => (
        <>
          {/* <Typography className="filter-lable">{label ? label : ""}</Typography> */}
          <TextField
            {...params}
            label={label ? label : ''}
            placeholder={placeholder ? placeholder : ''}
            size="small"
            value={value}
            onChange={handleChange}
            required={required}
          />
        </>
      )}
      renderOption={(props, option: any) => (
        <Box
          component="li"
          sx={{
            '& > img': { mr: 2, flexShrink: 0 },
            fontSize: '12px',
            flex: 1,
            flexWrap: 'nowrap',
            zIndex: 999999,
            textAlign: 'left',
            overflow: 'initial',
          }}
          {...props}
        >
          {option}
        </Box>
      )}
    />
  );
};

export default BankSearch;
