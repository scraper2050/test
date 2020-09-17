import { CircularProgress } from '@material-ui/core';
import React from 'react';

function BCCircularLoader({ heightValue = '100vh' }: any): JSX.Element {
  return (
    <div style={{
      'alignItems': 'center',
      'display': 'flex',
      'height': heightValue,
      'justifyContent': 'center'
    }}>
      <CircularProgress size={50} />
    </div>
  );
}

export default BCCircularLoader;
