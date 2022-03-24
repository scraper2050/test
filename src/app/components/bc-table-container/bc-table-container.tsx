import BCCircularLoader from '../bc-circular-loader/bc-circular-loader';
import BCTableContent from './bc-table-content';
import BCTableSearchContainer from '../bc-table-search-container/bc-table-search-container';
import TableSearchUtils from 'utils/table-search';
import Typography from '@material-ui/core/Typography';
import styles from './bc-table.styles';
import { Grid, Paper, withStyles } from '@material-ui/core';
// Import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { setSearchTerm } from 'actions/searchTerm/searchTerm.action';
import { connect, useDispatch } from 'react-redux';
import React, { useEffect, useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import '../../../scss/index.scss';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
// Import console from "console";

interface Props {
  searchTerm: string;
  classes: any;
}

function BCTableContainer({
  tableData,
  columns,
  onRowClick,
  isLoading = false,
  classes,
  className,
  search,
  searchPlaceholder = 'Search Customers...',
  pagination = true,
  initialMsg = 'No records found!',
  isPageSaveEnabled,
  searchTerm,
  setPage,
  currentPage,
  isDefault = false,
  pageSize = 10,
  stickyHeader = false,
  noHeader = false,
  cellSize,
  toolbar,
  noPadding = false,
  toolbarPositionLeft = false,
  manualPagination = false,
  fetchFunction = () => {},
  total,
  currentPageIndex,
  setCurrentPageIndexFunction = () => {},
  currentPageSize,
  setCurrentPageSizeFunction = () => {},
  setKeywordFunction = () => {},
}: any) {
  const location = useLocation<any>();
  const history = useHistory();
  const locationState = location.state;

  const initialSearch = locationState &&
    locationState.prevPage &&
    locationState.prevPage.search ? locationState.prevPage.search : '';


  const onPageSearch = locationState &&
    locationState.onUpdatePage &&
    locationState.onUpdatePage.search ? locationState.onUpdatePage.search : null;

  const [searchText, setSearchText] = useState(''); // eslint-disable-line
  // Const [searchText, setSearchText] = useState(searchTerm || ''); // eslint-disable-line

  const [filteredData, setFilteredData] = useState([]);

  const debouncedFetchFunction = useCallback(
    debounce(value => {
      setKeywordFunction(value);
      fetchFunction(undefined, undefined, undefined, value)
    }, 500),
    [fetchFunction]
  );

  const handleSearchChange = (event: any) => {
    if(manualPagination){
      setSearchText(event.target.value);
      debouncedFetchFunction(event.target.value);
    } else {
      setSearchText(event.target.value);
      if (setPage !== undefined) {
        setPage({
          ...currentPage,
          'search': event.target.value
        });
      }
      if (locationState && locationState.prevPage) {
        history.replace({
          ...history.location,
          'state': {
            ...currentPage,
            'search': event.target.value
          }
        });
      }
    }
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
      if (initialSearch !== '') {
        setSearchText(initialSearch);
      }
    }
  }, []);

  useEffect(() => {
    if (tableData && !manualPagination) {
      setFilteredData(getFilteredArray(tableData, searchText));
    } else if(tableData){
      setFilteredData(tableData);
    }
  }, [tableData, searchText]);


  return (
    <TableContainer noPadding={noPadding} container>
      <Grid
        className={'actions-container'}
        item
        md={toolbar
          ? 12
          : 6}
        xs={12}>
        {search
          ? <BCTableSearchContainer
            handleSearchChange={handleSearchChange}
            searchPlaceholder={searchPlaceholder}
            searchText={searchText}
          />
          : null}
        {toolbar && <BCTableToolBarContainer left={toolbarPositionLeft}>
          {toolbar}
        </BCTableToolBarContainer>}
      </Grid>
      <Grid
        item
        md={12}
        xs={12}>
        {isLoading
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
              cellSize={cellSize}
              className={className ? className : ''}
              columns={columns}
              currentPage={currentPage}
              data={filteredData}
              defaultPageSize={pageSize}
              invoiceTable
              isDefault={isDefault}
              isLoading={isLoading}
              isPageSaveEnabled={isPageSaveEnabled || false}
              noHeader={noHeader}
              onRowClick={(ev: any, row: any) => {
                onRowClick && onRowClick(ev, row);
              }}
              pagination={pagination}
              setPage={setPage}
              stickyHeader={stickyHeader}
              manualPagination={manualPagination}
              fetchFunction={fetchFunction}
              total={total}
              currentPageIndex={currentPageIndex}
              setCurrentPageIndexFunction={setCurrentPageIndexFunction}
              currentPageSize={currentPageSize}
              setCurrentPageSizeFunction={setCurrentPageSizeFunction}
            />
        }
      </Grid>
    </TableContainer>
  );
}

const TableContainer = styled(Grid)<{noPadding: boolean}>`
padding: ${props => props.noPadding ? '0' : '5px'};
.actions-container {
  display:flex;
  > .MuiPaper-root {
    flex: 1;
    margin-right: 20px;
  }
}
`;


const BCTableToolBarContainer = styled.div<{ left: boolean }>`
    margin-bottom: 10px;
    display: flex;
    flex: 1.66;
    justify-content: ${props => props.left ? 'flex-start' : 'flex-end'};
    button {
      margin-left: 20px;
    }
`;


const mapStateToProps = (state: {
  searchTerm: {
    text: string;
  };
}) => ({
  'searchTerm': state.searchTerm.text
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
  'setSearchTerm': (searchTerm: any) => dispatch(setSearchTerm(searchTerm))
});


export default withStyles(
  styles,
  { 'withTheme': true }
)(connect(
  mapStateToProps,
  mapDispatchToProps
)(BCTableContainer));

// Export default withStyles(styles, { withTheme: true })(BCTableContainer);
