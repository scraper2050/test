import BCTabs from '../../../components/bc-tab/bc-tab';
import InvoicingListListing from './invoices-list-listing/invoices-list-listing';
import InvoicingDraftListing from './invoices-list-listing/invoices-draft-listing';
import InvoicingPaymentListing from './invoices-list-listing/payments-listing';
import SwipeableViews from 'react-swipeable-views';
import styles from './invoices-list.styles';
import { useHistory, useLocation } from 'react-router-dom';
import { Fab, useTheme, withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CSButton } from "../../../../helpers/custom";
import { useDispatch, useSelector } from 'react-redux';
import BCMenuToolbarButton from 'app/components/bc-menu-toolbar-button';
import { info } from 'actions/snackbar/snackbar.action';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { modalTypes } from '../../../../constants'
import { getCustomers } from 'actions/customer/customer.action'
// import { getInvoicingList } from "../../../../actions/invoicing/invoicing.action";
// import TableFilterService from "../../../../utils/table-filter";

// const getFilteredList = (state: any) => {
//   const sortedInvoices = TableFilterService.filterByDateDesc(state?.invoiceList.data);
//   return sortedInvoices.filter((invoice: any) => invoice?.isDraft);
// };

function InvoiceList({ classes }: any) {
  const dispatch = useDispatch();
  const [curTab, setCurTab] = useState(0);
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation<any>();
  // const invoiceList = useSelector(getFilteredList);
  const totalDraft = useSelector(({invoiceList}:any) => invoiceList.totalDraft);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const openCreateInvoicePage = () => {
    history.push('/main/invoicing/create-invoice');
/*    history.push({
      'pathname': `/main/invoicing/edit/0`,
/!*      'state': {
        'customerId': invoiceDetail.customer?._id,
        'customerName': invoiceDetail.customer?.profile?.displayName,
        'invoiceId': invoiceDetail?._id,
        'jobType': invoiceDetail.job?.type?._id,
        'invoiceDetail': invoiceDetail
      }*!/
    });*/
  };

  // useEffect(() => {
  //   dispatch(getInvoicingList());
  // }, []);
  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  useEffect(() => {
    if(location?.state?.tab !== undefined){
      setCurTab(location.state.tab);
    } 
  }, [location]);

  const items = [
    {title:'Custom Invoice', id:0},
    // {title:'Payment', id:1},
    {title:'Bulk Payment', id:2},
  ];

  const handleMenuToolbarListClick = (e: any, id: number) => {
    switch (id) {
      case 0:
        openCreateInvoicePage();
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
      default:
        dispatch(info('This feature is still under development!'));
    }
  }

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
        <BCTabs
            curTab={curTab}
            indicatorColor={'primary'}
            onChangeTab={handleTabChange}
            // chip={true}
            tabsData={[
              {
                'label': 'Invoices',
                'value': 0
              },
              {
                'label': 'Drafts',
                'value': 1,
                'chip': true,
                'chipValue': totalDraft
              },
              {
                'label': 'Payments',
                'value': 2,
              },
            ]}
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
            <InvoicingListListing hidden={curTab !== 0} id={"0"} />
            <InvoicingDraftListing hidden={curTab !== 1} id={"1"} />
            <InvoicingPaymentListing hidden={curTab !== 2} id={"2"} />
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles, { 'withTheme': true })(InvoiceList);
