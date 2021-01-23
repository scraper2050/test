import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import styled from 'styled-components';

interface BCTabsProps {
  curTab: any;
  onChangeTab: (newValue: number) => void;
  indicatorColor: 'primary' | 'secondary';
  tabsData: any;
}

function BCTabs({ curTab, onChangeTab, indicatorColor, tabsData }: BCTabsProps): JSX.Element {
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    onChangeTab(newValue);
  };

  return (
    <StyledTabs
      indicatorColor={indicatorColor}
      onChange={handleTabChange}
      value={curTab}>
      {tabsData.map((item: any, idx: number) => {
        return <Tab
          key={idx}
          label={item.label}
          value={item.value}
        />;
      })}
    </StyledTabs>
  );
}

const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid #C4C4C4;
  .MuiTab-root {
    font-size: 16px;
    line-height: 20px;
    color: #000;
    width: 190px;
    text-transform: uppercase;
    padding-top: 0;
  }

  .MuiTabs-indicator {
    height: 6px;
  }
`;
export default BCTabs;
