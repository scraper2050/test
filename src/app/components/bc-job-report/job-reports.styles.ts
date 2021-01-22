import { Theme } from "@material-ui/core/styles";
import * as CONSTANTS from "../../../constants";
import styled from "styled-components";

export default (theme: Theme): any => ({
  label: {
    fontSize: "16px !important",
    marginBottom: "0 !important",
  },
  mapLocation: {
    display: "flex",
    flexDirection: "column",
  },
  mapWrapper: {
    height: "100%",
  },
  paper: {
    color: CONSTANTS.PRIMARY_DARK,
    padding: "4px 8px",
  },
  root: {
    flexGrow: 1,
  },
  subTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    lineHeight: "26px",
    textDecorationLine: "underline",
    textUnderlineOffset: "5px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  noMargin: {
    marginTop: "0px",
  },

  addMargin: {
    marginTop: "40px",
  },

  largeIcon: {
    fontSize: "100px",
    backgroundColor: CONSTANTS.PRIMARY_GRAY,
    borderRadius: "50%",
    marginTop: "20px",
    padding: "20px",
  },

  smallIcon: {
    backgroundColor: CONSTANTS.PRIMARY_GRAY,
    borderRadius: "50%",
    padding: "5px",
  },

  reportTag: {
    backgroundColor: CONSTANTS.SECONDARY_GREY,
    textAlign: "right",
    padding: "20px 20px 20px 20px",
    margin: "0px 0px 0px -60px",
    borderRadius: "5px 5px 0px 0px",
    fontWeight: "500",
  },
});

export const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  width: 100%;
  padding-left: 65px;
  padding-right: 65px;
  margin: 0 auto;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 0px 40px 60px;
  margin: 12px 0px 20px 0px;
  border-radius: 5px;
  background-color: ${CONSTANTS.PRIMARY_WHITE};
`;
