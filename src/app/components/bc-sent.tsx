import React from 'react';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {createStyles} from "@material-ui/core/styles";
import {makeStyles, Theme} from "@material-ui/core/styles";

interface Props {
  title: string;
}
export default function BCSent({title}:Props) {
  const componentStyles = styles();

  return (
  <>
    <hr style={{height: '1px', background: '#D0D3DC', borderWidth: '0px'}}/>
    <div className={componentStyles.container}>
      <CheckCircleIcon style={{color: '#50AE55', fontSize: 100}}/><br/>
      <span style={{color: '#4F4F4F', fontSize: 30, fontWeight: 'bold'}}>{title}</span>
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

    }
  })
)

