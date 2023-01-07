import React from "react";
import Products from "../components/Products";
import Banner from "../components/ui/Banner";

const LI = "w-full h-60 sm:h-96 sm:w-72 relative";
const R_BUTTON = "text-lg w-32 text-right font-normal  cursor-pointer";
const L_BUTTON = "text-lg w-32 text-left font-normal  cursor-pointer";
const BG = "w-full h-full bg-cover bg-center";
export default function Home() {
  return (
    <>
      <Banner />
      <ul className="p-8 md:flex md:gap-5 md:justify-center">
        <li className={LI}>
          <div className={ `${BG} bg-homeList1`}></div>
          <div className="absolute w-full h-full top-0 flex flex-col justify-between sm:justify-end sm:text-right p-8 font-bold text-white">
          <h1 className="text-5xl sm:absolute sm:-rotate-90 sm:-left-36 sm:text-black sm:top-40">Woman Coat</h1>
          <h2 className="text-2xl text-black sm:text-white">Winter Fashion<br/>For Women</h2>
          <button className={L_BUTTON}>- Shop Now</button>
          </div>
          </li>
        <li className={LI}>
        <div className={ `${BG} bg-homeList2`}></div>
        <div className="absolute w-full h-full top-0 flex flex-col justify-between items-end p-8 font-bold text-white">
          <h1 className="text-5xl">Man Suits</h1>
          <h2 className="text-2xl">Last Authmn<br/>Arrived 2022</h2>
          <button className={R_BUTTON}>- Shop Now</button>
          </div>
          </li>
        <li className={LI}>
        <div className={ `${BG} bg-homeList3`}></div>
          <div className="absolute w-full h-full top-0 flex flex-col p-8 font-bold text-white">
          <h1 className="text-2xl font-normal">S E A S O N</h1>
          <h2 className="text-5xl text-black">SALE</h2>
          <p className="font-normal text-black my-4">algmin wielre sweater <br/> ewirlg aaaine ggge</p>
          <button className={L_BUTTON}>- Shop Now</button>
          </div>
          </li>
        <li className={LI}>
        <div className={ `${BG} bg-homeList4`}></div>
        <div className="absolute w-full h-full top-0 flex flex-col justify-between items-end p-8 font-bold text-white">
          <h1 className="text-5xl">DRESSES</h1>
          <h2 className="text-2xl text-right text-black">Trandy Fashion<br/>For EveryDay</h2>
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
