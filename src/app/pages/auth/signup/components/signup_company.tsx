import React, { useEffect, useState } from 'react';
import {Button, ButtonProps} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import styles from '../signup.styles';
import { withStyles } from '@material-ui/core/styles';
import {PRIMARY_BLUE} from "../../../../../constants";
import AutoComplete
  from "../../../../components/bc-autocomplete/bc-autocomplete_2";
import Api from 'utils/api';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';

interface Props {
  onSelect: (company: string) => void;
  classes: any,
  accountType: number,
}

function SignUpCompany({onSelect, accountType, classes }: Props): JSX.Element {
  const [allCompany, setAllCompany] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false)

  const getAllCustomers = () => {
    setIsLoading(true);
    if(accountType === 2){
      Api.get('/getAllCustomers')
      .then(res => {
        if(res?.data?.status === 1){
          setAllCompany(res.data.customers.map((customer:any) => ({id: customer._id, name: customer.profile.displayName || '-'})));
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false);
      })
    } else if(accountType === 1){
      Api.get('/getAllCompanies')
      .then(res => {
        if(res?.data?.status === 1){
          setAllCompany(res.data.companies.map((company:any) => ({id: company._id, name: company.info.companyName || '-'})));
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err)
        setIsLoading(false);
      })
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAllCustomers();
  }, [accountType])
  
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
          {isLoading ? (
            <BCCircularLoader heightValue={100} />
          ) : (
            <AutoComplete
              handleChange={(e: any) => onSelect(e.target.value.id)}
              label={""}
              name={"state"}
              data={allCompany}
              value={null}
              className="serviceTicketLabel"
              margin={"dense"}
            />
          )}
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

