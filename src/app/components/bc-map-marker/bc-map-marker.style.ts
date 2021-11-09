import { Theme } from '@material-ui/core/styles';

export default (theme: Theme): any => ({
  'marker': {
    position: 'absolute',
    marginLeft: -10,
    marginTop: -10,
    cursor: 'pointer',
  },
  'markerPopup': {
    'position': 'relative',
    'zIndex': '10',
    'top': '35px',
    'left': '-10px',
    'height': 'auto',
    'backgroundColor': '#fff',
    'cursor': 'default',
  },
});
