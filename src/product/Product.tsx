import React, { useEffect, useState } from "react";
import Allergy from "../allergy/Allergy";
import "./Product.css";

interface itemListProps {
  id: number | null;
  name: string | null;
}

interface ProductProps {
  itemList: itemListProps[];
  currentTab: number;
}
const Product = ({ itemList, currentTab }: ProductProps) => {
  const [allergyList, setAllergyList] = useState<itemListProps[]>([]);
  const [queryString, setQueryString] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:3000/data/vegetables.json?q=${
        queryString ? queryString : null
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        if (allergyList.length === 3) {
          alert("3개까지만 선택 가능합니다");
          return;
        } else if (res[0] === undefined) {
          return;
        } else {
          setAllergyList((prev) => [
            ...prev,
            { id: res[0].id, name: res[0].name },
          ]);
        }

        // const saveAllergy = () => {
        //   localStorage.setItem("allergy", JSON.stringify(allergyList));
        // };

        // window.addEventListener("storage", () => {
        //   saveAllergy();
        // });
        // return () => {
        //   window.removeEventListener("storage", () => {
        //     saveAllergy();
        //   });
        // };
      });
  }, [queryString]);

  return (
    <div className="weekly">
      <p className="title">이번주 요리</p>
      {itemList &&
        itemList.map((item, idx) => (
          <span key={idx} className="item">
            {item.name}
          </span>
        ))}
      {currentTab >= 1 && (
        <Allergy
          setQueryString={setQueryString}
          allergyList={allergyList}
          currentTab={currentTab}
        />
      )}
    </div>
  );
};

export default Product;
