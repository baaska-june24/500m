import React from "react";
import Layout from "~/components/Layout/";
import OrderItem from "~/components/OrderItem/";
import AddressRes from "~/components/AddressRestaurant";
import AddressList from "~/components/AddressList";
import AddressInput from "~/components/AddressInput";
import OrderType from "~/components/OrderType";
import EbarimtToggle from "~/components/Ebarimt";
import PromoCode from "~/components/PromoCode";
import toCurrency from "~/utils/toCurrency";
import Button from "~/components/Button";
import { getBasket, createInvoice, getUser } from "~/hooks/hooks";
import { Spin, message } from "antd";
const Checkout = () => {
  const userId =
    typeof localStorage === "object" &&
    localStorage.getItem("data") &&
    JSON.parse(localStorage.getItem("data")).userId;
  const [userData, userLoading, userRefetch] = getUser(userId);

  const [loading, setLoading] = React.useState(false);
  const [delivery, setDelivery] = React.useState(true);
  const [deliveryAdress, setDeliveryAdress] = React.useState(0);
  const [ebarimt, setEbarimt] = React.useState(false);

  const [basketData, refetchBasket, basketLoading] = getBasket(
    userData && userData.id
  );
  const [invoiceLoading, invoice] = createInvoice();

  const Pay = async () => {
    setLoading(true);
    const { lendResponse, sales } = await invoice(userData && userData.id);
    if (lendResponse && sales) {
      typeof localStorage === "object" && localStorage.removeItem("sales");
      typeof localStorage === "object" &&
        localStorage.setItem("sales", JSON.stringify(sales));

      if (window.ANDembedded && window.ANDembedded.isEmbedded) {
        window.ANDembedded.payInvoice(
          {
            invoiceNumber: lendResponse.invoiceNumber,
            amount: lendResponse.amount,
            description: "төлбөр"
          },
          async params => {
            if (params.error > 0) {
              alert(params.error_message);
            }
          }
        );
      } else {
        setLoading(false);
        alert("Төлбөр төлөлт амжилтгүй боллоо");
      }
    }
  };

  if (basketData) {
    const userActiveAddress =
      userData && userData.addresses.filter(Item => Item.statusId === 1);
    return (
      <Spin
        spinning={loading || basketLoading || userLoading || invoiceLoading}
        tip="Уншиж байна"
      >
        <div className="checkout_page">
          <h2>Checkout</h2>
          <OrderItem data={basketData.cartProduct} refetch={refetchBasket} />
          <div className="checkout_wrapper">
            <OrderType delivery={delivery} setDelivery={setDelivery} />
            {delivery ? (
              userActiveAddress.length > 0 ? (
                <AddressList
                  addresses={userActiveAddress}
                  deliveryAdress={deliveryAdress}
                  setDeliveryAdress={setDeliveryAdress}
                  userRefetch={userRefetch}
                  userId={userId}
                />
              ) : (
                <AddressInput />
              )
            ) : (
              <div>
                <div className="subtitle">Очиж авах хаяг</div>
                <AddressRes data={basketData && basketData.cartProduct} />
              </div>
            )}
            <EbarimtToggle ebarimt={ebarimt} setEbarimt={setEbarimt} />
            <PromoCode />
            <div className="pay">
              <p className="price">
                Хоолны төлбөр
                <span>{toCurrency(basketData.totalAmount)}</span>
              </p>
              <p className="price">
                Хүргэлтийн төлбөр
                <span>0 ₮</span>
              </p>
              <p className="total">
                Нийт дүн
                <span>{toCurrency(basketData.totalAmount)}</span>
              </p>
              <Button
                className={delivery ? "default" : "disabled"}
                block
                onClick={() => Pay()}
              >
                ТӨЛӨХ
              </Button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </Spin>
    );
  }

  return null;
};

export default Checkout;
