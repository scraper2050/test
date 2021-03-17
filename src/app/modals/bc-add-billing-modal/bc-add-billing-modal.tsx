import BCInput from "app/components/bc-input/bc-input";
import AutoComplete from 'app/components/bc-autocomplete/bc-autocomplete';
import BCSelectOutlined from "app/components/bc-select-outlined/bc-select-outlined";
import React, { useState, useEffect } from "react";
import { formatDate } from "helpers/format";
import { refreshServiceTickets } from "actions/service-ticket/service-ticket.action";
import styles from "./bc-add-billing-modal.styles";
import { useFormik } from "formik";
import { makeStyles } from '@material-ui/core/styles';
import { success } from "actions/snackbar/snackbar.action";
import { getCompanyCards } from "api/company-cards.api";
import { allStates } from 'utils/constants';
import {
  Box,
  DialogActions,
  DialogContent,
  Fab,
  Grid,
  withStyles,
} from "@material-ui/core";
import {
  AddBillingMethodAPI,
  EditBillingMethodAPI,
} from "api/billing-methods.api";
import {
  closeModalAction,
  setModalDataAction,
} from "actions/bc-modal/bc-modal.action";
import { useDispatch, useSelector } from "react-redux";
import {
  getJobSites,
  clearJobSiteStore,
} from "actions/job-site/job-site.action";
import "../../../scss/index.scss";
import {
  clearJobLocationStore,
  getJobLocationsAction,
} from "actions/job-location/job-location.action";
import styled from "styled-components";
import { Message } from "@material-ui/icons";

const useStyles = makeStyles({
  buttons: {
    width: "100%"
  }
})

