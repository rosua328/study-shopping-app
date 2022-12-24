import React from "react";

export default function CheckBox({ text, onClick }) {
  return (
    <>
      <input
        className="mx-2 cursor-pointer"
        type="checkbox"
        name="size"
        value={text}
        onClick={onClick}
      />
      {text}
    </>
  );
}
