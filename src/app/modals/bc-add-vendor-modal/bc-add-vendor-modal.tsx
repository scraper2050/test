import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import SearchIcon from '@material-ui/icons/Search';
import styles from './bc-add-vendor-modal.styles';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Avatar, Card, CardHeader, DialogActions, DialogContent, Divider, Fab, IconButton, InputBase, Paper, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { callAddVendorAPI, callInviteVendarAPI, callSearchVendorAPI } from 'api/vendor.api';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';

function BCAddVendorModal({
  classes
}: any): JSX.Element {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [contractors, setContractors] = useState<any>(null);
  const {
    'values': FormikValues,
    'handleChange': formikChange,
    'handleSubmit': FormikSubmit,
    isSubmitting
  } = useFormik({
    // 'enableReinitialize': true,
    'initialValues': {
      'contractorId': '',
      'email': ''
    },
    'onSubmit': (values, { setSubmitting }) => {
      setSubmitting(true);
      const tempData = {
        ...values
      };
      if (contractors && contractors.length > 0) {
        tempData.contractorId = contractors[0]._id;
        console.log(tempData);
        callAddVendorAPI(tempData).then((response: any) => {
          // Dispatch(refreshVendor(true));
          console.log(response);
          dispatch(closeModalAction());
          setTimeout(() => {
            dispatch(setModalDataAction({
              'data': {},
              'type': ''
            }));
          }, 200);
          setSubmitting(false);
        })
          .catch((err: any) => {
            setSubmitting(false);
            throw err;
          });
      } else {
        console.log(tempData);
        callInviteVendarAPI(tempData).then((response: any) => {
          console.log(response);
          // Dispatch(refreshServiceTickets(true));
          dispatch(closeModalAction());
          setTimeout(() => {
            dispatch(setModalDataAction({
              'data': {},
              'type': ''
            }));
          }, 200);
          setSubmitting(false);
        })
          .catch((err: any) => {
            setSubmitting(false);
            throw err;
          });
      }
    }
    /*
     * 'validationSchema': Yup.object({
     *   'customer': Yup.string()
     *     .required('Customer is required'),
     *   'notes': Yup.string()
     *   // 'scheduleDate': Yup.string().required('Schedule date is required')
     * })
     */
  });

  const searchVendor = () => {
    setLoading(true);
    callSearchVendorAPI({ 'email': FormikValues.email }).then((response: any) => {
      console.log(response);
      setContractors(response.contractors);
      setLoading(false);
    })
      .catch(err => {
        console.log(err);
        setLoading(false);
        throw err;
      });
  };

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const contractorContent = contractors && contractors[0]
    ? <Card className={classes.card}>
      <CardHeader
        action={null}
        avatar={
          <Avatar
            aria-label={'avatar'}
            className={classes.blueAvatar}>
            {
              contractors[0].info.companyName.charAt(0)
            }
          </Avatar>
        }
        subheader={contractors[0].info.companyEmail}
        title={contractors[0].info.companyName}
      />
    </Card>
    : null;

  return (
    <form onSubmit={FormikSubmit}>
      <DialogContent classes={{ 'root': classes.dialogContent }}>
        <div>
          <Paper className={classes.formPaper}>
            <InputBase
              className={classes.formInput}
              inputProps={{ 'aria-label': 'search vendor' }}
              name={'email'}
              onChange={formikChange}
              placeholder={'Search Vendor'}
              type={'email'}
              value={FormikValues.email}
            />
            <Divider
              className={classes.formDivider}
              orientation={'vertical'}
            />
            <IconButton
              aria-label={'search'}
              className={classes.iconButton}
              onClick={() => {
                searchVendor();
              }}>
              <SearchIcon />
            </IconButton>
          </Paper>
          {
            isLoading
              ? <BCCircularLoader heightValue={'200px'} />
              : <div className={`${contractors && contractors.length > 0
                ? classes.contractorContent
                : classes.noContractorData}`}>
                {contractors
                  ? contractors.length > 0
                    ? contractorContent
                    : <Typography
                      gutterBottom
                      variant={'subtitle1'}>
                      {'This account is not found. Click on Invite to invite this user to BlueClerk'}
                    </Typography>
                  : null}
              </div>
          }
        </div>
      </DialogContent>
      <DialogActions classes={{
        'root': classes.dialogActions
      }}>
        {
          !contractors
            ? null
            : <>
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
                {contractors.length > 0
                  ? 'Authorize'
                  : 'Invite'}
              </Fab>
            </>
        }
      </DialogActions>
    </form>
  );
}
export default withStyles(
  styles,
  { 'withTheme': true }
)(BCAddVendorModal);
