import { useFormik } from 'formik';
import {
  Button, Checkbox,
  DialogActions,
  DialogContent,
  Fab,
  Grid, IconButton, Input,
  InputAdornment, InputLabel, MenuItem, Select,
  withStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './sidebar.styles';
import { getCustomers, loadingCustomers } from 'actions/customer/customer.action';
import {
  FormGroup,
  TextField
} from '@material-ui/core';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import CloseIcon from "@material-ui/icons/Close";
import moment from 'moment';
import { getContacts } from 'api/contacts.api';
import {STATUSES} from "../../../../../helpers/contants";

function BCMapFilter({
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
  const [menuOpen, setMenuOpen] = useState('');
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
      jobStatus: [-1],
      // schedule_date: "",
    },
    onSubmit
  });

  const handleCustomerChange = (setFieldValue: Function, newValue: any) => {
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

  const handleCustomerContactChange = (setFieldValue: Function, newValue: string) => {
    setFieldValue('contact', newValue);
  }

  const handleJobStatusChange = (setFieldValue: Function, newValue: any) => {
    const {value} = newValue.props;
    const i = form.values.jobStatus.indexOf(value);
    let newArray = [...form.values.jobStatus];
    if (i >= 0) {
      newArray.splice(i,1);
    } else {
      if (value === -1) {
        newArray = [value];
      } else {
        newArray.push(value);
        const all = form.values.jobStatus.indexOf(-1);
        if (all >= 0) newArray.splice(all,1);
      }
    }
    if (newArray.length === 0) newArray.push(-1);
    setFieldValue('jobStatus', newArray);
  }

  const countSelected = () => {
    const all = form.values.jobStatus.indexOf(-1);
    if (all >= 0) return 7;
    return form.values.jobStatus.length;
  }

  const {
    errors: FormikErrors,
    values: FormikValues,
    handleChange: formikChange,
    handleSubmit: FormikSubmit,
    setFieldValue,
    isSubmitting
  } = form;

  return (
    <form onSubmit={FormikSubmit}>
      <div className={classes.filterContainer}>
        {<Grid
          container
          spacing={2}>
          <Grid
            item
            sm={12}
            xs={12}
          >
            <div className={classes.actionContainer}>
              <Button size={"small"}>Clear Filters</Button>
              <IconButton aria-label="close">
                <CloseIcon/>
              </IconButton>
            </div>
            <FormGroup className={'required'}>
              <TextField
                name={'jobId'}
                placeholder={'Job ID'}
                variant={'outlined'}
                onChange={form.handleChange}
                type={'search'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="material-icons">search</i>
                    </InputAdornment>
                  ),
                }}
              />
            </FormGroup>
            <FormGroup>
              <Autocomplete
                id="tags-standard"
                onOpen={() => setMenuOpen('customer')}
                onClose={() => setMenuOpen('')}
                options={customers}
                getOptionLabel={(option) => option.profile.displayName}
                classes={{
                  inputRoot: menuOpen === 'customer' ? classes.menuOpen : '',
                  paper: classes.menuContainer
                }}
                onChange={(event: any, newValue: any) => handleCustomerChange(setFieldValue, newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Customer"
                  />
                )}
              />
          </FormGroup>
            <FormGroup className={'required'}>
              <Autocomplete
                id="tags-standard"
                onOpen={() => setMenuOpen('contact')}
                onClose={() => setMenuOpen('')}
                options={contacts}
                getOptionLabel={(option) => option?.name}
                onChange={(event: any, newValue: any) => handleCustomerContactChange(setFieldValue, newValue)}
                classes={{
                  inputRoot: menuOpen === 'contact' ? classes.menuOpen : '',
                  paper: classes.menuContainer
                }}                renderInput={(params) => (
                  <TextField
                    {...params}
                    name={'contact'}
                    variant="outlined"
                    label={'Contact Name'}
                    type={'search'}
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Select
                className={menuOpen === 'status' ? classes.menuOpen: ''}
                name={'jobStatus'}
                multiple
                value={form.values.jobStatus}
                onOpen={() => setMenuOpen('status')}
                onClose={() => setMenuOpen('')}
                onChange={(event: any, newValue: any) => handleJobStatusChange(setFieldValue, newValue)}
                variant={'outlined'}
                renderValue={() =>
                  <>
                    Job Status&nbsp;&nbsp;
                    <span className={classes.statusCount}>{countSelected()}</span>
                  </>}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null,
                  classes: {
                    paper: classes.menuContainer,
                    list: classes.menu,
                  }
                }} >
                <MenuItem value={-1} classes={{
                  root: classes.itemRoot,
                  selected: classes.itemSelected
                }}>
                  <div className={classes.menuItemContainer}>
                    <span>View All</span>
                    <p></p>
                    <Checkbox
                      checked={form.values.jobStatus.indexOf(-1) >= 0}
                      color="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                 </div>
                </MenuItem>
                {STATUSES.map((status, index) => {
                  const StatusIcon = status.icon;
                  return <MenuItem
                      classes={{
                        root: classes.itemRoot,
                        selected: classes.itemSelected
                      }}
                      value={index}>
                      <div className={classes.menuItemContainer}>
                        <StatusIcon />
                        <span style={{color: status.color}}>{status.title}</span>
                        <p></p>
                        <Checkbox
                          checked={form.values.jobStatus.indexOf(index) >= 0}
                          color="primary"
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </div>
                    </MenuItem>
                  }
                )}
              </Select>
            </FormGroup>
          </Grid>
          <Grid
            item
            sm={12}
            xs={12}>
            <Button
              aria-label={'apply'}
              color={'primary'}
              disabled={isSubmitting}
              type={'submit'}
              onClick={() => openTicketFilterModal()}
              size={"large"}
              variant={'contained'}>Apply</Button>
          </Grid>
        </Grid>
        }
      </div>
    </form>
    );
}

export default withStyles(
  styles,
  { 'withTheme': true },
)(BCMapFilter);
