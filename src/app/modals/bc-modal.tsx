import BCAddVendorModal from './bc-add-vendor-modal/bc-add-vendor-modal';
import BCJobModal from './bc-job-modal/bc-job-modal';
import BCModalTransition from './bc-modal-transition';
import BCServiceTicketModal from './bc-service-ticket-modal/bc-service-ticket-modal';
import BCAddBrandsModal from './bc-add-brands-modal/bc-add-brands-modal';
import BCAddJobTypeModal from './bc-add-job-type-modal/bc-add-job-type-modal';
import BCAddEquipmentTypeModal from './bc-add-equipment-type-modal/bc-add-equipment-type-modal';
import BCAddJobSiteModal from './bc-add-jobsite-modal/bc-add-jobsite-modal';
import BCEditCutomerInfoModal from './bc-customer-info-modal/bc-customer-info-modal';
import CloseIcon from '@material-ui/icons/Close';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { modalTypes } from '../../constants';
import {
  Dialog,
  DialogTitle,
  IconButton,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const BCTermsContent = React.lazy(() => import('../components/bc-terms-content/bc-terms-content'));

interface BCModal {
}

interface RootState {
  modal: {
    open: boolean,
    data: any,
    type: string
  }
}
function BCModal() {
  const [component, setComponent] = useState<any>(null);
  const [modalOptions, setModalOptions] = useState<any>({
    'fullWidth': true,
    'maxWidth': 'md' // Xs, sm, md, lg, xl
  });
  const dispatch = useDispatch();
  const open = useSelector(({ modal }: RootState) => modal.open);
  const data = useSelector(({ modal }: RootState) => modal.data);
  const type = useSelector(({ modal }: RootState) => modal.type);

  useEffect(
    () => {
      switch (type) {
        case modalTypes.TERMS_AND_CONDITION_MODAL:
          setComponent(<BCTermsContent />);
          break;
        case modalTypes.CREATE_TICKET_MODAL:
          setModalOptions({
            'disableBackdropClick': true,
            'disableEscapeKeyDown': true,
            'fullWidth': true,
            'maxWidth': 'xs'
          });
          setComponent(<BCServiceTicketModal />);
          break;
        case modalTypes.EDIT_TICKET_MODAL:
          setModalOptions({
            'disableBackdropClick': true,
            'disableEscapeKeyDown': true,
            'fullWidth': true,
            'maxWidth': 'xs'
          });
          setComponent(<BCServiceTicketModal ticket={data.ticketData} />);
          break;
        case modalTypes.CREATE_JOB_MODAL:
          setModalOptions({
            'disableBackdropClick': true,
            'disableEscapeKeyDown': true,
            'fullWidth': true,
            'maxWidth': 'sm'
          });
          setComponent(<BCJobModal />);
          break;
        case modalTypes.EDIT_JOB_MODAL:
          setModalOptions({
            'disableBackdropClick': true,
            'disableEscapeKeyDown': true,
            'fullWidth': true,
            'maxWidth': 'sm'
          });
          setComponent(<BCJobModal job={data.job} />);
          break;
        case modalTypes.ADD_VENDOR_MODAL:
          setModalOptions({
            'disableBackdropClick': true,
            'disableEscapeKeyDown': true,
            'fullWidth': true,
            'maxWidth': 'xs'
          });
          setComponent(<BCAddVendorModal />);
          break;
        case modalTypes.ADD_BRAND:
          setModalOptions({
            'disableBackdropClick': true,
            'disableEscapeKeyDown': true,
            'fullWidth': true,
            'maxWidth': 'xs'
          });
          setComponent(<BCAddBrandsModal />);
          break;
        case modalTypes.ADD_JOB_TYPE:
          setModalOptions({
            'disableBackdropClick': true,
            'disableEscapeKeyDown': true,
            'fullWidth': true,
            'maxWidth': 'xs'
          });
          setComponent(<BCAddJobTypeModal />);
          break;
        case modalTypes.ADD_EQIPMENT_TYPE:
          setModalOptions({
            'disableBackdropClick': true,
            'disableEscapeKeyDown': true,
            'fullWidth': true,
            'maxWidth': 'xs'
          });
          setComponent(<BCAddEquipmentTypeModal />);
        case modalTypes.ADD_JOB_SITE:
          setModalOptions({
              'disableBackdropClick': true,
              'disableEscapeKeyDown': true,
              'fullWidth': true,
              'maxWidth': 'md'
            });
            setComponent(<BCAddJobSiteModal jobSiteInfo={data.customerObj}/>);
          break;
        case modalTypes.EDIT_CUSTOMER_INFO:
          setModalOptions({
              'disableBackdropClick': true,
              'disableEscapeKeyDown': true,
              'fullWidth': true,
              'maxWidth': 'sm'
            });
            setComponent(<BCEditCutomerInfoModal customerInfo={data.customerObj}/>);
          break;
        default:
          setComponent(null);
      }
    },
    [type]
  );
  const handleClose = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  return (
    <div className={'modal-wrapper'}>
      <Dialog
        TransitionComponent={BCModalTransition}
        aria-labelledby={'responsive-dialog-title'}
        disableBackdropClick={modalOptions.disableBackdropClick}
        disableEscapeKeyDown={modalOptions.disableEscapeKeyDown}
        fullWidth={modalOptions.fullWidth}
        maxWidth={modalOptions.maxWidth}
        onClose={handleClose}
        open={open}
        scroll={'paper'}>
        {
          data && data.modalTitle !== ''
            ? <DialogTitle disableTypography>
              <Typography
                variant={'h6'}>
                {data.modalTitle}
              </Typography>
              <IconButton
                aria-label={'close'}
                onClick={handleClose}
                style={{
                  'position': 'absolute',
                  'right': 1,
                  'top': 1
                }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            : null
        }
        {
          component
            ? component
            : null
        }
      </Dialog>
    </div>
  );
}


export default BCModal;
