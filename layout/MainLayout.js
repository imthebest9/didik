import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div className="w-full m-auto">
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
