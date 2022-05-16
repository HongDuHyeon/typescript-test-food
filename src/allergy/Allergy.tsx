import React, { SetStateAction, Dispatch, useState } from "react";
import AddProduct from "../addProduct/\bAddProduct";

import "./allergy.css";

type allergyProps = {
  allergyList: allergyArray[];
  setQueryString: Dispatch<SetStateAction<string>>;
  currentTab: number;
};

type allergyArray = {
  id: number | null;
  name: string | null;
};

const Allergy = ({ setQueryString, allergyList, currentTab }: allergyProps) => {
  const [searchAllergy, setSearchAllergy] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAllergy(e.target.value);
  };

  const productClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setQueryString(searchAllergy);
    setSearchAllergy(() => "");
  };

  return (
    <div>
      <p className="title">알러지 선택</p>
      <ul>
        {allergyList ? (
          allergyList.map((list) => <li key={list.id}>{list.name}</li>)
        ) : (
          <li></li>
        )}
      </ul>
      <input type="text" value={searchAllergy} onChange={handleInput} />
      <button type="button" onClick={productClick}>
        검색
      </button>
      {currentTab >= 2 && <AddProduct />}
    </div>
  );
};

export default Allergy;
