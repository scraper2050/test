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
      value={curTab}
      variant="scrollable"
      scrollButtons="on"
    >
      {tabsData.map((item: any, idx: number) => {
        return <Tab
          key={idx}
          label={item.icon ? undefined : item.label}
          value={item.value}
          icon= {item.icon ?
            <ImageWrapper><img src={item.icon}/><span>{item.label}</span></ImageWrapper>:
          undefined}
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

const ImageWrapper = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 42px;
      height: 42px;
    }

    @keyframes example {
      from {color: #474747;}
      to {color: #0082c3;}
    }

    span {
      animation-name: example;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }

}

`
export default BCTabs;
