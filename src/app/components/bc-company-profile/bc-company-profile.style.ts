import { fabRoot } from 'app/pages/main/main.styles';
import {
  LABEL_GREY,
  LIGHT_GREY,
  PRIMARY_GREY,
  TEXT_GREY
} from "../../../constants";
import '../../../scss/variable.css';

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
    border: `1px solid ${PRIMARY_GREY}`,
    'height': '25vh',
    'padding': '10px',
    'textAlign': 'center',
    'width': '100%',
    'background': 'white',
    'position': 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  avatarArea: {
    padding: 20,
    margin: '0 50px',
    backgroundColor: PRIMARY_GREY,
    borderRadius: '50%',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    alignSelf: 'center',
    '&> img': {
      height: '16vh',
      aspectRatio: 1,
    }
  },
  namePane: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  labelText: {
    color: LABEL_GREY,
    fontWeight: 500,
    fontSize: 18,
    textAlign: 'left',
  },
  companyText: {
    color: TEXT_GREY,
    fontWeight: 700,
    fontSize: 30,
    textAlign: 'left',
  },
  locationPane: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  'infoPane': {
    'display': 'flex',
    'border': `1px solid ${LIGHT_GREY}`,
    'border-radius': '10px',
    'padding': '3rem',
    'min-height': '15rem',
    'align-items': 'center'
  },
  'buttonPane': {
    'display': 'flex',
    'padding': '20px',
    'justify-content': 'flex-end'
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
  },
});
