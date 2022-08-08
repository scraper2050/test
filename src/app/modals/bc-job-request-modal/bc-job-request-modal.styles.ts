import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";
export default (theme: Theme): any => ({
  relative: {
    position: 'relative',
  },
  addJobTypeButton: {
    width: '100%',
    border: '1px dashed #BDBDBD',
    borderRadius: 8,
    textTransform: 'none',
  },
  removeJobTypeButton: {
    position: 'absolute',
    right: 16,
    top: 28,
  },
  noteContainer: {
    'paddingLeft': '1.5rem',
  },
  lastContent: {
    marginTop: -10,
    marginBottom: 35,
    padding: '10px 16px',
  },
  innerRow: {
    paddingTop: 15,
    paddingRight: 30,
  },
  lastRow: {
    marginBottom: '35px !important',
  },
  actionsList: {
    margin: '4px 0 4px 4px',
    padding: 0,
  },
  taskList: {
    padding: '5px 50px',
  },
  task: {
    padding: '0 0 5px 0 !important',
    // borderBottom: '0.5px solid #E0E0E0',
  },
  editButtonPadding: {
    paddingTop: 20,
  },
  editButton: {
    color: '#828282',
  },
  editButtonText: {
    textTransform: 'none',
  },
  markCompleteContainer: {
    flex: 1, 
    textAlign: 'left'
  },
  actionsContainer: {
    flex: 2, 
  },
  tableContainer: {
    'maxHeight': '30rem',
  },
  popper: {
    '& li[aria-disabled="true"]': {
      paddingTop: 0,
      paddingBottom: 0,
    }
  },
  dialogActions: {
    padding: '35px 60px !important',
    backgroundColor: 'auto'
  },
  closeButton: {
    color: '#4F4F4F',
    marginRight: '10px',
    height: '34px',
    fontSize: '14px !important',
    padding: '12px 18px 12px 18px',
    textTransform:'none',
    borderRadius: 8,
  },
  purpleButton: {
    color: CONSTANTS.PRIMARY_WHITE,
    backgroundColor: CONSTANTS.BUTTON_PURPLE,
    '&:hover': {
      backgroundColor: CONSTANTS.BUTTON_PURPLE_HOVER,
    },
  },
  submitButton: {
    height: '34px',
    fontSize: '14px !important',
    padding: '12px 25px 12px 25px',
    textTransform:'none',
    borderRadius: 8,
  },
  submitButtonDisabled : {
    color: `${CONSTANTS.PRIMARY_WHITE}  !important`,
    backgroundColor: `${CONSTANTS.TABLE_HOVER} !important`,
  },
  mapWrapper: {
    height: 270,
  },
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
      wordBreak:'break-word'
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
      wordBreak:'break-all'
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
  },
  imageContainer: {
    display:'flex',
    alignItems:'center',
    height: 58,
    marginRight: 20,
  },
  imageNameContainer: {
    whiteSpace: 'nowrap',
    width: 50,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  imageFile: {
    height: 36,
    width: 36,
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
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 40,
    padding: '0 10px',
    '& svg': {
      cursor: 'pointer',
    },
  },
  inputContainer: {
    flex: 10,
  },
  sendButton: {
    flex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 40,
    padding: '0 10px',
    '& svg': {
      cursor: 'pointer',
    },
  },
});