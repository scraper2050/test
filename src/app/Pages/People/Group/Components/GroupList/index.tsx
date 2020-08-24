import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';

import SearchInput from '../../../Components/SearchInput';

import { TableOrderModel } from '../../../../../Models/TableData';
import { GroupModel } from '../../../../../Models/Group';

interface GroupListTableProps {
  groupList: GroupModel[];
}

const GroupListTable = ({ groupList }: GroupListTableProps): JSX.Element => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchStr, setSearchStr] = useState('');

  const [orderBy, setOrderBy] = useState<TableOrderModel>({
    id: 'title',
    direction: 'asc',
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSearchList = (): GroupModel[] => {
    return groupList.filter((item) => {
      const gruopName = item.title.toLowerCase();
      const companyName = item.company.toLowerCase();
      if (gruopName.indexOf(searchStr.toLowerCase()) >= 0 || companyName.indexOf(searchStr.toLowerCase()) >= 0)
        return true;
      else return false;
    });
  };

  const getSortedTableData = (): GroupModel[] => {
    const searchedList = getSearchList();
    const sortId = orderBy.id;
    if (!sortId) return searchedList;
    const sortedTable = searchedList.sort((a: GroupModel, b: GroupModel) => {
      let firstItem, secondItem;
      if (orderBy.direction === 'asc') {
        firstItem = a.title;
        secondItem = b.title;
      } else if (orderBy.direction === 'desc') {
        firstItem = b.title;
        secondItem = a.title;
      }
      if (firstItem === undefined) firstItem = '';
      if (secondItem === undefined) secondItem = '';
      return firstItem > secondItem ? 1 : secondItem > firstItem ? -1 : 0;

      return 0;
    });
    return sortedTable;
  };

  const onClickSort = (orderId: any): void => {
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

  return (
    <Grid container>
      <Grid container>
        <Grid item md={6} xs={12}>
          <SearchInput
            style={{ marginBottom: '11px' }}
            searchStr={searchStr}
            setSearchStr={setSearchStr}
            onSearch={(str: string) => {
              console.log('On Search');
            }}
          />
        </Grid>
        <Grid item md={12}>
          <Paper>
            <TableContainer>
              <Table className="bc-table">
                <TableHead>
                  <TableRow>
                    <TableCell key="group_name" width="50%">
                      <TableSortLabel
                        active={orderBy.id === 'title'}
                        direction={orderBy.id === 'title' ? orderBy.direction : 'asc'}
                        onClick={() => {
                          onClickSort('title');
                        }}
                      >
                        Group Name
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSortedTableData().map((item, idx) => {
                    return (
                      <TableRow key={idx} hover style={{ cursor: 'pointer' }}>
                        <TableCell>{item.title}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={groupList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GroupListTable;
