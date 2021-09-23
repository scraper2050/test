import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
   'dialogActions': {
      'padding': '15px 24px !important',
      'width': '100%',
      'display': 'flex',
      'justify-content': 'flex-end',
   },
   'dialogContent': {
      'padding': '8px 24px !important'
   },
   'buttonSubmit': {
      'color': '#fff',
      'height': '34px',
      'padding': '0 12px',
   },
   'dialogDescription': {
      'padding': '0 24px'
   }
});
