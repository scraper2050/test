import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  'Logo': {
    'marginBottom': '20px',
    'width': '60%'
  },
  'formPaper': {
    'margin': theme.spacing(1),
    'padding': '40px 25px 25px',
    'width': '350px'
  },
  'root': {
    '& .MuiButton-root': {
      'color': '#fff',
      'width': '100%'
    },
    '& .MuiGrid-item': {
      'alignItems': 'stretch',
      'display': 'flex',
      'justifyContent': 'center'
    },
    'alignItems': 'center',
    'display': 'flex',
    'justifyContent': 'center',
    'minHeight': '100vh',
    'width': '100%'
  }
});
