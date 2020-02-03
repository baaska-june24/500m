import React from "react";
import { Form, Input, Row, Col, Spin, message } from "antd";
import Button from "~/components/Button";
import { addUserAddress, getUser } from "~/hooks/hooks";

import "./style.scss";

const AddressInput = ({ form, shadow = true, setVisible, userRefetch }) => {
  const userId =
    typeof localStorage === "object" &&
    localStorage.getItem("data") &&
    JSON.parse(localStorage.getItem("data")).userId;

  const [insertAction, insertLoading] = addUserAddress();
  const [loading, setLoading] = React.useState(false);
  const { getFieldDecorator, validateFields } = form;
  const saveAddress = e => {
    setLoading(true);
    e.preventDefault();
    validateFields(async (error, values) => {
      if (error) {
        throw error;
      }
      const response = await insertAction(userId, {
        name: " address name",
        city: 1,
        district: 2,
        section: 1,
        addressText: values.building_name,
        instruction: "",
        lattitude: "123",
        longitude: "321"
      });
      if (response) {
        await userRefetch();
        setLoading(false);
        if (setVisible) {
          setVisible(false);
        }
        message.success("Хаяг амжилттай хадгаллаа");
      } else {
        message.error("Алдаа гарлаа");
        setVisible(false);
        setLoading(false);
      }
    });
  };
  return (
    <Spin spinning={loading || insertLoading} tip="Уншиж байна ...">
      <Form onSubmit={e => saveAddress(e)}>
        <div
          className={shadow ? "address_input address_box " : "address_input"}
        >
          <Row gutter={12}>
            <Col md={24} sm={24}>
              <Form.Item>
                {getFieldDecorator("building_name", {
                  rules: [
                    { required: true, message: "Байшингийн нэр оруулна уу!" }
                  ]
                })(<Input placeholder="Байшингийн нэр" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col md={12} sm={12} xs={12}>
              <Form.Item>
                {getFieldDecorator("floor", {
                  rules: [{ required: true, message: "Давхар оруулна уу!" }]
                })(<Input placeholder="Давхар" />)}
              </Form.Item>
            </Col>

            <Col md={12} sm={12} xs={12}>
              <Form.Item>
                {getFieldDecorator("door_number", {
                  rules: [{ required: true, message: "Тоот оруулна уу!" }]
                })(<Input placeholder="Тоот" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col md={24} sm={24}>
              <Form.Item>
                {getFieldDecorator("mobile_number", {
                  rules: [
                    { required: true, message: "Утасны дугаар оруулна уу!" }
                  ]
                })(<Input placeholder="Утасны дугаар" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col md={24} sm={24}>
              <Button className="default" block htmlType="submit">
                Хаяг хадгалах
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </Spin>
  );
};

export default Form.create()(AddressInput);
