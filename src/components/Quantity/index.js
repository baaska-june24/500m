import React from "react";

import { Icon } from "antd";
import "./style.scss";

const Quantity = ({ qty, setQty, dataCount, count, setCount, disabled }) => {
  // const user = useContext(userContext());
  // const { userData } = user;
  // const { insert } = addToBasket();
  // const { remove } = removeFromBasket();

  const add = async () => {
    if (qty === dataCount) {
      setQty(dataCount);
    } else {
      setQty(qty + 1);
    }
    if (count > 0) {
      setCount(count - 1);
    }

    // await insert(userData && userData.id, {
    //   productId: product && product.product && product.product.id,
    //   quantity: "1"
    // });
  };

  const minus = async () => {
    setQty(qty - 1);
    if (count < dataCount) {
      setCount(count + 1);
    }
    // await remove(userData && userData.id, {
    //   cartProductId: product.id,
    //   quantity: "1"
    // });
  };

  const renderQty = () => {
    if (disabled) {
      return (
        <>
          <div className="disabled">
            <Icon type="minus" />
          </div>
          <span className="number">{qty < 1 ? setQty(1) : qty}</span>
          <div className="disabled">
            <Icon type="plus" />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="icon" onClick={() => minus()}>
            <Icon type="minus" />
          </div>
          <span className="number">{qty < 1 ? setQty(1) : qty}</span>
          <div className="icon" onClick={() => add()}>
            <Icon type="plus" />
          </div>
        </>
      );
    }
  };

  return (
    <div className="quantity">
      <div className="wrapper">{renderQty()}</div>
    </div>
  );
};

export default Quantity;
