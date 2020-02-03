import React from "react";
import "./style.scss";

const Header = (small = false) => {
  return <div className={`bg ${small && `small`}`}></div>;
};

export default Header;
