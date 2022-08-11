import styles from './bc-job-request-modal.styles';
import {
  Button, 
  DialogActions,
  Grid,
  Typography,
  withStyles,
  useTheme,
  InputBase,
  Box,
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import {
  formatDate,
  formatDatTimelll,
} from 'helpers/format';
import { getJobRequestDescription } from 'helpers/job';
import styled from 'styled-components';
import '../../../scss/job-poup.scss';
import classNames from "classnames";
import BCDragAndDrop from "../../components/bc-drag-drop/bc-drag-drop";
import BCMapWithMarker from 'app/components/bc-map-with-marker/bc-map-with-marker';
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import BCTabs2 from 'app/components/bc-tab2/bc-tab2';
import InfoIcon from '@material-ui/icons/Info';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  closeModalAction,
  openModalAction,
  setModalDataAction
} from "../../../actions/bc-modal/bc-modal.action";
import { modalTypes } from "../../../constants";
import { getContacts } from "../../../api/contacts.api";
import { getJobRequestChat, postJobRequestChat } from 'api/chat.api';
import { error as SnackBarError } from 'actions/snackbar/snackbar.action';

const initialJobRequestState = {
  customer: {
    _id: '',
  },
  description: '',
  employeeType: false,
  equipment: {
    _id: '',
  },
  dueDate: '',
  scheduleDate: null,
  scheduledEndTime: null,
  scheduledStartTime: null,
  technician: {
    _id: '',
  },
  contractor: {
    _id: '',
  },
  ticket: {
    _id: '',
  },
  type: {
    _id: '',
  },
  jobLocation: {
    _id: '',
  },
  jobSite: {
    _id: '',
  },
  jobRescheduled: false,
};

