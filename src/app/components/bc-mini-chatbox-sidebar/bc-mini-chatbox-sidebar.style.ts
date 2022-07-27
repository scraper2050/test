import { Theme } from '@material-ui/core/styles';

export default (theme: Theme): any => ({
  fab: {
    zIndex: 1101,
    minHeight: 'unset',
    width: 52,
    height: 48,
    borderRadius: '0 25px 25px 0',
    boxShadow: 'rgb(0 0 0 / 30%) 0px 1px 4px -2px;',
    backgroundColor: '#ffffff',
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    height: 'auto',
    maxHeight: 442,
    zIndex: 1102,
    width: 290,
    backgroundColor: '#ffffff',
    position: 'absolute',
    left: 0,
    top: 20,
    boxShadow: 'rgb(0 0 0 / 30%) 0px 3px 3px -2px',
    border: 'none',
    borderRadius: '0px 0px 0px 0px',
    overflow: 'hidden',
  },
  drawerClose: {
    width: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  chatHeader: {
    height: 48,
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'rgb(0 0 0 / 30%) 0px 2px 4px 0px',
  },
  chatCloseButton: {
    margin: '0 15px',
  },
  chatTitle: {
    fontSize: 17,
  },
  chatContainer: {
    height: 350,
    padding: 25,
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
      color: 'white',
      borderRadius: 5,
      backgroundColor: '#00AAFF',
      padding: '10px 20px',
      fontSize: 14,
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
      flex: 2,
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
      color: '#4f4f4f',
      borderRadius: 5,
      backgroundColor: '#E5F7FF',
      padding: '10px 20px',
      fontSize: 14,
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
      flex: 2,
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
  chatInputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderTop: '1px solid #D0D3DC'
  },
  attachButton: {
    flex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
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
    justifyContent: 'center',
    height: 40,
    '& svg': {
      cursor: 'pointer',
    },
  }
});
