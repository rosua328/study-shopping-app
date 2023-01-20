import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";
import Button from "./ui/Button";
import { BiHighlight } from "react-icons/bi";
import { AiOutlineUnorderedList } from "react-icons/ai";

export default function NavBar() {
  const { user, login, logout } = useAuthContext();
  const [menu, setMenu] = useState(true);

  const handleClick = () => {
    setMenu(!menu);
  };

  return (
    <header className="flex justify-between flex-col sm:flex-row bg-white border-b border-gray-300 p-3 sticky top-0 z-50">
      <AiOutlineUnorderedList
        onClick={() => setMenu(!menu)}
        className="absolute right-5 top-5 text-xl cursor-pointer sm:hidden"
      />
      <Link
        className="text-4xl text-brand mb-4 sm:mb-0"
        to="/"
        onClick={handleClick}
      >
        <h1>MyShop</h1>
      </Link>
      <nav
        className={
          "flex flex-col  sm:flex-row justify-between w-full sm:w-auto items-center sm:gap-4 gap-1 font-semibold text-sm" +
          (menu ? " hidden sm:flex" : " flex")
        }
      >
        {user && (
          <Link className="" to="/orders" onClick={handleClick}>
            주문내역
          </Link>
        )}
        <Link className="text-center" to="/products" onClick={handleClick}>
          물품목록
        </Link>
        {user && (
          <Link className=" text-center" to="/cart" onClick={handleClick}>
            <div className="hidden sm:block">
              <CartStatus />
            </div>
            <p className="sm:hidden cursor-click">장바구니</p>
          </Link>
        )}
        {user && user.isAdmin && (
          <Link
            className=" text-center"
            to="/product/new"
            onClick={handleClick}
          >
            <div className="hidden sm:block">
              <BiHighlight className="text-2xl" />
            </div>
            <p className="sm:hidden cursor-click">물품추가</p>
          </Link>
        )}
        {user && (
          <span className="shrink-0 sm:block hidden">{user.displayName}</span>
        )}
        {!user && (
          <Button text={"Login"} onClick={login}>
            Login
          </Button>
        )}
        {user && (
          <Button text={"Logout"} onClick={logout}>
            Logout
          </Button>
        )}
      </nav>
    </header>
  );
}
