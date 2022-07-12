import React, { useEffect, useState } from 'react';
import {Button, ButtonProps} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import styles from '../signup.styles';
import { withStyles } from '@material-ui/core/styles';
import {PRIMARY_BLUE} from "../../../../../constants";
import AutoComplete
  from "../../../../components/bc-autocomplete/bc-autocomplete_2";

interface Props {
  onSelect: (company: string) => void;
  classes: any
}

function SignUpCompany({onSelect, classes }: Props): JSX.Element {
  return (
    <>
      <p className={classes.Description}>
        {'Please select your company'}
      </p>
      <Grid
        container
        style={{padding: 20}}
        spacing={2}>
        <Grid
          item
          md={3}
          xs={false}
        >
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <AutoComplete
            handleChange={(e: any) => onSelect(e.target.value)}
            label={""}
            name={"state"}
            data={[
              {id: '1', name: 'Norton Fitness'},
              {id: '2', name: 'LDI'},
            ]}
            value={null}
            className="serviceTicketLabel"
            margin={"dense"}
          />
        </Grid>
        <Grid
          item
          md={3}
          xs={false}
        >
        </Grid>
      </Grid>
    </>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(SignUpCompany);


const ButtonType = withStyles({
  root: {
    color: 'grey',
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '2px 2px 4px #ccc',
    marginBottom: 5,
    "&:active": {
      backgroundColor: PRIMARY_BLUE,
      color: 'white',
      "& svg": {
        fill: 'white',
      }
    }
  },
  startIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 30,
    fill: PRIMARY_BLUE,
  }
})((props: ButtonProps) => (
  <Button
    fullWidth={true}
    size={'large'}
    type={'button'}
    variant={'text'}
    {...props}
  />
));

