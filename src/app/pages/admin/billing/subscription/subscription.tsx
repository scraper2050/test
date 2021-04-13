import BCBackButton from '../../../../components/bc-back-button/bc-back-button';
import { Grid, Fab } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { withStyles } from "@material-ui/core/styles";
import styles from './subscription.style';
import { useDispatch, useSelector } from "react-redux";
import BCTableContainer from "../../../../components/bc-table-container/bc-table-container";

interface Props {
  classes: any;
}

function BillingSubscriptionPage({classes}:Props) {
  const dispatch = useDispatch();
  const subscriptionHistory = useSelector(
    (state: any) => state.subscriptionHistory || {}
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
    console.log(event, row);
  }


  return (
    <>
      <MainContainer>
      <BCBackButton link={'/main/admin/billing'}/>
        <PageContainer>
          <PageContent>
          <Grid container >
            <BCTableContainer
              columns={columns}
              isLoading={subscriptionHistory.loading}
              onRowClick={handleRowClick}
              search
              tableData={subscriptionHistory.data}
              isPageSaveEnabled={true}
              searchPlaceholder={'Search for subscriptions'}
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
  display: block;
  width: 100%;
`;

const PageContent = styled.div`
  '@media(min-width: 1909px)': {
    padding-left: 60px
  };
  padding: 20px 30px;
}`;


export default withStyles(styles,{withTheme: true})(BillingSubscriptionPage);
