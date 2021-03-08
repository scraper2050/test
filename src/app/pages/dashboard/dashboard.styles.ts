import { Theme } from '@material-ui/core/styles';
import { dataContainer, fabRoot, pageContainer, pageContent, pageMainContainer, topActionBar } from 'app/pages/main/main.styles';
export default (theme: Theme): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  ...topActionBar,
  ...dataContainer,
  dashboardContainer: {
    padding: '3rem 5rem 3rem 0',
  },
  icons: {
    width: '30px',
    height: '30px',
    fill: '#FFF'
  },
  statusPendingText: {
    color: '#FFA500',
    fontStyle: 'italic',
    fontWeight: 'bold',
    borderRadius: '50px',
    background: '#FFA50026',
    padding: '0.5rem 1rem',
    margin: '0.5rem 0',
    maxWidth: '100px',
    display: 'flex',
    alignItems: 'center'
  },
  statusPendingCircle: {
    background: '#FFA500',
    width: '10px',
    height: '10px',
    borderRadius: '50%'
  },
  statusConfirmedText: {
    color: '#008000',
    fontWeight: 'bold',
    borderRadius: '50px',
    background: '#00800026',
    padding: '0.5rem 1rem',
    margin: '0.5rem 0',
    maxWidth: '100px',
    display: 'flex',
    alignItems: 'center'
  },
  statusConfirmedCircle: {
    background: '#008000',
    width: '10px',
    height: '10px',
    borderRadius: '50%'
  },
  statusText: {
    flexGrow: 1,
    textAlign: 'center'
  },
  textTable: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: '14px',
    letterSpacing: '0px',
    textAlign: 'left',
    color: '#9EA5B8',
    textTransform: 'capitalize',
  }
});
