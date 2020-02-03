import React from "react";
import Layout from "~/components/Layout/";
import { getBasket, getUser } from "~/hooks/hooks";
import OrderEmpty from "~/components/OrderEmpty/";
import OrderItem from "~/components/OrderItem/";
import toCurrency from "~/utils/toCurrency";

import Link from "next/link";
import { Spin } from "antd";
import Button from "~/components/Button/";

const BasketPage = () => {
  const userId =
    typeof localStorage === "object" &&
    localStorage.getItem("data") &&
    JSON.parse(localStorage.getItem("data")).userId;
  const [userData, userLoading, userRefetch] = getUser(userId);
  const [data, refetchBasket, basketLoading] = getBasket(
    userData && userData.id
  );
  // const [data, setData] = React.useState(basketData);
  React.useEffect(() => {}, []);
  if (data) {
    if (data.cartProduct && data.cartProduct.length > 0) {
      return (
        <Spin spinning={basketLoading || userLoading}>
          <div className="basketPage">
            <div className="basketTitle">Сагс</div>
            <OrderItem data={data.cartProduct} refetch={refetchBasket} />
            <div className="wrapper" style={{ padding: "10px 40px 0 40px" }}>
              <div className="pay">
                <p className="total">
                  Нийт дүн
                  <span>{toCurrency(data.totalAmount)}</span>
                </p>
                <Link href="/checkout">
                  <a>
                    <Button className="default">ТООЦОО ХИЙХ</Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </Spin>
      );
    }

    return (
      <>
        <div className="basketTitle">Сагс</div>
        <OrderEmpty />
      </>
    );
  }
  return (
    <>
      <div className="loading">
        <Spin tip="Уншиж байна" />
      </div>
    </>
  );
};

export default Layout({})(BasketPage);
