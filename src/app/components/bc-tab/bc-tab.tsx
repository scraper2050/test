import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import styled from 'styled-components';
import * as CONSTANTS from "../../../constants";
import {Chip} from "@material-ui/core";

interface BCTabsProps {
  curTab: any;
  onChangeTab: (newValue: number) => void;
  indicatorColor: 'primary' | 'secondary';
  tabsData: any;
  chip?: boolean
}

function BCTabs({ curTab, onChangeTab, indicatorColor, tabsData, chip = false }: BCTabsProps): JSX.Element {
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
      chip={chip}
    >
      {tabsData.map((item: any, idx: number) => {
        return <Tab
          key={idx}
          label={item.icon || item.chip ? undefined : item.label}
          value={item.value}
          icon= {item.icon ?
            <ImageWrapper><img src={item.icon}/><span>{item.label}</span></ImageWrapper>:
            item.chip ? <div><span>{item.label}</span>
              { item.chipValue ? <Chip
                label={item.chipValue}
                style={{
                  'backgroundColor': CONSTANTS.INVOICE_TOP,
                  'color': CONSTANTS.INVOICE_TABLE_HEADING,
                  'marginLeft': '10px',
                  'padding': '0px 6x'
                }}
              />: undefined } </div>: undefined
          }
        />;
      })}
    </StyledTabs>
  );
}

const StyledTabs = styled(Tabs)<{chip: boolean}>`
  border-bottom: 1px solid #C4C4C4;
  .MuiTab-root {
    font-size: 16px;
    line-height: 20px;
    color: #000;
    width: 190px;
    text-transform: uppercase;
    padding-top: 0;

    &:last-of-type {
      .MuiTab-wrapper {
        align-items: ${props => props.chip ? 'end' : 'center'};;
      }
    }
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
