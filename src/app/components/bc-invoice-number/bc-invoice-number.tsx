import * as CONSTANTS from "../../../constants";
import styles from './bc-invoice-number.styles';
import { AxiosError } from "axios";
import {
  DialogActions,
  Grid,
  InputLabel,
  withStyles,
  createStyles,
  Button,
} from '@material-ui/core';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import * as Yup from 'yup';
import { success, error } from 'actions/snackbar/snackbar.action';
import InputBase from "@material-ui/core/InputBase";
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {getCurrentInvoiceNumber, setCustomInvoiceNumber} from "../../../api/invoice-number.api";

const invoiceNumberSchema = Yup.object().shape({
  invoiceNumber: Yup.string().required('Required'),
  invoicePrefix: Yup.string(),
});



const invoiceNumberModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    formField: {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '90%'
    },
    bootstrapRoot: {
      flex: 2,
      'label + &': {
        // marginTop: 0,
        display: 'flex',
        // minWidth: '100%'
      },
      '&': {
        marginTop: 0,
        display: 'flex',
        // minWidth: '50%'
      },
    },
    bootstrapRootError: {
      borderRadius: 8,
      border: `1px solid ${CONSTANTS.PRIMARY_ORANGE}`,
    },
    bootstrapRootWarning: {
      borderRadius: 8,
      border: `1px solid ${CONSTANTS.PRIMARY_YELLOW}`,
    },
    bootstrapInput: {
      color: '#4F4F4F!important',
      fontWeight: 'normal',
      borderRadius: 8,
      // position: 'relative',
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
      flex:1,
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
      // minWidth: '32%',
      whiteSpace: 'nowrap',
    },
    
  }),
);

function BCInvoiceNumber({classes}: any): JSX.Element {
  const invoiceNumberStyles = invoiceNumberModalStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState<string|null>(null);
  const [showInvoiceNumberWarning, setShowInvoiceNumberWarning] = useState(false)

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  useEffect(() => {
    getCurrentInvoiceNumber()
    .then((res:any)=>{
      if(res.status === 1){
        setCurrentInvoiceNumber(`${res.currentInvoiceNumber+1}`)
        setFieldValue('invoiceNumber',`${res.currentInvoiceNumber+1}`);
        setFieldValue('invoicePrefix',res.invoicePrefix || '');
        setIsLoading(false);
      } else {
        dispatch(error("Something went wrong! Can't get invoice prefix data"));
        closeModal();
      }
    })
    .catch((err: Error| AxiosError) => {
      dispatch(error("Something went wrong! Can't get invoice prefix data"));
      closeModal();
    });
  }, []);

  const handleInvoiceNumberChange = (e: {target: {value: string;}}) => {
    // make sure user only input integer character
    setFieldValue('invoiceNumber', e.target.value.replace(/[^0-9]/g,''));
  }

  const form = useFormik({
    initialValues: {
      "invoiceNumber": '',
      "invoicePrefix": '',
    },
    validationSchema: invoiceNumberSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const submissionData = {
          invoicePrefix: values.invoicePrefix, 
          invoiceNumber: parseInt(values.invoiceNumber, 10)-1,
        };
        const {status, message} = await setCustomInvoiceNumber(submissionData);
        if(status === 1) {
          dispatch(success(message));
          setSubmitting(false);
          closeModal();
        } else {
          dispatch(error("Something went wrong!"));
          setSubmitting(false);
        }
      } catch (err) {
        dispatch(error("Something went wrong!"));
        setSubmitting(false);
      }
    },
  })

  const {
    handleChange,
    values,
    errors,
    isSubmitting,
    setFieldValue,
    handleSubmit,
  } = form


  useEffect(() => {
    if(values.invoiceNumber && currentInvoiceNumber && parseInt(currentInvoiceNumber) > parseInt(values.invoiceNumber)){
      setShowInvoiceNumberWarning(true)
    } else {
      setShowInvoiceNumberWarning(false)
    }
  }, [values, currentInvoiceNumber])

  return isLoading ? (
    <Grid container direction="column" alignItems="center" spacing={2}>
      <div style={{
        flexGrow: 1,
        padding: 20,
        backgroundColor: CONSTANTS.PRIMARY_WHITE
      }}>
        <BCCircularLoader heightValue={'200px'} />
      </div>
    </Grid>
  ) : (
    <>
      <DataContainer className={classes.container}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <FormControl className={classNames(invoiceNumberStyles.formField, 'required')}>
            <InputLabel 
            disableAnimation
            htmlFor="name"
            className={invoiceNumberStyles.bootstrapFormLabel}>
              Next Invoice Number
            </InputLabel>
            <div style={{flex: 2}}>
              <InputBase
                id="invoiceNumber"
                name="invoiceNumber"
                disabled={false}
                value={values.invoiceNumber}
                placeholder={'Current Invoice Number'}
                error={!!errors.invoiceNumber || showInvoiceNumberWarning}
                onChange={handleInvoiceNumberChange}
                classes={{
                  root: classNames(invoiceNumberStyles.bootstrapRoot, {
                    [invoiceNumberStyles.bootstrapRootError]: !!errors.invoiceNumber,
                    [invoiceNumberStyles.bootstrapRootWarning]: showInvoiceNumberWarning,
                  }),
                  input: classNames(invoiceNumberStyles.bootstrapInput),
                }}
              />
              <span style={{color: CONSTANTS.PRIMARY_YELLOW}}>{showInvoiceNumberWarning && `This invoice number is lower than the current one (${currentInvoiceNumber}), there's a possibility of invoice numbers duplications.`}</span>
            </div>
          </FormControl>
          <FormControl className={invoiceNumberStyles.formField}>
            <InputLabel 
              disableAnimation
              htmlFor="phone"
              className={invoiceNumberStyles.bootstrapFormLabel}>
              Invoice Prefix
            </InputLabel>
            <InputBase
              id="invoicePrefix"
              name="invoicePrefix"
              disabled={false}
              value={values.invoicePrefix}
              placeholder={'Invoice Prefix'}
              error={!!errors.invoicePrefix}
              onChange={handleChange}
              classes={{
                root: classNames(invoiceNumberStyles.bootstrapRoot, {
                  [invoiceNumberStyles.bootstrapRootError]: !!errors.invoicePrefix
                }),
                input: classNames(invoiceNumberStyles.bootstrapInput),
              }}
            />
          </FormControl>
        </Grid>
      </DataContainer>
      <DialogActions classes={{
        'root': classes.dialogActions
      }}>
        <Button
          aria-label={'edit-invoice-number'}
          color={'primary'}
          disabled={isSubmitting || !!errors.invoiceNumber}
          onClick={() => handleSubmit()}
          className={classNames(classes.saveButton)}
          variant={'contained'}>Save</Button>
      </DialogActions>
    </>
  );
}

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  max-width: 96%;
  background-color: ${CONSTANTS.PRIMARY_WHITE};

  .MuiInput-underline:before,
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: none;
  }
  .MuiDialogTitle-root {
    padding-top: 100px;
  }
  .required > label:after {
    margin-left: 3px;
    content: "*";
    color: red;
  }
  .save-customer-button {
    margin-right: 16px;
    color: ${CONSTANTS.PRIMARY_WHITE};
  }
`;


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCInvoiceNumber);
