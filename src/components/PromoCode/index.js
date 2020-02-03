import React from "react";
import { Input } from "antd";
import "./style.scss";

const PromoCode = () => {
  return (
    <div>
      <div className="promocode ">
        <div className="title">Танд промо код байгаа бол оруулна уу</div>
        <div className="item">
          <Input type="text" placeholder="Промо Код" />
        </div>
      </div>
    </div>
  );
};

export default PromoCode;
