import BCBackButton from "../../../../components/bc-back-button/bc-back-button";
import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import styled from "styled-components";
import styles from "./methods.style";
import { withStyles } from "@material-ui/core/styles";
import { modalTypes } from "../../../../../constants";
import {
  openModalAction,
  setModalDataAction,
} from "actions/bc-modal/bc-modal.action";
import BCCircularLoader from 'app/components/bc-circular-loader/bc-circular-loader';
import { useDispatch, useSelector } from "react-redux";
import * as CONSTANTS from "../../../../../constants";
import { getCompanyCards } from "api/company-cards.api";
import { CompanyCard } from "actions/company-cards/company-cards.types";
import CardIcon from "assets/img/icons/billings/Card";
import ArrowRightIcon from "assets/img/icons/billings/ArrowRight";
import CompanyCards from './companyCards';
interface Props {
  classes: any;
}

interface HeaderProps {
  title: string
}

function BillingMethodsPage({ classes }: Props) {
  const dispatch = useDispatch();

  const { isLoading = true, companyCards, refresh = true } = useSelector(({ companyCards }: any) => (
    {
      'isLoading': companyCards.loading,
      'companyCards': companyCards.data,
      'refresh': companyCards.refresh
    }
  ));

  const openCreateTicketModal = () => {
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

  };

  useEffect(() => {
    if (refresh) {
      dispatch(getCompanyCards());
    }
  }, [refresh]);

  const HeaderContainer = ({ title }: HeaderProps) => {
    return (
      <div className={classes.header}>
        {title}
      </div>
    )
  }

  const onDelete = (id:string, ending: string) => {
    
    dispatch(
      setModalDataAction({
        'data': {
          'data': {
            cardId: id,
            ending: ending
          },
          'modalTitle': ' ',
          'removeFooter': false
        },
        type: modalTypes.DELETE_BILLING_MODAL,
      })
    );
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  }

  return (
    <>
      <div className={classes.pageMainContainer}>
        <div className={classes.pageContainer}>
          <div className={classes.pageContent}>
            <div style={{ marginTop: '1rem' }}>
              <BCBackButton link={"/main/admin/billing"} />
            </div>

            <DataContainer>
              <div>
                <p className={classes.subTitle}>
                  {"Payment Methods"}
                </p>
              </div>

              {
                isLoading ?
                  <div style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center'
                  }}>
                    <BCCircularLoader heightValue={'200px'} />
                  </div>
                  :
                  <Grid container direction="column" spacing={3} >

                    {
                      companyCards.length !== 0 &&
                      <Grid item xs={12} >
                        <div className={classes.boxContainer}>
                          <HeaderContainer title={"Saved Payment Methods"} />
                          <div className={classes.content}>
                            {
                              companyCards.map((card: CompanyCard, index: number) => {
                                return <CompanyCards  key={index} card = {card} onDelete = {onDelete}/>
                              })
                            }
                          </div>
                        </div>
                      </Grid>
                    }

                    <Grid item xs={12} >
                      <div className={classes.boxContainer}>
                        <HeaderContainer title={"Add New Payment Method"} />
                        <div className={classes.content}>
                          <Grid
                            container
                            className={`${classes.contentItem} ${classes.addCreditCard} add-credit-card`}
                            onClick={() => openCreateTicketModal()}>
                            <CardIcon />
                            <div className={classes.contentItemTextContainer}>
                              {"Credit/Debit Card"}
                            </div>
                            <ArrowRightIcon />

                          </Grid>
                        </div>
                      </div>
                    </Grid>

                  </Grid>
              }
            </DataContainer>
          </div>
        </div>
      </div>
    </>
  );
}



export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  margin-top: 1rem;
  border-radius: 10px;
  background-color: ${CONSTANTS.PRIMARY_WHITE};
  min-height: 20rem;

  .with-divider {
    border: '1px solid #C4C4C4';
  }
  .add-credit-card {
    
    &:hover {
      background-color: #f5f5f5 !important;
      border-radius: .5rem;
    }
  }
`;

export default withStyles(styles, { withTheme: true })(BillingMethodsPage);
