export enum TypeOfFood {
  fruit = "fruit",
  vegetable = "vegetable",
}

export type FoodType = {
  name: string;
  type: TypeOfFood;
  coast: number;
};