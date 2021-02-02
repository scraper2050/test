import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from '../../../../constants';
import { dataContainer, fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar,
  ...dataContainer,
  'buttonImage': {
    // 'margin': '40px',
    'background-color': '#2C9E1C', /* Needed for IEs */
    'border-radius': '3px',

    '-moz-box-shadow': '4px 4px 4px rgba(68, 68, 68, 0.3)',
    '-webkit-box-shadow': '4px 4px 4px rgba(68, 68, 68, 0.3)',
    'box-shadow': '4px 4px 4px rgba(68, 68, 68, 0.3)',

    'filter': 'progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30)',
    '-ms-filter': "progid:DXImageTransform.Microsoft.Blur(PixelRadius=3,MakeShadow=true,ShadowOpacity=0.30)",
    'zoom': ' 1',

    'margin-top': '20px',
    'width': '300px',
    'cursor': 'pointer'
  },
});
