import React from "react";
import { useNavigate } from "react-router-dom";
import Products from "../components/Products";
import Banner from "../components/ui/Banner";

const LI = "w-full h-60 sm:h-96 sm:w-72 cursor-pointer relative";
const R_BUTTON =
  "text-lg w-32 text-right sm:text-left font-normal  cursor-pointer  sm:hidden lg:block";
const L_BUTTON = "text-lg w-32 text-left font-normal  sm:hidden lg:block";
const BG = "w-full h-full bg-cover bg-center";
export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Banner />
      <ul className="p-8 sm:flex sm:gap-5 sm:justify-center">
        <li
          className={LI}
          onClick={() => {
            navigate(`/products`);
          }}
        >
          <div className={`${BG} bg-homeList1`}></div>
          <div className="absolute w-full h-full top-0 flex flex-col sm:items-center lg:items-start justify-between sm:justify-center lg:justify-between p-8 font-bold text-white">
            <h1 className="text-5xl sm:-rotate-90 lg:rotate-0">Woman Coat</h1>
            <h2 className="text-2xl text-black sm:text-white sm:hidden lg:block">
              Winter Fashion
              <br />
              For Women
            </h2>
            <button className={L_BUTTON}>- Shop Now</button>
          </div>
        </li>
        <li
          className={LI}
          onClick={() => {
            navigate(`/products`);
          }}
        >
          <div className={`${BG} bg-homeList2`}></div>
          <div className="absolute w-full h-full top-0 flex flex-col justify-between items-end  sm:items-center lg:items-start sm:justify-center lg:justify-between  p-8 font-bold text-white">
            <h1 className="text-5xl sm:-rotate-90 lg:rotate-0">Man Suits</h1>
            <h2 className="text-2xl sm:hidden lg:block">
              Last Authmn
              <br />
              Arrived 2022
            </h2>
            <button className={R_BUTTON}>- Shop Now</button>
          </div>
        </li>
        <li
          className={LI}
          onClick={() => {
            navigate(`/products`);
          }}
        >
          <div className={`${BG} bg-homeList3`}></div>
          <div className="absolute w-full h-full top-0 flex flex-col sm:items-center lg:items-start justify-between  sm:justify-center lg:justify-between p-8 sm:p-0 lg:p-8 font-bold text-white">
            <div className="sm:-rotate-90 lg:rotate-0">
              <h1 className="text-2xl font-normal">S E A S O N</h1>
              <h2 className="text-5xl text-black">SALE</h2>
            </div>
            <p className="font-normal text-black my-4 sm:text-2xl sm:font-bold sm:text-white sm:hidden lg:block">
              algmin wielre sweater <br /> ewirlg aaaine ggge
            </p>
            <button className={L_BUTTON}>- Shop Now</button>
          </div>
        </li>
        <li
          className={LI}
          onClick={() => {
            navigate(`/products`);
          }}
        >
          <div className={`${BG} bg-homeList4`}></div>
          <div className="absolute w-full h-full top-0 flex flex-col justify-between items-end  sm:items-center lg:items-start sm:justify-center lg:justify-between p-8 sm:p-0 lg:p-8 font-bold text-white">
            <h1 className="text-5xl sm:-rotate-90 lg:rotate-0">DRESS</h1>
            <h2 className="text-2xl text-right text-black sm:text-left sm:text-white sm:hidden lg:block">
              Trandy Fashion
              <br />
              For EveryDay
            </h2>
            <button className={R_BUTTON}>- Shop Now</button>
          </div>
        </li>
      </ul>

      <div className="py-12 border-b border-gray-300">
        <p className="text-5xl mb-8 text-center font-bold ">Fetured Products</p>
        <p className="text-center ">
          우리 쇼핑몰의 대표 상품들을 확인하실 수 있어요.
        </p>
      </div>

      <Products />
    </>
  );
}
