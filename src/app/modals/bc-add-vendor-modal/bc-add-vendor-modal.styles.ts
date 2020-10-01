import { Theme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
export default (theme: Theme): any => ({
  'blueAvatar': {
    'backgroundColor': blue[500],
    'color': theme.palette.getContrastText(blue[500])
  },
  'contractorContent': {
    'marginTop': '20px',
    'minHeight': '180px'
  },
  'dialogActions': {
    'padding': '15px 24px !important'
  },
  'dialogContent': {
    'padding': '8px 24px !important'
  },
  'fabRoot': {
    'color': '#fff',
    'fontSize': '.775rem',
    'height': '34px',
    'padding': '0 12px',
    'textTransform': 'capitalize'
  },
  'formDivider': {
    'height': 28,
    'margin': 4
  },
  'formInput': {
    'flex': 1,
    'marginLeft': theme.spacing(1)
  },
  'formPaper': {
    'alignItems': 'center',
    'border': '1px solid #E5E5E5',
    'display': 'flex',
    'padding': '2px 4px'
  },
  'iconButton': {
    'padding': 10
  },
  'noContractorData': {
    'alignItems': 'center',
    'display': 'flex',
    'justifyContent': 'center',
    'minHeight': '200px',
    'textAlign': 'center'
  }
});
