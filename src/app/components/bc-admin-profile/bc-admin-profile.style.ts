import { fabRoot } from 'app/pages/main/main.styles';
export default (): any => ({
  ...fabRoot,
  
  'profile_pane': {
    'borderRadius': '14px',
    'height': '100%',
    'textAlign': 'center',
    'width': '100%',
    'background': 'white'
  },
  'info_pane': {
    'display': 'flex',
    'flex-direction': 'horizontal',
    'padding': '20px'
  },
  'button_pane': {
    'display': 'flex',
    'padding': '20px',
    'justify-content': 'flex-end'
  },
  'avatar_area': {
    'flex': '20%',
    'padding': '10px',
    'flex-shrink': '0'
  },
  'info_area': {
    'flex': '80%',
  },
  'info_area_fullwidth': {
    'flex': '100%',
  },
  'field': {
    'display': 'flex',
    'flex-direction': 'horizontal',
    'justify-content': 'space-between'
  },
  'left_field': {
    'width': '45%',
    'max-width': '50%',
    'padding': '5px',
    'display': 'flex',
  },
  'right_field': {
    'width': '45%',
    'max-width': '50%',
    'padding': '5px',
    'display': 'flex',
  },
  'img_area': {
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
