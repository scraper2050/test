import { fabRoot } from "app/pages/main/main.styles";

export default (): any => ({
  ...fabRoot,
  tableContainer: {
    borderRadius: "10px",
    background: "#fff",
    padding: 0,
  },
  tableList: {
    padding: 0,
  },
  header: {
    height: "50px",
    borderTopRightRadius: "10px",
    borderTopLeftRadius: "10px",
    background: "#40454E",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10px'
  },
  headerText: {
    height: "100%",
    paddingLeft: "1rem",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "18px",
    letterSpacing: "0px",
    textAlign: "left",
    color: "#BBBDBF",
  },
  buttonContainer: {
    borderRadius: "10px",
    height: "40px",
    background: "#00AAFF",
    fontFamily: "Roboto",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "14px",
    letterSpacing: "0px",
    color: "#fff",
    cursor: "pointer",
  },
  table: {
    maxHeight: "350px !important",
    borderRadius: "0 0 10px 10px !important",
  },
  buttonGrid: {
    marginLeft: 'auto'
  }
});
