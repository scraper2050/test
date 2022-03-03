import BCSent from '../../components/bc-sent';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography, withStyles
} from '@material-ui/core';
import React, {useState} from 'react';
import {
  closeModalAction,
  setModalDataAction
} from 'actions/bc-modal/bc-modal.action';
import {useDispatch} from 'react-redux';
import styled from "styled-components";
import * as CONSTANTS from "../../../constants";
import styles from './bc-edit-commission-modal.styles';
import {updateCommissionAPI} from "../../../api/payroll.api";
import {error as snackError, success} from "../../../actions/snackbar/snackbar.action";
import {setContractor} from "../../../actions/payroll/payroll.action";
import {Contractor} from "../../../actions/payroll/payroll.types";

interface Props {
  classes: any;
  vendorCommission: Contractor;
}

function BcEditCommissionModal({
                                 classes,
                                 vendorCommission,
                               }: Props): JSX.Element {
  const [error, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [commission, setCommission] = useState<number>(vendorCommission.commission);
  const dispatch = useDispatch();


  const closeModal = () => {
    if (error) {
      setError(false);
      return;
    }
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const submit = async() => {
    const commissionInt = (commission);
    if (commissionInt < 1 || commissionInt >= 100) {
      setError(true);
      return;
    }
    setSubmitting(true);
    const params = {
      id: vendorCommission._id,
      type: vendorCommission.type,
      commission,
    }
    const contractor = await updateCommissionAPI(params);
    if (contractor.status === 0) {
      dispatch(snackError(contractor.message));
      setSubmitting(false);
    } else {
      dispatch(success(contractor.message));
      dispatch(setContractor(contractor.data));
      closeModal();
    }
  }

  return (
    <DataContainer className={'new-modal-design'}>
      <DialogContent classes={{'root': classes.dialogContent}}>
        {error ?
          <BCSent
            title={'Please enter an amount between 1 to 100 only.'}
            type={'error'}
            showLine={false}
          />
          :
          <Grid container direction={'column'} spacing={1}>
            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={3}>
                <Grid container item justify={'flex-end'} alignItems={'center'}
                      xs={3}>
                  <Typography variant={'button'}>NAME</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography
                    variant={'body2'}>{vendorCommission.vendor}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={3}>
                <Grid container item justify={'flex-end'} alignItems={'center'}
                      xs={3}>
                  <Typography variant={'button'}>COMMISSION</Typography>
                </Grid>
                <Grid item xs={9}
                      style={{display: 'flex', alignItems: 'center'}}>
                  <TextField
                    autoFocus
                    autoComplete={'off'}
                    className={classes.fullWidth}
                    id={'outlined-textarea'}
                    label={''}
                    name={'amount'}
                    onChange={(e: any) => setCommission(e.target.value)}
                    type={'number'}
                    value={commission}
                    variant={'outlined'}
                  />&nbsp; &nbsp;
                  <Typography
                    variant={'body2'}
                    style={{color: '#828282', fontSize: 14}}>% of Invoice
                    total</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={3}>
                <Grid container item justify={'flex-end'} alignItems={'center'}
                      xs={3}>
                  <Typography variant={'button'}>CONTACT</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography
                    variant={'body2'}>{vendorCommission.contact}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={3}>
                <Grid container item justify={'flex-end'} alignItems={'center'}
                      xs={3}>
                  <Typography variant={'button'}>EMAIL</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography
                    variant={'body2'}>{vendorCommission.email}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container direction={'row'} spacing={3}>
                <Grid container item justify={'flex-end'}
                      alignItems={'flex-start'} xs={3}>
                  <Typography variant={'button'}>PHONE</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography
                    variant={'body2'}>{vendorCommission.phone}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
      </DialogContent>

      <DialogActions classes={{
        'root': classes.dialogActions
      }}>
        <Button
          aria-label={'record-payment'}
          classes={{
            'root': classes.closeButton
          }}
          disabled={isSubmitting}
          onClick={() => closeModal()}
          variant={'outlined'}>
          {error ? 'Close' : 'Cancel'}
        </Button>

        {!error &&
        <Button
          disabled={isSubmitting}
          aria-label={'create-job'}
          classes={{
            root: classes.submitButton,
            disabled: classes.submitButtonDisabled
          }}
          color="primary"
          type={'submit'}
          variant={'contained'}
          onClick={() => submit()}
        >
          Save
        </Button>
        }

      </DialogActions>
    </DataContainer>
  );
}

const DataContainer = styled.div`
    margin: auto 0;
    .MuiGrid-container {
      padding: 10px 0;
    }
    .MuiFormLabel-root {
      font - style: normal;
      font-weight: normal;
      width: 800px;
      font-size: 20px;
      color: ${CONSTANTS.PRIMARY_DARK};
      /* margin-bottom: 6px; */
    }
    .MuiFormControl-marginNormal {
      margin - top: .5rem !important;
      margin-bottom: 1rem !important;
      /* height: 20px !important; */
    }
    .MuiInputBase-input {
      color: #383838;
      font-size: 16px;
      padding: 6px 14px;
    }
    .MuiInputAdornment-positionStart {
      margin - right: 0;
    }
    .MuiInputAdornment-root + .MuiInputBase-input {
      padding: 12px 14px 12px 0;
    }
    .MuiOutlinedInput-multiline {
      padding: 0;
    }
    .required > label:after {
      margin - left: 3px;
      content: "*";
      color: red;
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit - appearance: none;
    margin: 0;
  }

    /* Firefox */
    input[type=number] {
    -moz - appearance: textfield;
  }
`;

export default withStyles(
  styles,
  {'withTheme': true}
)(BcEditCommissionModal);
