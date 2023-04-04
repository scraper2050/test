import {
  Box,
  IconButton,
  InputBase,
  withStyles
} from '@material-ui/core';
import React, { useEffect, useRef, useState, UIEvent } from 'react';
import styles from './bc-chat.styles';
import BCCircularLoader from "../../bc-circular-loader/bc-circular-loader";
import CancelIcon from "@material-ui/icons/Cancel";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import BCChatItemFriend from "./bc-chat-item-friend";
import BCChatItemUser from "./bc-chat-item-user";
import styled from "styled-components";
import BCChatNoMessage from "./no-message";
import classNames from 'classnames';


interface PROPS {
  classes?: any;
  jobRequestID: string;
  visible: boolean;
  isChatLoading: boolean;
  chatContent: any[];
  onSubmit: (chat: any) => void;
  user: any;
  errorDispatcher: (message: string) => void;
  postJobRequestChat: (id: string, paramObject: FormData) => Promise<any>;
}

const MESSAGE_BATCH = 10;

function BCChat({
  classes,
  jobRequestID,
  visible,
  isChatLoading,
  chatContent,
  onSubmit,
  user,
  errorDispatcher,
  postJobRequestChat,
}: PROPS): JSX.Element {

  const [images, setImages] = useState<any>([]);
  const [input, setInput] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [startId, setStartId] = useState('');
  const [replyItem, setReplyItem] = useState<any>(null);
  const inputFileRef: any = useRef(null);

  useEffect(() => {
    const textBox = document.getElementById('chat-text-input');
    textBox?.focus();
    if (chatContent.length) {
      setStartId(chatContent[Math.max(chatContent.length - MESSAGE_BATCH, 0)]._id);
      setTimeout(() => {
        const lastChat = document.getElementById(chatContent[chatContent.length - 1]._id);
        lastChat?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 500)

    }
  }, [visible, chatContent])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const handleDownUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, ctrlKey } = e;
    if (key === 'Enter') {
      if (ctrlKey) {
        setInput(state => `${state}\n`)
      } else {
        e.preventDefault();
        handleSubmit();
      }
    }
  }

  const handleSubmit = async () => {
    if (((input && input.trim() !== '') || images?.length > 0) && !isSendingMessage && jobRequestID) {
      try {
        setIsSendingMessage(true);
        const formData = new FormData();
        formData.append('message', input.trim());
        if (images?.length) {
          images.forEach((image: any) => formData.append('images', image));
        }
        if (replyItem) {
          formData.append('replyToId', replyItem._id);
        }
        const result = await postJobRequestChat(jobRequestID, formData);
        if (result.status === 1) {
          onSubmit(result.chat);
          setInput('');
          setImages([]);
          setReplyItem(null);
          inputFileRef.current.value = null;
        } else {
          errorDispatcher(`Something went wrong when sending chat`);
        }
        setIsSendingMessage(false);
      } catch (error) {
        errorDispatcher(`Something went wrong when sending chat`);
        setIsSendingMessage(false);
      }
    }
  }

  const handleAttach = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
    const element = document.getElementById('chat-text-input');
    element?.focus();
  }

  const scrolltoMessgae = (id: string) => {
    const replyMessage = document.getElementById(id);
    if (replyMessage) replyMessage?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const renderChatContent = (item: any, idx: number, items: any[]) => {
    if (item.user._id !== user._id) {
      return <BCChatItemFriend key={item._id} item={item} onReply={() => setReplyItem(item)} onReplyPressed={scrolltoMessgae} />
    } else {
      return <BCChatItemUser key={item._id} item={item} onReply={() => setReplyItem(item)} onReplyPressed={scrolltoMessgae} />
    }
  }

  const partialRenderChat = () => {
    // const ind = startId ? chatContent.findIndex((chat: any) => chat._id === startId) : Math.max(chatContent.length - 5, 0);
    const ind = chatContent.findIndex((chat: any) => chat._id === startId);
    return chatContent.slice(ind).map(renderChatContent)
  }

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      setTimeout(() => {
        const lastChat = document.getElementById(startId);
        lastChat?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 500)
      const ind = startId ? chatContent.findIndex((chat: any) => chat._id === startId) : chatContent.length - 1;
      const newIndex = Math.max(ind - MESSAGE_BATCH, 0);
      setStartId(chatContent[newIndex]._id);
    }
  }

  return <>
    <div
      className={classNames({
        [classes.chatContainer]: true,
        [classes.imagesVisible]: images?.length > 0,
      })}
      id="chat-container"
      onScroll={(e) => handleScroll(e)}>
      {isChatLoading ? (
        <BCCircularLoader heightValue={'100%'} />
      ) : (
        chatContent.length ? partialRenderChat() : <BCChatNoMessage />
      )}
    </div>
    <div className={classes.imagesContainer}>
      <div style={{ flex: 1 }} />
      <div style={{ flex: 5, display: 'flex' }}>
        {!!images?.length && (
          images.map((img: any, imgIdx: number) => (
            <div key={imgIdx} className={classes.imageContainer}>
              <img src={URL.createObjectURL(img)} className={classes.imageFile} />
              <div className={classes.imageNameContainer}>{img.name}</div>
              <CancelIcon
                fontSize='small'
                onClick={() => {
                  setImages((prev: any) => {
                    const newArray = [...prev];
                    inputFileRef.current.value = null;
                    newArray.splice(imgIdx, 1)
                    return newArray;
                  })
                }}
              />
            </div>
          ))
        )}
      </div>
      <div style={{ flex: 1 }} />
    </div>
    {replyItem && <div className={classes.replyContainer}>
      <div style={{ flex: 2 }}>&nbsp;</div>
      <div style={{ flex: 10 }}>
        <span>Replying to <strong>{replyItem.user?.profile?.displayName}</strong>&nbsp;&nbsp;</span>
        <CancelIcon
          className={classes.cancelIcon}
          fontSize='inherit'
          onClick={() => setReplyItem(null)}
        />
        <br />
        <span className={classes.replyText}>{replyItem.message ? replyItem.message.substring(0, 25) : ''}</span>
      </div>
      <div style={{ flex: 2 }}>&nbsp;</div>
    </div>
    }
    <div className={classes.chatInputContainer}>
      <div className={classes.attachButton}>
        <Box onClick={handleAttach}>
          <AttachFileIcon htmlColor={images.length ? '#00AAFF' : '#D0D3DC'} />
        </Box>
      </div>
      <div className={classes.inputContainer} >
        <InputBase
          value={input}
          id={'chat-text-input'}
          onChange={handleChange}
          onKeyDown={handleDownUp}
          multiline={true}
          className={classes.textInput}
          placeholder="Write a message..."
          fullWidth
          rowsMax={3}
        />
      </div>
      <div className={classes.sendButton}>
        <Box onClick={handleSubmit}>
          <SendIcon htmlColor={((input && input.trim() !== '') || images?.length > 0) ? '#00AAFF' : '#D0D3DC'} />
        </Box>
      </div>
    </div>
    <input
      type={'file'}
      ref={inputFileRef}
      accept={"image/*"}
      multiple
      style={{ display: 'none' }}
      onChange={(e: any) => setImages([...e.currentTarget.files])}
    />
  </>
}

const InputBaseContainer = styled.div`

.MuiInputBase-inputMultiline {
  font-size: 15px;
  height:100%;
  overflow: hidden auto !important;
  color:#333333
 }

`;

export default withStyles(
  styles,
  { 'withTheme': true },
)(BCChat);


