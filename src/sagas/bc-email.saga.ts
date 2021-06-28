import { call, cancelled, put, takeLatest } from 'redux-saga/effects';
import { emailJobReport } from 'api/job-report.api';
import { updateEmailHistory } from 'actions/customer/job-report/job-report.action';
import { sendEmailAction } from 'actions/email/email.action';
import { sendEmailInvoice } from 'api/invoicing.api';
import { updateInvoiceEmailHistory } from 'actions/invoicing/invoicing.action';


interface handleEmailProps {
    payload: {
        id: string;
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


export function *handleEmail({ 'payload': { id, email, type } }:handleEmailProps) {
  try {
    const result = yield call(emailTypes[type].api, id);
    yield put(sendEmailAction.success(result));
    yield put(updateEmailHistory({ email,
      id
    }));
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


