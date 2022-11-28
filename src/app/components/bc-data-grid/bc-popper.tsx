import React from "react";
import styled from "styled-components";
import {GRAY3, PRIMARY_BLUE} from "../../../constants";
import {ReferenceObject} from "popper.js";
import {Popper, Typography} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

interface PROPS{
  type: string;
  data: any;
  anchor: null | ReferenceObject;
}

const formatAddress = (address: any) => {
  if (!address) return '';

  const {street, state, city, zipcode }= address;
  const temp = [];

  const temp1 = [];

  state?.trim() && temp1.push(state);
  zipcode?.trim() && temp1.push(zipcode);
  const temp3 = temp1.join(', ');

  street?.trim() && temp.push(street);
  city?.trim() && temp.push(city);
  temp3 && temp.push(temp3);

  return temp.join('<br />');
}

export const BcPopper = ({type, data, anchor}: PROPS) => {
  const open = Boolean(anchor);
  const id = open ? 'simple-popover' : undefined;

  return data && <Popper
    id={id}
    placement="top"
    open={open}
    anchorEl={anchor}
    modifiers={{
      flip: {
        enabled: false,
      },
    }}
  >
    <Container>
      {type === 'contact' ? <Contact data={data}/> : <Address data={data} />}
    </Container>
  </Popper>
}


const Container = styled.div<{isBold?: boolean}>`
  background-color: #fff;
  padding: 15px 25px;
  height: auto;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  &::after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: calc(50% - 12px);
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid #c4c4c4;
  }
  &::before {
    content: "";
    position: absolute;
    bottom: -11px;
    left: calc(50% - 10px);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 11px solid #ffffff;
    border-bottom-left-radius: 5px;
    z-index: 1;
  }

  div {
    display: flex;
    align-items: center;
    p {
      margin: 0 8px;
      color: ${GRAY3};
      font-size: 14px;
    }
  }

`;

const Contact = ({data}: any) => <>
  <Typography variant="h6">{data.name}</Typography>
  {data.email && <div>
    <EmailIcon style={{color: GRAY3, fontSize: 14}}/><p>{data.email}</p>
  </div>}
  {data.phone && <div>
    <PhoneIcon style={{color: GRAY3, fontSize: 14}}/><p>{data.phone}</p>
  </div>}
</>


const Address = ({data}: any) => <>
  <Typography variant="h6">{data.name}</Typography>
  <span dangerouslySetInnerHTML={{__html: formatAddress(data)}}/>
</>
