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

function BCMapFilterModal({
  classes,
  openTicketFilerModal,
  resetDate,
  setPage,
  getScheduledJobs
}: any): JSX.Element {
  const dispatch = useDispatch();
  const customers = useSelector(({ customers }: any) => customers.data);
  const loading = useSelector(({ customers }: any) => customers.loading);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()).format('YYYY/MM-DD'))

  useEffect(() => {
    dispatch(loadingCustomers());
    dispatch(getCustomers());
  }, []);

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    setSubmitting(true);
    resetDate();
    setPage(1);
    await getScheduledJobs({ ...values, page: 1, pageSize: 6 });
    setSubmitting(false);
    openTicketFilerModal();
  }

  const form = useFormik({
    initialValues: {
      jobId: '',
      customerNames: "",
      schedule_date: "",
    },
    onSubmit
  });

  const handleCustomerChange = (field: string, setFieldValue: Function, newValue: []) => {
    const customerDatafromAutoselect = newValue.map((customer: any) => customer.profile.displayName).join(',');
    setFieldValue('customerNames', customerDatafromAutoselect);
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
  }
  else {
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
                    multiple
                    id="tags-standard"
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
              </FormGroup>
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
              onClick={() => openTicketFilerModal()}
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
