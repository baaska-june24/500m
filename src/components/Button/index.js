import React from "react";
import { Button } from "antd";
import "./style.scss";

export default ({ className, ...otherProps }) => {
  const classnames = (className || "").split(" ");
  return (
    <Button {...otherProps} shape="round" className={classnames.join(" ")} />
  );
};
