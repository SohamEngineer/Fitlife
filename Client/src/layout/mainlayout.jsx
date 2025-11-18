import React from "react";
import Header from "../component/common/header";
import Footer from "../component/common/footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  );
};

export default MainLayout;
