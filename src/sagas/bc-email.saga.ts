import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import { emailJobReport } from 'api/job-report.api';
import { updateEmailHistory } from 'actions/customer/job-report/job-report.action';
import { sendEmailAction } from 'actions/email/email.action';
import { sendEmailInvoice } from 'api/invoicing.api';
import { updateInvoiceEmailHistory } from 'actions/invoicing/invoicing.action';


interface handleEmailProps {
    payload: {
        data: any;
        type: string;
        email: string;
    }
}

const emailTypes:any = {
  'invoice': {
    'api': sendEmailInvoice,
    'update': updateInvoiceEmailHistory
  },
  'jobReport': {
    'api': emailJobReport,
    'update': updateEmailHistory
  }
};


export function *handleEmail({ 'payload': { email, type, data } }:handleEmailProps) {
  try {
    const result = yield call(emailTypes[type].api, data);
    if(result.status !== 1){
      throw result.message
    }
    const id: string = data.id;
    yield put(sendEmailAction.success(result));
    yield put(updateEmailHistory({ email, id }));
  } catch (error) {
    yield put(sendEmailAction.fault(error.toString()));
  } finally {
    if (yield cancelled()) {
      yield put(sendEmailAction.cancelled());
    }
  }
}


export default function *watchEmailSend() {
  yield takeLatest(sendEmailAction.fetch, handleEmail);
}


