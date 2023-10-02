import { Theme } from '@material-ui/core/styles';
import * as CONSTANTS from "../../../constants";
export default (theme: Theme): any => ({
  relative: {
    position: 'relative',
  },
  addJobTypeButton: {
    width: '100%',
    border: '1px dashed #BDBDBD',
    borderRadius: 8,
    textTransform: 'none',
  },
  removeJobTypeButton: {
    position: 'absolute',
    right: 16,
    top: 28,
  },
  noteContainer: {
    'paddingLeft': '1.5rem',
  },
  lastContent: {
    marginTop: -10,
    marginBottom: 35,
    padding: '10px 16px',
  },
  innerRow: {
    paddingTop: 15,
    paddingRight: 30,
  },
  lastRow: {
    marginBottom: '35px !important',
  },
  actionsList: {
    margin: '4px 0 4px 4px',
    padding: 0,
  },
  taskList: {
    padding: '5px 50px',
  },
  task: {
    padding: '0 0 5px 0 !important',
    // borderBottom: '0.5px solid #E0E0E0',
  },
  editButtonPadding: {
    paddingTop: 20,
  },
  editButton: {
    color: '#828282',
  },
  editButtonText: {
    textTransform: 'none',
  },
  markCompleteContainer: {
    flex: 1, 
    textAlign: 'left'
  },
  actionsContainer: {
    flex: 2, 
  },
  tableContainer: {
    'maxHeight': '30rem',
    marginBottom: "0px!important"
  },
  popper: {
    '& li[aria-disabled="true"]': {
      paddingTop: 0,
      paddingBottom: 0,
    }
  },
  jobCostingContent: {
    paddingTop: "20px",
    overflow: "hidden"
  },
  jobHistoryTechName: {
    marginBottom: "3px",
    textTransform: "capitalize",
    width: "100%",
    display: "inline-block",
    fontWeight: "bold",
    fontSize: "0.9rem",
    marginLeft: "15px"
  },
  jobHistoryTechComment: {
    fontSize: "0.9rem",
    marginLeft: "15px"
  },
  actionButton: {
    marginRight: "10px",
    textTransform: 'capitalize',
    borderRadius: 8,
    display: "flex",
    color: "#F50057",
    zIndex: 1000,
    border: "1px solid #F50057",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px 10px 0px 10px",
    fontWeight: "bold",
    background: "#fff"
  },
  actionButtonLabel: {
    marginLeft: "10px",
    marginRight: "10px",
  },
  toolbarButton: {
    marginBottom: "10px"

  }
});
