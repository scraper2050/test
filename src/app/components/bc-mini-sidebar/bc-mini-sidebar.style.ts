import { Theme } from '@material-ui/core/styles';

export default (theme: Theme): any => ({
  fab: {
    zIndex: 1101,
    minHeight: 'unset',
    width: 52,
    height: 48,
    borderRadius: '25px 0 0 25px',
    boxShadow: 'rgb(0 0 0 / 30%) 0px 1px 4px -2px;',
    backgroundColor: '#ffffff',
    transition: theme.transitions.create('right', {
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
    position: 'fixed',
    right: 0,
    top: 146,
    boxShadow: 'rgb(0 0 0 / 30%) 0px 3px 3px -2px',
    border: 'none',
    borderRadius: '0px 0px 0px 20px',
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
  drawer2: {
    height: 'auto',
    maxHeight: 628,
    zIndex: 1102,
    width: 290,
    backgroundColor: '#ffffff',
    position: 'fixed',
    right: 0,
    top: 146,
    boxShadow: 'rgb(0 0 0 / 30%) 0px 3px 3px -2px',
    border: 'none',
    borderRadius: '20px 0px 0px 20px',
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
  drawerOpen: {
    width: 290,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerContentContainer: {
    padding: 33,
    borderBottom: '1px solid #D0D3DC',
  },
  emptyContent: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 17,
  },
  technicianName: {
    fontSize: 12,
    fontWeight: 500,
    marginBottom: 5,
  },
  textContent: {
    fontSize: 14,
  },
  date: {
    fontSize: 10,
    color: '#BDBDBD',
    marginTop: 0,
  },
});
