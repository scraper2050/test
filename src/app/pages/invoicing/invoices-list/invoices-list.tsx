import BCTabs from "../../../components/bc-tab/bc-tab";
import SwipeableViews from "react-swipeable-views";
import styles from "./invoices-list.styles";
import InvoicingListListing from "./invoices-list-listing/invoices-list-listing";
import React, { useEffect, useState } from "react";
import { useTheme, withStyles } from "@material-ui/core";

function InvoiceList({ classes }: any) {
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
              label: "Invoicing List",
              value: 0,
            },
            {
              label: "Recent Activities",

              value: 1,
            },
          ]}
        />
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={curTab}
        >
          <InvoicingListListing hidden={curTab !== 0} />
        </SwipeableViews>
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(InvoiceList);
