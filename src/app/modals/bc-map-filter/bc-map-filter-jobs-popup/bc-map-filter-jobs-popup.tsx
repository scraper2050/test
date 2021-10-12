import { useFormik } from 'formik';
import { DialogActions, DialogContent, Fab, Grid, withStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../bc-map-filter-popup.styles';
import { getCustomers, loadingCustomers } from 'actions/customer/customer.action';
import {
  FormGroup,
  TextField
} from '@material-ui/core';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import { DatePicker } from "@material-ui/pickers";
import moment from 'moment';
import { getContacts } from 'api/contacts.api';

function BCMapFilterModal({
  classes,
  openTicketFilterModal,
  resetDate,
  setPage,
  getScheduledJobs,
  todaysJobs,
  showAll,
  resetFilter,
  callback
}: any): JSX.Element {
  const dispatch = useDispatch();
  const customers = useSelector(({ customers }: any) => customers.data);
  const loading = useSelector(({ customers }: any) => customers.loading);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format('YYYY/MM-DD'))
  const contacts = useSelector(({contacts}: any) => contacts?.contacts);

  useEffect(() => {
    dispatch(loadingCustomers());
    dispatch(getCustomers());
  }, []);

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    resetDate();
    setPage(1);
    await getScheduledJobs({
      ...values,
      page: 1,
      pageSize: showAll ? 0 : 4,
      todaysJobs: todaysJobs && todaysJobs.toString()
    });
    setSubmitting(false);
    openTicketFilterModal();

    if (typeof callback === "function") callback(false);
  }

  const form = useFormik({
    initialValues: {
      jobId: '',
      customerNames: "",
      contact: "",
      // schedule_date: "",
    },
    onSubmit
  });

  const handleCustomerChange = (field: string, setFieldValue: Function, newValue: any) => {
    // const customerDatafromAutoselect = newValue.map((customer: any) => customer.profile.displayName).join(',');
    const customerDatafromAutoselect = newValue?.profile?.displayName;
    // const customerContacts: string[] = newValue.map((customer: any) => customer.contact.phone).filter(Boolean);
    setFieldValue('customerNames', customerDatafromAutoselect);
    // setContacts(customerContacts);
    let data: any = {
      type: 'Customer',
      referenceNumber: newValue._id
    }

    dispatch(getContacts(data));
  }

  const handleCustomerContactChange = (field: string, setFieldValue: Function, newValue: string) => {
    setFieldValue('contact', newValue);
  }

  const handleDateChange = (field: string, setFieldValue: Function) => {
    setFieldValue('schedule_date', field)
  }

  const {
    errors: FormikErrors,
    values: FormikValues,
    handleChange: formikChange,
    handleSubmit: FormikSubmit,
    setFieldValue,
    isSubmitting
  } = form;

  if (loading) {
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
                  name={'jobId'}
                  placeholder={'Job ID'}
                  variant={'outlined'}
                  onChange={form.handleChange}
                  type={'search'}
                />
              </FormGroup>
              <FormGroup className={'required'}>
                <div className="search_form_wrapper">
                  <Autocomplete
                    // multiple
                    id="tags-standard"
                    options={customers}
                    getOptionLabel={(option) => option.profile.displayName}
                    onChange={(event: any, newValue: any) => handleCustomerChange('customer', setFieldValue, newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Customer"
                      />
                    )}
                  />
                  <i className="material-icons">search</i>
                </div>
              </FormGroup>

              <FormGroup className={'required'}>
                <Autocomplete
                  id="tags-standard"
                  options={contacts}
                  getOptionLabel={(option) => option?.name}
                  onChange={(event: any, newValue: any) => handleCustomerContactChange('contact', setFieldValue, newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name={'contact'}
                      variant="standard"
                      label={'Contact Name'}
                      type={'search'}
                    />
                    )}
                  />
                  {/* <TextField
                    name={'contactName'}
                    label={'Contact'}
                    placeholder={'Contact Name'}
                    onChange={form.handleChange}
                    type={'search'}
                  /> */}
              </FormGroup>

              {/* <FormGroup className={'required'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p>Schedule Date</p>
                  <DatePicker
                    autoOk
                    className={classes.picker}
                    disablePast={false}
                    format={'d MMM yyyy'}
                    id={`datepicker-${'scheduleDate'}`}
                    inputProps={{
                      'name': 'scheduleDate',
                      'placeholder': 'Due Date',
                    }}
                    inputVariant={'outlined'}
                    name={'scheduleDate'}
                    onChange={(e: any) => {setSelectedDate(moment(e).format('YYYY-MM-DD')); handleDateChange(moment(e).format('YYYY-MM-DD'), setFieldValue)}}
                    required={false}
                    value={selectedDate}
                    variant={'inline'}
                  />
                </div>
              </FormGroup> */}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions classes={{
          'root': classes.dialogActions
        }}>
          <Grid
            container
            spacing={2}>
            {typeof resetFilter === "function" && (
              <Fab
                aria-label={'create-job'}
                classes={{
                  'root': classes.fabRoot
                }}
                color={'secondary'}
                disabled={isSubmitting}
                onClick={() => {
                  resetFilter();
                  openTicketFilterModal();
                  if (typeof callback === "function") callback(true);
                }}
                variant={'extended'}>
                {'Reset'}
              </Fab>
            )}
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

export default withStyles(
  styles,
  { 'withTheme': true },
)(BCMapFilterModal);