function BCServiceTicketModal({
  classes,
  ticket = {
    customer: {
      _id: "",
    },
    jobSite: "",
    jobLocation: "",
    jobType: "",
    nickName: "",
    updateFlag: "",
    zipCode: '',
    dueDate: new Date(),
  },
  error = {
    status: false,
    message: "",
  },
}: any): JSX.Element {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("")
  const [validate, setValidate] = useState({
    name: '',
    address: '',
    cardNumber: '',
    city: '',
    cvc: '',
    exp: '',
    state: '',
    zipcode: ''
  })
  const [notesLabelState, setNotesLabelState] = useState(false);
  const classes1 = useStyles();
  const isValidate = (requestObj: any) => {
    let validateFlag = true;
    if (requestObj.nickName === undefined || requestObj.nickName === "") {
      setNotesLabelState(true);
      validateFlag = false;
    } else {
      setNotesLabelState(false);
    }
    return validateFlag;
  };

  const formatRequestObj = (rawReqObj: any) => {
    for (let key in rawReqObj) {
      if (rawReqObj[key] === "" || rawReqObj[key] === null) {
        delete rawReqObj[key];
      }
    }
    return rawReqObj;
  };

  useEffect(() => {
    if (!ticket.updateFlag) {
      dispatch(clearJobLocationStore());
      dispatch(clearJobSiteStore());
    }
  }, []);

  const {
    values: FormikValues,
    handleChange: formikChange,
    handleSubmit: FormikSubmit,
    setFieldValue,
    getFieldMeta,
    isSubmitting,
  } = useFormik({
    // 'enableReinitialize': true,
    initialValues: {
      name: ticket.customer._id,
      exp: ticket.jobSite,
      cardNumber: ticket.jobLocation,
      cvc: ticket.cvv,
      nickName: ticket.nickName,
      address: ticket.billingAddress,
      city: ticket.city,
      state: ticket.state,
      updateFlag: ticket.updateFlag,
      zipcode: ticket.zipcode
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values)
      setSubmitting(true);
      const tempData = {
        ...ticket,
        ...values,
      };
      let editTicketObj = { ...values, ticketId: "" };
      if (ticket._id) {
        editTicketObj.ticketId = ticket._id;
        delete editTicketObj.name;
        if (isValidate(editTicketObj)) {
          let formatedRequest = formatRequestObj(editTicketObj);
          if (formatedRequest.dueDate) {
            formatedRequest.dueDate = formatDate(formatedRequest.dueDate);
          }
          EditBillingMethodAPI(formatedRequest)
            .then((response: any) => {
              dispatch(refreshServiceTickets(true));
              dispatch(closeModalAction());
              setTimeout(() => {
                dispatch(
                  setModalDataAction({
                    data: {},
                    type: "",
                  })
                );
              }, 200);
              setSubmitting(false);
              dispatch(success(response.message));
            })
            .catch((err: any) => {
              setSubmitting(false);
              throw err;
            });
        } else {
          setSubmitting(false);
        }
      } else {
        let formatedRequest = formatRequestObj(tempData);
        
        AddBillingMethodAPI(formatedRequest)
          .then((response: any) => {
            setSubmitting(false);
            let invalid:any = {
              name: '',
              address: '',
              cardNumber: '',
              city: '',
              cvc: '',
              exp: '',
              state: '',
              zipcode: ''
            }
            if(response.message.length > 0) {
              for(let i = 0; i < response.message.length; i++) {
                let value = response.message[i].split(":")[0];
                let message = response.message[i].split(":")[1];
                invalid[value.split(" ")[1]] = message
              }
            }
            if(invalid.name || invalid.address || invalid.cardNumber || invalid.city || invalid.cvc || invalid.exp || invalid.state || invalid.zipcode){
              setErrorMessage('')
              return setValidate(invalid);
            }
            if(response.status === 0) {
              setValidate(invalid);
              return setErrorMessage(response.message)
            }
            setValidate(invalid);
            setErrorMessage('')
            dispatch(refreshServiceTickets(true));
            dispatch(closeModalAction());
            setTimeout(() => {
              dispatch(
                setModalDataAction({
                  data: {},
                  type: "",
                })
              );
            }, 200);
            dispatch(getCompanyCards())
            dispatch(success(response.message));
          })
          .catch((err: any) => {
            setSubmitting(false);
            throw err;
          });
      }
    },
    /*
     * 'validationSchema': Yup.object({
     *   'customer': Yup.string()
     *     .required('Customer is required'),
     *   'notes': Yup.string()
     *   // 'dueDate': Yup.string().required('Schedule date is required')
     * })
     */
  });
  const customers = useSelector(({ customers }: any) => customers.data);
  const jobLocations = useSelector((state: any) => state.jobLocations.data);
  const jobSites = useSelector((state: any) => state.jobSites.data);
  const isLoading = useSelector((state: any) => state.jobSites.loading);
  const jobTypes = useSelector((state: any) => state.jobTypes.data);

  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(
        setModalDataAction({
          data: {},
          type: "",
        })
      );
    }, 200);
  };
  console.log(FormikValues)
  if (error.status) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  } else {
    return (
      <form onSubmit={FormikSubmit} className="ticket_form__wrapper">
        <DialogContent classes={{ root: classes.dialogContent }}>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <div>
            <BCInput
              className="serviceTicketLabel"
              label={"Card Holder Name"}
              name={"name"}
              margin={"dense"}
              required
              value={FormikValues.name}
              handleChange={formikChange}
            />
            <ErrorMessage>{validate.name}</ErrorMessage>
            <BCInput
              className="serviceTicketLabel"
              label={"Card Number"}
              margin={"dense"}
              name={"cardNumber"}
              value={FormikValues.cardNumber}
              handleChange={formikChange}
            />
            <ErrorMessage>{validate.cardNumber}</ErrorMessage>
            <BCInput
              handleChange={formikChange}
              label={"CVV"}
              name={"cvc"}
              value={FormikValues.cvc}
              className="serviceTicketLabel"
              margin={"dense"}
            />
            <ErrorMessage>{validate.cvc}</ErrorMessage>
            <BCInput
              handleChange={formikChange}
              label={"Expiration Date"}
              name={"exp"}
              value={FormikValues.exp}
              className="serviceTicketLabel"
              margin={"dense"}
              placeholder="MM/YY"
            />
            <ErrorMessage>{validate.exp}</ErrorMessage>
            <BCInput
              handleChange={formikChange}
              label={"Billing Address"}
              name={"address"}
              value={FormikValues.address}
              className="serviceTicketLabel"
              margin={"dense"}
            />
            <ErrorMessage>{validate.address}</ErrorMessage>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <BCInput
                  handleChange={formikChange}
                  label={"City"}
                  name={"city"}
                  value={FormikValues.city}
                  className="serviceTicketLabel"
                  margin={"dense"}
                />
                <ErrorMessage>{validate.city}</ErrorMessage>
              </Grid>
              <Grid item xs={6}>
                <AutoComplete 
                  handleChange={formikChange}
                  label={"State"}
                  name={"state"}
                  data={allStates}
                  value={FormikValues.state}
                  className="serviceTicketLabel"
                  margin={"dense"}
                />
                <ErrorMessage>{validate.state}</ErrorMessage>
              </Grid>
            </Grid>
            <BCInput
              handleChange={formikChange}
              label={"Zip Code"}
              name={"zipcode"}
              value={FormikValues.zipcode}
              className="serviceTicketLabel"
              margin={"dense"}
            />
            <ErrorMessage>{validate.zipcode}</ErrorMessage>
            <BCInput
              handleChange={formikChange}
              label={"Nickname"}
              name={"nickName"}
              value={FormikValues.nickName}
              className="serviceTicketLabel"
              margin={"dense"}
            />
            {notesLabelState ? (
              <Label>Notes are required while updating the ticket.</Label>
            ) : null}
          </div>
        </DialogContent>
        <DialogActions
          classes={{
            root: classes.dialogActions,
          }}
        >
          <Fab
            aria-label={"create-job"}
            classes={{
              root: classes.fabRoot,
            }}
            className={"serviceTicketBtn"}
            disabled={isSubmitting}
            onClick={() => closeModal()}
            variant={"extended"}
          >
            {"Cancel"}
          </Fab>
          <Box className={classes1.buttons}>
            <Fab
              aria-label={"create-job"}
              classes={{
                root: classes.fabRoot,
              }}
              color={"primary"}
              disabled={isSubmitting}
              type={"submit"}
              variant={"extended"}
            >
              {ticket._id ? "Edit Method" : "Add Method"}
            </Fab>
          </Box>
        </DialogActions>
      </form>
    );
  }
}
const Label = styled.div`
  color: red;
  font-size: 15px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
`;
export default withStyles(styles, { withTheme: true })(BCServiceTicketModal);
