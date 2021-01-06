import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import SearchIcon from '@material-ui/icons/Search';
import styles from './bc-add-vendor-modal.styles';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Avatar, Card, CardHeader, DialogActions, DialogContent, Divider, Fab, IconButton, InputBase, Paper, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { callAddVendorAPI, callInviteVendarAPI, callSearchVendorAPI } from 'api/vendor.api';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { info, error } from 'actions/snackbar/snackbar.action';
import { getVendors, loadingVendors } from 'actions/vendor/vendor.action';

function BCAddVendorModal({
  classes
}: any): JSX.Element {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [contractors, setContractors] = useState<any>(null);
  const [resStatus, setResStatus] = useState<any>(null);
  
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
        callAddVendorAPI(tempData).then((response: any) => {
          if (response.status === 0) {
            dispatch(error(response.message));
          } else {
            dispatch(info(response.message));
            dispatch(closeModalAction());
            dispatch(loadingVendors());
            dispatch(getVendors());
            setTimeout(() => {
              dispatch(setModalDataAction({
                'data': {},
                'type': ''
              }));
            }, 200);
          }
            setSubmitting(false);
          
          // Dispatch(refreshVendor(true));          
        })
          .catch((err: any) => {
            setSubmitting(false);
            throw err;
          });
      } else {
        callInviteVendarAPI(tempData).then((response: any) => {
          // Dispatch(refreshServiceTickets(true));
          if (response.status === 0) {
            dispatch(error(response.message));
          } else {
            dispatch(info(response.message));
            dispatch(closeModalAction());
            setTimeout(() => {
              dispatch(setModalDataAction({
                'data': {},
                'type': ''
              }));
            }, 200);
          }
          setSubmitting(false);
        })
          .catch((err: any) => {
            setSubmitting(false);
            throw err;
          });
      }
    }
  });

  const searchVendor = () => {
    setLoading(true);
    callSearchVendorAPI({ 'email': FormikValues.email }).then((response: any) => {
      setContractors(response.contractors);
      setResStatus(response.status)
      setLoading(false);
    })
      .catch(err => {
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
                {resStatus === 0 && 
                <Typography
                  gutterBottom
                  variant={'subtitle1'}>
                  {'Please input valid email address'}
                </Typography>}
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
