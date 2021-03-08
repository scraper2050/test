import BCCircularLoader from "../bc-circular-loader/bc-circular-loader";
import BCTableContent from "./bc-table-content";
import BCTableSearchContainer from "../bc-table-search-container/bc-table-search-container";
import TableSearchUtils from "utils/table-search";
import Typography from "@material-ui/core/Typography";
import styles from "./bc-table.styles";
import { Grid, Paper, withStyles } from "@material-ui/core";
// Import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { setSearchTerm } from 'actions/searchTerm/searchTerm.action';
import { connect, useDispatch } from 'react-redux';
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useHistory } from 'react-router-dom';

import "../../../scss/index.scss";
// import console from "console";

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
  searchPlaceholder = "Search Customers...",
  pagination = true,
  initialMsg = "No records found!",
  isPageSaveEnabled,
  searchTerm,
  setPage,
  currentPage,
  isDefault = false,
  pageSize = 10,
  stickyHeader = false,
  noHeader = false,
}: any) {

  const dispatch = useDispatch();
  const location = useLocation<any>();
  const history = useHistory();
  const locationState = location.state;

  const initialSearch = locationState
    && locationState.prevPage
    && locationState.prevPage.search ? locationState.prevPage.search : '';


  const onPageSearch = locationState
    && locationState.onUpdatePage
    && locationState.onUpdatePage.search ? locationState.onUpdatePage.search : null;

  const [searchText, setSearchText] = useState(''); // eslint-disable-line
  // const [searchText, setSearchText] = useState(searchTerm || ''); // eslint-disable-line

  const [filteredData, setFilteredData] = useState([]);


  const handleSearchChange = (event: any) => {
    //save search state in redux
    // dispatch(setSearchTerm(event.target.value))

    setSearchText(event.target.value);
    if (setPage !== undefined) {
      setPage({
        ...currentPage,
        search: event.target.value,
      })
    }
    if (locationState && locationState.prevPage) {
      history.replace({
        ...history.location,
        state: {
          ...currentPage,
          search: event.target.value,
        }
      })
    }
  };

  const getFilteredArray = (entities: any, text: any) => {
    const arr = Object.keys(entities).map((id) => entities[id]);
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
    if (tableData) {
      setFilteredData(getFilteredArray(tableData, searchText));
    }
  }, [tableData, searchText]);



  return (
    <Grid container>
      <Grid item md={6} xs={12}>
        {search ? (
          <BCTableSearchContainer
            handleSearchChange={handleSearchChange}
            searchPlaceholder={searchPlaceholder}
            searchText={searchText}
          />
        ) : null}
      </Grid>
      <Grid item md={12} xs={12}>
        {isLoading ? (
          <Paper classes={{ root: classes.noDataPaper }}>
            <BCCircularLoader heightValue={"200px"} />
          </Paper>
        ) : filteredData && filteredData.length === 0 ? (
          <Paper classes={{ root: classes.noDataPaper }}>
            <Typography color={"textSecondary"} variant={"h5"}>
              {initialMsg}
            </Typography>
          </Paper>
        ) : (
          <BCTableContent
            noHeader={noHeader}
            stickyHeader={stickyHeader}
            className={className ? className : ''}
            currentPage={currentPage}
            columns={columns}
            data={filteredData}
            invoiceTable
            onRowClick={(ev: any, row: any) => {
              onRowClick && onRowClick(ev, row);
            }}
            pagination={pagination}
            isPageSaveEnabled={isPageSaveEnabled || false}
            setPage={setPage}
            isLoading={isLoading}
            defaultPageSize={pageSize}
            isDefault={isDefault}
          />
        )}
      </Grid>
    </Grid>
  );
}


const mapStateToProps = (state: {
  searchTerm: {
    text: string;
  };
}) => ({
  'searchTerm': state.searchTerm.text,
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
  'setSearchTerm': (searchTerm: any) =>
    dispatch(setSearchTerm(searchTerm))
});


export default withStyles(
  styles,
  { 'withTheme': true }
)(connect(
  mapStateToProps,
  mapDispatchToProps
)(BCTableContainer));

// export default withStyles(styles, { withTheme: true })(BCTableContainer);
