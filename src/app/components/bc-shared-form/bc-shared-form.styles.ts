import { Theme } from '@material-ui/core/styles';
import { fabRoot } from 'app/pages/main/main.styles';
import styled from 'styled-components';
export default (theme: Theme): any => ({
  ...fabRoot,
  'actionBar': {
    'alignItems': 'center',
    'display': 'flex'
  },
  'addItemAnchor': {
    '& span': {
      '&:hover': {
        'cursor': 'pointer',
        'textDecoration': 'underline'
      },
      'color': '#00aaff'
    },
    'marginBottom': '8px',
    'marginTop': '10px'
  },
  'cancelText': {
    '&:hover': {
      'cursor': 'pointer',
      'textDecoration': 'underline'
    },
    'marginRight': 8
  },
  'invoiceInputBaseRoot': {
    '& input': {
      'width': '50px',
      'fontSize': '14px',
    },
    'width': '100%',
    'fontSize': '14px',
  },
  'titleBar': {
    'alignItems': 'center',
    'display': 'flex',
    'justifyContent': 'space-between',
    'marginBottom': 10
  },
  'totalAmountText': {
    'fontWeight': 'bold',
    'marginLeft': 8
  },
  'totalContainer': {
    '& div div': {
      'display': 'flex',
      'justifyContent': 'space-between',
      'margin': '10px 0'
    },
    'display': 'flex',
    'flexDirection': 'row-reverse',
    'marginTop': '35px'
  }
});


export const FormHeaderContainer = styled.div`
  display: flex;

  > div {
    flex: 1;
    margin-bottom: 3rem;
  }
  .formDetails {
    input {
      /*padding: 18.5px 14px;*/
    }
  }
  .notes {
    flex: 2;
    margin-right: 2rem;
  }
  
`;
