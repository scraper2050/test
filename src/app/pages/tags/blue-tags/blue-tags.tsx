import React, { useEffect, useState } from "react";
import styles from "./blue-tags.styles";
import BlueTagsCard from "./blue-tags-card/blue-tags-card";
import { useTheme, withStyles, Grid } from "@material-ui/core";

function PurchasedTags({ classes }: any) {
  const [curTab, setCurTab] = useState(0);
  const theme = useTheme();

  useEffect(() => {}, []);

  return (
    <div className={classes.groupMainContainer}>
      <div className={classes.groupPageConatiner}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((item, index) => (
            <Grid key={index} item lg={3} md={6} xs={12}>
              <BlueTagsCard items={item} index={index} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(PurchasedTags);
