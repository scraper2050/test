import {
  DialogActions,
  Button, withStyles, Checkbox,
} from '@material-ui/core';
import React, {useState} from 'react';
import {closeModalAction, setModalDataAction} from 'actions/bc-modal/bc-modal.action';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import styles from './bc-manual-sync-modal.styles';
import BCTableContainer
  from "../../components/bc-table-container/bc-table-container";
import {formatDatTimelll} from "../../../helpers/format";
import BCQbSyncStatus
  from "../../components/bc-qb-sync-status/bc-qb-sync-status";


function BcManualSync({classes, message, subMessage, action, closeAction}: any): JSX.Element {
  const dispatch = useDispatch();
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const {data: invoiceList} = useSelector(({invoiceList}: any) => invoiceList);

  const closeModal = () => {
    if(closeAction) {
      dispatch(closeAction);
    } else {
      dispatch(closeModalAction());
      setTimeout(() => {
        dispatch(setModalDataAction({
          'data': {},
          'type': ''
        }));
      }, 200);
    }
  };

  const confirm = () => {
    dispatch(action);
    setTimeout(() => {
      dispatch(closeModalAction());
      setTimeout(() => {
        dispatch(setModalDataAction({
          'data': {},
          'type': ''
        }));
      }, 200);
    }, 1000);
  }

  const columns: any = [
    {
      'Header': 'Invoice ID',
      'accessor': 'invoiceId',
      'className': 'font-bold',
      'sortable': true,
      Cell({ row }: any) {
        return <div className={classes.totalNumber}>
          <Checkbox
            color="primary"
            classes={{root: classes.checkbox}}
            checked={selectedIndexes.indexOf(row.index) >= 0}
          />
          <span>
            {row.original.invoiceId}
          </span>
        </div>;
      },
    },
    {
      'Header': 'Job ID',
      'accessor': 'job.jobId',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Customer',
      'accessor': 'customer.profile.displayName',
      'className': 'font-bold',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return <div className={classes.totalNumber}>

          <span>
            {`$${row.original.total}` || 0}
          </span>
        </div>;
      },
      'accessor': 'total',
      'Header': 'Total',
      'sortable': true,
      'width': 20
    },
    // { Cell({ row }: any) {
    //     const { status = '' } = row.original;
    //     const textStatus = status.split('_').join(' ').toLowerCase();
    //     return (
    //       <div className={customStyles.centerContainer}>
    //         <BCMenuButton status={status}  handleClick={(e, id) => handleMenuButtonClick(e, id, row.original)}/>
    //       </div>
    //     )
    //   },
    //   'Header': 'Payment Status',
    //   'accessor': 'paid',
    //   'className': 'font-bold',
    //   'sortable': true,
    //   'width': 10
    // },
    { Cell({ row }: any) {
        return row.original.lastEmailSent
          ? formatDatTimelll(row.original.lastEmailSent)
          : 'N/A';
      },
      'Header': 'Last Email Send Date ',
      'accessor': 'lastEmailSent',
      'className': 'font-bold',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return row.original.createdAt
          ? formatDatTimelll(row.original.createdAt)
          : 'N/A';
      },
      'Header': 'Invoice Date',
      'accessor': 'createdAt',
      'className': 'font-bold',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return (
          <BCQbSyncStatus data={row.original} />
        );
      },
      'Header': 'Integrations',
      'id': 'qbSync',
      'sortable': false,
      'width': 30
    },
  ];

  const handleRowClick = (event: any, row: any) => {
    const found = selectedIndexes.indexOf(row.index);
    const newList = [...selectedIndexes];
    if (found >= 0) {
      newList.splice(found, 1)
      setSelectedIndexes(newList);
    } else {
      newList.push(row.index);
      setSelectedIndexes(newList);
    }
  };

  return (
    <DataContainer>
      <BCTableContainer
        columns={columns}
        isLoading={false}
        onRowClick={handleRowClick}
        tableData={invoiceList}
        //toolbarPositionLeft={true}
        // manualPagination
        // fetchFunction={(num: number, isPrev:boolean, isNext:boolean, query :string) =>
        //   dispatch(getAllInvoicesAPI(num || currentPageSize, isPrev ? prevCursor : undefined, isNext ? nextCursor : undefined, query === '' ? '' : query || keyword, selectionRange))
        // }
        // total={total}
        // currentPageIndex={currentPageIndex}
        // setCurrentPageIndexFunction={(num: number) => dispatch(setCurrentPageIndex(num))}
        // currentPageSize={currentPageSize}
        // setCurrentPageSizeFunction={(num: number) => dispatch(setCurrentPageSize(num))}
        // setKeywordFunction={(query: string) => dispatch(setKeyword(query))}
        // disableInitialSearch={location?.state?.tab !== 0}
      />



      <DialogActions classes={{
        'root': classes.dialogActions
      }}>
        <Button
          aria-label={'record-payment'}
          classes={{
            'root': classes.closeButton
          }}
          onClick={() => closeModal()}
          variant={'outlined'}>
          Cancel
        </Button>

        <Button
          aria-label={'create-job'}
          disabled={selectedIndexes.length === 0}
          classes={{
            root: classes.submitButton,
            disabled: classes.submitButtonDisabled
          }}
          color="primary"
          onClick={() => confirm()}
          variant={'outlined'}>
          Sync Manually
        </Button>

      </DialogActions>
    </DataContainer >
  );
}

const DataContainer = styled.div`
  margin: auto 0;
  padding: 0 30px;
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(BcManualSync);
