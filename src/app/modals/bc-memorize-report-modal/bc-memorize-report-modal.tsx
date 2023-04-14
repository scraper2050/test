import React, { useState } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  withStyles,
  FormControl,
  InputLabel,
  InputBase
} from '@material-ui/core';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import styles from './bc-memorize-report-modal.styles';
import * as CONSTANTS from "../../../constants";
import { createMemorizedReport, updateMemorizedReport } from 'api/reports.api'
import { error as SnackBarError } from 'actions/snackbar/snackbar.action';

const componentModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    bcButton: {
      border: '1px solid #4F4F4F',
      borderRadius: '8px',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      color: '#4F4F4F',
      padding: '8px 16px',
    },
    // custom input
    formField: {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    bootstrapRoot: {
      'label + &': {
        marginTop: 0,
        display: 'flex',
        minWidth: '67%'
      },
    },
    bootstrapInput: {
      color: '#4F4F4F!important',
      fontWeight: 'normal',
      borderRadius: 8,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #E0E0E0',
      fontSize: 14,
      width: '100%',
      padding: '12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 8,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    bootstrapFormLabel: {
      fontSize: 14,
      textTransform: 'uppercase',
      transform: 'none',
      marginRight: 20,
      color: CONSTANTS.INVOICE_HEADING,
      position: 'relative',
      fontStyle: 'normal',
      fontWeight: 500,
      lineHeight: '16px',
      textAlign: 'right',
      minWidth: '15%'
    },
    container: {
      height: '40vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: '#4F4F4F',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    subtitle: {
      color: '#4F4F4F',
      fontSize: 14,
      textAlign: 'center',
    },
    link: {
      fontSize: 14,
      textDecoration: 'underlined',
      color: '#00AAFF',
      cursor: 'pointer',
    },
  }),
);

function BCMemorizeReportModal({ classes, data }: any) {
  const componentStyles = componentModalStyles()
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [reportName, setReportName] = useState(data.name || '')
  const [isSuccess, setIsSuccess] = useState(false);

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const handleMemorizeReport = async () => {
    setIsLoading(true);
    let paramObject:any = {};
    if(data._id){
      paramObject.name = reportName;
      paramObject.memorizedReportId = data._id;
      paramObject.customerIds = data.customerIds;
      paramObject.reportType = data.reportType;
      paramObject.reportData = data.reportData;
      paramObject.reportSource = data.reportSource;
      if(data.periodOption){
        paramObject.periodOption = data.periodOption;
      } else if(data.startDate && data.endDate){
        paramObject.startDate = data.startDate;
        paramObject.endDate = data.endDate;
      }
    } else {
      paramObject = {...data, name: reportName}
    }
    const request = data._id ? updateMemorizedReport : createMemorizedReport;
    const result = await request(paramObject);
    if (result.status === 1) {
      setIsSuccess(true);
      setIsLoading(false);
    } else {
      dispatch(SnackBarError(`Something went wrong`));
      setIsLoading(false);
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setReportName(e.target.value);
  }

  const handleMemorizedLinkClick = () => {
    history.push({
      'pathname': `/main/reports/revenue`,
      'state': {
        tab: 1,
      }
    });
    closeModal();
  }

  return <DataContainer>
    <hr style={{ height: '1px', background: '#D0D3DC', borderWidth: '0px' }} />

    {isSuccess ? (
      <DialogContent classes={{ 'root': classes.dialogContent }}>
        <div className={componentStyles.container}>
          <CheckCircleIcon style={{ color: CONSTANTS.PRIMARY_GREEN, fontSize: 100 }} />
          <br />
          <span className={componentStyles.title}>{'Your Memorized Report Was Saved'}</span>
          <br /><br />
          <div>
            <span className={componentStyles.subtitle} style={{marginRight: 5}}>{'You can view this report in the'}</span>
            <span className={componentStyles.link} onClick={handleMemorizedLinkClick}>Memorized</span>
            <span className={componentStyles.subtitle} style={{marginLeft: 5}}>{'tab.'}</span>
          </div>
        </div>
      </DialogContent>
    ) : (
      <DialogContent classes={{ 'root': classes.dialogContent }}>
        <div style={{ minHeight: 191, paddingTop: 36 }}>
          <FormControl className={componentStyles.formField}>
            <InputLabel disableAnimation htmlFor="name" className={componentStyles.bootstrapFormLabel}>
              Name
            </InputLabel>
            <InputBase
              id="name"
              name="name"
              value={reportName}
              onChange={handleNameChange}
              placeholder={'Report Name'}
              classes={{
                root: componentStyles.bootstrapRoot,
                input: componentStyles.bootstrapInput,
              }}
            />
          </FormControl>
        </div>
      </DialogContent>
    )}

    <hr style={{ height: '1px', background: '#D0D3DC', borderWidth: '0px' }} />
    <DialogActions classes={{
      'root': classes.dialogActions
    }}>
      <Grid
        container
        justify={'space-between'}>
        <Grid item />
        <Grid item>
          <Button
            disabled={isLoading}
            aria-label={'cancel'}
            classes={{
              'root': classes.closeButton
            }}
            onClick={!isSuccess ? closeModal : handleMemorizedLinkClick}
            variant={'outlined'}>
            {isSuccess ? 'Close' : 'Cancel'}
          </Button>
          {!isSuccess && (<Button
            disabled={!reportName || isLoading}
            aria-label={'memorize-report'}
            classes={{
              root: classes.submitButton,
              disabled: classes.submitButtonDisabled
            }}
            color="primary"
            onClick={handleMemorizeReport}
            variant={'contained'}>
            Save
          </Button>)}
        </Grid>
      </Grid>
    </DialogActions>
  </DataContainer>;
}


const DataContainer = styled.div`
  margin: auto 0;
`;

export default withStyles(
  styles,
  { 'withTheme': true }
)(BCMemorizeReportModal);
