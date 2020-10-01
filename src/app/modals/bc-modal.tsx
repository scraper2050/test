import BCAddVendorModal from './bc-add-vendor-modal/bc-add-vendor-modal';
import BCJobModal from './bc-job-modal/bc-job-modal';
import BCModalTransition from './bc-modal-transition';
import BCServiceTicketModal from 'app/modals/bc-service-ticket-modal/bc-service-ticket-modal';
import CloseIcon from '@material-ui/icons/Close';
import { closeModalAction } from 'actions/bc-modal/bc-modal.action';
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
        default:
          setComponent(null);
      }
    },
    [type]
  );
  const handleClose = () => {
    dispatch(closeModalAction());
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
            ? <DialogTitle>
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
