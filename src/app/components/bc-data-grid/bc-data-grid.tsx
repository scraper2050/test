import React from 'react';
import {DataGrid, GridColDef} from "@material-ui/data-grid";
import styled from "styled-components";
import {GRAY6, LIGHT_BLUE, PRIMARY_BLUE} from "../../../constants";

export interface ReportData {
  title: string;
  value: string;
}

export interface CUSTOM_REPORT {
  outstanding: string,
  totalAmount: string,
  aging: ReportData[],
  customersData: {
    id: string;
    customer: string;
    current: string;
    1_30: string;
    31_60: string;
    61_90: string;
    over91: string;
    total: string;
  }[];
  gridHeight?: number;
}

interface Props {
  reportData: CUSTOM_REPORT | null;
  columns: GridColDef[];
  showFooter?: boolean;
}

export default function BcDataGrid({reportData, columns, showFooter = true}:Props) {

  if (!reportData?.customersData) return null;


  return <BCDataGrid
      // pagination
      height={reportData.gridHeight}
      autoHeight
      disableSelectionOnClick
      rows={reportData?.customersData}
      columns={columns}
      // page={currentPage}
      pageSize={reportData?.customersData?.length ?? 0}
      getRowClassName={(params) => {
        const {rowType} =params.row;
        switch (rowType) {
          case 'bucket':
            return 'bucket-row';
          case 'totals':
            return 'totals-row';
          default:
            return '';
        }
      }}
      // rowsPerPageOptions={[5, 10, 50]}
      components={{
        Footer: showFooter ? CustomFooter : undefined,
      }}
      componentsProps={{
        footer: {
          total: reportData?.outstanding,
          totalAmount: reportData?.totalAmount,
          // rowsCount: reportData?.customersData.length,
          // pageNumber: currentPage,
          // pageSize,
          // handleChangePage: (event: any, pageNumber: number) => setCurrentPage(pageNumber),
          // handleChangeRowsPerPage: (event: any) => {
          //   setCurrentPage(0);
          //   setPageSize(event.target.value);
          // },
        }
      }}
      // onCellClick={handleOnCellClick}
      // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      // onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
    />

}

const BCDataGrid = styled(DataGrid)<{height: number | undefined}>`
  border: 0;
  margin-bottom: 30px;

  .MuiDataGrid-windowContainer {
    height: ${props => props.height ? (props.height + 52)+'px !important' : 'auto'};
  }

  .MuiDataGrid-dataContainer {
    height: ${props => props.height ? props.height+'px !important' : 'auto'};
  }

  .MuiDataGrid-columnSeparator {
    display: none;
  }

  .MuiDataGrid-cell:focus {
    outline: none;
  }

  .MuiDataGrid-columnHeaderTitleContainer {
    padding: 0;
  }

  .MuiDataGrid-footerContainer {
    justify-content: flex-start;
  }

  .MuiToolbar-gutters {
    padding-left: 10px;
  }

  .MuiTablePagination-spacer {
    flex: 0;
  }

  .MuiTablePagination-root {
    display: none;
    --color: rgba(0, 0, 0, 0.87);
    --overflow: auto;
    --font-size: 0.875rem;
    --border-bottom: none;
    --border-top: 2px solid rgba(224, 224, 224, 1);
  }

  .GrandTotalContainer {
    display: flex;
    justify-content: space-between;
    padding: 16px 10px;
    background-color: ${LIGHT_BLUE};
    strong {
      flex: 1;
      padding: 0 5px;
    }
    strong:not(:first-of-type) {
      text-align: right;
    }
  }

  .bucket-row {
    max-height: 26px!important;
    min-height: 26px!important;
    background-color: ${GRAY6};
  }

  .totals-row {
    max-height: 26px!important;
    min-height: 26px!important;
    background-color: ${LIGHT_BLUE};
  }

  .no-border {
    border-bottom: 0;
    line-height: 26px!important;
    max-height: 26px!important;
    min-height: 26px!important;
    font-weight: 700;
    font-size: 12px;
    background-color: transparent;
  }
`


// const CustomHeader = withStyles(
//   styles,
//   {'withTheme': true}
// )(({classes, headerData}: {classes: any, headerData: ReportData[]}) => <div className={classes.customSubSummaryContainer}>
//   {headerData.map((data, index) => <div key={data.title}>
//     <p className={classes.label} style={{fontSize: 10}}>{data.title}</p>
//     <p className={classes.value} style={{margin: '10px 0', fontSize: 14}}>{data.value}</p>
//     </div>
//   )}
// </div>)

const CustomFooter = ({
                        total,
                        totalAmount,
                        rowsCount,
                        pageNumber,
                        pageSize,
                        handleChangePage,
                        handleChangeRowsPerPage
                      }: any) => <>
  {/*{Math.floor(rowsCount / pageSize) === pageNumber && */}
  <div className="GrandTotalContainer">
    <strong>Total Outstanding</strong>
    <strong>&nbsp;</strong>
    <strong>&nbsp;</strong>
    <strong>&nbsp;</strong>
    <strong>{totalAmount}</strong>
    <strong>{total}</strong>
  </div>
  {/*<TablePagination*/}
  {/*  ActionsComponent={BCTablePagination}*/}
  {/*  style={{width: '80vw'}}*/}
  {/*  //colSpan={5}*/}
  {/*  count={rowsCount}*/}
  {/*  onChangePage={handleChangePage}*/}
  {/*  onChangeRowsPerPage={handleChangeRowsPerPage}*/}
  {/*  page={pageNumber}*/}
  {/*  rowsPerPage={pageSize}*/}
  {/*  rowsPerPageOptions={[*/}
  {/*    {*/}
  {/*      label: '5',*/}
  {/*      value: 5*/}
  {/*    }, {*/}
  {/*      label: '10',*/}
  {/*      value: 10*/}
  {/*    }, {*/}
  {/*      label: '25',*/}
  {/*      value: 25*/}
  {/*    }, {*/}
  {/*      label: 'All',*/}
  {/*      value: rowsCount + 1*/}
  {/*    }*/}
  {/*  ]}*/}
  {/*  SelectProps={{*/}
  {/*    'inputProps': {'aria-label': 'rows per page'},*/}
  {/*    'native': false*/}
  {/*  }}*/}
  {/*/>*/}
</>
