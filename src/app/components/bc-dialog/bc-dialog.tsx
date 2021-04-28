
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import Slide from '@material-ui/core/Slide';

const Transition:any = React.forwardRef((props:any, ref:any) => {
  return <Slide
    direction={'up'}
    ref={ref}
    {...props}
  />;
});

export default function AlertDialogSlide({ cancelText, confirmText, confirmMethod, children, title, buttonText, ...props }:any) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    confirmMethod();
    setOpen(false);
  };

  return (
    <>
      <Button
        color={'primary'}
        onClick={handleClickOpen}
        {...props}>
        {buttonText}
      </Button>
      <Dialog
        aria-describedby={'alert-dialog-slide-description'}
        aria-labelledby={'alert-dialog-slide-title'}
        keepMounted
        onClose={handleClose}
        open={open}
        TransitionComponent={Transition}>
        <DialogTitle id={'alert-dialog-slide-title'}>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id={'alert-dialog-slide-description'}>
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}>
            {cancelText || 'Cancel'}
          </Button>
          <Button
            color={'secondary'}
            onClick={handleConfirm}>
            {confirmText || 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
