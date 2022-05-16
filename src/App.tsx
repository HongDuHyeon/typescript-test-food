import React, { useEffect, useState } from "react";
import Product from "./product/Product";
import "./app.css";
import "./common.css";
import "./reset.css";

function App() {
  const [itemList, setItemList] = useState([]);
  const [currentTab, setCurrentTab] = useState(0);
  useEffect(() => {
    fetch("http://localhost:3000/data/default-vegetables.json")
      .then((res) => res.json())
      .then((res) => {
        setItemList(res.data);
      });
  }, []);

  const selectTab = (idx: number) => {
    setCurrentTab(idx);
  };

  const TAB_LIST = [
    { id: 1, number: 1 },
    { id: 2, number: 2 },
    { id: 3, number: 3 },
  ];

  return (
    <div className="wrap">
      <ul className="tabList">
        {TAB_LIST.map((list, idx) => (
          <li
            key={idx}
            className={currentTab === idx ? "active" : ""}
            onClick={() => selectTab(idx)}
          >
            {list.number}
          </li>
        ))}
      </ul>
      <div className="listContainer">
        {currentTab <= 3 && (
          <Product itemList={itemList} currentTab={currentTab} />
        )}
      </div>
    </div>
  );
}

export default App;
