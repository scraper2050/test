import BCTablePagination from './bc-table-pagination';
import MaUTable from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
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

function BCTableContent({ isLoading, columns, data, onRowClick, pagination = true, invoiceTable = false, setPage }: any) {

  const location = useLocation<any>();
  const locationState = location.state;

  const initialSort = locationState
    && locationState.prevPage
    && locationState.prevPage.sortBy ? locationState.prevPage.sortBy : []

  const initialPageIndex = locationState
    && locationState.prevPage ? locationState.prevPage.page : 0

  const initialPageSize = locationState
    && locationState.prevPage ? locationState.prevPage.pageSize : 10

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
        sortBy: initialSort,
        pageIndex: initialPageIndex,
        pageSize: initialPageSize
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
    setPage({
      pageSize,
      page: newPage,
      sortBy,
    })
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage({
      pageSize: Number(event.target.value),
      page: pageIndex,
      sortBy,
    })
    setPageSize(Number(event.target.value));
  };

  const handleSortBy = (sortBy: any) => {
    setPage({
      pageSize,
      page: pageIndex,
      sortBy,
    })
  }

  useEffect(() => {
    if (sortBy.length !== 0) {
      handleSortBy(sortBy)
    }
  }, [sortBy])

  // Render the UI for your table
  return (
    <TableContainer
      className={`min-h-full sm:border-1 sm:rounded-16 ${invoiceTable
        ? `invoice-paper`
        : ''}`}
      component={Paper}>
      <MaUTable
        size={'small'}
        {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup: any, gindex: number) =>
            <TableRow
              key={`table-${gindex}`}
              {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, hindex: number) =>
                <TableCell
                  className={`whitespace-no-wrap p-12 ${column.borderRight
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
                      className={clsx('p-12', cell.column.className, `${cell.column.borderRight
                        ? 'cell-border-right cursor-default'
                        : ''}`)}
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
    </TableContainer>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCTableContent);
