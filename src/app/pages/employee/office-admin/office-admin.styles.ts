import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
    'fabRoot': {
        'color': '#fff',
        'fontSize': '.775rem',
        'height': '34px',
        'padding': '0 12px',
        'textTransform': 'capitalize'
    },
    'officeAdminMainContainer': {
        'display': 'flex',
        'flex': '1 1 100%',
        'overflowX': 'hidden',
        'width': '100%'
    },
    'officeAdminPageConatiner': {
        'display': 'flex',
        'flex': '1 1 100%',
        'flexDirection': 'column',
        'margin': '0 auto',
        'padding': '30px',
        'paddingLeft': '56px',
        'paddingRight': '65px',
        'width': '100%'
    }
});
