import BCInput from "app/components/bc-input/bc-input";
import React, { useState, useEffect } from "react";
import { formatDate } from "helpers/format";
import { refreshServiceTickets } from "actions/service-ticket/service-ticket.action";
import styles from "./bc-add-billing-modal.styles";
import { useFormik } from "formik";
import {
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
    dueDate: new Date(),
  },
  error = {
    status: false,
    message: "",
  },
}: any): JSX.Element {
  const dispatch = useDispatch();
  const [notesLabelState, setNotesLabelState] = useState(false);

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
      cardHolderName: ticket.customer._id,
      expiryDate: ticket.jobSite,
      cardNumber: ticket.jobLocation,
      cvv: ticket.cvv,
      nickName: ticket.nickName,
      billingAddress: ticket.billingAddress,
      city: ticket.city,
      state: ticket.state,
      updateFlag: ticket.updateFlag,
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      const tempData = {
        ...ticket,
        ...values,
      };
      let editTicketObj = { ...values, ticketId: "" };
      if (ticket._id) {
        editTicketObj.ticketId = ticket._id;
        delete editTicketObj.cardHolderName;
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

  if (error.status) {
    return <ErrorMessage>{error.message}</ErrorMessage>;
  } else {
    return (
      <form onSubmit={FormikSubmit} className="ticket_form__wrapper">
        <DialogContent classes={{ root: classes.dialogContent }}>
          <div>
            <BCInput
              className="serviceTicketLabel"
              label={"Card Holder Name"}
              name={"cardHolderName"}
              margin={"dense"}
              required
              value={FormikValues.cardHolderName}
              handleChange={formikChange}
            />
            <BCInput
              className="serviceTicketLabel"
              label={"Card Number"}
              name={"cardNumber"}
              margin={"dense"}
              value={FormikValues.cardNumber}
              handleChange={formikChange}
            />
            <BCInput
              handleChange={formikChange}
              label={"CVV"}
              name={"cvv"}
              value={FormikValues.cvv}
              className="serviceTicketLabel"
              margin={"dense"}
            />

            <BCInput
              handleChange={formikChange}
              label={"Expiry Date"}
              name={"expiryDate"}
              value={FormikValues.expiryDate}
              className="serviceTicketLabel"
              margin={"dense"}
              placeholder="MM/YY"
            />
            <BCInput
              handleChange={formikChange}
              label={"Billing Address"}
              name={"billingAddress"}
              value={FormikValues.billingAddress}
              className="serviceTicketLabel"
              margin={"dense"}
            />
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
              </Grid>
              <Grid item xs={6}>
                <BCInput
                  handleChange={formikChange}
                  label={"State"}
                  name={"state"}
                  value={FormikValues.state}
                  className="serviceTicketLabel"
                  margin={"dense"}
                />
              </Grid>
            </Grid>

            <BCInput
              handleChange={formikChange}
              label={"Nickname"}
              // multiline
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
  font-size: 18px;
  padding: 5px;
  text-align: center;
`;
export default withStyles(styles, { withTheme: true })(BCServiceTicketModal);
