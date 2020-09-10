import BCTableContent from './bc-table-content';
import BCTableSearchContainer from '../bc-table-search-container/bc-table-search-container';
import TableSearchUtils from 'utils/table-search';
import Typography from '@material-ui/core/Typography';
import styles from './bc-table.styles';
import { Grid, Paper, withStyles } from '@material-ui/core';
// Import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

function BCTableContainer({ tableData, columns, onRowClick, classes, search }: any) {
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
        xs={12}>
        {search
          ? <BCTableSearchContainer
            handleSearchChange={handleSearchChange}
            searchText={searchText}
          />
          : null}
      </Grid>
      <Grid
        item
        md={12}>
        {filteredData && filteredData.length === 0
          ? <Paper classes={{ 'root': classes.noDataPaper }}>
            <Typography
              color={'textSecondary'}
              variant={'h5'}>
              {'There are no contacts!'}
            </Typography>
          </Paper>
          : <BCTableContent
            columns={columns}
            data={filteredData}
            onRowClick={(ev: any, row: any) => {
              onRowClick(ev, row);
            }}
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
