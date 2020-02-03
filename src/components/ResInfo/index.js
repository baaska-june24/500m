import React from "react";
import AspectRatio from "react-aspect-ratio";
import LazyLoad from "react-lazyload";
import isEmpty from "~/utils/isEmpty";
import { Icon } from "antd";
import "./style.scss";

const ResInfo = ({ data }) => {
  if (data) {
    return (
      <div className="restaurantbox">
        <div className="box">
          <div className="header">
            <div className="flex">
              <LazyLoad height={60}>
                <AspectRatio ratio="1" className="logoa">
                  <img
                    alt={data.name}
                    src={
                      isEmpty(data.logo)
                        ? require("~/static/img/default/rescover.png")
                        : data.logo
                    }
                    className="logo"
                  />
                </AspectRatio>
              </LazyLoad>
              <div style={{ textAlign: "left" }}>
                <h2 className="title">{data.name}</h2>
                <p className="description">{data.slogan}</p>
              </div>
            </div>
            <div className="fav">{/* <Icon type="heart" /> */}</div>
          </div>
          <div className="info">
            <div className="general">
              <div className="icon">
                <Icon type="phone" />
              </div>
              <a href={"tel:" + data.phoneNumber}>{data.phoneNumber}</a>
            </div>
            <div className="general">
              <div className="icon">
                <Icon type="clock-circle" />
              </div>
              {data.openingHours}
            </div>
            <div className="general">
              <div className="icon">
                <Icon type="environment" />
              </div>
              {data.address}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default ResInfo;
