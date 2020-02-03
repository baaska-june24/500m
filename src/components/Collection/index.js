import React from "react";
import LazyLoad from "react-lazyload";
import AspectRatio from "react-aspect-ratio";
import isEmpty from "~/utils/isEmpty";
import toCurrency from "~/utils/toCurrency";
import { Icon, message } from "antd";
import "./style.scss";
import { addToBasket, getUser } from "~/hooks/hooks";

const HomeCollection = ({ data, title, foodModal }) => {
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

  if (data) {
    const filter = data && data.filter(data => data.count > 0);
    const collection = filter.map((item, index) => {
      return (
        <div key={item.id}>
          <div className="item">
            <div style={{ position: "relative" }}>
              <div onClick={() => foodModal(item)}>
                <div className="info">
                  <LazyLoad height={180}>
                    <AspectRatio ratio="1" className="imagea">
                      <img
                        alt={item.name}
                        src={
                          isEmpty(item.path)
                            ? require("~/static/img/default/food.png")
                            : item.path
                        }
                        className="image"
                      />
                    </AspectRatio>
                  </LazyLoad>

                  <p className="price">{toCurrency(item.price)}</p>
                </div>

                <div className="name">{item.name}</div>
              </div>
              <div onClick={() => add(item.id)}>
                <Icon type="plus" className="icon_add" />
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="collection">
        <h2 className="section_title">{title}</h2>
        <div className="list">{collection}</div>
      </div>
    );
  }

  return null;
};

const Collection = ({ data, title, foodModal }) => {
  const user = useContext(userContext());
  const { userData, userLoading } = user;
  const { insert } = addToBasket();

  const add = async id => {
    await insert(userData && userData.id, {
      productId: id,
      quantity: "1"
    });
    message.success("Амжилттай нэмэгдлээ");
  };
  if (data) {
    const collection =
      data &&
      data.map((item, index) => {
        const image = !!item.product.assets[0]
          ? item.product.assets[0].path
          : require("~/static/img/default/food.png");
        return (
          <div key={item.id}>
            <div className="item">
              <div style={{ position: "relative" }}>
                <div onClick={() => foodModal(item)}>
                  <div className="info">
                    <LazyLoad height={180}>
                      <AspectRatio ratio="1" className="imagea">
                        <img
                          alt={item.product.name}
                          src={image}
                          className="image"
                        />
                      </AspectRatio>
                    </LazyLoad>

                    <p className="price">{toCurrency(item.product.price)}</p>
                  </div>
                  <div className="name">{item.product.name}</div>
                </div>
                <div onClick={() => add(item.product.id)}>
                  <Icon type="plus" className="icon_add"></Icon>
                </div>
              </div>
            </div>
          </div>
        );
      });
    return (
      <div className="collection">
        <h2 className="section_title">{title}</h2>
        <div className="list">{collection}</div>
      </div>
    );
  }

  return null;
};

export { HomeCollection, Collection };
