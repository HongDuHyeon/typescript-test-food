import React, { useState, useEffect } from "react";
import "./addProduct.css";

interface addProductProps {
  id: number;
  name: string;
  canBuy: boolean;
  price: number;
}

const AddProduct = () => {
  const [addProduct, setAddProduct] = useState<addProductProps[]>([]);
  const [addPrice, setAddPrice] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3000/data/add-vegetables.json")
      .then((res) => res.json())
      .then((res) => setAddProduct(res.data));
  }, []);

  return (
    <div>
      <p className="title">추가 선택</p>
      <ul>
        {addProduct.map((product) => (
          <li
            key={product.id}
            className={`product ${!product.canBuy ? "soldOut" : ""}`}
          >
            <span className="addInfo">
              {product.name}({product.price})
            </span>
            <button
              type="button"
              className="addButton"
              disabled={!product.canBuy}
              onClick={() =>
                setAddPrice((prev) => {
                  return prev + product.price;
                })
              }
            >
              추가
            </button>
          </li>
        ))}
        <p>총구매 금액 : {addPrice}</p>
      </ul>
    </div>
  );
};

export default AddProduct;
