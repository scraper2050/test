import Card from '@material-ui/core/Card/Card';
import { PRIMARY_BLUE, PRIMARY_GRAY } from '../../../../../constants';
import React from 'react';
import styled from 'styled-components';

interface SettingsCardsProps {
    pricing: any[];
    active: number;
    setActive: (index:number)=>void;
}

export default function SettingsCards({ pricing, active, setActive }:SettingsCardsProps) {
  return <div>
    {pricing.map((type:any, index:number) =>
      <StyledCard
        active={index === active}
        borderColor={type.color[500]}
        iconBackground={type.color[100]}
        key={type.title}
        onClick={() => setActive(index)}>
        <div className={'icon-container'}>
          <type.icon style={{ 'color': type.color[500] }} />
        </div>
        <div>
          <h3>
            {type.title}
          </h3>
          <p>
            {type.subtitle}
          </p>
        </div>
      </StyledCard>)}
  </div>;
}

type CustomDiv = {
    active: boolean;
    iconBackground: string;
    borderColor: string;
}

const StyledCard = styled(Card)<CustomDiv>`
   background: ${props => props.active ? PRIMARY_BLUE : ''};
    padding: 25px 20px 20px;
    margin-bottom: 16px;
    display: flex;
    &:hover {
        background:${props => props.active ? PRIMARY_BLUE : '#f6f6f6'} ;
    }
    .icon-container {
        border-radius: 100px;
        margin-right: 16px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${props => props.iconBackground}
    }

    color: ${props => props.active ? '#fff' : 'rgba(0, 0, 0, 0.87)'} ;

    h3,p {
        margin: 0;
    }
    p {
        color:${props => props.active ? '#fff' : '#3a3a44'} ;
    }
    h3 {
        margin-bottom: 2px;
    }
    cursor: pointer;
`;


