/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAx } from 'src/utils/axiosController';
import { toastWithTimer } from 'src/utils/toastFire';
import Swal from 'sweetalert2';
import Paginate from './Paginate';
import { useAuthContext } from 'src/auth/useAuthContext';
import { checklength } from 'src/utils/flattenArray';

interface ApiPaginateProps {
  user?: any;
  columns: any[];
  apiEnd: string;
  filterFunc: (item: any, search: string) => boolean;
  ExpandedComponent?: any;
  paginateServer?: boolean;
  returnRefetch?: (refetch: any) => void;
  expandVisible?: boolean;
  search?: string | undefined | null;
  queryParam: string;
  tableStyle?: any;
  apiData: any[];
  setApiData: React.Dispatch<React.SetStateAction<any[]>>;
  selectableRows: boolean;
  onSelectedRowsChange: (selectedRows: any) => void;
  onRowClicked?: (data: any) => any;
  conditionalRowStyles: any;
  limit?: number;
  shadow?: boolean;
  scrollHeight?: number | string | any;
  paginate?: boolean;
}

const ApiPaginate: React.FC<ApiPaginateProps> = ({
  columns = [],
  apiEnd,
  filterFunc,
  ExpandedComponent,
  paginateServer = true,
  returnRefetch,
  expandVisible = false,
  search,
  queryParam,
  tableStyle,
  apiData,
  setApiData,
  selectableRows,
  onSelectedRowsChange,
  onRowClicked,
  conditionalRowStyles,
  limit = 10,
  shadow = true,
  scrollHeight = false,
  paginate = true,
}) => {
  const [list, setList] = useState(apiData ? apiData : []);
  const [filteresList, setFilteredList] = useState<any[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [pushTotal, setPushTotal] = useState(true)
  const [perPage, setPerPage] = useState(limit);
  const [lastPage, setLastPage] = useState(1);
  const { logout } = useAuthContext();

  const getUrl = (page: number, per_page: number) =>
    `${apiEnd}?paginate=${per_page}&page=${page - 1}${queryParam ? '&' + queryParam : ''}`;
  const [{ data, loading, error }, refetch] = useAx(getUrl(lastPage, perPage));
  if (returnRefetch && !loading) {
    returnRefetch(refetch);
  }

  useEffect(() => {
    if (data) {
      // console.log('tr--->', data?.data?.transactions);
      // ///////////////////////////////////////////////////
      if (checklength(data?.data)) {
        const count = data?.data?.total;
        setUiData(data?.data, count);
        if (setApiData) setApiData(data?.data);
      } else if (checklength(data?.data?.data)) {
        const count = data?.data?.total;
        setUiData(data?.data?.data, count);
        if (setApiData) setApiData(data?.data?.data);
      } else if (checklength(data?.data?.transactions?.data)) {
        console.log('tr--->', data?.data?.transactions);
        const count = data?.data?.transactions?.total;
        const tData = data?.data?.transactions?.data;
        if (data?.data?.total && pushTotal){
          tData.push(
            data?.data?.total
          )
          setPushTotal(false);
          // count+;
        }
        setUiData(tData, count);
        if (setApiData) setApiData(data?.data?.transactions?.data);
      }
      // /////////////////////////////////////////////
    } else if (data) {
    }
    return () => {};
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    let isTimerActive = false;
    if (isTimerActive) {
      return;
    }
    if (error) {
      if (error.response && error.response.status === 401) {
        isTimerActive = true;
        logout();
        toastWithTimer('Login again in <strong></strong>', 10000, 'Unauthorized Access!');
        setTimeout(() => {
          // window.location.reload();
          const location = window.location;
          const baseUrl = location.protocol + '//' + location.host;
          window.open(baseUrl, '_self');
          isTimerActive = false;
        }, 10000);
      }
      if (error.response && error.response.status === 503) {
        isTimerActive = true;
        logout();
        toastWithTimer(`${error?.response?.data} <strong></strong>`, 10000, '');
        setTimeout(() => {
          // const location = window.location;
          // const baseUrl = location.protocol + '//' + location.host;
          window.open('/maintenance');
          isTimerActive = false;
        }, 10000);
      }
      if (error.message && error.message === 'Network Error') {
        Swal.fire('Check your Network Connection!!!');
      } else {
        // apiErrorToast(error);
      }
    }
    return () => {};
  }, [error]);

  useEffect(() => {
    refetch();
    return () => {};
  }, [queryParam]);

  useEffect(() => {
    new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (search) {
          const ls: any = list.filter((item: any) => filterFunc && filterFunc(item, search));
          resolve(ls);
        } else {
          resolve(list);
        }
      }, 100);
    })
      .then((ls: any) => {
        if (ls) {
          ls = ls.map((item: any, index: any) => {
            item.sno = (lastPage - 1) * 10 + index + 1;
            return item;
          });
        }
        setFilteredList(ls);
      })
      .catch((err) => {});

    return () => {};
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, list]);

  // for setting data in UI
  const setUiData = (myData: any, total: number) => {
    setTotalRows(total);
    setList(myData);
  };
  const handlePageChange = (page: number) => {
    setLastPage(page);
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    setLastPage(page);
    setPerPage(newPerPage);
  };

  // useEffect(() => {
  //   if (paginateServer && !loading) refetch(getUrl(lastPage, perPage));
  //   return () => {};
  //   //  eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [lastPage, perPage]);

  return (
    <Paginate
      columns={columns}
      list={filteresList}
      setList={setFilteredList}
      tableStyle={tableStyle}
      ExpandedComponent={ExpandedComponent}
      filterFunc={filterFunc}
      progressPending={loading}
      totalRows={totalRows}
      handlePerRowsChange={handlePerRowsChange}
      handlePageChange={handlePageChange}
      paginateServer={paginateServer}
      expandVisible={expandVisible}
      selectableRows={selectableRows}
      onSelectedRowsChange={onSelectedRowsChange}
      conditionalRowStyles={conditionalRowStyles}
      onRowClicked={onRowClicked}
      scrollHeight={scrollHeight}
      paginate={paginate}
    />
  );
};

export default ApiPaginate;
