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
import { Avatar } from '@material-ui/core';

import SearchInput from '../SearchInput';
import { TableOrderModel } from '../../../../Models/TableData';
import { UserModel } from '../../../../Models/User';

import AvatarImg1 from '../../../../../assets/img/avatars/1.jpg';

interface UserTableProps {
  userList: UserModel[];
}

const UserTable = ({ userList }: UserTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchStr, setSearchStr] = useState('');

  const HEAD_DATA = [
    { id: 'displayName', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
  ];

  const [orderBy, setOrderBy] = useState<TableOrderModel>({
    id: 'displayName',
    direction: 'asc',
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getSearchList = (): UserModel[] => {
    const searchStrTemp = searchStr.toLowerCase();
    return userList.filter((item) => {
      let isFiltered = false;
      HEAD_DATA.forEach((itemHead) => {
        if (!isFiltered) {
          const valueStr = getCellValue(itemHead.id, item).toLowerCase();
          if (valueStr.indexOf(searchStrTemp) >= 0) isFiltered = true;
        }
      });
      return isFiltered;
    });
  };

  const getSortedTableData = (): any[] => {
    const searchedList = getSearchList();
    const sortId = orderBy.id;
    if (!sortId) return searchedList;
    const sortedTable = searchedList.sort((a: UserModel, b: UserModel) => {
      let firstItem, secondItem;
      if (orderBy.direction === 'asc') {
        firstItem = getCellValue(orderBy.id, a);
        secondItem = getCellValue(orderBy.id, b);
      } else if (orderBy.direction === 'desc') {
        firstItem = getCellValue(orderBy.id, b);
        secondItem = getCellValue(orderBy.id, a);
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

  const getCellValue = (cellId: string, tableItem: UserModel): string => {
    if (cellId === 'displayName') {
      return `${tableItem.profile.displayName}`;
    } else if (cellId === 'email') {
      return tableItem.auth.email;
    } else if (cellId === 'phone') {
      return tableItem.contact.phone;
    }
    return '';
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
                    {HEAD_DATA.map((item) => {
                      return (
                        <TableCell key={item.id} width="25%">
                          <TableSortLabel
                            active={orderBy.id === item.id}
                            direction={orderBy.id === item.id ? orderBy.direction : 'asc'}
                            onClick={() => {
                              onClickSort(item.id);
                            }}
                          >
                            {item.label}
                          </TableSortLabel>
                        </TableCell>
                      );
                    })}
                    <TableCell key="profile" width="25%"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSortedTableData().map((item, idx) => {
                    return (
                      <TableRow key={idx} hover style={{ cursor: 'pointer' }}>
                        {HEAD_DATA.map((itemCell) => {
                          return <TableCell>{getCellValue(itemCell.id, item)}</TableCell>;
                        })}
                        <TableCell>
                          <Avatar src={AvatarImg1} alt="Avatar" />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={userList.length}
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

export default UserTable;
