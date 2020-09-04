import React from 'react';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

function BCModalTransition(props: any, ref: any) {
  return <Slide
    direction={'up'}
    ref={ref}
    {...props}
  />;
}
export default React.forwardRef<unknown, TransitionProps>(BCModalTransition);
