import React from "react";
import LazyLoad from "react-lazyload";
import AspectRatio from "react-aspect-ratio";
import toCurrency from "~/utils/toCurrency";
import isEmpty from "~/utils/isEmpty";
import { Icon, Steps } from "antd";
import "./style.scss";

const OrderBox = ({ data, title, size }) => {
  const { Step } = Steps;
  if (data) {
    const activeOrderList = data.map(item => {
      const orderStatus = () => {
        // switch (item.state) {
        //   case 0:
        //     return "Хүлээгдэж буй";
        //   case 3:
        //     return "Хүргэгдсэн";
        //   case 5:
        //     return "Хугацаа дууссан";
        // }
        return (
          <Steps
            size="small"
            progressDot
            current={
              (item.state === 0 && 1) ||
              (item.state === 3 && 2) ||
              (item.state === 5 && 3)
            }
          >
            <Step title="Хүлээгдэж байна" />
            <Step title="Хүлээж авсан" />
            <Step title="Хүргэлтэнд гарсан" />
          </Steps>
        );
      };
      const total = item.orderProducts.reduce(
        (a, b) => a + parseFloat(b.totalPrice),
        0
      );
      const imageSource = !isEmpty(
        item.orderProducts[0].product.organization.logo
      )
        ? item.orderProducts[0].product.organization.logo
        : require("~/static/img/default/rescover.png");
      const orgName = item.orderProducts[0].product.organization.name;
      const phoneNumber = item.orderProducts[0].product.organization.phone;

      const orderFoodList = item.orderProducts.map(food => {
        const imageSource = !isEmpty(food.product.assets)
          ? food.product.assets[0].path
          : require("~/static/img/default/food.png");

        return (
          <li key={food.id}>
            <LazyLoad height={80}>
              <AspectRatio ratio="1" className="imagea">
                <img
                  alt={food.product.name}
                  src={imageSource}
                  className="image"
                />
              </AspectRatio>
            </LazyLoad>
            <div className="profile-order-info">
              <p className="foodname">{food.product.name}</p>
              <span className="quantity">{food.quantity + " ширхэг"}</span>
              <p className="profile-order-price">
                {toCurrency(food.totalPrice)}
              </p>
            </div>
          </li>
        );
      });

      return (
        <div className={`box ${size}`} key={item.id}>
          <h2 className="profile-order-title">{title}</h2>
          <div className="header">
            <div className="flex">
              <img src={imageSource} alt="img" className="logo" />
              <div className="profile-order-name">
                <h2 className="profile-order-title">{orgName}</h2>
                <p className="description"></p>
              </div>
              <a href={"tel:" + phoneNumber}>
                <div className="callbutton">
                  <div className="icon">
                    <Icon type="phone" />
                  </div>
                  Залгах
                </div>
              </a>
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
              position: "relative",
              marginLeft: "-40px"
            }}
          >
            {orderStatus()}
          </div>
          <div className="items">
            <ul className="list">
              <li>Захиалсан хоол:</li>
            </ul>
            <ul>{orderFoodList}</ul>
          </div>
          <hr />
          <ul className="list">
            <li>
              Захиалгын дүн:
              <span className="profile-order-price">{toCurrency(total)}</span>
            </li>
            <li>
              Хүргэлтийн төлбөр:
              <span className="status">Үнэгүй</span>
            </li>
          </ul>
        </div>
      );
    });

    return <div className="profile-order-container">{activeOrderList}</div>;
  }
  return null;
};

export default OrderBox;
