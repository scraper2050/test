import { Theme } from '@material-ui/core/styles';

export default (theme: Theme): any => ({
/*  'marker': {
    'color': '#ee0000',
    'fontSize': '36px',
    'zIndex': '1',
  },
  'markerTop': {
    'color': '#ee0000',
    'fontSize': '36px',
    'zIndex': '10',
  },
  'markerPopup': {
    'position': 'relative',
    'zIndex': '10',
    'top': '35px',
    'left': '-10px',
    'height': 'auto',
    'backgroundColor': '#fff',
  },
  'uploadImageNoData': {
    'alignSelf': 'center',
    'height': '140px',
    'width': '180px',
    'background': '#FFFFFF',
    'boxSizing': 'border-box',
    'borderRadius': '6px',
    'background-size': '100% 100%',
    'position': 'relative',
    'marginTop': '-5rem',
  },*/
  clusterOutsideContainer: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  markerBadge: {
    width: 18,
    height: 18,
    background: 'red',
    color: 'white',
    borderRadius: '50%',
    fontSize: 10,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
    cursor: 'pointer',
    '&:before':{
      content: '""',
      position: 'absolute',
      top: 0,
      left:-4,
      width: '12px',
      height: '2px',
      display: 'block',
      background:'red',
      transform: 'rotate(45deg)',
    }
  },
  markerOverlayContainer: {
    width: 400,
    maxHeight: 300,
    padding: 20,
    paddingTop: 0,
    // paddingBottom: 10,
    // paddingLeft: 5,
    overflowY: 'scroll',
    background: 'white',
    color: 'initial',
    fontSize: 16,
    position: 'absolute',
    top: 10,
    left: 30,
    borderRadius: 10,
    overscrollBehavior: 'none',
    boxShadow: '0 2px 4px 0 rgb(0 0 0 / 14%), 0 4px 5px 0 rgb(0 0 0 / 12%), 0 1px 8px 0 rgb(0 0 0 / 20%)',
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
  listItemContainer : {
    padding: 10,
    borderBottom: '1px solid rgb(128, 128, 128)',
    cursor: 'pointer',
    display: 'flex', alignItems:
    'center',
  }
});
