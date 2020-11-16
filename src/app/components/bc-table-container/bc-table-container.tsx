import BCCircularLoader from '../bc-circular-loader/bc-circular-loader';
import BCTableContent from './bc-table-content';
import BCTableSearchContainer from '../bc-table-search-container/bc-table-search-container';
import TableSearchUtils from 'utils/table-search';
import Typography from '@material-ui/core/Typography';
import styles from './bc-table.styles';
import { Grid, Paper, withStyles } from '@material-ui/core';
// Import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

import '../../../scss/index.scss';

function BCTableContainer({ tableData, columns, onRowClick, isLoading = false, classes, search, searchPlaceholder = 'Search Customers...', pagination = true, initialMsg = 'There are no contacts!' }: any) {
  // Const dispatch = useDispatch();
  const [searchText, setSearchText] = useState(''); // eslint-disable-line

  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (event: any) => {
    // Console.log(event.target.value);
    setSearchText(event.target.value);
  };

  const getFilteredArray = (entities: any, text: any) => {
    const arr = Object.keys(entities).map(id => entities[id]);
    if (text.length === 0) {
      return arr;
    }
    return TableSearchUtils.filterArrayByString(arr, text);
  };

  useEffect(() => {
    if (tableData) {
      setFilteredData(getFilteredArray(tableData, searchText));
    }
  }, [tableData, searchText]);

  return (
    <Grid container>
      <Grid
        item
        md={6}
        xs={12} className="search_wrapper">
        {search
          ? <BCTableSearchContainer
            handleSearchChange={handleSearchChange}
            searchPlaceholder={searchPlaceholder}
            searchText={searchText}
          />
          : null}
      </Grid>
      <Grid
        item
        md={12}
        xs={12}>
        {
          isLoading
            ? <Paper classes={{ 'root': classes.noDataPaper }}>
              <BCCircularLoader heightValue={'200px'} />
            </Paper>
            : filteredData && filteredData.length === 0
              ? <Paper classes={{ 'root': classes.noDataPaper }}>
                <Typography
                  color={'textSecondary'}
                  variant={'h5'}>
                  {initialMsg}
                </Typography>
              </Paper>
              : <BCTableContent
                columns={columns}
                data={filteredData}
                invoiceTable
                onRowClick={(ev: any, row: any) => {
                  onRowClick && onRowClick(ev, row);
                }}
                pagination={pagination}
              />
        }
      </Grid>
    </Grid>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCTableContainer);
