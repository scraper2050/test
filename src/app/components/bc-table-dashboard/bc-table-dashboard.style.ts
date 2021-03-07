import { fabRoot } from 'app/pages/main/main.styles';

export default (): any => ({
  ...fabRoot,
  tableContainer: {
    borderRadius: '10px',
    background: '#fff',
  },
  header: {
    height: '50px',
    borderRadius: '10px',
    background: '#40454E',
  },
  headerText: {
    height: '100%',
    paddingLeft: '1rem',
    fontFamily: 'Roboto',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '18px',
    letterSpacing: '0px',
    textAlign: 'left',
    color: '#BBBDBF',
  },
  buttonContainer: {
    borderRadius: '10px',
    height: '50px',
    background: '#00AAFF',
    fontFamily: 'Roboto',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '14px',
    letterSpacing: '0px',
    color: '#fff',
    cursor: 'pointer'
  },
  table: {
    maxHeight: '350px !important',
    borderRadius: '0 0 10px 10px',
  },
});
