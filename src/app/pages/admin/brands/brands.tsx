import BCTabs from "../../../components/bc-tab/bc-tab";
import SwipeableViews from "react-swipeable-views";
import styles from "./brands.styles";
import BrandsListing from "./brands-listing/brands-listing";
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Fab, useTheme, withStyles } from "@material-ui/core";
import { modalTypes } from '../../../../constants';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';

function Brands({ classes }: any) {
  const dispatch = useDispatch();
  const [curTab, setCurTab] = useState(0);
  const theme = useTheme();

  useEffect(() => { }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const openAddBrandTypeModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Add Brand',
        'removeFooter': false
      },
      'type': modalTypes.ADD_BRAND
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          <BCTabs
            curTab={curTab}
            indicatorColor={"primary"}
            onChangeTab={handleTabChange}
            tabsData={[
              {
                label: "Brands List",
                value: 0,
              }
            ]}
          />
          <div className={classes.addButtonArea}>
            <Fab
              aria-label={'new-ticket'}
              classes={{
                'root': classes.fabRoot
              }}
              color={'primary'}
              onClick={() => openAddBrandTypeModal()}
              variant={'extended'}>
              {'New Brand Type'}
            </Fab>
          </div>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={curTab}
          >
            <BrandsListing hidden={curTab !== 0} />
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Brands);
