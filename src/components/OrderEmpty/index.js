import React from "react";
import Link from "next/link";
import Button from "~/components/Button";
import "./style.scss";

const OrderEmpty = () => {
  return (
    <div className="empty">
      <img src={require("~/static/img/default/basket.png")} className="image" />
      <h3>Уучлаарай</h3>
      <p>Таны сагс хоосон байна.</p>
      <Link href="/">
        <a>
          <Button className="default">Нүүр хуудасруу буцах</Button>
        </a>
      </Link>
    </div>
  );
};

export default OrderEmpty;
