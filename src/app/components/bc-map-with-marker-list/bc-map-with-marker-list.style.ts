import { Theme } from '@material-ui/core/styles';

export default (theme: Theme): any => ({
  'marker': {
    'color': '#ee0000',
    'fontSize': '36px'
  },
  'markerPopup': {
    'position': 'relative',
    'zIndex': '10',
    'top': '15px',
    'width': '200px',
    'height': 'auto',
    'backgroundColor': '#fff',
  }
});