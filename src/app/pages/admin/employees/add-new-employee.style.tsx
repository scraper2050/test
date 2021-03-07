import { fabRoot, pageContainer, pageContent, pageMainContainer, } from 'app/pages/main/main.styles';
export default (): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,

  'mainPane': {
    'borderRadius': '14px',
    'height': '100%',
    'width': '100%',
    'background': 'white',
  },
  'infoPane': {
    'padding': '20px 20px 20px 50px'
  },
  'buttonPane': {
    'textAlign': 'end',
    'padding': '20px 20px 20px 50px'
  },
  'required': {
    'color': 'gray'
  },
  'asterisk': {
    'color': 'red'
  },
  'card': {
    'borderRadius': '14px',
    'display': 'flex',
    'flexDirection': 'column',
    'height': '100px',
    'textAlign': 'center',
    'width': '40%'
  },
  'cardActionArea': {
    'height': '100%',
  },
  'rolesRow': {
    'padding': '30px',
    'width': '70%',
    'textAlign': 'center',
    'display': 'flex',
    'flexDirection': 'row',
    'justifyContent': 'space-between',
    'margin': 'auto'
  },
  'roundBackground': {
    'backgroundColor': '#00aaff',
    'borderRadius': '50%',
    'color': 'white',
    'height': '28px',
    'width': '28px',
    'marginRight': '30px'
  }
});
