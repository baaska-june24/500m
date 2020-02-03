import React from "react";
import { Icon, Radio, message } from "antd";
import "./style.scss";
import Button from "~/components/Button";
import InsertAddress from "~/components/InsertAddress";
import { removeAddressFromUser } from "~/hooks/hooks";

const AddressList = ({
  addresses,
  deliveryAdress,
  setDeliveryAdress,
  userRefetch,
  userId
}) => {
  const [value, setValue] = React.useState(deliveryAdress);
  const [visible, setVisible] = React.useState(false);
  const [removeAddress, removeAddressLoading] = removeAddressFromUser();
  const deleteAddress = async addressId => {
    const response = await removeAddress(userId, {
      addressId: addressId
    });
    if (response && response.statusId === 0) {
      await userRefetch();
      message.success("Ажилттай устгалаа");
    } else {
      message.error("Алдаа гарлаа");
    }
  };

  const addressList =
    addresses &&
    addresses.map((item, i) => {
      return (
        <div key={i} className="addres-List" onClick={() => setValue(i)}>
          <div className="header">
            <div className="flex">
              <Radio className="radio" value={i} />
              <div className="description">{item.addressText}</div>
            </div>
            <div className="editicon">
              <Icon type="delete" onClick={() => deleteAddress(item.id)} />
            </div>
          </div>
        </div>
      );
    });
  return (
    <div>
      <Radio.Group onChange={() => setDeliveryAdress(value)} value={value}>
        {addressList}
      </Radio.Group>
      <div style={{ marginTop: "10px" }}>
        <Button className="default" onClick={() => setVisible(true)}>
          ШИНЭ ХАЯГ ОРУУЛАХ
        </Button>
      </div>
      <InsertAddress
        visible={visible}
        setVisible={setVisible}
        userRefetch={userRefetch}
      />
    </div>
  );
};

export default AddressList;
