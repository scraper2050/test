import {
  Box,
  InputBase,
  withStyles
} from '@material-ui/core';
import React, {useEffect, useRef, useState} from 'react';
import styles from './bc-chat.styles';
import BCCircularLoader from "../../bc-circular-loader/bc-circular-loader";
import CancelIcon from "@material-ui/icons/Cancel";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import BCChatItemFriend from "./bc-chat-item-friend";
import BCChatItemUser from "./bc-chat-item-user";
import styled from "styled-components";
import BCChatNoMessage from "./no-message";

interface PROPS {
  classes?: any;
  jobRequestID: string;
  visible: boolean;
  isChatLoading: boolean;
  chatContent: any[];
  onSubmit: () => void;
  user: any;
  errorDispatcher: (message:string) => void;
  postJobRequestChat: (id: string, paramObject: FormData) => Promise<any>;
}

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
  const inputFileRef:any = useRef(null);

  useEffect(() => {
    const textBox = document.getElementById('chat-text-input');
    textBox?.focus();
    const lastChat = document.getElementById('last-chat-element');
    lastChat?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [visible, chatContent])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const handleKeyUp = ({key}: any) => {
    if (key === 'Enter') {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    if(((input && input.trim() !== '') || images?.length > 0) && !isSendingMessage && jobRequestID){
      try {
        setIsSendingMessage(true);
        const formData = new FormData();
        formData.append('message', input.trim())
        if(images?.length){
          images.forEach((image: any) => formData.append('images', image))
        }
        const result = await postJobRequestChat(jobRequestID, formData);
        if(result.status === 1) {
          onSubmit();
          setInput('');
          setImages([]);
          inputFileRef.current.value = null;
        } else {
          console.log(result.message);
          errorDispatcher(`Something went wrong when sending chat`);
        }
        setIsSendingMessage(false);
      } catch (error) {
        console.log(error);
        errorDispatcher(`Something went wrong when sending chat`);
        setIsSendingMessage(false);
      }
    }
  }

  const handleAttach = () => {
    if(inputFileRef.current){
      inputFileRef.current.click();
    }
    const element = document.getElementById('chat-text-input');
    element?.focus();
  }

  const renderChatContent = (item: any, idx:number, items:any[]) => {
    if (item.user._id !== user._id ) {
      return <BCChatItemFriend key={item._id} item={item} idx={idx} totalItemsCount={items.length} />
    } else {
      return <BCChatItemUser key={item._id} item={item} idx={idx} totalItemsCount={items.length} />
    }
  }

  return <>
    <div className={classes.chatContainer} id="chat-container">
      {isChatLoading ? (
        <BCCircularLoader heightValue={'100%'}/>
      ) : (
        chatContent.length ? chatContent.map(renderChatContent) : <BCChatNoMessage />
      )}
    </div>
    <div className={classes.imagesContainer}>
      <div style={{flex:1}}/>
      <div style={{flex: 5, display: 'flex'}}>
        {!!images?.length && (
          images.map((img:any, imgIdx:number) => (
            <div key={imgIdx} className={classes.imageContainer}>
              <img src={URL.createObjectURL(img)} className={classes.imageFile} />
              <div className={classes.imageNameContainer}>{img.name}</div>
              <CancelIcon
                fontSize='small'
                onClick={() => {
                  setImages((prev:any) => {
                    const newArray = [...prev];
                    inputFileRef.current.value = null;
                    newArray.splice(imgIdx,1)
                    return newArray;
                  })
                }}
              />
            </div>
          ))
        )}
      </div>
      <div style={{flex:1}}/>
    </div>
    <div className={classes.chatInputContainer}>
      <div className={classes.attachButton}>
        <Box onClick={handleAttach}>
          <AttachFileIcon htmlColor={images.length ? '#00AAFF' : '#D0D3DC'}/>
        </Box>
      </div>
      <div className={classes.inputContainer} >
          <InputBase
            value={input}
            id={'chat-text-input'}
            onChange={handleChange}
            multiline={true}
            className={classes.textInput}
            placeholder="Write a message..."
            fullWidth
            rowsMax={3}
          />
      </div>
      <div className={classes.sendButton}>
        <Box onClick={handleSubmit}>
          <SendIcon htmlColor={((input && input.trim() !== '') || images?.length > 0)? '#00AAFF' : '#D0D3DC'}/>
        </Box>
      </div>
    </div>
    <input
      type={'file'}
      ref={inputFileRef}
      accept={"image/*"}
      multiple
      style={{display: 'none'}}
      onChange={(e:any) => setImages([...e.currentTarget.files])}
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


