import BCBackButton from "../../../../components/bc-back-button/bc-back-button";
import { Grid, Fab } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import styles from "./methods.style";
import { withStyles } from "@material-ui/core/styles";
import { modalTypes } from "../../../../../constants";
import {
  openModalAction,
  setModalDataAction,
} from "actions/bc-modal/bc-modal.action";
import BCTableContainer from "../../../../components/bc-table-container/bc-table-container";
import { useDispatch, useSelector } from "react-redux";
interface Props {
  classes: any;
}

function BillingMethodsPage({ classes }: Props) {
  const dispatch = useDispatch();
  const billingMethods = useSelector(
    (state: any) => state.billingMethods || {}
  );

  const columns: any = [
    {
      Cell({ row }: any) {
        return <div className={"flex items-center"}>{row.index + 1}</div>;
      },
      Header: "No#",
      sortable: true,
      width: 60,
    },
    {
      Header: "Name",
      accessor: "profile.displayName",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Phone",
      accessor: "contact.phone",
      className: "font-bold",
      sortable: true,
    },
    {
      Header: "Email",
      accessor: "info.email",
      className: "font-bold",
      sortable: true,
    },
    {
      Cell({ row }: any) {
        return (
          <div className={"flex items-center"}>
            <Fab
              aria-label={"delete"}
              classes={{
                root: classes.fabRoot,
              }}
              color={"primary"}
              // onClick={() => renderViewMore(row)}
              variant={"extended"}
            >
              {"View More"}
            </Fab>
          </div>
        );
      },
      id: "action",
      sortable: false,
      width: 60,
    },
  ];

  const handleRowClick = (event: any, row: any) => {
    //console.log(event, row);
  };

  const openCreateTicketModal = () => {
    if (billingMethods.length !== 0) {
      dispatch(
        setModalDataAction({
          data: {
            modalTitle: "New Billing Method",
            removeFooter: false,
            className: "serviceTicketTitle",
            maxHeight: "754px",
            height: "100%",
            error: {
              status: false,
              message: "",
            },
          },
          type: modalTypes.ADD_BILLING_MODAL,
        })
      );
      setTimeout(() => {
        dispatch(openModalAction());
      }, 200);
    } else {
      dispatch(
        setModalDataAction({
          data: {
            removeFooter: false,
            error: {
              status: true,
              message:
                "You must add billing methods to create a service ticket",
            },
          },
          type: modalTypes.ADD_BILLING_MODAL,
        })
      );
      setTimeout(() => {
        dispatch(openModalAction());
      }, 200);
    }
  };

  return (
    <>
      <MainContainer>
        <BCBackButton link={"/main/admin/billing"} />
        <PageContainer>
          <Grid className={classes.addButtonArea}>
            <Fab
              aria-label={"new-ticket"}
              classes={{
                root: classes.fabRoot,
              }}
              color={"primary"}
              onClick={() => openCreateTicketModal()}
              variant={"extended"}
            >
              {"Add New Method"}
            </Fab>
          </Grid>
          <PageContent>
            <Grid container>
              <BCTableContainer
                columns={columns}
                isLoading={billingMethods.loading}
                onRowClick={handleRowClick}
                search
                tableData={billingMethods.data}
                isPageSaveEnabled={true}
                searchPlaceholder={"Search Billing Methods..."}
              />
            </Grid>
          </PageContent>
        </PageContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
  flex-direction: column;
  margin-top: 10px;
`;

const PageContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // flex: 1 1 100%;
  // padding: 30px;
  display: block;
  width: 100%;
  // padding-left: 65px;
  // padding-right: 65px;
  // margin: 0 auto;
`;

const PageContent = styled.div`
  '@media(min-width: 1909px)': {
    padding-left: 60px
  };
  padding: 20px 30px;
}`;

export default withStyles(styles, { withTheme: true })(BillingMethodsPage);
