import BCTabs from "../../../components/bc-tab/bc-tab";
import SwipeableViews from "react-swipeable-views";
import styles from "./office-admin.styles";
import OfficeAdminListing from "./office-admin-listing/office-admin-listing";
import React, { useEffect, useState } from "react";
import { useTheme, withStyles } from "@material-ui/core";

function OfficeAdmin({ classes }: any) {
  const [curTab, setCurTab] = useState(0);
  const theme = useTheme();

  useEffect(() => { }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  return (
    <div className={classes.officeAdminMainContainer}>
      <div className={classes.officeAdminPageConatiner}>
        <BCTabs
          curTab={curTab}
          indicatorColor={"primary"}
          onChangeTab={handleTabChange}
          tabsData={[
            {
              label: "Office Admin List",
              value: 0,
            },
            // {
            //   label: "Recent Activities",

            //   value: 1,
            // },
          ]}
        />
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={curTab}
        >
          <OfficeAdminListing hidden={curTab !== 0} />
        </SwipeableViews>
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(OfficeAdmin);
