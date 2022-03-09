import React from 'react';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import {createStyles} from "@material-ui/core/styles";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {ERROR_RED, PRIMARY_GREEN} from "../../constants";

interface Props {
  title: string;
  type?: string;
  subtitle?: string;
  showLine?: boolean;
}
export default function BCSent({title, type = 'success', subtitle, showLine = true}:Props) {
  const componentStyles = styles();

  return (
  <>
    {showLine && <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px'}}/>}
    <div className={componentStyles.container}>
      {type === 'success' ?
        <CheckCircleIcon style={{color: PRIMARY_GREEN, fontSize: 100}}/>
        :
        <WarningIcon style={{color: ERROR_RED, fontSize: 100}}/>
      }
      <br/>
      <span className={componentStyles.title}>{title}</span>
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

const styles = makeStyles((theme: Theme) =>
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
    },
    subtitle: {
      color: '#4F4F4F',
      fontSize: 14,
      textAlign: 'center',
    }
  })
)

