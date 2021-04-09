import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from '../../../constants';
import styled from 'styled-components';

export default (theme: Theme): any => ({
  'label': {
    'fontSize': '16px !important',
    'marginBottom': '0 !important'
  },
  'mapLocation': {
    'display': 'flex',
    'flexDirection': 'column'
  },
  'mapWrapper': {
    'height': '100%'
  },
  'paper': {
    'color': CONSTANTS.PRIMARY_DARK,
    'padding': '4px 8px'
  },
  'root': {
    'flexGrow': 1
  },
  'subTitle': {
    'fontSize': '24px',
    'fontWeight': 'bold',
    'lineHeight': '26px',
    'textDecorationLine': 'underline',
    'textUnderlineOffset': '5px',
    'letterSpacing': '1px',
    'textTransform': 'uppercase'
  },

  'noMargin': {
    'marginTop': '0px'
  },

  'addMargin': {
    'marginTop': '15px'
  },

  'mt_24': {
    'marginTop': '24px'
  },

  'mb_0': {
    'margineBottom': 0
  },

  'mt_0': {
    'marginTop': 0
  },

  'm_0': {
    'margin': 0
  },

  'largeIcon': {
    'fontSize': '100px',
    'backgroundColor': CONSTANTS.PRIMARY_GRAY,
    'borderRadius': '50%',
    'marginTop': '20px',
    'padding': '20px'
  },

  'smallIcon': {
    'backgroundColor': CONSTANTS.PRIMARY_GRAY,
    'borderRadius': '50%',
    'padding': '5px'
  },

  'reportTag': {
    'backgroundColor': CONSTANTS.SECONDARY_GREY,
    'textAlign': 'right',
    'padding': '20px 20px 20px 20px',
    'margin': '-2px -2px 0px -62px',
    'borderRadius': '5px 5px 0px 0px',
    'fontWeight': '500'
  },
  'btn': {
    'float': 'right',
    'display': 'flex',
    'justifyContent': 'flex-end',
    'margin': '-50px 20px 30px 0px'
  },
  'cancelBtn': {
    'textTransform': 'none',
    'padding': '10px 30px 10px 30px',
    'backgroundColor': CONSTANTS.PRIMARY_WHITE
  },
  'invoiceBtn': {
    'textTransform': 'none',
    'backgroundColor': CONSTANTS.PRIMARY_BLUE,
    'color': CONSTANTS.PRIMARY_WHITE,
    'padding': '10px 30px 10px 30px',
    'borderRadius': '30px 30px 30px 30px',
    'margin': '10px',
    '&:hover': {
      'color': `${CONSTANTS.PRIMARY_DARK} !important`
    }
  },
  'avatarArea': {
    'flex': '25%',
    'paddingRight': '2rem',
    'flexShrink': '0',
    'cursor': 'pointer',
    'alignSelf': 'center'
  },
  'imgArea': {
    'margin': 'auto',
    'height': '150px',
    'width': '150px',
    'borderRadius': '50%',
    'border': '5px solid #00aaff',
    'background': 'grey',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'backgroundSize': '100% 100%'
  }
});

export const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  width: 100%;
  padding-left: 65px;
  padding-right: 65px;
  background-color: ${CONSTANTS.PRIMARY_WHITE};
  margin: 20px;
  border-radius: 10px;
  p {
    word-break: break-word;
  }
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 0px 40px 60px;
  margin: 45px 0px 70px 0px;
  border-radius: 5px;
  background-color: ${CONSTANTS.PRIMARY_WHITE};
  border: ${CONSTANTS.SECONDARY_GREY} 2px solid;
`;
