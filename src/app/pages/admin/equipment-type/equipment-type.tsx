import BCTabs from "../../../components/bc-tab/bc-tab";
import SwipeableViews from "react-swipeable-views";
import styles from "./equipment-type.styles";
import EquipmentTypeListing from "./equipment-type-listing/equipment-type-listing";
import React, { useEffect, useState } from "react";
import { useTheme, withStyles } from "@material-ui/core";

function EquipmentType({ classes }: any) {
  const [curTab, setCurTab] = useState(0);
  const theme = useTheme();

  useEffect(() => {}, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  return (
    <div className={classes.groupMainContainer}>
      <div className={classes.groupPageConatiner}>
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
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={curTab}
        >
          <EquipmentTypeListing hidden={curTab !== 0} />
        </SwipeableViews>
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(EquipmentType);
