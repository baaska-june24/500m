import React from "react";
import Navbar from "~/components/Nav/";
import Header from "~/components/Header/";

import "~/static/styles/main.scss";

const Layout = ({ showNavbar = true, header = true }) => ComposedComponent => {
  const layout = props => {
    return (
      <>
        <script
          src="https://cdn.lend.mn/3rdparty/embedded/and-ds.js"
          type="text/javascript"
        />
        <div className="wrapper">
          <div style={{ marginBottom: "100px" }}>
            {header && <Header />}
            <ComposedComponent {...props} />
          </div>
          <div style={{ marginTop: "100px" }}>{showNavbar && <Navbar />}</div>
        </div>
      </>
    );
  };
  return layout;
};

export default Layout;