function BCViewJobRequestModal({
  classes,
  jobRequest = initialJobRequestState,
}: any): JSX.Element {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { contacts } = useSelector((state: any) => state.contacts);
  const customerContact =
    jobRequest.customerContact && contacts.find((contact: any) => contact.userId === jobRequest.customerContact._id)?.name;
  const { user }: any = useSelector(({ auth }: any) => auth);
  const [curTab, setCurTab] = useState(0);
  const [chatContent, setChatContent] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [input, setInput] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const inputFileRef:any = useRef(null);
  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    const data: any = {
      type: 'Customer',
      referenceNumber: jobRequest.customer._id,
    };
    dispatch(getContacts(data));
  }, []);

  useEffect(() => {
    if (jobRequest?._id) {
      getChatContent(jobRequest._id);
    }
  }, [jobRequest])

  useEffect(() => {
    const element = document.getElementById('chat-text-input');
    setImmediate(() => curTab === 1 && element && element.scrollIntoView({behavior: 'smooth'}));
    element?.focus();
  }, [curTab, chatContent])
  


  const getChatContent = async (id: string) => {
    try {
      setIsChatLoading(true);
      const result = await getJobRequestChat(id);
      if (result.status === 1) {
        setChatContent(result.chats);
      } else {
        console.log(result.message);
        dispatch(SnackBarError(`Something went wrong when retreiving comments`));
      }
      setIsChatLoading(false);
    } catch (error) {
      console.log(error);
      dispatch(SnackBarError(`Something went wrong when retreiving comments`));
      setIsChatLoading(false);
    }
  }

  const dueDate = jobRequest.dueDate;
  // TODO make sure canEdit
  // const canEdit = [0, 4, 6].indexOf(jobRequest.status) >= 0;
  let positionValue: { lat?: number; long?: number } = {};
  if (jobRequest.jobSite?.location?.coordinates?.length === 2) {
    positionValue.long = jobRequest.jobSite.location.coordinates[0];
    positionValue.lat = jobRequest.jobSite.location.coordinates[1];
  } else if (jobRequest.jobLocation?.location?.coordinates?.length === 2) {
    positionValue.long = jobRequest.jobLocation.location.coordinates[0];
    positionValue.lat = jobRequest.jobLocation.location.coordinates[1];
  }

  const openRejectJobRequestModal = () => {
    dispatch(setModalDataAction({
      'data': {
        jobRequest: jobRequest,
        modalTitle: 'Request Rejection',
      },
      'type': modalTypes.REJECT_JOB_REQUEST_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const createJob = () => {
    dispatch(setModalDataAction({
      'data': {
        'job': {
          'customer': {
            '_id': ''
          },
          'description': '',
          'employeeType': false,
          'equipment': {
            '_id': ''
          },
          'scheduleDate': null,
          'scheduledEndTime': null,
          'scheduledStartTime': null,
          'technician': {
            '_id': ''
          },
          ticket: {
            ...jobRequest,
            tasks: [],
            note: jobRequest.requests?.filter((request: any) => request.note).map((request: any) => request.note).join('\n\n'),
            images: jobRequest.requests?.map((request: any) => request.images || []).flat(1) || [],
          },
          'type': {
            '_id': ''
          },
          'jobFromRequest': true,
        },
        'modalTitle': 'Create Job',
        'removeFooter': false,
      },
      'type': modalTypes.EDIT_JOB_MODAL
    }));
  }

  const handleClose = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const renderJobRequestContent = () => (
    <div hidden={curTab !== 0}>
      <Grid container className={'modalContent'} justify={'space-around'}>
        <Grid item xs={12} sm={4}>
          <TopMarginedContainer>
            <Typography variant={'caption'} className={'previewCaption'}>{'Subdivision'}</Typography>
            <Typography>{jobRequest.jobLocation?.name || 'N/A'}</Typography>
          </TopMarginedContainer>
          <TopMarginedContainer>
            <Typography variant={'caption'} className={'previewCaption'}>{'Address'}</Typography>
            <Typography>{jobRequest.jobSite?.name || 'N/A'}</Typography>
          </TopMarginedContainer>
          <TopMarginedContainer>
            <Typography variant={'caption'} className={'previewCaption'}>{'Contact Associated'}</Typography>
            <Typography>{customerContact || 'N/A'}</Typography>
          </TopMarginedContainer>
          <TopMarginedContainer>
            <Typography variant={'caption'} className={'previewCaption'}>{'Customer PO'}</Typography>
            <Typography>{jobRequest.customerPO || 'N/A'}</Typography>
          </TopMarginedContainer>
        </Grid>
        <Grid item xs={12} sm={8}>
          <TopMarginedContainer>
            <div className={classNames(classes.paper, classes.mapWrapper)}>
              <BCMapWithMarker
                lang={positionValue.long}
                lat={positionValue.lat}
              />
            </div>
          </TopMarginedContainer>
        </Grid>
      </Grid>
      <Grid container className={'modalContent'} justify={'space-around'}>
        <Grid item xs={12}>
          <TopMarginedContainer>
            <div style={{ borderBottom: '1px solid #bdbdbd' }} />
          </TopMarginedContainer>
        </Grid>
      </Grid>
      {jobRequest.requests.map((request: any, requestIndex: number, arr: Array<any>) =>
        <React.Fragment key={requestIndex}>
          <Grid container className={'modalContent'} justify={'space-around'}>
            <Grid item xs={12} sm={8}>
              <Typography variant={'caption'} className={'previewCaption'}>{`Job Request ${requestIndex + 1}`}</Typography>
              <Typography variant={'h6'} className={'previewText'}>{request.category}</Typography>
            </Grid>
            <Grid item xs={12} sm={4} />
          </Grid>
          <Grid container className={classNames(['modalContent', 'modalContentBottom'])} justify={'space-around'}>
            <Grid item xs={12} sm={8}>
              <Typography variant={'caption'} className={'previewCaption'}>{'Notes'}</Typography>
              <Typography>
                {request.note}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant={'caption'} className={'previewCaption'}>photo(s)</Typography>
              <BCDragAndDrop images={request.images?.length ? request.images.map((image: any) => image.imageUrl) : []} readonly={true} />
            </Grid>
          </Grid>
          <Grid container className={'modalContent'} justify={'space-around'}>
            <Grid item xs={12}>
              {requestIndex !== arr.length - 1 && <div style={{ borderBottom: '1px solid #bdbdbd' }} />}
            </Grid>
          </Grid>
        </React.Fragment>
      )}
      <DialogActions>
        <Button
          onClick={handleClose}
          variant={'outlined'}
        >
          Close
        </Button>
        {jobRequest.status === 0 && (
          <>
            <Button
              onClick={openRejectJobRequestModal}
              variant={'contained'}
              classes={{
                root: classes.purpleButton
              }}
            >
              Reject Request
            </Button>
            <Button
              color={'primary'}
              onClick={createJob}
              variant={'contained'}
            >
              Create Job
            </Button>
          </>
        )}
      </DialogActions>
    </div>
  );

  const renderMessageTab = () => (
    <>
      <div className={classes.chatContainer}>
        {isChatLoading ? (
          <BCCircularLoader heightValue={'100%'}/>
        ) : (
          chatContent.map(renderChatContent)
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
          <InputBaseContainer>
            <InputBase value={input} id={'chat-text-input'} onChange={handleChange} multiline={true} className={classes.textInput} placeholder="Write a message..." onKeyUp={handleKeyUp} fullWidth/>
          </InputBaseContainer>
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
  );


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setInput(e.target.value);
  }

  const handleKeyUp = ({key}: any) => {
    if (key === 'Enter') {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    if(((input && input.trim() !== '') || images?.length > 0) && !isSendingMessage && jobRequest?._id){
      try {
        setIsSendingMessage(true);
        const formData = new FormData();
        formData.append('message', input.trim())
        if(images?.length){
          images.forEach((image: any) => formData.append('images', image))
        }
        const result = await postJobRequestChat(jobRequest._id, formData);
        if(result.status === 1) {
          getChatContent(jobRequest._id);
          setInput('');
          setImages([]);
          inputFileRef.current.value = null;
        } else {
          console.log(result.message);
          dispatch(SnackBarError(`Something went wrong when sending chat`));
        }
        setIsSendingMessage(false);
      } catch (error) {
        console.log(error);
        dispatch(SnackBarError(`Something went wrong when sending chat`));
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
      
      return (
        <div key={item._id} className={classes.chatItemContainer} id={idx === items.length-1 ? 'last-chat-element' : ''}>
          <div className={classes.otherUserChat}>
            <div className='avatar'>
              <img src={item.user.profile.imageUrl} alt="user avatar" />
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
          </div>
          {!!item.images?.length && (
            <div className={classes.otherUserChat}>
              <div style={{width: 38}} />
              <div style={{flex: 9, display: 'flex'}}>
                {item.images.map((img:any) => {
                  return (
                    <img src={img.imageUrl}  key={img._id} onClick={()=> window.open(img.imageUrl, "_blank")}
                      style={{
                        cursor: 'pointer',
                        height:124,                      
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
            <div className={classes.readStatus}>{item?.readStatus?.isRead ? 'Read' : 'Unread'}</div>
          </div>
        </div>
      )
    } else {
      return (
        <div key={item._id} className={classes.chatItemContainer} id={idx === items.length-1 ? 'last-chat-element' : ''}>
          <div className={classes.currentUserChat}>
            <div className='avatar'>
              <img src={item.user.profile.imageUrl} alt="user avatar" />
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
          </div>
          {!!item.images?.length && (
            <div className={classes.currentUserChat}>
              <div style={{width: 38}} />
              <div style={{flex: 9, display: 'flex', flexDirection: 'row-reverse'}}>
                {item.images.map((img:any) => {
                  return (
                    <img src={img.imageUrl}  key={img._id} onClick={()=> window.open(img.imageUrl, "_blank")}
                      style={{
                        cursor: 'pointer',
                        height:124,                      
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
          <div className={classes.bottomItemContainer} style={{textAlign: 'right'}}>
            <div className={classes.timeStamp}>{formatDatTimelll(item.createdAt)}</div>
            <div className={classes.readStatus}>{item?.readStatus?.isRead ? 'Read' : 'Unread'}</div>
          </div>
        </div>
      )
    }
  }

  return (
    <DataContainer className={'new-modal-design'}>
      <Grid container className={'modalPreview'} justify={'space-around'}>
        <Grid item xs>
          <Typography variant={'caption'} className={'previewCaption'}>customer</Typography>
          <Typography variant={'h6'} className={'bigText'}>{jobRequest.customer?.profile?.displayName || 'N/A'}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'caption'} className={'previewCaption'}>due date</Typography>
          <Typography variant={'h6'} className={'previewTextTitle'}>{dueDate ? formatDate(dueDate) : 'N/A'}</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant={'caption'} className={'previewCaption'}>category</Typography>
          <Typography variant={'h6'} className={'previewTextTitle'} style={{ textTransform: 'capitalize' }}>{getJobRequestDescription(jobRequest)}</Typography>
        </Grid>
      </Grid>
      <BCTabs2
          curTab={curTab}
          indicatorColor={'primary'}
          onChangeTab={handleTabChange}
          tabsData={[
            {
              'label': 'DETAILS',
              'value': 0,
              'icon': InfoIcon,
            },
            {
              'label': 'COMMENTS',
              'value': 1,
              'icon': QuestionAnswerIcon,
              'badge': chatContent.length,
            },
          ]}
        />
      <div className={'modalDataContainer'} style={{maxHeight: '60vh'}}>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={curTab}
          disabled
          slideStyle={{overflow: 'hidden'}}
        >
          {renderJobRequestContent()}
          {renderMessageTab()}
        </SwipeableViews>
      </div>
    </DataContainer>
  );
}

const DataContainer = styled.div`
  margin: auto 0;

  .modalContent {
    padding-top: 15px !important;
  }
  .modalContentBottom {
    padding-bottom: 15px !important;
  }

  .MuiTableCell-root {
    line-height: normal;
  }

  .MuiTableCell-sizeSmall {
    padding: 0px 16px;
  }

  .MuiButton-containedSecondary {
    margin-left: 15px !important;
  }

`;

const InputBaseContainer = styled.div`

.MuiInputBase-inputMultiline {
  font-size: 15px;
  margin-left: -5px;
  height:70px !important;
  overflow: hidden auto !important;
  margin-top:15px;
  color:#333333
 }

`;

const TopMarginedContainer = styled.div`
  margin-top: 30px;
`

export default withStyles(styles, { withTheme: true })(BCViewJobRequestModal);
