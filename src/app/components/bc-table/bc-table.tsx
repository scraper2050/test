import Paper from '@material-ui/core/Paper';
import SortableTableHeader from './sortable-table-header/sortable-table-header';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

interface HeadCellModal {
  id: any;
  label: string;
  sortable: boolean;
  isImage?: boolean;
  width?: string;
}

interface OrderByModal {
  id: any;
  direction: 'asc' | 'desc';
}

interface BCTableProps {
  tableData: any[];
  headCells: HeadCellModal[];
  pagination?: boolean;
}

function BCTable({
  tableData,
  headCells,
  pagination
}: BCTableProps) {
  const [orderBy, setOrderBy] = useState({
    'direction': 'asc',
    'id': ''
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(
    () => {
      if (tableData.length > 0) {
        setOrderBy({
          'direction': 'asc',
          'id': Object.keys(tableData[0])[0]
        });
      }
    },
    [tableData]
  );

  const updateOrderBy = (orderId: any): void => {
    if (orderId === orderBy.id) {
      const direction = orderBy.direction === 'asc'
        ? 'desc'
        : 'asc';
      setOrderBy({
        ...orderBy,
        'direction': direction
      });
    } else {
      setOrderBy({
        ...orderBy,
        'direction': 'asc',
        'id': orderId
      });
    }
  };
  const getSortedTableData = (): any[] => {
    if (!orderBy.id) {
      return tableData;
    }
    const sortedTable = tableData.sort((a, b) => {
      let firstItem = null;
      let secondItem = null;
      if (orderBy.direction === 'asc') {
        firstItem = a[orderBy.id];
        secondItem = b[orderBy.id];
      } else if (orderBy.direction === 'desc') {
        firstItem = b[orderBy.id];
        secondItem = a[orderBy.id];
      }

      return firstItem > secondItem
        ? 1
        : secondItem > firstItem
          ? -1
          : 0;
    });
    return sortedTable;
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(
      event.target.value,
      10
    ));
    setPage(0);
  };

  function renderTableBody(): JSX.Element[] | JSX.Element {
    const sortedTableData = getSortedTableData();
    if (sortedTableData.length > 0) {
      const curPageRows =
        rowsPerPage > 0
          ? sortedTableData.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
          : sortedTableData;

      const tableRows: JSX.Element[] = [];

      curPageRows.forEach((row, idx) => {
        tableRows.push(<StyledTableRow
          className={'bc-table-row'}
          hover
          key={idx}>
          {headCells.map(headCell => {
            return renderTableCell(
              row,
              headCell
            );
          })}
        </StyledTableRow>);
      });
      return tableRows;
    }
    return <TableCell>
      {'No Data'}
    </TableCell>;
  }

  function renderTableCell(
    rowData: any,
    headCell: HeadCellModal
  ): JSX.Element {
    if (headCell.id in rowData) {
      return (
        <TableCell>
          {headCell.isImage
            ? <ProfileImg
              alt={'table-img'}
              src={rowData[headCell.id]}
            />
            : rowData[headCell.id]
          }
        </TableCell>
      );
    }
    return <TableCell />;
  }

  return (
    <Paper>
      <TableContainer>
        <Table className={'bc-table'}>
          <SortableTableHeader
            headCells={headCells}
            onClickSort={(orderId: any) => {
              updateOrderBy(orderId);
            }}
            orderBy={orderBy}
          />
          <TableBody>
            {renderTableBody()}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination &&
        <TablePagination
          component={'div'}
          count={tableData.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      }
    </Paper>
  );
}

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

export default BCTable;
