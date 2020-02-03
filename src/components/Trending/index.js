import React from "react";
import LazyLoad from "react-lazyload";
import AspectRatio from "react-aspect-ratio";
import isEmpty from "~/utils/isEmpty";
import toCurrency from "~/utils/toCurrency";
import { Icon, message } from "antd";
import "./style.scss";

import { addToBasket, getUser } from "~/hooks/hooks";

const Trending = ({ data, foodModal }) => {
  const userId =
    typeof localStorage === "object" &&
    localStorage.getItem("data") &&
    JSON.parse(localStorage.getItem("data")).userId;
  const [userData, userLoading, userRefetch] = getUser(userId);
  const { insert } = addToBasket();
  const add = async id => {
    await insert(userData && userData.id, {
      productId: id,
      quantity: "1"
    });
    message.success("Амжилттай нэмэгдлээ");
  };
  const filter = data && data.filter(data => data.count > 0);
  const mealList = filter.map((item, index) => {
    return (
      <div className="item" key={index}>
        <div onClick={() => foodModal(item)}>
          <LazyLoad height={140}>
            <AspectRatio ratio="1" className="imagea">
              <img
                src={
                  isEmpty(item.path)
                    ? require("~/static/img/default/food.png")
                    : item.path
                }
                className="image"
              />
            </AspectRatio>
          </LazyLoad>
          <h4>{item.name}</h4>
        </div>
        <div className="price">
          {toCurrency(item.price)}
          <div className="icon" onClick={() => add(item.id)}>
            <Icon type="plus" />
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <h2 className="trendTitle">Trending</h2>
      <div className="trending">
        <div className="list">{mealList}</div>
      </div>
    </>
  );
};

export default Trending;
