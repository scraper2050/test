// Import * as Yup from 'yup';
import BCInput from 'app/components/bc-input/bc-input';
import styles from './bc-add-equipment-type-modal.styles';
import { useFormik } from 'formik';
import { DialogActions, DialogContent, Fab, Grid, withStyles } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import { saveEquipmentType } from 'api/equipment-type.api';
import { loadingEquipmentType, getEquipmentType } from 'actions/equipment-type/equipment-type.action';

function Alert(props: AlertProps) {
   return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function BCAddEquipmentTypeModal({
   classes
}: any): JSX.Element {
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);
   const [resultMsg, setResultMsg] = useState('');
   const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
   const onSubmit = (values: any, { setSubmitting }: any) => {
      setSubmitting(true);
      const brandType = new Promise(async (resolve, reject) => {
         const title = values.title;
         const savingBrandType = await saveEquipmentType({ title });
         savingBrandType.status === 1 ? resolve(savingBrandType) : reject(savingBrandType);
         if (savingBrandType.status === 0) {
            setOpen(true)
            setResultMsg(savingBrandType.message)
         } 
      });

      brandType
         .then(res => onSuccess())
         .catch(err => console.log(err))
         .finally(() => setSubmitting(false));
   }

   const form = useFormik({
      initialValues: {
         title: ''
      },
      onSubmit
   });

   const {
      errors: FormikErrors,
      values: FormikValues,
      handleChange: formikChange,
      handleSubmit: FormikSubmit,
      isSubmitting
   } = form;

   const closeModal = () => {
      dispatch(closeModalAction());
      setTimeout(() => {
         dispatch(setModalDataAction({
            'data': {},
            'type': ''
         }));
      }, 200);
   };

   const onSuccess = () => {
      dispatch(closeModalAction());
      dispatch(getEquipmentType());
      dispatch(loadingEquipmentType());
   }

   return (
      <form onSubmit={FormikSubmit}>
         <DialogContent classes={{ 'root': classes.dialogContent }}>
            <Grid
               container
               spacing={2}>
               <Grid
                  item
                  sm={6}
                  xs={12}
               >
                  <BCInput
                     handleChange={formikChange}
                     label={'Title'}
                     name={'title'}
                     value={FormikValues.title}
                  />
               </Grid>
            </Grid>
         </DialogContent>
         <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
               {resultMsg}
            </Alert>
         </Snackbar>
         <DialogActions classes={{
            'root': classes.dialogActions
         }}>
            <Fab
               aria-label={'create-job'}
               classes={{
                  'root': classes.fabRoot
               }}
               color={'secondary'}
               disabled={isSubmitting}
               onClick={() => closeModal()}
               variant={'extended'}>
               {'Cancel'}
            </Fab>
            <Fab
               aria-label={'create-job'}
               classes={{
                  'root': classes.fabRoot
               }}
               color={'primary'}
               disabled={isSubmitting}
               type={'submit'}
               variant={'extended'}>
               Submit
        </Fab>
         </DialogActions>
      </form>
   );
}
export default withStyles(
   styles,
   { 'withTheme': true }
)(BCAddEquipmentTypeModal);
