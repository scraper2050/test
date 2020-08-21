import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';

import SortableTableHeader from './SortableTableHeader';

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

const BCTable: React.FC<BCTableProps> = ({ tableData, headCells, pagination }: BCTableProps) => {
  const [orderBy, setOrderBy] = useState({
    id: '',
    direction: 'asc',
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    if (tableData.length > 0) {
      setOrderBy({
        id: Object.keys(tableData[0])[0],
        direction: 'asc',
      });
    }
  }, [tableData]);

  const updateOrderBy = (orderId: any): void => {
    if (orderId === orderBy.id) {
      const direction = orderBy.direction === 'asc' ? 'desc' : 'asc';
      setOrderBy({
        ...orderBy,
        direction: direction,
      });
    } else {
      setOrderBy({
        ...orderBy,
        id: orderId,
        direction: 'asc',
      });
    }
  };
  const getSortedTableData = (): any[] => {
    if (!orderBy.id) return tableData;
    const sortedTable = tableData.sort((a, b) => {
      let firstItem, secondItem;

      if (orderBy.direction === 'asc') {
        firstItem = a[orderBy.id];
        secondItem = b[orderBy.id];
      } else if (orderBy.direction === 'desc') {
        firstItem = b[orderBy.id];
        secondItem = a[orderBy.id];
      }

      return firstItem > secondItem ? 1 : secondItem > firstItem ? -1 : 0;
    });
    return sortedTable;
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderTableBody = (): JSX.Element[] | JSX.Element => {
    const sortedTableData = getSortedTableData();
    if (sortedTableData.length > 0) {
      const curPageRows =
        rowsPerPage > 0 ? sortedTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : sortedTableData;

      const tableRows: JSX.Element[] = [];

      curPageRows.forEach((row, idx) => {
        tableRows.push(
          <StyledTableRow key={idx} className="bc-table-row" hover>
            {headCells.map((headCell) => {
              return renderTableCell(row, headCell);
            })}
          </StyledTableRow>
        );
      });
      return tableRows;
    } else {
      return <TableCell>No Data</TableCell>;
    }
  };
  const renderTableCell = (rowData: any, headCell: HeadCellModal): JSX.Element => {
    if (headCell.id in rowData) {
      return (
        <TableCell>
          {headCell.isImage ? <ProfileImg alt="table-img" src={rowData[headCell.id]} /> : rowData[headCell.id]}
        </TableCell>
      );
    }
    return <TableCell></TableCell>;
  };

  return (
    <Paper>
      <TableContainer>
        <Table className="bc-table">
          <SortableTableHeader
            orderBy={orderBy}
            headCells={headCells}
            onClickSort={(orderId: any) => {
              updateOrderBy(orderId);
            }}
          />
          <TableBody>{renderTableBody()}</TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

export default BCTable;
