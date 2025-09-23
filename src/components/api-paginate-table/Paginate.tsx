import React, { ReactNode } from 'react';
import DataTable from 'react-data-table-component';
import { TableStyles } from './types';
import { createStyles, createStylesSm } from './style';
import { useSettingsContext } from '../settings';
import { defaultThemes } from './themes';
import useResponsive from 'src/hooks/useResponsive';
import { Typography, CircularProgress } from '@mui/material';
import dynamic from 'next/dynamic';
const NoData = dynamic(() => import('./NoData'));
interface RowData {
  [key: string]: any;
}
interface PaginateProps {
  columns: any[];
  list: RowData[];
  setList: React.Dispatch<React.SetStateAction<RowData[]>>;
  ExpandedComponent?: any;
  filterFunc: (item: any, search: string) => boolean;
  totalRows: number;
  handlePerRowsChange: (newPerPage: number, page: number) => void;
  handlePageChange: (page: number, totalRows: number) => void;
  tableStyle?: any;
  customStyles?: TableStyles;
  paginateServer?: boolean;
  paginate?: boolean;
  expandVisible?: boolean;
  selectableRows?: boolean;
  onSelectedRowsChange?: (selectedRows: any) => void;
  onRowClicked?: (data: any) => void;
  conditionalRowStyles?: any;
  noDataComponent?: ReactNode;
  persistTableHead?: boolean;
  progressPending?: boolean;
  scrollHeight?: number | string | any;
}

const Paginate: React.FC<PaginateProps> = ({
  columns,
  list,
  setList,
  ExpandedComponent,
  filterFunc,
  totalRows,
  handlePerRowsChange,
  handlePageChange,
  tableStyle = false,
  paginateServer = true,
  paginate = true,
  expandVisible,
  onSelectedRowsChange,
  onRowClicked,
  conditionalRowStyles,
  noDataComponent,
  persistTableHead = true,
  progressPending = false,
  scrollHeight = false,
}) => {
  const { themeMode } = useSettingsContext();
  const isDesktop = useResponsive('up', 'md');
  const isMobile = useResponsive('down', 'sm');

  const customStyles = createStyles(defaultThemes, themeMode, themeMode);
  const mobCustomStyles = createStylesSm(defaultThemes, themeMode, themeMode);

  return (
    <DataTable
      className="enable-scroll"
      columns={columns}
      data={list}
      fixedHeader
      fixedHeaderScrollHeight={scrollHeight ? scrollHeight : ''}
      noDataComponent={<NoData />}
      persistTableHead={persistTableHead}
      expandableRowsComponent={ExpandedComponent}
      expandableRows={!!ExpandedComponent}
      pagination={paginate}
      paginationServer={paginateServer}
      striped
      highlightOnHover
      selectableRowsHighlight
      pointerOnHover={false}
      paginationTotalRows={totalRows}
      progressPending={progressPending}
      progressComponent={
        <Typography
          variant="h4"
          sx={{
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            p: 2,
          }}
        >
          <CircularProgress />
          Loading . . .
        </Typography>
      }
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      dense={isDesktop ? false : true}
      selectableRows={false}
      onSelectedRowsChange={onSelectedRowsChange}
      conditionalRowStyles={conditionalRowStyles}
      onRowClicked={(data: any) => {
        if (onRowClicked) onRowClicked(data);
      }}
      customStyles={isMobile ? mobCustomStyles : customStyles}
    />
  );
};

export default Paginate;
