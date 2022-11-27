import { FC } from "react";
import FoodListContainer from "../FoodList/FoodContainer/FoodContainer";
import styled from "styled-components";
import AuthContainer from "../Auth/authContainer";

const AppContainer = styled.div`
  min-height: 100vh;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;
  gap: 20px;
`;

const App: FC = () => {
  return (
    <AppContainer>
      <FoodListContainer />
      <AuthContainer />
    </AppContainer>
  );
};

export default App;
