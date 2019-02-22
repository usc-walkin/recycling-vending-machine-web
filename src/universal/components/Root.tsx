import * as React from 'react';
import styled from 'styled-components';

import GlobalStyle from '@@components/GlobalStyle';
import Spinner from '@@components/Spinner';

const darkColor = '#0e1223';

const StyledRoot = styled.div`
  align-items: center;
  border: 1px solid #d8d8d8;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 320px;
`;

const Main = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 12px;
`;

const Header = styled.div`
  align-items: center;
  background-color: ${darkColor};
  color: white;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  height: 45px;
  justify-content: center;
  width: 100%;
`;

const Map = styled.div`
  background-color: #ececec;
  height: 320px;
  width: 320px;
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

  > div {
    margin-bottom: 3px;
  }
`;

const Button = styled.div`
  cursor: pointer;
  text-decoration: underline;
  
  &:hover {
    color: green;
  }
`;

const ItemScanned = styled.div`
  background-color: #f1f1f1;
  margin: 3px 0;
`;

const Root = ({
  handleClickReturnProduct,
  handleClickWithdrawCoin,
  isFetchingData,
  itemScanned,
  message,
}) => {
  return (
    <>
      <GlobalStyle />
      <StyledRoot>
        <Header>
          Recycling Vending Machine
        </Header>
        <Main>
          <Map id={'map'}/>
          <StatusMessage>
            {message}
          </StatusMessage>
          <ItemScanned>
            {itemScanned}
          </ItemScanned>        
          <Spinner show={isFetchingData} />
          <ButtonGroup>
            <Button onClick={handleClickReturnProduct}>
              Return Product at USC (Scanning the product)
            </Button>
            <Button onClick={handleClickWithdrawCoin}>
              Withdraw Coin (Giving the address)
            </Button>
          </ButtonGroup>
        </Main>
        <Header>
          Team USC-WALKIN presents
        </Header>
      </StyledRoot>
    </>
  );
};

export default Root;
