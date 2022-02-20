import React from "react";

const Button = ({href, children, margin, mode = "filled", style }) => { 
  return (
    <a
      href={href}
      style={style}
      class={
        "p-2 pl-5 pr-5 transition-colors duration-700 transform text-gray-100 text-lg rounded-lg focus:border-4 border-indigo-300" +
        (mode === "filled"
          ? " text-gray-100 bg-indigo-500 hover:bg-blue-400"
          : " text-indigo-500 bg-transparent hover:bg-indigo-500 hover:text-gray-100") +
        (margin ? " m-" + margin + "px" : "")
      }
    >
      {children}
    </a>
  );
};
export default Button;
