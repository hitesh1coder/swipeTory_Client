import React, { useState } from "react";
import CategoryStyles from "./Category.module.css";
import { categories } from "../Category";
const Categories = ({ onSelectedValue }) => {
  console.log(onSelectedValue);
  const [selectedId, setSelectedId] = useState(0);
  const handleSelectTeck = (data, id) => {
    onSelectedValue(data.name);
    setSelectedId(id);
  };
  const getSelectedClass = (id) =>
    selectedId === id ? `${CategoryStyles.selected}` : "";
  return (
    <div className={CategoryStyles.container}>
      <div className={CategoryStyles.cards}>
        {categories.map((category, i) => (
          <div
            key={i}
            onClick={() => {
              handleSelectTeck(category, i);
            }}
            className={`${CategoryStyles.category_card} ${getSelectedClass(
              i
            )} `}
          >
            <h2>{category.name}</h2>
            <img src={category.img} alt={category.img} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
