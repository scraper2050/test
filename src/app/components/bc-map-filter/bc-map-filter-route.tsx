import { useFormik } from 'formik';
import {
  Button, Checkbox,
  Grid, IconButton, InputAdornment, MenuItem, Select,
  withStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import styles from './bc-map-filter.styles';

import {
  FormGroup,
  TextField
} from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";

function BCMapFilterRoute({
  classes,
  currentFilter,
  resetFilter,
  callback,
  employees,
  vendors,
  jobTypes,
}: any): JSX.Element {
  const [menuOpen, setMenuOpen] = useState('');

  const technicians = employees.map((employee: any) => ({
    _id: employee._id,
    name: employee.profile.displayName,
    type: false,
  }));
  vendors.forEach((vendor: any) => {
    if (vendor.status === 1) technicians.push({
      _id: vendor._id,
      name: vendor.contractor.admin.profile.displayName,
      type: true,
    });
  })

  technicians.sort((a: any, b: any) =>
    a.name > b.name ? 1 : b.name > a.name ? -1 : 0
  );

  jobTypes.sort((a: any, b: any) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );

  const onSubmit = async (values: any, { setSubmitting }: any) => {
    if (typeof callback === "function") callback(values);
  }

  const form = useFormik({
    initialValues: {
      technician: currentFilter.technician || '',
      jobType: currentFilter.jobType || [],
      jobAddress: currentFilter.jobAddress || "",
    },
    onSubmit
  });

  const {
    handleChange: formikChange,
    handleSubmit: FormikSubmit,
    setFieldValue,
    isSubmitting
  } = form;

  const clearFilter = () => {
    resetFilter();
  }

  const closeFilter = () => {
    callback();
  }
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
              <Button size={"small"} onClick={clearFilter}>Clear Filters</Button>
              <IconButton aria-label="close" onClick={closeFilter}>
                <CloseIcon/>
              </IconButton>
            </div>
            <FormGroup>
              <Autocomplete
                onOpen={() => setMenuOpen('customer')}
                onClose={() => setMenuOpen('')}
                options={technicians}
                getOptionLabel={(option) => option?.name}
                classes={{
                  inputRoot: menuOpen === 'customer' ? classes.menuOpen : '',
                  paper: classes.menuContainer
                }}
                onChange={(event: any, newValue: any) => setFieldValue('technician', newValue)}
                value={form.values.technician}
                renderInput={(params) => {
                  params.InputProps.startAdornment = <InputAdornment
                    position="start"><SearchIcon color={'action'} style={{marginLeft: 10}}/></InputAdornment>
                  return <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Technician Name"
                  />
                }}
              />
          </FormGroup>
            <FormGroup>
              <Autocomplete
                multiple
                onOpen={() => setMenuOpen('contact')}
                onClose={() => setMenuOpen('')}
                options={jobTypes}
                getOptionLabel={(option) => option?.title}
                value={form.values.jobType}
                onChange={(event: any, newValue: any) => setFieldValue('jobType', newValue)}
                classes={{
                  root: classes.fullWidth,
                  inputRoot: menuOpen === 'contact' ? classes.menuOpen : '',
                  paper: classes.menuContainer
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name={'jobType'}
                    variant="outlined"
                    placeholder={'Job Type'}
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                name={'jobAddress'}
                placeholder="Job Address"
                variant={'outlined'}
                onChange={form.handleChange}
                value={form.values.jobAddress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i className="material-icons">search</i>
                    </InputAdornment>
                  ),
                }}
              />
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
)(BCMapFilterRoute);
