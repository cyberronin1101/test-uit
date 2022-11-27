import React, { FC } from "react";
import { FoodType } from "./FoodList.types";
import FoodListItem from "./FoodListItem";
import styled from "styled-components";

const FoodListContainer = styled.ul`
  margin: 0;
`;
const FoodList: FC<{ food: FoodType[] }> = ({ food }) => {
  return (
    <FoodListContainer>
      {food.length
        ? food.map((food, idx) => <FoodListItem key={idx} food={food} />)
        : "Food Items not found, pls change filters"}
    </FoodListContainer>
  );
};

export default FoodList;