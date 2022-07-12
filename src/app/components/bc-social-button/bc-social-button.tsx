import { Button } from '@material-ui/core';
import React from 'react';
import SocialLogin from 'react-social-login';
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles(   {
    buttonRoot: {
      color: 'grey',
      backgroundColor: 'white',
      width: 200,
      borderRadius: 8,
      boxShadow: '2px 2px 4px #ccc',
    },
    buttonLabel: {
      color: 'grey',
      textTransform: 'none',
    }
  })
);

function BCBCSocialButton(props: any) {
  const { children, triggerLogin, image } = props;
  const classes = useStyles();

  return (
    <Button
      elevation={6}
      onClick={triggerLogin}
      size={'medium'}
      type={'button'}
      classes={{
        root: classes.buttonRoot,
        label: classes.buttonLabel,
      }}
      variant={'text'}
      startIcon={<img
        alt={'google'}
        src={image}
        style={{width: 20, height: 20}}
      />}
      {...props}>
      {children}
    </Button>
  );
}

export default SocialLogin(BCBCSocialButton);
