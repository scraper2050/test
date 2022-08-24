import styled from "styled-components";
import {ASH, GRAY2, GRAY4} from "../../../../constants";
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const TopMarginedContainer = styled.div`
  margin-top: 25px;
`

export const TabElement = styled.div`
  width: 10vw;
  padding: 9px;
  background-color: ${ASH};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  text-align: center;

  > span {
    font-weight: bold;
    font-size: 14px;
    color: ${GRAY2};
  }
`

export const Line = styled.div`
  border-top: 1px solid ${GRAY4};
`;

export const Tab = ({title}: {title: string}) => <>
  <TabElement>
    <span>{title}</span>
  </TabElement>
  <Line />
</>

export const RequestAutocomplete = styled(Autocomplete)`
  .MuiFormControl-fullWidth {
    width: 90%;
  }
  .MuiAutocomplete-inputRoot {
    padding: 0 9px;
  }
  fieldset {
    border-radius: 8px;
  }
`
