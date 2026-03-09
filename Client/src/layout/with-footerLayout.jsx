import React from "react";
import Header from "../component/common/header/header";
import Footer from "../component/common/footer";
import { Outlet } from "react-router-dom";

const WithFooterLayout = () => {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  );
};

export default WithFooterLayout;
