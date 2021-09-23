// Import * as Yup from 'yup';
import BCInput from 'app/components/bc-input/bc-input';
import styles from './bc-add-job-type-modal.styles';
import { useFormik } from 'formik';
import {Button, DialogContent, Grid, withStyles} from '@material-ui/core';
import React, { useState } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { info, error } from 'actions/snackbar/snackbar.action';
import { useDispatch } from 'react-redux';
import {editJobType, getAllJobTypesAPI, saveJobType} from 'api/job.api';

function BCAddJobTypeModal({
   jobType,
   classes
}: any): JSX.Element {
   const dispatch = useDispatch();

   const onSubmit = (values: any, { setSubmitting }: any) => {
      setSubmitting(true);
      const newJobType = new Promise(async (resolve, reject) => {
         const savingJobType = jobType ?
           await editJobType({jobTypeId: jobType._id, ...values })
           :
           await saveJobType({ ...values });
         savingJobType.status === 1 ? resolve(savingJobType) : reject(savingJobType);
         if (savingJobType.status === 0) {
            dispatch(error(savingJobType.message));
          } else {
            dispatch(info(savingJobType.message));
          }
      });

      newJobType
         .then(res => onSuccess())
         .catch(err => console.log(err))
         .finally(() => setSubmitting(false));
   }

   const form = useFormik({
      initialValues: {
         title: jobType?.title,
         description: jobType?.description,
      },
      onSubmit,
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
      closeModal();
      dispatch(getAllJobTypesAPI());
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
                     required
                     label={'Title'}
                     name={'title'}
                     value={FormikValues.title}
                  />
               </Grid>
               <Grid
                 item
                 sm={6}
                 xs={12}
               >
                  <BCInput
                     handleChange={formikChange}
                     label={'Description'}
                     name={'description'}
                     value={FormikValues.description}
                  />
               </Grid>
            </Grid>
         </DialogContent>
         <div className={classes.dialogActions}>
           <Button
             color={'primary'}
             classes={{
               'root': classes.buttonSubmit
             }}
             type={'submit'}
             variant={'contained'}>
             {jobType ? 'Update' : 'Add'}
           </Button>
         </div>
      </form>
   );
}
export default withStyles(
   styles,
   { 'withTheme': true }
)(BCAddJobTypeModal);
