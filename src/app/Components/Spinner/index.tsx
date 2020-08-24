import React from 'react';
import styled from 'styled-components';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      background: 'rgba(255, 255, 255, 0.5)',
      pointerEvents: 'none',
      position: 'fixed',
      left: 0,
      top: 0,
      justifyContent: 'center',
      '& .MuiCircularProgress-root': {
        position: 'fixed',
        top: 'calc(50vh - 30px)',
      },
    },
  })
);

const Spinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size={60} />
    </div>
  );
};

const ComponentContainer = styled.div``;

export default Spinner;
