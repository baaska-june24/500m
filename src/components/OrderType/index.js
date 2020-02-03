import React from "react";
import "./style.scss";

const orderType = ({ delivery, setDelivery }) => {
  return (
    <div>
      <div className="subtitle">Захилагаа яаж авах вэ?</div>
      <div className="order-type">
        <div
          className={delivery ? "box active" : "box"}
          onClick={() => setDelivery(true)}
        >
          <img src={require("~/static/img/svg/box.svg")} />
          <div className="text">Хүргүүлж авах</div>
        </div>
        <div
          className={delivery ? "box " : "box active"}
          onClick={() => setDelivery(false)}
        >
          <img src={require("~/static/img/svg/bag.svg")} />
          <div className="text">Очиж авах</div>
        </div>
      </div>
    </div>
  );
};

export default orderType;
