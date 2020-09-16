import { CircularProgress } from '@material-ui/core';
import React from 'react';

function BCPageLoader(): JSX.Element {
  return (
    <div style={{
      'alignItems': 'center',
      'display': 'flex',
      'height': '100vh',
      'justifyContent': 'center'
    }}>
      <CircularProgress size={50} />
    </div>
  );
}

export default BCPageLoader;
