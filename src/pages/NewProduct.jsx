import React, { useState } from "react";
import { imageUpload } from "../api/uploader";
import CheckBox from "../components/CheckBox";
import Button from "../components/ui/Button";
import useProducts from "../hooks/useProducts";

export default function NewProduct() {
  const [product, setProduct] = useState({ color: "red" });
  const [file, setFile] = useState(null);
  const [size, setSize] = useState([]);
  const [isUpLoading, setIsUpLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const { addProduct } = useProducts();

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  const handleSizeClick = (e) => {
    if (size.includes(e.target.value)) {
      setSize(size.filter((item) => item !== e.target.value));
    } else {
      setSize([e.target.value, ...size]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpLoading(true);
    imageUpload(file)
      .then((url) => {
        addProduct.mutate(
          { product, url, size },
          {
            onSuccess: () => {
              setSuccess("성공적 제품등록 완료");
              setTimeout(() => {
                setSuccess(null);
              }, 4000);
            },
          }
        );
      })
      .finally(() => setIsUpLoading(false));
  };

  return (
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold my-4">새로운 제품 등록</h2>
      {success && <p className="my-2">{success}</p>}
      <div className="md:flex">
        <div className="flex-1">
          {file && (
            <img
              className=" h-96 mx-auto mb-2"
              src={URL.createObjectURL(file)}
              alt="local file"
            />
          )}
        </div>
        <form className="flex flex-col px-12 flex-1" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            name="file"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            placeholder="제품명"
            value={product.title ?? ""}
            required
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            placeholder="가격"
            required
            value={product.price ?? ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="desc"
            placeholder="제품설명"
            required
            value={product.desc ?? ""}
            onChange={handleChange}
          />
          <div className="flex my-1">
            <select
              className="flex-1 p-4 cursor-pointer"
              name="color"
              required
              onChange={handleChange}
            >
              {colorDatas.map((data) => (
                <option key={data.en} value={data.en}>
                  {data.ko}
                </option>
              ))}
            </select>
            <div className="flex-1 flex items-center justify-end">
              {sizeDatas.map((data) => (
                <CheckBox key={data} text={data} onClick={handleSizeClick} />
              ))}
            </div>
          </div>
          <Button
            text={isUpLoading ? "업로드중..." : "제품 등록"}
            disabled={isUpLoading}
          />
        </form>
      </div>
    </section>
  );
}
