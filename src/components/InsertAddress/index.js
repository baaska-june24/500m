import React from "react";

import AddressInput from "~/components/AddressInput";
import { Modal, Icon } from "antd";

import "./style.scss";

const InsertAddress = ({ visible, setVisible, form, userRefetch }) => {
  return (
    <Modal footer={null} closable={false} visible={visible}>
      <div className="addressmodal">
        <div className="close" onClick={() => setVisible(false)}>
          <Icon className="icon" type="close" size="lg" />
        </div>
        <AddressInput
          shadow={false}
          setVisible={setVisible}
          userRefetch={userRefetch}
        />
      </div>
    </Modal>
  );
};

export default InsertAddress;
