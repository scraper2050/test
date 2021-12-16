import React from 'react';
import {createStyles} from "@material-ui/core/styles";
import {makeStyles, Theme} from "@material-ui/core/styles";
import { ReactComponent as NoResultIcon } from '../../assets/img/no_search.svg';

interface Props {
  message: string;
}
export default function BCNoResults({message}:Props) {
  const componentStyles = styles();

  return (
  <>
    <div className={componentStyles.container}>
      <NoResultIcon style={{width: '15%', height: '15%', marginBottom: 10}}/>
      <h4>{message}</h4>
    </div>
  </>
  )
}

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 15,
    }
  })
)

