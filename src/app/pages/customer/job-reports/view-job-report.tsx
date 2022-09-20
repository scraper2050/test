import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import BCJobReport from '../../../components/bc-job-report/bc-job-report';
import { loadJobReportActions } from 'actions/customer/job-report/job-report.action';
import {error as errorSnackBar, success} from "actions/snackbar/snackbar.action";
import { useParams, useHistory } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobTypesAPI } from 'api/job.api';
import { callCreateInvoiceAPI, getInvoiceDetail } from 'api/invoicing.api';
import {
  openModalAction,
  setModalDataAction
} from "../../../../actions/bc-modal/bc-modal.action";
import {modalTypes} from "../../../../constants";


function ViewJobReportsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { jobReportId } = useParams<any>();

  const { loading, jobReportObj, error } = useSelector(({ jobReport }: any) =>
    jobReport);
  const { 'loading': jobTypesLoading, data } = useSelector(({ jobTypes }: any) => jobTypes);

  useEffect(() => {
    dispatch(getAllJobTypesAPI());
    dispatch(loadJobReportActions.fetch({ jobReportId }));
  }, []);

  const generateInvoiceHandler = async(invoiceObj:any) => {
    dispatch(setModalDataAction({
      data: {
        modalTitle: 'Status',
        progress: true,
        removeFooter: false,
        className: 'serviceTicketTitle',
      },
      type: modalTypes.RECORD_SYNC_STATUS_MODAL,
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
    const response: any = await callCreateInvoiceAPI(invoiceObj);
    const {status, invoice: newInvoice, quickbookInvoice} = response;
    dispatch(setModalDataAction({
      data: {
        modalTitle: 'Status',
        keyword: 'Invoice',
        created: status === 1,
        synced: !!quickbookInvoice,
        closeAction: () => {
          dispatch(loadJobReportActions.success({ ...jobReportObj,
            'invoiceCreated': true,
            'invoice': newInvoice }));
          history.push({
            'pathname': `view/${newInvoice._id}`,
          });
        },
        removeFooter: false,
        className: 'serviceTicketTitle',
      },
      type: modalTypes.RECORD_SYNC_STATUS_MODAL,
    }));
    return response;
  }

  if (loading || jobTypesLoading) {
    return <BCCircularLoader heightValue={'200px'} />;
  }

  return <BCJobReport
    jobReportData={jobReportObj}
    jobTypes={data}
    generateInvoiceHandler={generateInvoiceHandler}
    getInvoiceDetailHandler={getInvoiceDetail}
  />;
}

export default ViewJobReportsPage;
