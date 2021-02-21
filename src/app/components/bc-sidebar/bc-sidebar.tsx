import * as CONSTANTS from "../../../constants";
import styled from "styled-components";
import { Grid, List, ListItem } from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

interface BCSidebarProps {
  children?: React.ReactNode;
  setContentGrid?: Function;
}

function BCSidebar({ children, setContentGrid }: BCSidebarProps) {
  const history = useHistory();
  const location = useLocation();
  const pathName = location.pathname;
  let nestedRouteKey = localStorage.getItem("nestedRouteKey");
  const LINK_DATA = [
    {
      label: "Customer List",
      link: "/main/customers",
    },
    {
      label: "New Customer",
      link: "/main/customers/new-customer",
    },
    {
      label: "Schedule/Jobs",
      link: "/main/customers/schedule",
    },
    {
      label: "Map View",
      link: "/main/customers/ticket-map-view",
    },
    {
      label: "Job Reports",
      link: "/main/customers/job-reports",
    },
    {
      label: "Todo's",
      link: "/main/invoicing/todos",
    },
    {
      label: "Invoices List",
      link: "/main/invoicing/invoices-list",
    },
    {
      label: "Purchase Order",
      link: "/main/invoicing/purchase-order",
    },
    {
      label: "Estimates",
      link: "/main/invoicing/estimates",
    },
    {
      label: "Billing",
      link: "/main/admin/billing",
    },
    {
      label: "Brands",
      link: "/main/admin/brands",
    },
    {
      label: "Company Profile",
      link: "/main/admin/company-profile",
    },
    {
      label: "Employees",
      link: "/main/admin/employees",
    },
    {
      label: "Equipment Type",
      link: "/main/admin/equipment-type",
    },
    {
      label: "Groups",
      link: "/main/admin/groups",
    },
    {
      label: "Invoicing",
      link: "/main/admin/invoicing",
    },
    {
      label: "Job Types",
      link: "/main/admin/job-types",
    },
    {
      label: "Report Number",
      link: "/main/admin/report-number",
    },
    {
      label: "Roles/Permissions",
      link: "/main/admin/roles-permissions",
    },
    {
      label: "Vendors",
      link: "/main/admin/vendors",
    },
    {
      label: "Integrations",
      link: "/main/admin/integrations",
    },
    {
      label: "Groups",
      link: "/main/employees/group",
    },
    {
      label: "Technicians",
      link: "/main/employees/technician",
    },
    {
      label: "Managers",
      link: "/main/employees/managers",
    },
    {
      label: "Office Admin",
      link: "/main/employees/office-admin",
    },
    {
      label: "Company Inventory",
      link: "/main/inventory",
    },
    {
      label: "Purchased Tag",
      link: "/main/tags/purchasedtag",
    },
    {
      label: "Buy Blue Tag",
      link: "/main/tags/bluetag",
    },
    {
      label: "Profile",
      link: "/main/user/view-profile",
    },
    {
      label: "Email Preferences",
      link: "/main/user/email-preference",
    },
  ];

  useEffect(() => {
    if (pathName !== "/main/dashboard") {
      setContentGrid &&
        setContentGrid({
          lg: 10,
          md: 10,
          sm: 10,
        });
    } else {
      setContentGrid &&
        setContentGrid({
          lg: 12,
          md: 12,
          sm: 12,
        });
    }
  }, [location]);

  const onClickLink = (strLink: string): void => {
    history.push(strLink);
  };

  return pathName !== "/main/dashboard" ? (
    <Grid
      id={"navbar-container"}
      item
      lg={2}
      md={2}
      sm={2}
      style={{ padding: 0 }}
      xl={1}
    >
      <ComponentContainer>
        <StyledList aria-label={"customers sidebar list"}>
          {LINK_DATA.map((item: any, idx: number) => {
            let mainPath = pathName.split("/main/")[1]; // eslint-disable-line
            if (mainPath) {
              mainPath = mainPath.split("/")[0]; // eslint-disable-line
            } else {
              mainPath = "dashboard";
            }
            return item.link.startsWith(`/main/${mainPath}`) ? (
              <StyledListItem
                button
                key={idx}
                onClick={() => onClickLink(item.link)}
                selected={
                  pathName === item.link ||
                  pathName === `${item.link}/${nestedRouteKey}`
                }
              >
                {item.label}
              </StyledListItem>
            ) : null;
          })}
        </StyledList>
      </ComponentContainer>
    </Grid>
  ) : null;
}

const ComponentContainer = styled.div`
  margin-left: 0;
  flex: 0 0 ${CONSTANTS.SIDEBAR_WIDTH}px;
  background-color: ${CONSTANTS.PRIMARY_WHITE};
  transition: all 0.3s ease-in-out;
  position: fixed;
  height: 100%;
  z-index: 1;
  width: 185px;
`;

const StyledList = styled(List)``;

const StyledListItem = styled(ListItem)`
  font-size: 16px;
  line-height: 20px;
  height: 40px;
  color: #000;
  &.Mui-selected {
    background-color: #c4c4c4;
  }
`;

export default BCSidebar;
