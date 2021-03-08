import BCTablePagination from './bc-table-pagination';
import MaUTable from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState, useRef } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useLocation, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import styles from './bc-table.styles';
import { withStyles } from '@material-ui/core';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { boolean } from 'yup';

function BCTableContent({ noHeader, className, stickyHeader, defaultPageSize, isDefault, columns, data, onRowClick, pagination = true, invoiceTable = false, setPage }: any) {

  const location = useLocation<any>();
  const history = useHistory();
  const locationState = location.state;


  const curTab = locationState && locationState?.curTab;

  const prevPage = locationState && locationState.prevPage ? locationState.prevPage : null;

  const onUpdatePage = locationState && locationState.onUpdatePage ? locationState.onUpdatePage : null;

  const initialSort = prevPage && prevPage.sortBy ? prevPage.sortBy : []

  const initialPageIndex = prevPage ? prevPage.page : 0

  const initialPageSize = prevPage ? prevPage.pageSize : 10;

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    'state': { pageIndex, pageSize, sortBy }
  }: any = useTable(
    {
      // 'autoResetHiddenColumns': true,
      columns,
      data,
      initialState: {
        sortBy: isDefault ? [] : onUpdatePage ? onUpdatePage.sortBy : initialSort,
        pageIndex: isDefault ? 0 : onUpdatePage ? onUpdatePage.page : initialPageIndex,
        pageSize: isDefault && defaultPageSize ? defaultPageSize : onUpdatePage ? onUpdatePage.pageSize : initialPageSize
      },
      'getSubRows': (row: any) => row && row.subRows || []
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks: any) => {
      hooks.allColumns.push((_columns: any) => [..._columns]);
    }
  );

  const handleChangePage = (event: any, newPage: any): any => {

    window.scrollTo(0, 20);

    if (setPage !== undefined) {
      setPage({
        pageSize,
        sortBy,
        page: newPage,
      });
    }

    history.replace({
      ...history.location,
      state: {
        ...locationState,
        onUpdatePage: {
          pageSize,
          sortBy,
          page: newPage,
        }
      }
    })

    if (prevPage) {
      history.replace({
        ...history.location,
        state: {
          ...location.state,

          prevPage: {
            pageSize,
            sortBy,
            page: newPage,
          }
        }
      });
    }
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    if (setPage !== undefined) {
      setPage({
        ...location.state,
        page: pageIndex,
        sortBy,
        pageSize: Number(event.target.value)
      });
    }


    history.replace({
      ...history.location,
      state: {
        ...locationState,
        onUpdatePage: {
          page: pageIndex,
          sortBy,
          pageSize: Number(event.target.value)
        }
      }
    })


    if (prevPage) {
      history.replace({
        ...history.location,
        state: {
          ...location.state,
          prevPage: {
            page: pageIndex,
            sortBy,
            pageSize: Number(event.target.value)
          }
        }
      });
    }

    setPageSize(Number(event.target.value));
  };

  const handleSortBy = (sortBy: any) => {

    if (setPage !== undefined) {
      setPage({
        page: 0,
        pageSize,
        sortBy,
      });

      handleChangePage(null, 0);
    }


    history.replace({
      ...history.location,
      state: {
        ...locationState,
        onUpdatePage: {
          page: 0,
          pageSize,
          sortBy,
        }
      }
    })

    if (prevPage) {
      history.replace({
        ...history.location,
        state: {
          ...location.state,
          prevPage: {
            page: 0,
            pageSize,
            sortBy,
          }
        }
      });
    }
  }



  useEffect(() => {
    if (sortBy.length !== 0) {
      handleSortBy(sortBy)
    }
  }, [sortBy])

  useEffect(() => {
    if (!isDefault) {
      setTimeout(() => {

        if (onUpdatePage) {
          let tempLocationState = location.state;

          delete tempLocationState['onUpdatePage'];

          history.replace({
            ...history.location,
            state: { ...tempLocationState }
          })
        }
      }, 200);
    }
  }, []);

  useEffect(() => {
    if (!onUpdatePage) {

      if (curTab !== undefined) {
        setPageSize(10)
        gotoPage(0)
        handleSortBy([])
      }
    }
  }, [curTab])

  // Render the UI for your table
  return (
    <TableContainer
      className={`min-h-full sm:border-1 sm:rounded-16 ${invoiceTable
        ? `invoice-paper`
        : ''} ${className} `}
      component={Paper}>
      <MaUTable
        stickyHeader={stickyHeader}
        size={'small'}
        {...getTableProps()}>
        <TableHead style={{ display: noHeader ? 'none' : 'table-header-group' }}>
          {headerGroups.map((headerGroup: any, gindex: number) =>
            <TableRow
              key={`table-${gindex}`}
              {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, hindex: number) =>
                <TableCell
                  className={`whitespace-no-wrap ${column.borderRight
                    ? 'cell-border-right cursor-default'
                    : ''}`}
                  key={`table-cell-${hindex}`}

                  {...(!column.sortable
                    ? column.getHeaderProps()
                    : column.getHeaderProps(
                      // handleSorting(column)
                      column.getSortByToggleProps()
                    )
                  )}
                >
                  {column.render('Header')}
                  {column.sortable
                    ? <TableSortLabel
                      active={column.isSorted}
                      // React-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc
                        ? 'desc'
                        : 'asc'}
                    />
                    : null}
                </TableCell>)}
            </TableRow>)}
        </TableHead>
        <TableBody>
          {page.map((row: any, i: number) => {
            prepareRow(row);
            return (
              <TableRow
                key={`table-row-${i}`}
                {...row.getRowProps()}
                className={'truncate cursor-pointer'}
                hover={!invoiceTable}
                onClick={(ev: any) => onRowClick(ev, row)}>
                {row.cells.map((cell: any, cindex: number) => {
                  return (
                    <TableCell
                      key={`table-cell-${cindex}`}
                      {...cell.getCellProps()}
                      className={clsx(cell.column.className, `${cell.column.borderRight
                        ? 'cell-border-right cursor-default'
                        : ''}`)
                      }
                      style={{
                        'width': cell.column.width || 'auto'
                      }}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        {
          pagination
            ? <TableFooter>
              <TableRow>
                <TablePagination
                  ActionsComponent={BCTablePagination}
                  SelectProps={{
                    'inputProps': { 'aria-label': 'rows per page' },
                    'native': false
                  }}
                  classes={{
                    'root': 'overflow-hidden',
                    'spacer': 'w-0 max-w-0'
                  }}
                  colSpan={5}
                  count={data.length}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  page={pageIndex}
                  rowsPerPage={pageSize}
                  rowsPerPageOptions={[
                    5, 10, 25, {
                      'label': 'All',
                      'value': data.length + 1
                    }
                  ]}
                />
              </TableRow>
            </TableFooter>
            : null
        }
      </MaUTable>
    </TableContainer >
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCTableContent);
