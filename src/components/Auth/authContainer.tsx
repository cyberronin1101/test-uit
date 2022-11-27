import { ChangeEvent, FC, useState } from "react";
import { object, SchemaOf, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "react-query";
import { Input } from "../UI/Input";
import { Button } from "../UI/Button";
import Autocomplete from "../UI/Autocomplete";
import styled from 'styled-components';

type UserType = {
  name: string;
  surname: string;
};

const Form = styled.form`
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  gap: 20px;
  margin-bottom: 20px;
`

const USER_URL = `https://gorest.co.in/public-api/users?name=`;

const userSchema: SchemaOf<UserType> = object({
  name: string().required(),
  surname: string().required(),
});

const reverse = (str: string) => [...str].reverse().join("");

const each = (str: string) => [...str].reduce((a, b) => b + a, "");
const recursion = (str: string): string => {
  const { length } = str;

  if (length === 1) {
    return str;
  }

  return str.slice(-1) + recursion(str.slice(0, length - 1));
};

let timer: ReturnType<typeof setTimeout> | null = null;

const AuthContainer: FC = () => {
  const [dataForm, setDataForm] = useState("");
  const [searchName, setSearchName] = useState("");

  const { register, handleSubmit, setValue, setFocus } = useForm<UserType>({
    resolver: yupResolver(userSchema),
  });

  const { data } = useQuery(
    ["userName", searchName],
    () => {
      return fetch(USER_URL + searchName).then((res) => res.json());
    },
    {
      enabled: !!searchName,
      refetchOnWindowFocus: false,
    }
  );

  const submitHandler = ({ name, surname }: UserType) => {
    let result: string = ``;

    const str = `${name} ${surname}`;

    let arr = str.split(" ").reverse();

    result += `reverse - ${arr.map(reverse).join(" ")}, \n`;
    result += `each - ${arr.map(each).join(" ")}, \n`;
    result += `recursion - ${arr.map(recursion).join(" ")}`;

    setDataForm(result);
  };

  const onUserChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => setSearchName(e.target.value), 300);
  };

  const onAutocompleteHandler = (str: string) => {
    let [name, surname] = str.split(' ');
    name && setValue('name', name);
    surname && setValue('surname', surname);
    setFocus('surname');
  }

  let result = (data?.data ?? []).map((item: any) => item.name)

  return (
    <div>

      <h3>example 2 (name support suggest eng)</h3>

      <Form onSubmit={handleSubmit(submitHandler)}>

        <label>
          <Autocomplete
            items={result}
            type="text"
            placeholder={"name"}
            {...register("name")}
            onChange={onUserChange}
            onAutocomplete={onAutocompleteHandler}
          />
        </label>

        <label>
          <Input type="text" placeholder={"surname"} {...register("surname")} />
        </label>

        <Button type={"submit"}>submit</Button>
      </Form>

      <pre>{dataForm ? dataForm : "pls submit form"}</pre>
    </div>
  );
};

export default AuthContainer;

