import {
  IconButton,
  withStyles
} from '@material-ui/core';
import React, { useCallback } from 'react';
import styles from './bc-chat.styles';
import { formatDatTimelll } from "../../../../helpers/format";
import noAvatar from '../../../../assets/img/avatars/NoImageFound.png';


interface PROPS {
  classes?: any,
  item: any,
  idx: number,
  totalItemsCount: number,
}

function BCChatItemFriend({
  classes,
  item,
  idx,
  totalItemsCount
}: PROPS): JSX.Element {
  // const elemRef = useCallback((node) => {
  //   if (node !== null) {
  //     const lastChat = document.getElementById('last-chat-element');
  //     lastChat?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  //     // This ref function wait till the last element of the dom is rendered, so then, it scrollsdowns
  //   }
  // }, [])

  return (
    <div key={item._id} className={classes.chatItemContainer} id={item._id}>
      <div className={classes.otherUserChat}>
        <div className='avatar'>
          <img src={item.user.profile.imageUrl || noAvatar} alt="user avatar" />
        </div>
        {item.message !== "" &&
          <>
            <div className='arrow' />
            <div className='textbox'>
              <div className='textbox-content'>
                {item.message}
              </div>
            </div>
          </>
        }
        {/* <IconButton>
          <MoreVertIcon />
        </IconButton> */}
      </div>
      {!!item.images?.length && (
        <div className={classes.otherUserChat}>
          <div style={{ width: 38 }} />
          <div style={{ flex: 9, display: 'flex' }}>
            {item.images.map((img: any) => {
              return (
                <img src={img.imageUrl} key={img._id} onClick={() => window.open(img.imageUrl, "_blank")}
                  style={{
                    cursor: 'pointer',
                    height: 124,
                    boxShadow: '0 3px 10px rgb(0 0 0 / 20%)',
                    margin: 10,
                    borderRadius: 5,
                  }}
                />
              )
            })}
          </div>
        </div>
      )}
      <div className={classes.bottomItemContainer}>
        <div className={classes.timeStamp}>{formatDatTimelll(item.createdAt)}</div>
      </div>
      {/* {idx === totalItemsCount - 1 && (<div ref={elemRef}></div>)} */}
    </div>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true },
)(BCChatItemFriend);


