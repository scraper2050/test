import React from 'react';
import styled from 'styled-components';
import { Customer } from 'reducers/customer.types';

import { Card, Fab } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';


interface SettingHeaderProps {
    title: string;
    icon: OverridableComponent<any>;
    subtitle: string;
    color: any;
}

export default function SettingHeader({ title, 'icon': Icon, subtitle, color }:SettingHeaderProps) {
  return <SettingHeaderContainer>
    <StyledCard
      borderColor={color[500]}
      elevation={0}
      iconBackground={color[100]}>
      <div className={'icon-container'}>
        <Icon style={{ 'color': color[500] }} />
      </div>
      <div>
        <h2>
          {title}
        </h2>
        <p>
          {subtitle}
        </p>
      </div>
    </StyledCard>
  </SettingHeaderContainer>;
}


const SettingHeaderContainer = styled.div`
    text-align: center;
    h2 {
        margin: 0px auto ;
    }
    span {
        font-weight: 800;
    }
    button {
        color: #fff;
        width: 200px;
        border-radius: 30px;
    }
`;

type CustomDiv = {
    iconBackground: string;
    borderColor: string;
}

const StyledCard = styled(Card)<CustomDiv>`
    background: #f6f6f6;
    padding: 25px 20px 20px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon-container {
        border-radius: 100px;
        margin-bottom: 16px;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${props => props.iconBackground}
    }

    h2,p {
        margin: 0;
    }
    p {
        color: #3a3a44;
    }
    h2 {
        margin-bottom: 8px;
    }
    cursor: pointer;
`;

