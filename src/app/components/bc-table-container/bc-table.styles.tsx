import { Theme } from "@material-ui/core/styles";
export default (theme: Theme): any => ({
  noDataPaper: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
  tableContainer: {
    width: "100%",
    overflow: 'hidden',
    overflowX: "auto !important",
  },
});
