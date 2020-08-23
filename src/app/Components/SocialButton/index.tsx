import React from 'react';
import SocialLogin, { Props } from 'react-social-login';
import { Button } from '@material-ui/core';

interface SocialButtonProps extends Props {
  children: React.ReactNode;
}

class SocialButton extends React.Component<SocialButtonProps, {}> {
  render(): JSX.Element {
    return (
      <Button
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        type="button"
        onClick={this.props.triggerLogin}
        {...this.props}
      >
        {this.props.children}
      </Button>
    );
  }
}

export default SocialLogin(SocialButton);
