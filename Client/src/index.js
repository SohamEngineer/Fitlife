import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "remixicon/fonts/remixicon.css";
import "aos/dist/aos.css"
import { BrowserRouter } from 'react-router-dom';

import AuthContextProvider from "./component/AuthContextProvider";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <AuthContextProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
   </AuthContextProvider>

);
