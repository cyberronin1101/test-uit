import { FC } from "react";
import { FoodType } from "./FoodList.types";

const FoodListItem: FC<{ food: FoodType }> = ({
  food: { name, type, coast },
}) => {
  return <li>{`${name} - ${type} - ${coast.toLocaleString("ru-RU")}`}</li>;
};

export default FoodListItem;