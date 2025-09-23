import { Grid, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import ApiPaginate from './ApiPaginate';
import SearchComponent from './SearchComponent';
import PermissionGaurd from 'src/auth/PermissionGaurd';

interface ApiPaginateSearchProps {
  apiEnd: string;
  columns: any[];
  apiData: any;
  tableStyle?: any;
  setApiData: React.Dispatch<React.SetStateAction<any>>;
  query?: string;
  queryParam?: string;
  returnRefetch?: any;
  setQuery?: any;
  searchOptions?: any[];
  actionButtons?: ReactElement;
  secRowActionButtons?: ReactElement;
  conditionalRowStyles?: any;
  selectableRows?: boolean;
  onSelectedRowsChange?: any;
  filterData?: boolean;
  DBvalue?: any;
  choseVal?: any;
  filterFunc?: any;
  search?: string;
  selectableRowDisabled?: any;
  prefilledQuery?: string | any;
  paginateServer?: boolean;
  scrollHeight?: any;
  paginate?: boolean;
  title?: any;
}

const ApiPaginateSearch: React.FC<ApiPaginateSearchProps> = ({
  apiEnd,
  columns,
  apiData,
  tableStyle,
  setApiData,
  queryParam,
  returnRefetch,
  setQuery,
  searchOptions = [],
  actionButtons,
  secRowActionButtons,
  conditionalRowStyles,
  selectableRows = false,
  onSelectedRowsChange,
  filterData = false,
  DBvalue,
  choseVal,
  filterFunc,
  search,
  prefilledQuery = false,
  paginateServer = true,
  scrollHeight = false,
  paginate = true,
  title = false,
}) => (
  <>
    {/* SEARCH COMPONENT */}
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: { xs: '', md: 'space-between' },
        alignItems: { xs: 'flex-start', md: 'center' },
        mb: { xs: 2, md: 2 },
        mt: 2,
      }}
    >
      {/* this is a grid */}
      <PermissionGaurd permission={title}>
        <Typography variant="h5">{title}</Typography>
      </PermissionGaurd>
      <PermissionGaurd permission={!title}>
        <SearchComponent
          prefilledQuery={prefilledQuery}
          setQuery={setQuery}
          searchOptions={searchOptions}
          ifFilterData={filterData}
          sendBkDBVal={(dbVal: any) => {
            if (DBvalue) DBvalue(dbVal);
          }}
          sendBkChoosenVal={(choosenVal: any) => {
            if (choseVal) choseVal(choosenVal);
          }}
        />
      </PermissionGaurd>
      {/* this is a grid too */}
      {actionButtons ? actionButtons : ''}
    </Grid>
    {secRowActionButtons ? <div style={{ marginBottom: '10px' }}>{secRowActionButtons}</div> : ''}

    {/* PAGINATE TABLE */}
    <Grid>
      <ApiPaginate
        apiEnd={apiEnd}
        columns={columns}
        apiData={apiData}
        setApiData={setApiData}
        queryParam={queryParam ? queryParam : ''}
        returnRefetch={returnRefetch}
        ExpandedComponent={null}
        conditionalRowStyles={conditionalRowStyles}
        selectableRows={selectableRows}
        onSelectedRowsChange={onSelectedRowsChange}
        filterFunc={filterFunc}
        search={search && search}
        paginateServer={paginateServer}
        scrollHeight={scrollHeight}
        paginate={paginate}
      />
    </Grid>
  </>
);

export default ApiPaginateSearch;
