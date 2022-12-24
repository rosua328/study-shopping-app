import React, { useState } from "react";
import FilterProducts from "../components/FilterProducts";

export default function ProductsList() {
  const sizeDatas = ["S", "M", "L", "XL"];
  const colorDatas = [
    { en: "red", ko: "빨강" },
    { en: "orange", ko: "주황" },
    { en: "yellow", ko: "노랑" },
    { en: "green", ko: "초록" },
    { en: "blue", ko: "파랑" },
    { en: "white", ko: "하양" },
    { en: "black", ko: "검정" },
  ];
  const sortDatas = [
    { en: "lowPrice", ko: "낮은가격순" },
    { en: "highPrice", ko: "높은가격순" },
  ];

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <div className="flex p-4 justify-between">
        <div className="">
          <select
            className="cursor-pointer mr-4"
            name="color"
            required
            onChange={handleChange}
          >
            <option disabled>Color</option>
            {colorDatas.map((data) => (
              <option key={data.en} value={data.en}>
                {data.ko}
              </option>
            ))}
          </select>
          <select
            className="cursor-pointer"
            name="size"
            onChange={handleChange}
          >
            <option disabled>Size</option>
            {sizeDatas.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>
        <select
          className="cursor-pointer"
          onChange={(e) => setSort(e.target.value)}
        >
          {sortDatas.map((data) => (
            <option key={data.en} value={data.en}>
              {data.ko}
            </option>
          ))}
        </select>
      </div>
      <FilterProducts sort={sort} filter={filter} />;
    </>
  );
}
