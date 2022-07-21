import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'iconButton': {
    'padding': 10
  },
  'iconButtonBorder': {
    'borderRight': '1px solid #D0D3DC',
    'margin': '5px 0',
  },
  'input': {
    'flex': 1,
    'marginLeft': theme.spacing(1)
  },
  'searchContainer': {
    'borderRadius': '5px',
    'display': 'flex',
    'height': '38px',
    'marginBottom': '10px',
    'position': 'relative',
    'box-shadow': '0 3px 10px rgb(0 0 0 / 0.2)',
  }
});
