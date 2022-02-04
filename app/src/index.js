import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  Navigation,
  Footer,
  Home,
  About,
  ManageProducts,
  Blog,
  Posts,
  Post,
  Inventory,
  ManageOrders,
  SupplierManageOrders
} from "./components";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/about" element={<About />} />
      <Route path="/manageproducts" element={<ManageProducts />} />
      <Route path="/supplierorders" element={<SupplierManageOrders />} />
      <Route path="/manageorders" element={<ManageOrders />} />
      <Route path="/blog" element={<Blog />}>
        <Route path="" element={<Posts />} />
        <Route path=":postSlug" element={<Post />} />
      </Route>
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

serviceWorker.unregister();