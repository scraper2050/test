import React from 'react';
import noMessageImage from '../../../../assets/img/no_message.png';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {GRAY4} from "../../../../constants";

const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    image: {
      width: '10vw',
      marginBottom: 20,
    },
    text: {
      fontSize: 14,
      color: GRAY4,
    }
  })
)


export default function BCChatNoMessage(): JSX.Element {
  const componentStyles = styles();

  return <div className={componentStyles.container}>
    <img src={noMessageImage} className={componentStyles.image}/>
    <span className={componentStyles.text}>No message yet. Start chatting now</span>
  </div>
}
