import { fabRoot } from 'app/pages/main/main.styles';

export default (): any => ({
  ...fabRoot,
  'profilePane': {
    'borderRadius': '14px',
    'textAlign': 'center',
    'width': '85%',
    'background': 'white',
  },
  'fabRoot': {
    'color': '#fff',
    'height': '60px',
    'padding': '0 3rem',
    'textTransform': 'capitalize',
    'boxShadow': 'none',
    'borderRadius': '30px',
    'fontFamily': 'Roboto',
    'fontSize': '16px',

  },
  'infoPane': {
    'padding': '3rem',
    'height': '25rem',
    'align-items': 'center',
  },
  'container': {
    height: '100%'
  },
  'contentContainer': {
    'marginTop': '2rem',
    'flexGrow': '1',
  },
  'contentAction': {
    'width': '100%',
    'display': 'flex',
    'justifyContent': 'flex-end'
  },
  'checkboxContainer': {
    'marginLeft': '2rem',
  },
  'boxContainer': {
    'textAlign': 'left',
    'marginLeft': '2rem'
  },
  'timePicker': {
    'textAlign': 'left',
    'marginLeft': '10rem',
    'marginTop': '-2rem'
  },
  'autoComplete': {
    'width': '8rem'
  },
  'label': {
    'fontSize': '16px !important',
    'marginBottom': '0 !important',
    'color': '#000000 !important'
  },
});
