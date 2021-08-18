import React, { useEffect, useState, Fragment } from "react";
import BCTabs from "../../../components/bc-tab/bc-tab";
import SwipeableViews from "react-swipeable-views";
import styles from "./equipment-type.styles";
import EquipmentTypeListing from "./equipment-type-listing/equipment-type-listing";
import { useDispatch } from 'react-redux';
import { Fab, useTheme, withStyles } from "@material-ui/core";
import { modalTypes } from '../../../../constants';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import BCTableContainer from '../../../components/bc-table-container/bc-table-container';
import { CSButton } from "../../../../helpers/custom";

function EquipmentType({ classes }: any) {
  const dispatch = useDispatch();
  const [curTab, setCurTab] = useState(0);
  const theme = useTheme();

  useEffect(() => { }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const openAddEquipmentTypeModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Add Equipment Type',
        'removeFooter': false
      },
      'type': modalTypes.ADD_EQIPMENT_TYPE
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
                label: "Equipment List",
                value: 0,
              }
            ]}
          />
          <div className={classes.addButtonArea}>
            <CSButton
              aria-label={'new-ticket'}
              color={'primary'}
              onClick={() => openAddEquipmentTypeModal()}
              variant="contained">
              New Equipment Type
            </CSButton>
          </div>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={curTab}
          >
            <EquipmentTypeListing hidden={curTab !== 0} />
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(EquipmentType);
