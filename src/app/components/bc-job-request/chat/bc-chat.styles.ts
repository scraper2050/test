import { Theme } from '@material-ui/core/styles';
import { GRAY1, GRAY3, GRAY6 } from '../../../../constants';

export default (theme: Theme): any => ({
  chatContainer: {
    height: '42vh',
    padding: '25px 100px',
    overflow: 'scroll',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      width: 7,
    },
    '&::-webkit-scrollbar-track': {
      background: '#fff',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#EAECF3',
    },
    '@media(max-width: 767px)': {
      'padding': '25px 25px',
    }
  },
  chatItemContainer: {
    marginBottom: 10,
  },
  replyContainer: {
    display: 'flex',
    color: GRAY1,
    fontSize: 10,
    paddingTop: 10,
  },
  replyText: {
    color: GRAY3,
  },
  currentUserChat: {
    display: 'flex',
    flexDirection: 'row-reverse',
    '& div.replyBox': {
      backgroundColor: GRAY6,
      color: GRAY3,
      padding: 4,
      margin: '0 5px',
      borderRadius: 5,
      cursor: 'pointer',
      fontSize: 10,
    },
    '& div.avatarReply': {
      marginTop: 28,
    },
    '& div.textbox': {
      // flex: 9,
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row-reverse'
    },
    '& div.textbox-content': {
      maxWidth: 640,
      color: 'white',
      flex: 1,
      textAlign: 'right',
      borderRadius: 5,
      backgroundColor: '#00AAFF',
      padding: '10px 20px',
      fontSize: 14,
      wordBreak: 'break-word',
      whiteSpace: 'pre-line',
    },
    '& div.arrow': {
      width: 0,
      height: 0,
      position: 'absolute',
      right: -7,
      top: 7,
      borderTop: '7px solid transparent',
      borderBottom: '7px solid transparent',
      borderLeft: '7px solid #00AAFF',
    },
    '& div.avatar': {
      marginLeft: 10,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start'
    },
    '& div.avatar img': {
      width: 24,
      height: 24,
      borderRadius: '50%',
    },
    '& .replyButton': {
      position: 'absolute',
      left: -24,
      top: -7,
    },
  },
  otherUserChat: {
    display: 'flex',
    flexDirection: 'row',
    '& div.replyBox': {
      backgroundColor: GRAY6,
      color: GRAY3,
      padding: 4,
      margin: '0 5px',
      borderRadius: 5,
      cursor: 'pointer',
      fontSize: 10,
    },
    '& .replyButton': {
      position: 'absolute',
      right: -24,
      top: -7,
    },
    '& div.avatarReply': {
      marginTop: 28,
    },
    '& div.textbox': {
      // flex: 9,
      display: 'flex',
      justifyContent: 'flex-start',
    },
    '& div.textbox-content': {
      maxWidth: 640,
      flex: 1,
      color: '#4f4f4f',
      borderRadius: 5,
      backgroundColor: '#E5F7FF',
      padding: '10px 20px',
      fontSize: 14,
      wordBreak: 'break-word',
      whiteSpace: 'pre-line',
    },
    '& div.arrow': {
      width: 0,
      height: 0,
      position: 'absolute',
      top: 7,
      left: -7,
      borderTop: '7px solid transparent',
      borderBottom: '7px solid transparent',
      borderRight: '7px solid #E5F7FF',
    },
    '& div.avatar': {
      marginRight: 10,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    '& div.avatar img': {
      width: 24,
      height: 24,
      borderRadius: '50%',
    },
  },
  timeStamp: {
    color: '#BDBDBD',
    fontSize: 10,
  },
  readStatus: {
    color: '#BDBDBD',
    fontSize: 10,
  },
  bottomItemContainer: {
    marginTop: 5,
  },
  imagesContainer: {
    borderTop: '1px solid #D0D3DC',
    display: 'flex',
    // position: 'absolute',
    // bottom: 100,
    width: '100%',
    overflow: 'auto',
    backgroundColor: 'white'
  },
  imagesVisible: {
    height: '23vh',
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    height: 120,
    marginRight: 20,
  },
  imageNameContainer: {
    whiteSpace: 'nowrap',
    width: 100,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  imageFile: {
    height: 100,
    borderRadius: 5,
    marginRight: 5
  },
  chatInputContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  attachButton: {
    marginTop: 25,
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    '& svg': {
      cursor: 'pointer',
    },
  },
  inputContainer: {
    flex: 10,
    margin: '15px 0px',
  },
  textInput: {
    flex: 10,
    alignItems: 'flex-start',
    padding: '15px 0 4px 15px',
    border: '1px solid #EAECF3',
    borderRadius: 8,
    minHeight: 76,
    fontSize: 15,
    color: '#333333',
  },
  sendButton: {
    marginTop: 25,
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-start',
    '& svg': {
      cursor: 'pointer',
    },
    marginLeft: 5
  },
  cancelIcon: {
    cursor: 'pointer',
  }
});
