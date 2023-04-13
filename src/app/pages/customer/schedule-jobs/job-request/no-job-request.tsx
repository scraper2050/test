import React from "react";
import styled from "styled-components";

const NoJobsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  height: 70%;
`
const NoJobRequest = () => {
  return (
    <NoJobsContainer>
      <h2>No Job Requests</h2>
    </NoJobsContainer>
  )
}
export default NoJobRequest
