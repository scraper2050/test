import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
    'addButtonArea': {
        'display': 'flex',
        'justifyContent': 'flex-end',
        'padding': '12px 30px 5px 0',
        'position': 'absolute',
        'right': '0',
        'zIndex': '1000'
      },
    'fabRoot': {
        'color': '#fff',
        'fontSize': '.775rem',
        'height': '34px',
        'padding': '0 12px',
        'textTransform': 'capitalize'
    }
});
