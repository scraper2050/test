import React from 'react';
import {Switch, withStyles} from "@material-ui/core";
import {LIGHT_GREY, MENU_TEXT_COLOR, PRIMARY_GREEN} from "../../constants";
import styled from "styled-components";

interface PROPS {
  isActive: boolean;
  activeText: string;
  inactiveText: string;
  style?: any;
  onChange: () => void;
}

export default function BCSwitch({isActive, activeText, inactiveText, onChange, style}: PROPS) {
  return (
    <Container isActive={isActive}>
      <GreenSwitch
        checked={isActive}
        onChange={onChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <GreenSpan isActive={isActive}>
        {isActive ? activeText : inactiveText}
      </GreenSpan>
    </Container>
  )
}

const Container = styled.div`
  display: inline-block;
  border: 1px solid ${(props: {isActive: boolean}) => props.isActive ? PRIMARY_GREEN : MENU_TEXT_COLOR};
  border-radius: 20px;
  margin-right: 10px;
  padding-right: 10px;
`


const GreenSwitch = withStyles({
  switchBase: {
    color: LIGHT_GREY,
    '&$checked': {
      color: PRIMARY_GREEN,
    },
    '&$checked + $track': {
      backgroundColor: `${PRIMARY_GREEN}88`,
    },
  },
  checked: {},
  track: {
    backgroundColor: `${LIGHT_GREY}88`,
  },
})(Switch);

const GreenSpan = styled.span`
  color: ${(props: {isActive: boolean}) => props.isActive ? PRIMARY_GREEN : MENU_TEXT_COLOR}
`
