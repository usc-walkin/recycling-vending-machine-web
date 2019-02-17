import * as React from 'react';
import styled, { keyframes } from 'styled-components';

const KeyFramesFadeIn = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

// const StyledSpinner = styled.div`
//   align-items: center;
//   animation: ${KeyFramesFadeIn} 1s linear infinite;
//   background-color: white;
//   display: flex;
//   flex-direction: row;
//   height: 100vw;
//   justify-content: center;
// `;

const StyledSpinner = styled.div`
  color: green;
  margin-top: 5px;
`;

const Spinner: React.FC<any> = ({
  show,
}) => {
  return show 
    ? (
      <StyledSpinner>
        data is fetching...
      </StyledSpinner>
    )
    : null;
};

export default Spinner;
