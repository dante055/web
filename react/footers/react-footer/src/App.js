import React from 'react';
import { FooterContainer } from './containers/footer';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  min-height: calc(60vh - 45px);

  // @media (max-width: 1000px) {
  //   min-height: calc(60vh - 80px);
  // }
`;

function App() {
  return (
    <PageContainer>
      <ContentWrapper></ContentWrapper>
      <FooterContainer />
    </PageContainer>
  );
}

/* using global styles */
/* function App() {
  return (
    <>
      <FooterContainer />
    </>
  );
} */

export default App;
