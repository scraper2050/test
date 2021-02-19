import { Theme } from '@material-ui/core/styles';

export default (theme: Theme): any => ({
  'marker': {
    'color': '#ee0000',
    'fontSize': '36px'
  },
  'markerPopup': {
    'position': 'relative',
    'zIndex': '10',
    'top': '20px',
    'left': '-2px',
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
  },
});