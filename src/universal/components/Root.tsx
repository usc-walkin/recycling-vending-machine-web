import * as React from 'react';
import styled from 'styled-components';

import GlobalStyle from '@@components/GlobalStyle';
import Spinner from '@@components/Spinner';

const StyledRoot = styled.div`
  align-items: center;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px 3px;
  width: 320px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Map = styled.div`
  background-color: #ececec;
  height: 300px;
  width: 300px;
`;

const StatusMessage = styled.div`
  background-color: #e1fbe1;
  margin-top: 10px;
  padding: 5px;
  width: 300px;
  word-break: break-all;
`;

const ButtonGroup = styled.div`
  margin-top: 13px;
`;

const Button = styled.div`
  cursor: pointer;
  text-decoration: underline;
`;

const Root = ({
  handleClickReturnProduct,
  handleClickWithdrawCoin,
  isFetchingData,
  message,
}) => {
  return (
    <StyledRoot>
      <GlobalStyle />
      <Title>
        Recycling Vending Machine
      </Title>
      <Map id={'map'}/>
      <StatusMessage>
        {message}
      </StatusMessage>
      <Spinner show={isFetchingData} />
      <ButtonGroup>
        <Button onClick={handleClickReturnProduct}>
          Return Product (Scan the product)
        </Button>
        <Button onClick={handleClickWithdrawCoin}>
          Withdraw Coin (Giving the address)
        </Button>
      </ButtonGroup>
    </StyledRoot>
  );
};

export default Root;
