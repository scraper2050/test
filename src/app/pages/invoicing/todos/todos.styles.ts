import { Theme } from '@material-ui/core/styles';
import { fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';

export default (theme: Theme): any => ({
    ...fabRoot,
	...pageContent,
	...pageMainContainer,
	...pageContainer,
    ...topActionBar,
    'addButtonArea': {
        'display': 'flex',
        'justifyContent': 'flex-end',
        'padding': '12px 30px 5px 0',
        'position': 'absolute',
        'right': '0',
        'zIndex': '1000'
      },
    'groupMainContainer': {
        'display': 'flex',
        'flex': '1 1 100%',
        'overflowX': 'hidden',
        'width': '100%'
    },
    'groupPageConatiner': {
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
