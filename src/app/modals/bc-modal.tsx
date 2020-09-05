import BCModalTransition from './bc-modal-transition';
import CloseIcon from '@material-ui/icons/Close';
import { Dispatch } from 'redux';
import { closeModalAction } from 'actions/bc-modal/bc-modal.action';
import { modalTypes } from '../../constants';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
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
        aria-labelledby={'responsive-dialog-title'}
        maxWidth={'lg'}
        onClose={handleClose}
        open={open}
        scroll={'paper'}
        TransitionComponent={BCModalTransition}>
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
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            : null
        }
        <DialogContent>
          {
            component
              ? component
              : null
          }
        </DialogContent>
        {
          data && data.removeFooter
            ? null
            : <DialogActions>
              <Button
                className={'cancel-button'}
                onClick={handleClose}
                variant={'contained'}>
                {'Cancel'}
              </Button>
              <Button
                className={'submit-button'}
                color={'primary'}
                // OnClick={submit}
                variant={'contained'}>
                {'Submit'}
              </Button>
            </DialogActions>
        }
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state: {}) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BCModal);
