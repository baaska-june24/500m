import React from "react";
import { Icon } from "antd";
import LazyLoad from "react-lazyload";
import AspectRatio from "react-aspect-ratio";
import toCurrency from "~/utils/toCurrency";
import Quantity from "~/components/Quantity/";
import { addToBasket, removeFromBasket, getUser } from "~/hooks/hooks";

import "./style.scss";

const OrderItem = ({ data, refetch }) => {
  const userId =
    typeof localStorage === "object" &&
    localStorage.getItem("data") &&
    JSON.parse(localStorage.getItem("data")).userId;
  const [userData, userLoading, userRefetch] = getUser(userId);
  const { remove } = removeFromBasket();

  const removeItem = async (id, qty) => {
    await remove(userData && userData.id, {
      cartProductId: id,
      quantity: qty
    });
    setTimeout(() => refetch(), 200);
  };

  if (data) {
    const renderOrderItems = data.map(item => {
      const image = item.product.assets
        ? item.product.assets[0].path
        : require("~/static/img/default/food.png");
      return (
        <div className="orderitem" key={item.id}>
          <div className="info">
            <div>
              <LazyLoad>
                <AspectRatio ratio="1" className="imagea">
                  <img src={image} alt="img" className="image" />
                </AspectRatio>
              </LazyLoad>
              <h3 className="foodname">{item.product.name}</h3>
              <div className="flex">
                <p className="price">{toCurrency(item.price)}</p>
                <Quantity disabled qty={item.quantity} />
              </div>
            </div>
            <div className="remove">
              <Icon
                className="icon"
                type="close"
                size="lg"
                onClick={() => removeItem(item.id, item.quantity)}
              />
            </div>
          </div>
        </div>
      );
    });
    return renderOrderItems;
  }
  return null;
};

export default OrderItem;
