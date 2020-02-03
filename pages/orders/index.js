import React from "react";
import Layout from "~/components/Layout/";
import OrderBoxPast from "~/components/OrderBoxPast";
import { Spin } from "antd";
import { getUser } from "~/hooks/hooks";

const Orders = () => {
  const userId =
    typeof localStorage === "object" &&
    localStorage.getItem("data") &&
    JSON.parse(localStorage.getItem("data")).userId;
  const [userData, userLoading, userRefetch] = getUser(userId);

  if (userLoading) {
    return (
      <>
        <div className="loading">
          <Spin />
        </div>
      </>
    );
  }

  if (userData) {
    return (
      <div>
        <OrderBoxPast data={userData.orders} title="Өмнөх захиалгын түүх" />
      </div>
    );
  }

  return null;
};

export default Layout({})(Orders);
