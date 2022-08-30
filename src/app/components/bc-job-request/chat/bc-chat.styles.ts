import { Theme } from '@material-ui/core/styles';

export default (theme: Theme): any => ({
  chatContainer: {
    height: 412,
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
  currentUserChat: {
    display: 'flex',
    flexDirection : 'row-reverse',
    '& div.textbox': {
      flex: 9,
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row-reverse'
    },
    '& div.textbox-content': {
      maxWidth: 640,
      color: 'white',
      borderRadius: 5,
      backgroundColor: '#00AAFF',
      padding: '10px 20px',
      fontSize: 14,
      wordBreak:'break-word',
      whiteSpace: 'pre-line',
    },
    '& div.arrow': {
      width: 0,
      height: 0,
      position: 'relative',
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
  },
  otherUserChat: {
    display: 'flex',
    flexDirection : 'row',
    '& div.textbox': {
      flex: 9,
      display: 'flex',
      justifyContent: 'flex-start',
    },
    '& div.textbox-content': {
      maxWidth: 640,
      color: '#4f4f4f',
      borderRadius: 5,
      backgroundColor: '#E5F7FF',
      padding: '10px 20px',
      fontSize: 14,
      wordBreak:'break-word',
      whiteSpace: 'pre-line',
    },
    '& div.arrow': {
      width: 0,
      height: 0,
      position: 'relative',
      top: 7,
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
    position:'absolute',
    bottom:100,
    width:'100%',
    overflow:'auto',
    backgroundColor:'white'
  },
  imageContainer: {
    display:'flex',
    alignItems:'center',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachButton: {
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-end',
    '& svg': {
      cursor: 'pointer',
    },
  },
  inputContainer: {
    flex: 10,
    margin:'15px 0px',
  },
  textInput: {
    flex: 10,
    padding: '4px 0 4px 15px',
    border:'1px solid #EAECF3',
    borderRadius:8,
    minHeight:76,
    fontSize: 15,
    color: '#333333',
  },
  sendButton: {
    flex: 2,
    display: 'flex',
    justifyContent: 'flex-start',
    '& svg': {
      cursor: 'pointer',
    },
    marginLeft:5
  },
});
