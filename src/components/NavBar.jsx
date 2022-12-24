import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import CartStatus from "./CartStatus";
import Button from "./ui/Button";
import { BiHighlight } from "react-icons/bi";

export default function NavBar() {
  const { user, login, logout } = useAuthContext();

  return (
    <header className="flex justify-between bg-white border-b border-gray-300 p-3 sticky top-0 z-50">
      <Link className="sm:text-4xl sm:text-brand sm:block hidden" to="/">
        <h1>MyShop</h1>
      </Link>
      <nav className="flex justify-between w-full sm:w-auto items-center sm:gap-4 gap-2 font-semibold text-sm">
        <Link to="products">Products</Link>
        {user && (
          <Link to="/cart">
            <CartStatus />
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to="/product/new">
            <BiHighlight className="text-2xl" />
          </Link>
        )}
        {user && <span className="shrink-0">{user.displayName}</span>}
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
