import { fabRoot } from 'app/pages/main/main.styles';

export default (): any => ({
  ...fabRoot,
  'root': {
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.6)"
    },
    width: '80%'
  },
  'profilePane': {
    'borderRadius': '14px',
    'height': '100%',
    'textAlign': 'center',
    'width': '100%',
    'background': 'white'
  },
  'infoPane': {
    'display': 'flex',
    'flex-direction': 'horizontal',
    'padding': '20px'
  },
  'buttonPane': {
    'display': 'flex',
    'padding': '20px',
    'justify-content': 'flex-end'
  },
  'avatarArea': {
    'flex': '20%',
    'padding': '10px',
    'flex-shrink': '0',
    'cursor': 'pointer'
  },
  'infoArea': {
    'flex': '80%',
  },
  'infoAreaFullwidth': {
    'flex': '100%',
  },
  'field': {
    'display': 'flex',
    'flex-direction': 'horizontal',
    'justify-content': 'space-between'
  },
  'leftField': {
    'width': '45%',
    'max-width': '50%',
    'padding': '5px',
    'display': 'flex',
  },
  'rightField': {
    'width': '45%',
    'max-width': '50%',
    'padding': '5px',
    'display': 'flex',
  },
  'imgArea': {
    'margin': 'auto',
    'height': '150px',
    'width': '150px',
    'borderRadius': '75px',
    'background': 'grey',
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    'background-size': '100% 100%'
  },
  'label': {
    'width': '200px',
    'text-align': 'left',
    'display': 'flex',
    'align-items': 'center',
    'font-size': '20px'
  }
});
