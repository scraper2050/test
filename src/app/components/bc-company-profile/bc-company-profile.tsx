import React from 'react';
import styles from './bc-company-profile.style';
import {Typography, withStyles} from "@material-ui/core";

interface Props {
  fields: ColumnField[];
  classes: any;
}

interface ColumnField {
  label: string;
  id: string;
  value: any;
}

function BCCompanyProfile({fields, classes}: Props) {
  return (
    < div className={classes.fieldsPane}>
      {fields.map((element) =>
        <div className={classes.fieldPane} key={element.id}>
          <span className={classes.filedLabel}>{element.label}</span>
          <span className={classes.fieldText}>{element.value}</span>
        </div>
      )}
    </div>
  );
}

export default withStyles(
  styles,
  {'withTheme': true}
)(BCCompanyProfile);

function ErrorText({text}: { text: string }) {
  return (
    <Typography align="left" variant="caption" color="error">
      {text}
    </Typography>
  );
}
