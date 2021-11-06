import { Theme } from '@material-ui/core/styles';

export default (theme: Theme): any => ({
  'marker': {
    'color': '#ee0000',
    'fontSize': '36px'
  },
  'markerPopup': {
    'position': 'relative',
    'zIndex': '10',
    'top': '35px',
    'left': '-10px',
    'height': 'auto',
    'backgroundColor': '#fff',
  },
});
