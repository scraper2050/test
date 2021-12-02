import { Theme } from '@material-ui/core/styles';
export default (theme: Theme): any => ({
  container: {
    display: 'inline-block',
    width: '100%',
    border: '1px solid #bdbdbd',
    borderRadius: 8,
    padding: 8,
  },
  noBottomPadding: {
    paddingBottom: 0,
  },
  dropContainer: {
    position: 'relative',
    border: 'dashed #bdbdbd 1px',
    marginBottom: 8,
    borderRadius: 8,
    padding: '8px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dropDiv: {
    height: 400,
    position: 'absolute',
    top:0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: 'transparent',
  },
  dropContainerActive: {
    borderColor: theme.palette.primary.main,
  },
  button: {
    backgroundColor: '#E5F7FF',
  },
  buttonText: {
    color: '#828282',
    textTransform: 'none',
  },
  imagesWrapper: {
    border: 'solid #bdbdbd 1px',
    borderRadius: 8,
    padding: '8px 4px 0 8px',
  },
  noBorder: {
    borderWidth: 0,
    padding: 0,
  },
  imageWrapper: {
    position: 'relative',
    width: '30%',
  },
  image: {
    border: 'solid #bdbdbd 1px',
    borderRadius: 8,
    width: '100%',
    aspectRatio: 1,
    objectFit: 'contain',
    backgroundColor: '#e9eef1',
  },
  imageMargin: {
    marginRight: 4,
  },
  removeImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    //backgroundColor:'rgba(88, 88, 88, 0.5)'
  }
})
