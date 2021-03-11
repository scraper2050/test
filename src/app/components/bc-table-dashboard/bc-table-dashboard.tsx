import React from 'react';
import styles from './bc-table-dashboard.style';
import { Grid, withStyles } from "@material-ui/core";
import BCTableContainer from "app/components/bc-table-container/bc-table-container";

interface Props {
  classes: any;
  text: string;
  textButton: string;
  click?: any;
  columns: any;
  isLoading: boolean;
  tableData: any;
  onRowClick?: any;
}
function BCTableDashboard(props: Props) {
  const {
    classes,
    text,
    textButton,
    click,
    columns,
    isLoading,
    tableData,
    onRowClick
  } = props;

  return (
    <Grid
      container
      direction="column"
      className={`${classes.tableContainer} elevation-1`}
    >
      <Grid item className={classes.header} xs={12}>
        <Grid container>
          <Grid item xs={9}>
            <Grid container className={classes.headerText} alignItems="center">
              {text}
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid
              container
              justify="center"
              alignItems="center"
              className={`${classes.buttonContainer}`}
              onClick={click}>

              <Grid item>
                {textButton}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.tableList} xs={12}>
        <BCTableContainer
          noHeader={true}
          className={classes.table}
          columns={columns}
          isLoading={isLoading}
          tableData={tableData}
          pagination={false}
          pageSize={tableData.length}
          isDefault={true}
          initialMsg="No Vendors yet"
          stickyHeader={true}
          onRowClick={(ev: any, row: any) => onRowClick(row)}
        />
      </Grid>
    </Grid>
  )
}


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCTableDashboard);