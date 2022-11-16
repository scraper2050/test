import styled from "styled-components";
import {PRIMARY_BLUE} from "../../../constants";

export const ClickableCell = styled.span<{isBold?: boolean}>`
  cursor: pointer;
  font-weight: ${props => props.isBold ? 'bold' : 'normal'};
  :hover {
    color: ${PRIMARY_BLUE};
    text-decoration: underline;
  }
`;
