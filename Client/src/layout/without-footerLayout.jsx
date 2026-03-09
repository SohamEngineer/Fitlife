import React from "react";
import Header from "../component/common/header/header";
import { Outlet } from "react-router-dom";

const WithoutFooterLayout = () => {
  return (
    <>
      <Header/>
      <Outlet />

    </>
  );
};

export default WithoutFooterLayout;
