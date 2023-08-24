import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import styled from 'styled-components';
import * as CONSTANTS from "../../../constants";
import {Chip} from "@material-ui/core";
import SvgIcon from '@material-ui/core/SvgIcon';

interface BCTabsProps {
  curTab: any;
  onChangeTab: (newValue: number) => void;
  indicatorColor: 'primary' | 'secondary';
  tabsData: any;
  chip?: boolean;
  responsiveLabel?: boolean;
  variant?: string;
  disabled?: boolean;
  minWidth?: string;
  orientaion?: 'horizontal' | 'vertical';
}

function BCTabs({ curTab, onChangeTab, indicatorColor, tabsData, chip = false, responsiveLabel = false, variant = 'scrollable', disabled = false, minWidth = '', orientaion = 'horizontal' }: BCTabsProps): JSX.Element {
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    onChangeTab(newValue);
  };

  return (
    <StyledTabs
      indicatorColor={indicatorColor}
      onChange={handleTabChange}
      value={curTab}
      variant={variant}
      minwidth={minWidth}
      scrollButtons="on"
      chip={chip ? 1 : 0}
      orientation={orientaion}
    >
      {tabsData.map((item: any, idx: number) => {
        return <Tab
          disabled={disabled}
          key={idx}
          label={item.icon || item.chip || item.badgeContent ? undefined : item.label}
          value={item.value}
          icon= {item.icon ?
            typeof item.icon === 'string' ? (
              <ImageWrapper>
                <img 
                  src={item.icon}
                  className={
                    typeof item.icon === 'string' && item.icon.includes('loading') 
                      ? 'icon-loading' : ''
                  }
                />
                <span 
                  className={
                    typeof item.icon === 'string' && item.icon.includes('loading') 
                      ? 'label-loading' 
                      : responsiveLabel ? 
                        'responsive'
                        :''
                  }
                >
                  {item.label}
                </span>
              </ImageWrapper>
            ) : (
              <FlexDiv>
                <item.icon fillColor={curTab === idx ? '#00AAFF' : ''}/>
                <span className={responsiveLabel ? 'responsive' :''}>
                  {item.label}
                </span>
              </FlexDiv>
            ):
            item.chip ? <div><span>{item.label}</span>
              { item.chipValue ? <Chip
                label={item.chipValue}
                style={{
                  'backgroundColor': CONSTANTS.INVOICE_TOP,
                  'color': CONSTANTS.INVOICE_TABLE_HEADING,
                  'marginLeft': '10px',
                  'padding': '0px 6x'
                }}
              />: undefined } </div>: 
            item.badgeContent ? (
              <div>
                <span>{item.label}</span>
                <Chip 
                  label={item.badgeContent}
                  color="secondary" 
                  style={{
                    'marginLeft': '10px',
                    'padding': '0px 6x',
                    'width': '50px',
                  }}
                />
              </div>
            ) : undefined
          }
        />;
      })}
    </StyledTabs>
  );
}

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img, svg {
    width: 22px;
    height: 22px;
    margin-right: 5px;
  }

  @media (max-width: 1575px) {
    span.responsive {
      display: none;
    }
    img, svg {
      margin-right: 0;
    }
  }
`

const StyledTabs = styled(Tabs)<{chip: boolean|number, variant: any, minwidth: string}>`
  border-${props => props.orientation === 'horizontal' ? 'bottom' : 'right'}: 1px solid #C4C4C4;
  .MuiTab-root {
    font-size: 16px;
    line-height: 20px;
    color: #000;
    min-width: ${props => props.minwidth || '190px'};
    text-transform: uppercase;
    
    ${props => props.orientation === 'horizontal' && 'padding-top: 0;'}
    ${props => props.orientation === 'vertical' && 'border-bottom: 1px solid gray;'}

    &:last-of-type {
      .MuiTab-wrapper {
        align-items: ${props => props.chip ? 'end' : 'center'};
      }
    }
  }
  @media (max-width: 1575px) {
    .MuiTab-root {
      min-width: 70px;
    }
  }

  .MuiTabs-indicator {
    height: 6px;
  ${props => props.orientation == 'vertical' && 'background: rgba(0, 170, 255, .2); border: 3px solid #00aaff; width: 100%'}

  }


  .MuiTab-wrapper {
    align-items: ${props => props.chip ? 'end' : 'center'};
    white-space: nowrap;
  }
`;

const ImageWrapper = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;

    img, svg {
      width: 22px;
      height: 22px;
      margin-right: 5px;
    }
    
    img.icon-loading {
      width: 42px;
      height: 42px;
    }

    span {
      padding-top: 4px;
    }

    @media (max-width: 1575px) {
      span.responsive, span.label-loading {
        display: none;
      }
      img, svg {
        margin-right: 0;
      }
    }

    @keyframes example {
      from {color: #474747;}
      to {color: #0082c3;}
    }

    span.label-loading {
      animation-name: example;
      animation-duration: 2s;
      animation-iteration-count: infinite;
    }

}

`
export default BCTabs;
