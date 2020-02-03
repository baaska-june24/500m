import React from "react";
import Layout from "~/components/Layout/";
import ProfileHeader from "~/components/ProfileHeader/";
import ProfileInfo from "~/components/ProfileInfo/";
import ProfileMenu from "~/components/ProfileMenu";
import OrderBox from "~/components/OrderBox/";
import { Spin, message, Steps } from "antd";

import { payInvoice, getUser } from "~/hooks/hooks";

const ProfilePage = () => {
  const userId =
    typeof localStorage === "object" &&
    localStorage.getItem("data") &&
    JSON.parse(localStorage.getItem("data")).userId;
  const [userData, userLoading, userRefetch] = getUser(userId);
  const [paidLoading, payWithLend] = payInvoice();

  React.useEffect(() => {
    const paylend = async () => {
      const sales =
        typeof localStorage === "object" &&
        JSON.parse(localStorage.getItem("sales"));
      if (
        sales &&
        sales.response &&
        sales.response.amount &&
        sales.response.invoiceId &&
        userData
      ) {
        const isPaid = await payWithLend(sales.response.invoiceId, {
          amount: sales.response.amount,
          transactionId: sales.response.invoiceId,
          userId: userData.id
        });
        if (isPaid && isPaid.code === 0) {
          typeof localStorage === "object" && localStorage.removeItem("sales");
          message.success("Амжилттай төлөгдлөө");
          userRefetch();
        }
      }
    };
    paylend();
  }, [userData]);

  if (userLoading || paidLoading) {
    return (
      <>
        <div className="loading">
          <Spin tip="Уншиж байна..." />
        </div>
      </>
    );
  }
  if (userData) {
    return (
      <div>
        <ProfileHeader data={userData} />
        <ProfileInfo data={userData} />
        <OrderBox
          data={userData.shipments.reverse()}
          title="Хүлээгдэж буй захиалга"
        />
        <ProfileMenu />
      </div>
    );
  }

  return null;
};

export default Layout({})(ProfilePage);
