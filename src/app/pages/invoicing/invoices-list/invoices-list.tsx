import BCTabs from '../../../components/bc-tab/bc-tab';
import InvoicingListListing from './invoices-list-listing/invoices-list-listing';
import InvoicingDraftListing from './invoices-list-listing/invoices-draft-listing';
import InvoicingPaymentListing from './invoices-list-listing/payments-listing';
import SwipeableViews from 'react-swipeable-views';
import styles from './invoices-list.styles';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, CircularProgress, Fab, Grid, useTheme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BCMenuToolbarButton from 'app/components/bc-menu-toolbar-button';
import { info, warning } from 'actions/snackbar/snackbar.action';
import { closeModalAction, openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { modalTypes } from '../../../../constants'
import { getCustomers } from 'actions/customer/customer.action'
import { Sync as SyncIcon, InsertDriveFile } from '@material-ui/icons';
import InvoicingUnpaidListing
  from "./invoices-list-listing/invoices-unpaid-listing";
import { RootState } from "../../../../reducers";
import { ISelectedDivision } from 'actions/filter-division/fiter-division.types';
import { Can, ability } from 'app/config/Can';
import BCMenuButton from 'app/components/bc-menu-more';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { exportInvoicesToExcel } from 'api/invoicing.api';
import { initialAdvanceFilterInvoiceState } from 'reducers/advance-filter.reducer';

function InvoiceList({ classes }: any) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<any>();

  const [curTab, setCurTab] = useState(location?.state?.tab || 0);
  const theme = useTheme();

  const currentDivision: ISelectedDivision = useSelector((state: any) => state.currentDivision);

  const [visibleTabs, setVisibleTabs] = useState<number[]>([0])
  const { loading, totalDraft, unSyncedInvoicesCount } = useSelector(({ invoiceList }: any) => invoiceList);
  const { loading: loadingPayment, unSyncPaymentsCount } = useSelector(({ paymentList }: RootState) => (paymentList)
  );
  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
    if (visibleTabs.indexOf(newValue) === -1) setVisibleTabs([...visibleTabs, newValue]);
    history.replace({ ...history.location, state: { ...history.location.state, tab: newValue } })
  };

  const openCreateInvoicePage = () => {
    history.push('/main/invoicing/create-invoice');
  };
  const [exportLoading, setExportLoading] = useState(false);
  //Get Invoices property
  const { total, currentPageIndex, currentPageSize, keyword } = useSelector(
    ({ invoiceList }: any) => ({
      prevCursor: invoiceList.prevCursor,
      nextCursor: invoiceList.nextCursor,
      total: invoiceList.total,
      currentPageIndex: invoiceList.currentPageIndex,
      currentPageSize: invoiceList.currentPageSize,
      keyword: invoiceList.keyword,
    })
  );
  const advanceFilterInvoiceData: any = useSelector(({ advanceFilterInvoiceState }: any) => advanceFilterInvoiceState);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  useEffect(() => {
    if (location?.state?.tab !== undefined) {
      setCurTab(location.state.tab);
    }
  }, [location]);

  const items = [
    { title: 'Send Invoices', id: 3 },
    { title: 'Custom Invoice', id: 0 },
    // {title:'Payment', id:1},
    { title: 'Bulk Payment', id: 2 },
  ];

  const handleMenuToolbarListClick = (e: any, id: number) => {
    switch (id) {
      case 0:
        //To ensure that all invoices are detected by the division, and check if the user has activated the division feature.
        if ((currentDivision.isDivisionFeatureActivated && currentDivision.data?.name != "All") || !currentDivision.isDivisionFeatureActivated) {
          openCreateInvoicePage();
        } else {
          dispatch(warning("Please select a division before creating an invoice."));
        }
        break;
      case 2:
        dispatch(setModalDataAction({
          'data': {
            'modalTitle': 'Bulk Payment',
            'removeFooter': false,
            'className': 'serviceTicketTitle',
          },
          'type': modalTypes.BULK_PAYMENT_MODAL
        }));
        setTimeout(() => {
          dispatch(openModalAction());
        }, 200);
        break;
      case 3:
        dispatch(setModalDataAction({
          'data': {
            'modalTitle': 'Send Invoices',
            'removeFooter': false,
            'className': 'serviceTicketTitle',
          },
          'type': modalTypes.SEND_INVOICES_MODAL
        }));
        setTimeout(() => {
          dispatch(openModalAction());
        }, 200);
        break;
      default:
        dispatch(info('This feature is still under development!'));
    }
  }

  const INITIAL_ITEMS = [
    { id: 1, title: 'Export' },
  ]

  const handleMenuButtonClick = (event: any, id: number) => {
    event.stopPropagation();
    const action = () => {
      setExportLoading(true);
      exportInvoicesToExcel(total, currentPageIndex, keyword, advanceFilterInvoiceData, currentDivision.params, false).then(({ data, fileName }: { data: Blob, fileName: string }) => {
        const h = 0;
        const href = window.URL.createObjectURL(data);
        const anchorElement = document.createElement('a');
        anchorElement.href = href;
        anchorElement.download = fileName;

        document.body.appendChild(anchorElement);
        anchorElement.click();

        document.body.removeChild(anchorElement);
        window.URL.revokeObjectURL(href);
        setExportLoading(false);
      }).catch((error: any) => {
        setExportLoading(false);
      });

      dispatch(closeModalAction());
      setTimeout(() => {
        dispatch(setModalDataAction({
          'data': {},
          'type': ''
        }));
      }, 200);
    }

    const content = JSON.stringify(initialAdvanceFilterInvoiceState) !== JSON.stringify(advanceFilterInvoiceData)
    if (!keyword && !content) {
      dispatch(setModalDataAction({
        'data': {
          'message': 'Are you sure you want to export all invoices?',
          'action': action,
        },
        'type': modalTypes.WARNING_MODAL_V2
      }));
      setTimeout(() => {
        dispatch(openModalAction());
      }, 200);
    } else {
      action();
    }
  }


  const SyncButton = () => {
    switch (curTab) {
      case 1:
        const isSyncDisabled = unSyncedInvoicesCount === 0;
        return !loading ?
          <div className={classes.containerToolbar}>
            <div className={classes.exportButton}>
              <InsertDriveFile />
              <span className={classes.exportButtonLabel}>Export</span>
              {exportLoading ? (
                <CircularProgress size={17} />
              ) : ( 
                <BCMenuButton
                  icon={MoreHorizIcon}
                  items={INITIAL_ITEMS}
                  handleClick={handleMenuButtonClick}
                />
              )}
            </div>
            <Button
              variant='outlined'
              startIcon={<SyncIcon />}
              disabled={isSyncDisabled}
              classes={{
                root: classes.syncButton,
                disabled: classes.disabledButton,
                startIcon: isSyncDisabled ? classes.buttonIconDisabled : classes.buttonIcon,
              }}
              onClick={manualSyncHandle}>
              {isSyncDisabled ? 'All Invoices Synced' : `Invoices Not Synced ${unSyncedInvoicesCount}`}
            </Button>
          </div>
          : null
      case 3:
        const isSyncPaymentDisabled = unSyncPaymentsCount === 0;
        return  !loadingPayment ? <Button
          variant='outlined'
          startIcon={<SyncIcon />}
          disabled={isSyncPaymentDisabled}
          classes={{
            root: classes.syncPaymentButton,
            disabled: classes.disabledButton,
            startIcon: isSyncPaymentDisabled ? classes.buttonIconDisabled : classes.buttonIcon,
          }}
          onClick={manualSyncHandle}>
          {isSyncPaymentDisabled ? 'All Payments Synced' : `Payments Not Synced ${unSyncPaymentsCount}`}
        </Button> : null
      default:
        return null;
    }


  }

  const manualSyncHandle = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': `Sync ${curTab === 1 ? 'Invoices' : 'Payments'}`,
        'removeFooter': false,
        'className': 'serviceTicketTitle',
      },
      'type': curTab === 1 ? modalTypes.MANUAL_SYNC_MODAL_INVOICES : modalTypes.MANUAL_SYNC_MODAL_PAYMENTS
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const invoicesTab = [
    {
      'label': 'Unpaid',
      'value': 0
    },
    {
      'label': 'Invoices',
      'value': 1
    },
    {
      'chip': true,
      'chipValue': totalDraft,
      'label': 'Drafts',
      'value': 2
    }
  ];

  const paymentsTabs = [
    {
      'label': 'Payments',
      'value': 3
    }
  ];

  const tabs = [
    ...ability.can('manage', 'Invoicing')
      ? invoicesTab
      : [],
    ...ability.can('manage', 'CustomerPayments')
      ? paymentsTabs
      : []
  ];

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          <SyncButton />
          <BCTabs
            curTab={curTab}
            indicatorColor={'primary'}
            onChangeTab={handleTabChange}
            // Chip={true}
            tabsData={tabs}
          />
          <div className={classes.addButtonArea}>
            {/* <CSButton
              aria-label={'new-ticket'}
              color={'primary'}
              onClick={() => openCreateInvoicePage()}
              variant={'contained'}>
              {'Custom Invoice'}
            </CSButton> */}
            <BCMenuToolbarButton
              buttonText='More Actions'
              items={items}
              handleClick={handleMenuToolbarListClick}
            />
          </div>
          <SwipeableViews
            axis={
              theme.direction === 'rtl'
                ? 'x-reverse'
                : 'x'}
            index={curTab}>
            {(visibleTabs.indexOf(0) >= 0 || curTab === 0) ?
              <InvoicingUnpaidListing hidden={curTab !== 0} id={"0"} /> : <div />
            }
            {(visibleTabs.indexOf(1) >= 0 || curTab === 1) ?
              <InvoicingListListing hidden={curTab !== 1} id={"1"} /> : <div />
            }
            {(visibleTabs.indexOf(2) >= 0 || curTab === 2) ?
              <InvoicingDraftListing hidden={curTab !== 2} id={"2"} /> : <div />
            }
            {(visibleTabs.indexOf(3) >= 0 || curTab === 3) ?
              <InvoicingPaymentListing hidden={curTab !== 3} id={"3"} /> : <div />
            }
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles, { 'withTheme': true })(InvoiceList);
