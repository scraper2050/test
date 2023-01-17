import {
  IconButton,
  withStyles
} from '@material-ui/core';
import React, { useCallback } from 'react';
import styles from './bc-chat.styles';
import { formatDatTimelll } from "../../../../helpers/format";
import noAvatar from "../../../../assets/img/avatars/NoImageFound.png";
import ReplyIcon from '@material-ui/icons/Reply';
import { GRAY3, GRAY6 } from '../../../../constants';
import classnames from 'classnames';

interface PROPS {
  classes?: any,
  item: any,
  onReply: () => void,
  onReplyPressed: (id: string) => void;
}

function BCChatItemUser({
  classes,
  item,
  onReply,
  onReplyPressed,
}: PROPS): JSX.Element {
  const { replyTo } = item;
  return (
    <>
      <div key={item._id} className={classes.chatItemContainer} id={item._id}>
        <div className={classes.currentUserChat}>
          <div className={classnames('avatar', { avatarReply: !!replyTo })}>
            <img src={item.user.profile.imageUrl || noAvatar} alt="user avatar" />
          </div>
          {item.message !== "" &&
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {replyTo &&
                <div className='replyBox' onClick={() => onReplyPressed(replyTo._id)}>
                  <span>{`${replyTo.message.slice(0, 15)}... ${formatDatTimelll(replyTo.updatedAt)} by ${replyTo.user.profile.displayName}`}</span>
                </div>
              }
              <div style={{ position: 'relative' }}>
                <div className='arrow' />
                <div className='textbox'>
                  <div className='textbox-content'>
                    {item.message}
                  </div>
                </div>
                <IconButton size="small" className='replyButton' onClick={onReply}>
                  <ReplyIcon fontSize="small" />
                </IconButton>
              </div>

            </div>
          }

        </div>
        {!!item.images?.length && (
          <div className={classes.currentUserChat}>
            <div style={{ width: 38 }} />
            <div style={{ flex: 9, display: 'flex', flexDirection: 'row-reverse' }}>
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
        <div className={classes.bottomItemContainer} style={{ textAlign: 'right' }}>
          <div className={classes.timeStamp}>{formatDatTimelll(item.createdAt)}</div>
          {item?.readStatus?.isRead && <div className={classes.readStatus}>Read by {item.readStatus.readBy?.profile?.displayName}</div>}
        </div>
      </div>
    </>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true },
)(BCChatItemUser);


