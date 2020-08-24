import React from 'react';

import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface BCTabsProps {
  curTab: any;
  onChangeTab: (newValue: number) => void;
  indicatorColor: 'primary' | 'secondary';
  tabsData: any;
}

const BCTabs = ({ curTab, onChangeTab, indicatorColor, tabsData }: BCTabsProps): JSX.Element => {
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    onChangeTab(newValue);
  };

  return (
    <StyledTabs value={curTab} onChange={handleTabChange} indicatorColor={indicatorColor}>
      {tabsData.map((item: any, idx: number) => {
        return <Tab key={idx} value={item.value} label={item.label} />;
      })}
    </StyledTabs>
  );
};

const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid #000;
  .MuiTab-root {
    font-size: 16px;
    line-height: 20px;
    color: #000;
    width: 190px;
  }

  .MuiTabs-indicator {
    height: 6px;
  }
`;
export default BCTabs;
