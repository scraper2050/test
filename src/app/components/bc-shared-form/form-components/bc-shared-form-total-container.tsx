import Paper from '@material-ui/core/Paper';
import React from 'react';
import styles from '../bc-shared-form.styles';
import { withStyles } from '@material-ui/core';


interface Props {
    totalTax: number;
    subTotal: number;
    totalAmount: number;
    classes: any;
}

function SharedFormTotalContainer({ classes, subTotal, totalTax, totalAmount }:Props) {
  return <div className={classes.totalContainer}>
    <Paper
      style={{
        'padding': 12,
        'textAlign': 'center',
        'width': 150
      }}
      variant={'outlined'}>
      <div>
        {'Subtotal:'}
        <span className={classes.totalAmountText}>
          {`$${subTotal}`}
        </span>
      </div>
      <div>
        {'Tax %:'}
        <span className={classes.totalAmountText}>
          {`$${totalTax}`}
        </span>
      </div>
      <div>
        {'Total($):'}
        <span className={classes.totalAmountText}>
          {`$${totalAmount}`}
        </span>
      </div>
    </Paper>
  </div>;
}


export default withStyles(styles, { 'withTheme': true })(SharedFormTotalContainer);
