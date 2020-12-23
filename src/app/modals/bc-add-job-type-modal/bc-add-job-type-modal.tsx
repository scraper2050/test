// Import * as Yup from 'yup';
import BCInput from 'app/components/bc-input/bc-input';
import styles from './bc-add-job-type-modal.styles';
import { useFormik } from 'formik';
import { DialogActions, DialogContent, Fab, Grid, Typography } from '@material-ui/core';
import { Theme, makeStyles, withStyles } from '@material-ui/core/styles';

import React, {useEffect, useState} from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from "react-redux";
import { getAllJobTypesAPI, saveJobType } from 'api/job.api';

const useStyles = makeStyles(theme => ({
   'errorMsg': {
       'padding-left': '24px'
   }
 }));

function BCAddJobTypeModal({
   classes
}: any): JSX.Element {
   const dispatch = useDispatch();
   const jobTypesList = useSelector((state: any) => state.jobTypes);
   const [existJobType, setExistJobType] = useState(false)
   const onSubmit = (values: any, { setSubmitting }: any) => {
      setSubmitting(true);
      let result = []
      if (jobTypesList.data.length !== 0) {
         result = jobTypesList.data.filter((jobtype : any) => jobtype.title.toLowerCase() === values.title.toLowerCase())
      }
      if (result.length === 0) {
         setExistJobType(false)
         const jobType = new Promise(async (resolve, reject) => {
            const title = values.title;
            const savingJobType = await saveJobType({ title });
            savingJobType.status === 1 ? resolve(savingJobType) : reject(savingJobType);
         });

         jobType
            .then(res => onSuccess())
            .catch(err => console.log(err))
            .finally(() => setSubmitting(false));
      } else {
         setExistJobType(true)
         setSubmitting(false)
      }
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
      dispatch(getAllJobTypesAPI());
   }
   const classStyle = useStyles();
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
         {existJobType && <Typography
            gutterBottom
            variant={'subtitle1'}
            color={'error'}
            className={classStyle.errorMsg}>
            {`This Job Type already exists`}
         </Typography>}
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
)(BCAddJobTypeModal);
