import { fabRoot, pageContent, pageMainContainer, pageContainer, } from 'app/pages/main/main.styles';
export default (): any => ({
  ...fabRoot,
  ...pageContent,
  ...pageMainContainer,
  ...pageContainer,
  "addButtonArea": {
    transform: "translateY(100%)"
  },
  "mainContainer": {
    height: '100%'
  },
  "tabHeader": {
    color: "#0af",
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    padding: "15px",
  },
  "tabContainer": {
    display: 'flex',
  }
});
