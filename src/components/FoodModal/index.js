import React from "react";
import { Modal, Icon, Spin, message } from "antd";
import Button from "~/components/Button/";

import LazyLoad from "react-lazyload";
import AspectRatio from "react-aspect-ratio";

import isEmpty from "~/utils/isEmpty";
import toCurrency from "~/utils/toCurrency";
import { addToBasket, getUser } from "~/hooks/hooks";
import Quantity from "~/components/Quantity/";
import "./style.scss";

const FoodModal = ({ visible, setVisible, data }) => {
  const userId =
    typeof localStorage === "object" &&
    localStorage.getItem("data") &&
    JSON.parse(localStorage.getItem("data")).userId;
  const [userData, userLoading, userRefetch] = getUser(userId);
  const [qty, setQty] = React.useState(1);
  const [count, setCount] = React.useState();
  const { insert, loading } = addToBasket();
  const addBasket = async productId => {
    console.log("PID", productId);
    if (count > 0) {
      await insert(userData && userData.id, {
        productId: productId,
        quantity: qty
      });
      message.success("Сагсанд нэмэгдлээ");
      setVisible(false);
    } else {
      message.error("Уучлаарай хоол дууссан байна");
    }
  };
  React.useEffect(() => {
    setCount(parseInt(data && data.count));
  }, [data]);

  if (data) {
    const remain =
      count > 0 ? count + " хоол үлдсэн байна" : "Уучлаарай хоол дууссан байна";
    const imageSource = isEmpty(data.path)
      ? !isEmpty(data.assets)
        ? data.assets[0].path
        : require("~/static/img/default/food.png")
      : data.path;
    const description = isEmpty(data.altText)
      ? isEmpty(data.description)
        ? "Тайлбар байхгүй"
        : data.description
      : data.altText;
    return (
      <Modal footer={null} closable={false} visible={visible}>
        <Spin spinning={loading && userLoading} tip="Уншиж байна ...">
          <div className="foodmodal">
            <LazyLoad>
              <AspectRatio ratio="1" className="imagea">
                <img src={imageSource} alt="img" className="image" />
              </AspectRatio>
            </LazyLoad>
            <div
              className="close"
              onClick={() => {
                setVisible(false), setQty(1);
              }}
            >
              <Icon className="icon" type="close" size="lg" />
            </div>

            <h3 className="foodname">{data.name}</h3>

            <div className="foodprice">
              {toCurrency(data.price)}{" "}
              <Quantity
                qty={qty}
                setQty={setQty}
                count={count}
                setCount={setCount}
                dataCount={parseInt(data.count)}
              />
            </div>
            <div className="remain">{remain}</div>
            <div className="description">
              <h4>Хоолны тухай</h4>
              <p className="text">{description}</p>
            </div>
            <div className="footer">
              {/* <Link to="/basket" rel="noopener noreferrer"> */}
              <div className="addcart" onClick={() => addBasket(data.id)}>
                <div className="add">
                  <Icon type="plus" className="icon" />
                </div>
                САГСАНД НЭМЭХ
              </div>

              {/* <Button className="default">ШУУД ЗАХИАЛАХ</Button> */}
            </div>
          </div>
        </Spin>
      </Modal>
    );
  }
  return null;
};

const ModalRestaurant = ({ visible, setVisible, data }) => {
  const user = useContext(userContext());
  const { userData, userLoading } = user;
  const [qty, setQty] = React.useState(1);
  const [count, setCount] = React.useState();
  const { insert, loading } = addToBasket();

  const addBasket = async productId => {
    if (count > 0) {
      await insert(userData && userData.id, {
        productId: productId,
        quantity: qty
      });
      message.success("Сагсанд нэмэгдлээ");
      setVisible(false);
    } else {
      message.error("Уучлаарай хоол дууссан байна");
    }
  };

  React.useEffect(() => {
    setCount(parseInt(data && data.count));
  }, [data]);

  if (data) {
    const imageSource = !!data.product.assets[0]
      ? data.product.assets[0].path
      : require("~/static/img/default/food.png");
    const remain =
      count > 0 ? count + " хоол үлдсэн байна" : "Уучлаарай хоол дууссан байна";

    const description =
      isEmpty(data.product.assets[0]) || isEmpty(data.product.assets[0].altText)
        ? isEmpty(data.product.description)
          ? "Тайлбар байхгүй"
          : data.product.description
        : data.product.assets[0].altText;
    return (
      <Modal footer={null} closable={false} visible={visible}>
        <Spin spinning={loading} tip="Уншиж байна ...">
          <div className="foodmodal">
            <LazyLoad>
              <AspectRatio ratio="1" className="imagea">
                <img src={imageSource} alt="img" className="image" />
              </AspectRatio>
            </LazyLoad>
            <div className="close" onClick={() => setVisible(false)}>
              <Icon className="icon" type="close" size="lg" />
            </div>

            <h3 className="foodname">{data.product.name}</h3>

            <div className="foodprice">
              {toCurrency(data.product.price)}{" "}
              <Quantity
                qty={qty}
                setQty={setQty}
                count={count}
                setCount={setCount}
                dataCount={parseInt(data.count)}
              />
            </div>
            <div className="remain">{remain}</div>
            <div className="description">
              <h4>Хоолны тухай</h4>
              <p className="text">{description}</p>
            </div>
            <div className="footer">
              {/* <Link to="/basket" rel="noopener noreferrer"> */}
              <div
                className="addcart"
                onClick={() =>
                  addBasket(data && data.product && data.product.id)
                }
              >
                <div className="add">
                  <Icon type="plus" className="icon" />
                </div>
                САГСАНД НЭМЭХ
              </div>

              {/* <Button className="default">ШУУД ЗАХИАЛАХ</Button> */}
            </div>
          </div>
        </Spin>
      </Modal>
    );
  }
  return null;
};

export { FoodModal, ModalRestaurant };
