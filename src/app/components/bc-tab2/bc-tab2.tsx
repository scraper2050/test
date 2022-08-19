import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Badge from '@material-ui/core/Badge';
import styled from 'styled-components';

interface BCTabs2Props {
  curTab: any;
  onChangeTab: (newValue: number) => void;
  indicatorColor: 'primary' | 'secondary';
  tabsData: any;
  chip?: boolean;
  responsiveLabel?: boolean;
}

function BCTabs2({ curTab, onChangeTab, indicatorColor, tabsData }: BCTabs2Props): JSX.Element {
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
          value={item.value}
          disabled={item.disabled}
          icon={(
            <FlexDiv>
              {item.icon && (
                <Badge color="secondary" badgeContent={item.badge || 0} >
                <item.icon htmlColor={curTab === idx ? '#00AAFF' : ''} />
              </Badge>
              )}
              <span>
                {item.label}
              </span>
            </FlexDiv>
          )}
        />;
      })}
    </StyledTabs>
  );
}

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  font-weight: 400;
  font-size: 14px;

  img, svg {
    width: 22px;
    height: 22px;
    margin-left: 5px;
  }
`

const StyledTabs = styled(Tabs)`
  border-bottom: 1px solid #C4C4C4;
  .MuiTab-root {
    font-size: 16px;
    line-height: 20px;
    color: #000;
    min-width: 190px;
    text-transform: uppercase;
  }
  .MuiTabs-indicator {
    height: 6px;
  }
  .MuiTab-wrapper {
    align-items: center;
    white-space: nowrap;
  }
`;

export default BCTabs2;
