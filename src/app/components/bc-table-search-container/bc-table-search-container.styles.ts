import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'iconButton': {
    'padding': 10
  },
  'input': {
    'flex': 1,
    'marginLeft': theme.spacing(1)
  },
  'searchContainer': {
    'borderRadius': '2px',
    'display': 'flex',
    'height': '38px',
    'marginBottom': '10px',
    'position': 'relative'
  }
});
