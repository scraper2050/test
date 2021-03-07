import { fabRoot } from 'app/pages/main/main.styles';

export default (): any => ({
  ...fabRoot,
  buttonContainer: {
    height: '88px',
    borderRadius: '10px',
    background: '#BCE8FF',
    padding: '1.5rem',
    cursor: 'pointer',
    fontFamily: 'Roboto',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: '23px',
    letterSpacing: '0px',
    textAlign: 'left',
    color: '#00AAFF',
  },
  iconContainer: {
    width: '48px !important',
    height: '48px !important',
    background: '#00AAFF',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem'
  }
});
