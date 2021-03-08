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
    'width': '95%',
    'background': 'white',
    'position': 'relative',
  },
  'infoPane': {
    'display': 'flex',
    'flex-direction': 'horizontal',
    'padding': '3rem',
    'min-height': '15rem',
    'align-items': 'center'
  },
  'buttonPane': {
    'display': 'flex',
    'padding': '20px',
    'justify-content': 'flex-end'
  },
  'avatarArea': {
    'flex': '25%',
    'padding-right': '2rem',
    'flex-shrink': '0',
    'cursor': 'pointer',
    'align-self': 'center',
  },
  'noUpdateAvatarArea': {
    'flex': '25%',
    'padding-right': '2rem',
    'flex-shrink': '0',
    'align-self': 'center',
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
    'justify-content': 'space-around',
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
    'borderRadius': '50%',
    'border': '5px solid #00aaff',
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
  },
  'editButton': {
    'position': 'absolute',
    'right': '1rem',
    'top': '1rem'
  }
});
