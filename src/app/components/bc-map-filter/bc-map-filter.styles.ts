import { Theme } from '@material-ui/core/styles';
import { fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';

export default (theme: Theme): any => ({
  ticketsFilterContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  filterContainer: {
    margin: '0 24px 0 24px',
    padding: 0,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    '&& .MuiFormGroup-root': {
      marginBottom: 16,
    },
    '&& .MuiFormGroup-root:last-of-type': {
      marginBottom: 0,
    },
    '&& .MuiFormControl-root': {
      marginBottom: 0,
    },
    '&& .MuiOutlinedInput-root': {
      borderRadius: 8,
      fontSize: 14
    },
    '&& .MuiOutlinedInput-input' : {
      padding: '10px',
    },
    '&& .MuiInputAdornment-positionStart': {
      marginRight: 0,
    },
    '&& .material-icons' : {
      color: '#777',
    },
    '&& .MuiInputLabel-outlined' : {
      transform: 'translate(14px, 12px) scale(1)',
    },
    '&& .MuiInputLabel-outlined.MuiInputLabel-shrink' : {
      transform: 'translate(14px, -6px) scale(0.75)',
    },
    '&& .MuiInputLabel-formControl': {
      fontSize: 14,
      //top: -4,
    },
    '&& .MuiAutocomplete-inputRoot': {
      padding:0,
    },
    '&& .MuiAutocomplete-input:first-child': {
      paddingLeft: 14,
    },
    '&& .MuiButton-containedSizeLarge': {
      width: '100%',
      color: 'white',
      borderRadius: 8,
      fontSize: 14,
      textTransform: 'none',
    }
  },
  actionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    '&& .MuiButton-label, .MuiIconButton-label': {
      color: '#BDBDBD',
      fontSize: 12,
    }
  },
  statusCount: {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    padding: '2px 6px',
  },
  menuItemContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    '&& span': {
      marginLeft: 8,
      fontSize: 14,
    },
    '&& p': {
      flex: 1,
    },
    '&& .MuiCheckbox-root': {
      padding: 2,
    }
  },
  fullWidth: {
    width: '100%'
  },
  menuContainer: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  menuContainerAutocomplete: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    '&& .MuiAutocomplete-option': {
      paddingLeft: 45,
      justifyContent: 'space-between',
    },
  },
  menu: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemRoot: {
    paddingTop: 2,
    paddingBottom: 2,
  },
  itemSelected: {
    '&.Mui-selected': {
      backgroundColor: '#00AAFF16',
    }
  },
  menuOpen: {
    borderBottomLeftRadius: '0 !important' ,
    borderBottomRightRadius: '0 !important',
  }
});
