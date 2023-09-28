import { all } from 'redux-saga/effects';
import authFlow from './auth.saga';
import bcModalSaga from './bc-modal.saga';
import customersSaga from './customer.saga';
/*
 * Import jobSaga from './job.saga';
 * Import jobTypesSaga from './job-type.saga';
 */
import watchAllCompanyEquipmentsLoad from './company-equipment.saga';
import watchAllEmployeesLoad from './employee.saga';
import watchInvoiceItemsLoad from './items.saga';
import watchJobReportLoad from './job-report.saga';
import watchLoadServiceTicket from './service-ticket.saga';
import watchCompanyContractsLoad from './vendor.saga';
import watchNotifications from './notification.saga';
import watchSubscription from './subscriptions.saga';
import watchLoadInvoiceDetail from './invoice.saga';
import watchInvoiceLogsLoad from './logs.saga';
import watchQBAccountLoad from './qb-accounts.saga';
import watchEmailSend from './bc-email.saga';
import watchSalesTax from './sales-tax-saga';


export default function *rootSaga() {
  yield all([
    customersSaga(),
    // JobTypesSaga(),
    authFlow(),
    watchAllEmployeesLoad(),
    watchAllCompanyEquipmentsLoad(),
    watchCompanyContractsLoad(),
    watchJobReportLoad(),
    watchSubscription(),
    watchNotifications(),
    watchLoadServiceTicket(),
    watchInvoiceItemsLoad(),
    watchLoadInvoiceDetail(),
    watchEmailSend(),
    watchInvoiceLogsLoad(),
    watchQBAccountLoad(),
    watchSalesTax(),
    bcModalSaga()
  ]);
}
