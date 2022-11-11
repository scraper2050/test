import React, { useEffect, useRef } from 'react';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import {createStyles} from "@material-ui/core/styles";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {ERROR_RED, PRIMARY_GREEN} from "../../constants";

interface Props {
  title: string;
  titlePadding?: string;
  type?: string;
  subtitle?: string;
  subtitlePadding?: string;
  showLine?: boolean;
  color?:string;
}
export default function BCSent({title, titlePadding = '', type = 'success', subtitle, subtitlePadding = '', showLine = true, color}:Props) {
  const componentStyles = styles({titlePadding, subtitlePadding});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef?.current?.scrollIntoView();
  }, [containerRef])
  

  return (
  <>
    {showLine && <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px'}}/>}
    <div className={componentStyles.container} ref={containerRef}>
      {type === 'success' ?
        <CheckCircleIcon style={{color: color || PRIMARY_GREEN, fontSize: 100}}/>
        :
        <WarningIcon style={{color: color || ERROR_RED, fontSize: 100}}/>
      }
      <br/>
      {title?.split('\n').map((text, textIndex) => <span key={textIndex} className={componentStyles.title}>{text}</span>)}
      {subtitle &&
        <>
          <br/><br/>
          <span className={componentStyles.subtitle}>{subtitle}</span>
        </>
      }
    </div>
  </>
  )
}

const styles = makeStyles<Theme, {titlePadding?: string; subtitlePadding?: string;}>((theme: Theme) =>
  createStyles({
    container: {
      height: '40vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: '#4F4F4F',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: props => props.titlePadding ? props.titlePadding : '0 80px',
    },
    subtitle: {
      color: '#4F4F4F',
      fontSize: 14,
      textAlign: 'center',
      padding: props => props.subtitlePadding ? props.subtitlePadding : '0 80px',
    }
  })
)

