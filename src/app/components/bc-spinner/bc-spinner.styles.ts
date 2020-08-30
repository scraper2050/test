import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'root': {
    '& .MuiCircularProgress-root': {
      'position': 'fixed',
      'top': 'calc(50vh - 30px)'
    },
    'background': 'rgba(255, 255, 255, 0.5)',
    'display': 'flex',
    'height': '100%',
    'justifyContent': 'center',
    'left': 0,
    'minHeight': '100vh',
    'pointerEvents': 'none',
    'position': 'fixed',
    'top': 0,
    'width': '100%'
  }
});
