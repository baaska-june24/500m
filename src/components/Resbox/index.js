import React from "react";
import Link from "next/link";
import LazyLoad from "react-lazyload";
import AspectRatio from "react-aspect-ratio";

import isEmpty from "~/utils/isEmpty";
import toCurrency from "~/utils/toCurrency";
import "./style.scss";

const RestaurantBox = ({ data }) => {
  if (data && data.foods[0]) {
    return (
      <>
        <Link href={"/restaurant/" + data.foods[0].organization.id}>
          <div className="resbox">
            <div className="box">
              <div className="header">
                <div className="flex">
                  <LazyLoad height={60}>
                    <AspectRatio ratio="1" className="logoa">
                      <img
                        alt={data.foods[0].organization.name}
                        src={
                          isEmpty(data.foods[0].organization.logo)
                            ? require("~/static/img/default/rescover.png")
                            : data.foods[0].organization.logo
                        }
                        className="logo"
                      />
                    </AspectRatio>
                  </LazyLoad>

                  <div>
                    <h2 className="title">{data.foods[0].organization.name}</h2>
                    <p className="description">
                      {data.foods[0].organization.slogan}
                    </p>
                  </div>
                </div>
              </div>
              <div className="info">
                <div className="main">
                  <div className="item" id={0}>
                    <LazyLoad height={200}>
                      <AspectRatio ratio="1">
                        <img
                          alt="res1"
                          src={data.foods[0].organization.frontImage}
                          className="image"
                        />
                      </AspectRatio>
                    </LazyLoad>
                    <p className="price">{toCurrency(data.foods[0].price)}</p>
                  </div>
                </div>

                <div className="sub">
                  <div className="item" id={1}>
                    <LazyLoad height={100}>
                      <AspectRatio ratio="1">
                        <img
                          alt="res2"
                          src={
                            data.foods[1] &&
                            data.foods[1].organization.frontImage
                          }
                          className="image"
                        />
                      </AspectRatio>
                    </LazyLoad>
                    <p className="price">
                      {isEmpty(data.foods[1])
                        ? ""
                        : toCurrency(data.foods[1].price)}
                    </p>
                  </div>
                  <div className="item" id={2}>
                    <LazyLoad height={100}>
                      <AspectRatio ratio="1">
                        <img
                          alt="res3"
                          src={
                            data.foods[2] &&
                            data.foods[2].organization.frontImage
                          }
                          className="image"
                        />
                      </AspectRatio>
                    </LazyLoad>
                    <p className="price">
                      {isEmpty(data.foods[2])
                        ? ""
                        : toCurrency(data.foods[2].price)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </>
    );
  }
  return null;
};

export default RestaurantBox;
