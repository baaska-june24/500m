import React, { Component } from "react";
import AspectRatio from "react-aspect-ratio";
import isEmpty from "~/utils/isEmpty";
import "./style.scss";

const AddressRes = ({ data }) => {
  if (data && data.product && data.product.organization.length > 0) {
    const renderResAdsress = data.product.organization.map(organization => {
      const imageSource = !isEmpty(organization.logo)
        ? organization.logo
        : "~/static/img/default/restaurant.png";

      return (
        <div>
          <div className="res-addres">
            <div className="header">
              <div className="flex">
                <img src={imageSource} alt="img" className="logo" />
                <div>
                  <h2 className="title">{organization.name}</h2>
                  <p className="description">{organization.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return renderResAdsress;
  }
  return (
    <div>
      <div className="res-addres">
        <div className="header">
          <div className="flex">
            <div>
              <p className="description">
                Одоогоор рестораны хаяг байхгүй байна. Та хүргүүлж авах
                сонголтыг сонгоно уу
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressRes;
