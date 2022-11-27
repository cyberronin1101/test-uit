import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import FoodList from "../FoodList";
import { FoodType, TypeOfFood } from "../FoodList.types";
import { Select } from "../../UI/Select";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { Food, FoodHeader, Label } from "./FoodContainer.styled";

const foodItemsInit: FoodType[] = [
  {
    name: "apple",
    type: TypeOfFood.fruit,
    coast: 10,
  },
  {
    name: "potato",
    type: TypeOfFood.vegetable,
    coast: 5,
  },
];

const foodTypesValues = Object.values(TypeOfFood);

const FoodListContainer: FC = () => {
  const [foodItems, setFoodItems] = useState<FoodType[]>([]);
  const [foodTypeFilter, setFoodTypeFilter] = useState<TypeOfFood | "all">(
    "all"
  );
  const [minCoastFilter, setMinCoastFilter] = useState<number | "">("");
  const [maxCoastFilter, setMaxCoastFilter] = useState<number | "">("");

  useEffect(() => {
    setFoodItems(foodItemsInit);
  }, []);

  const filter = useCallback(
    (foodItem: FoodType) => {
      if (foodTypeFilter !== "all" && foodItem.type !== foodTypeFilter) {
        return false;
      }

      if (minCoastFilter !== "" && foodItem.coast < minCoastFilter) {
        return false;
      }

      if (maxCoastFilter !== "" && foodItem.coast > maxCoastFilter) {
        return false;
      }

      return true;
    },
    [foodTypeFilter, maxCoastFilter, minCoastFilter]
  );

  const food = useMemo(() => foodItems.filter(filter), [filter, foodItems]);

  const resetFilters = () => {
    setFoodTypeFilter("all");
    setMinCoastFilter("");
    setMaxCoastFilter("");
  };

  const typeFilterHandler = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setFoodTypeFilter(value as TypeOfFood);
  };

  return (
    <Food>

      <h3>example 1</h3>

      <FoodHeader>
        <Label>
          <span>By type</span>
          <Select value={foodTypeFilter ?? "all"} onChange={typeFilterHandler}>
            <option value={"all"}>all</option>
            {foodTypesValues.map((foodTypeItem) => (
              <option key={foodTypeItem} value={foodTypeItem}>
                {foodTypeItem}
              </option>
            ))}
          </Select>
        </Label>

        <Label>
          <span>By min coast</span>
          <Input
            value={minCoastFilter}
            type="number"
            placeholder={"all"}
            onChange={({ target: { value } }) =>
              setMinCoastFilter(value === "" ? "" : Number(value))
            }
          />
        </Label>

        <Label>
          <span>By max coast</span>
          <Input
            value={maxCoastFilter}
            type="number"
            placeholder={"all"}
            onChange={({ target: { value } }) =>
              setMaxCoastFilter(value === "" ? "" : Number(value))
            }
          />
        </Label>

        <Label>
          <Button onClick={resetFilters}>Reset</Button>
        </Label>
      </FoodHeader>

      <FoodList food={food} />
    </Food>
  );
};

export default FoodListContainer;