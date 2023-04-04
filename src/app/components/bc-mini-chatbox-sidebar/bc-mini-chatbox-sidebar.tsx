// TODO this component is never used, should we get rid of it?
import React, { useState, useEffect, ReactHTMLElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Fab,
  withStyles,
  Badge,
  InputBase,
} from '@material-ui/core';
import groupBy from 'lodash.groupby';
import Carousel from 'react-material-ui-carousel'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import classnames from 'classnames';
import styles from './bc-mini-chatbox-sidebar.style';
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";
import { formatDatTimelll } from 'helpers/format';
import { getJobRequestChat, postJobRequestChat } from 'api/chat.api';
import { error as SnackBarError } from 'actions/snackbar/snackbar.action';

interface MiniSidebarProps {
  classes: any;
  jobRequestId: string;
  name: string;
}

const BCMiniChatboxSidebar = ({ classes, jobRequestId, name }: MiniSidebarProps) => {
  const dispatch = useDispatch();
  const { user }: any = useSelector(({ auth }: any) => auth);
  const [open, setOpen] = useState(false);
  const [chatContent, setChatContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const [input, setInput] = useState('')

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async () => {
    if(input && !isSendingMessage){
      try {
        setIsSendingMessage(true);
        const formData = new FormData();
        formData.append('message', input)
        const result = await postJobRequestChat(jobRequestId, formData);
        if(result.status === 1) {
          getChatContent(jobRequestId);
          setInput('');
        } else {
          dispatch(SnackBarError(`Something went wrong when sending chat`));
        }
        setIsSendingMessage(false);
      } catch (error) {
        dispatch(SnackBarError(`Something went wrong when sending chat`));
        setIsSendingMessage(false);
      }
    }
  }

  const handleAttach = () => {
    console.log('handleAttach')
  }

  const getChatContent = async (id: string) => {
    try {
      setIsLoading(true);
      const result = await getJobRequestChat(id);
      if(result.status === 1) {
        setChatContent(result.chats);
      } else {
        dispatch(SnackBarError(`Something went wrong when retreiving chats`));
      }
      setIsLoading(false);
    } catch (error) {
      dispatch(SnackBarError(`Something went wrong when retreiving chats`));
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(jobRequestId){
      getChatContent(jobRequestId)
    }
  }, [jobRequestId])
  
  const renderChatContent = (item: any) => {
    if (item.user._id !== user._id ) {
      return (
        <div key={item._id} className={classes.chatItemContainer}>
          <div className={classes.otherUserChat}>
            <div className='avatar'>
              <img src={item.user.profile.imageUrl} alt="user avatar" />
            </div>
            <div className='arrow' />
            <div className='textbox'>
              {item.message}
            </div>
          </div>
          {!!item.images?.length && (
            <div className={classes.otherUserChat}>
              <div style={{flex: 2}} />
              <div style={{flex: 9, display: 'flex'}}>
                {item.images.map((img:any) => {
                  return (
                    <div key={img._id} style={{
                      flex: 1,
                      borderRadius: 5,
                      cursor: 'pointer',
                      backgroundImage: `url('${img.imageUrl}')`,
                      backgroundSize: 'cover',
                      height: 84,
                    }} />
                  )
                })}
              </div>
            </div>
          )}
          <div className={classes.bottomItemContainer}>
            <div className={classes.timeStamp}>{formatDatTimelll(item.createdAt)}</div>
            <div className={classes.readStatus}>{item?.readStatus?.isRead ? 'Read' : 'Unread'}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div key={item._id} className={classes.chatItemContainer}>
          <div className={classes.currentUserChat}>
            <div className='avatar'>
              <img src={item.user.profile.imageUrl} alt="user avatar" />
            </div>
            <div className='arrow' />
            <div className='textbox'>
              {item.message}
            </div>
          </div>
          {!!item.images?.length && (
            <div className={classes.currentUserChat}>
              <div style={{flex: 2}} />
              <div style={{flex: 9, display: 'flex'}}>
                {item.images.map((img:any) => {
                  return (
                    <div key={img._id} style={{
                      flex: 1,
                      borderRadius: 5,
                      cursor: 'pointer',
                      backgroundImage: `url('${img.imageUrl}')`,
                      backgroundSize: 'cover',
                      height: 84,
                    }} />
                  )
                })}
              </div>
            </div>
          )}
          <div className={classes.bottomItemContainer} style={{textAlign: 'right'}}>
            <div className={classes.timeStamp}>{formatDatTimelll(item.createdAt)}</div>
            <div className={classes.readStatus}>{item?.readStatus?.isRead ? 'Read' : 'Unread'}</div>
          </div>
        </div>
      )
    }
  }
  
  return (
    <div style={{position: 'relative', top: '-100px'}}>
      <Box
        position='absolute'
        top={20}
        left={open ? 290 : 0}
        className={classes.fab}
      >
        <Fab
          size='medium'
          className={classes.fab}
          onClick={open ? handleDrawerClose : handleDrawerOpen}
        >
          <Badge color="secondary" badgeContent={chatContent.length}>
            <QuestionAnswerIcon style={{ fontSize: 25, color: '#00AAFF' }} />
          </Badge>
        </Fab>
      </Box>
      <Drawer
        open={open}
        onClose={handleDrawerClose}
        anchor="left"
        variant="persistent"
        PaperProps={{
          className: classes.drawer
        }}
        className={classnames(classes.open, {
          [classes.drawerClose]: !open,
        })}
      >
        <div className={classes.chatHeader}>
          <Box
            className={classes.chatCloseButton}
            onClick={handleDrawerClose}
            style={{ cursor: 'pointer'}}
          >
            <CloseIcon style={{ fontSize: 25, color: '#D0D3DC' }}/>
          </Box>
          <div className={classes.chatTitle}>
            {name}
          </div>
        </div>
        <div className={classes.chatContainer}>
          {isLoading ? (
            <BCCircularLoader heightValue={'100%'}/>
          ) : (
            chatContent.map(renderChatContent)
          )}
        </div>
        <div className={classes.chatInputContainer}>
          <div className={classes.attachButton}>
            <Box onClick={handleAttach}>
              <AttachFileIcon htmlColor='#D0D3DC'/>
            </Box>
          </div>
          <div className={classes.inputContainer}>
            <InputBase value={input} onChange={handleChange} placeholder="Write a message" />
          </div>
          <div className={classes.sendButton}>
            <Box onClick={handleSubmit}>
              <SendIcon htmlColor={input ? '#00AAFF' : '#D0D3DC'}/>
            </Box>
          </div>
        </div>
      </Drawer>
    </div>
  );
}


export default withStyles(
  styles,
  { 'withTheme': true }
)(BCMiniChatboxSidebar);