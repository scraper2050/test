import { useFormik } from 'formik';
import { DialogActions, DialogContent, Fab, Grid, withStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import styles from './bc-map-filter-popup.styles';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import BCSelectOutlined from 'app/components/bc-select-outlined/bc-select-outlined';
import { getCustomers, loadingCustomers } from 'actions/customer/customer.action';
import { getAllJobTypesAPI } from 'api/job.api';
import {
  FormGroup,
  TextField
} from '@material-ui/core';
import { getOpenServiceTickets } from 'api/service-tickets.api';
import {
  refreshServiceTickets,
  setOpenServiceTicket,
  setOpenTicketFilterState,
  setOpenServiceTicketLoading,
  setSelectedCustomers
} from 'actions/service-ticket/service-ticket.action';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';


function BCMapFilterModal({
  classes,
  openTicketFilterModal,
  resetDate
}: any): JSX.Element {
  const dispatch = useDispatch();
  const customers = useSelector(({ customers }: any) => customers.data);
  const loading = useSelector(({ customers }: any) => customers.loading);
  const jobTypes = useSelector((state: any) => state.jobTypes.data);
  const loadingTypes = useSelector((state: any) => state.jobTypes.isLoading);
  const ticketFilterObject = useSelector(({serviceTicket}: any) => serviceTicket?.filterTicketState);
  const selectedCustomers =  useSelector(({serviceTicket}: any) => serviceTicket?.selectedCustomers);
  const [customerOptions, setCustomerOptions] = useState([]);

  useEffect(() => {
    dispatch(loadingCustomers());
    dispatch(getCustomers());
    dispatch(getAllJobTypesAPI());
  }, []);

  const formatRequestObj = (rawReqObj: any) => {
    for (let key in rawReqObj) {
      if (rawReqObj[key] === '' || rawReqObj[key] === null || rawReqObj[key].length === 0) {
        delete rawReqObj[key];
      }
    }
    return rawReqObj;
  }

  const onSubmit = (values: any, { setSubmitting }: any) => {
    const { dueDate } = ticketFilterObject;
    setSubmitting(true);
    // resetDate();
    const rawData = {
      pageNo: 1,
      pageSize: 4,
      jobTypeTitle: values.jobType,
      dueDate: dueDate || '',
      customerNames: values.customer,
      ticketId: values.searchQuery,
      companyId: '',
      contactName: values.contactName,
    }

    dispatch(setOpenTicketFilterState(rawData));
    dispatch(setSelectedCustomers(customerOptions));
    const requestObj = formatRequestObj(rawData);
    dispatch(setOpenServiceTicketLoading(true));
    getOpenServiceTickets(requestObj).then((response: any) => {
      dispatch(setOpenServiceTicket(response));
      dispatch(refreshServiceTickets(true));
      dispatch(setOpenServiceTicketLoading(false));
      openTicketFilterModal();
      // setTimeout(() => {
      //   dispatch(setModalDataAction({
      //     'data': {},
      //     'type': ''
      //   }));
      // }, 200);
      setSubmitting(false);
    })
      .catch((err: any) => {
        setSubmitting(false);
        throw err;
      });
  }

  const form = useFormik({
    initialValues: {
      searchQuery: ticketFilterObject?.ticketId || '',
      customer: ticketFilterObject?.customerNames || [],
      jobType: ticketFilterObject?.jobTypeTitle || '',
      contactName: ticketFilterObject?.contactName || '',
    },
    onSubmit
  });

  const handleCustomerChange = (field: string, setFieldValue: Function, newValue: []) => {
    const customerDatafromAutoselect = newValue.map((customer: any) => customer.profile.displayName).join(',');
    setCustomerOptions(newValue);
    setFieldValue('customer', customerDatafromAutoselect);
  }

  const {
    errors: FormikErrors,
    values: FormikValues,
    handleChange: formikChange,
    handleSubmit: FormikSubmit,
    setFieldValue,
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
  if (loading && loadingTypes) {
    return <BCCircularLoader heightValue={'280px'} />
  } else {

    return (
      <form onSubmit={FormikSubmit}>
        <DialogContent classes={{ 'root': classes.dialogContent }}>
          <Grid
            container
            spacing={2}>
            <Grid
              item
              sm={12}
              xs={12}
            >
              <FormGroup className={'required'}>
                <TextField
                  name={'searchQuery'}
                  placeholder={'TicketId'}
                  variant={'outlined'}
                  onChange={form.handleChange}
                  type={'search'}
                  defaultValue={ticketFilterObject?.ticketId}
                />
              </FormGroup>
              <FormGroup className={'required'}>
                <div className="search_form_wrapper">
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    defaultValue={selectedCustomers}
                    options={customers}
                    getOptionLabel={(option) => option.profile.displayName}
                    onChange={(event: any, newValue: any) => handleCustomerChange('customer', setFieldValue, newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Customers"
                      />
                    )}
                  />
                  <i className="material-icons">search</i>
                </div>
              </FormGroup>
              <FormGroup className={'required'}>
                <TextField
                  name={'contactName'}
                  label={'Contact'}
                  placeholder={'Contact Name'}
                  // variant={'outlined'}
                  onChange={form.handleChange}
                  type={'search'}
                  defaultValue={ticketFilterObject?.contactName}
                />
              </FormGroup>

              <BCSelectOutlined
                handleChange={formikChange}
                error={{
                  'isError': true,
                }}

                items={{
                  'data': [
                    ...jobTypes.map((jobType: any) => {
                      return {
                        'title': jobType.title
                      };
                    })
                  ],
                  'displayKey': 'title',
                  'valueKey': 'title'
                }}
                label={'Job Type'}
                name={'jobType'}
                value={FormikValues.jobType}
              />

            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions classes={{
          'root': classes.dialogActions
        }}>
          <Grid
            container
            spacing={2}>
            <Fab
              aria-label={'create-job'}
              classes={{
                'root': classes.fabRoot
              }}
              color={'secondary'}
              disabled={isSubmitting}
              onClick={() => openTicketFilterModal()}
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
              Apply
              </Fab>
          </Grid>
        </DialogActions>
      </form>
    );
  }
}

const Modal = styled.div`
width: 25%;
height: 65%;
position: fixed;
top: 10%;
right: 10%;
bottom: 10%;
left: 57%;
padding: 10px;
box-shadow: 0 10px 30px 0 rgba(127, 127, 127, 0.3);
background: rgba(255, 255, 255, 0.8)
;
`
const Label = styled.div`
  color: red;
  font-size: 15px;
`;
export default withStyles(
  styles,
  { 'withTheme': true },
)(BCMapFilterModal);
