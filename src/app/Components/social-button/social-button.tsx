import { Button } from '@material-ui/core';
import React from 'react';
import SocialLogin from 'react-social-login';

function SocialButton(props: any) {
  const { children, triggerLogin } = props;
  return (
    <Button
      color={'primary'}
      fullWidth
      onClick={triggerLogin}
      size={'large'}
      type={'button'}
      variant={'contained'}
      {...props}>
      {children}
    </Button>
  );
}

export default SocialLogin(SocialButton);
