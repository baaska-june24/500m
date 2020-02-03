import React, { Component } from "react";
// import Link from "net/Link";
import toDateString from "~/utils/toDateString";
import toCurrency from "~/utils/toCurrency";
import "./style.scss";

const OrderBoxPast = ({ data, title }) => {
  const pastOrderList =
    data &&
    data.map(item => {
      return (
        <div key={item.id}>
          <hr />
          <ul className="list">
            <li>
              Захиалгын төлөв:
              <span className="status">Хүргэлтэнд гарсан</span>
            </li>
            <li>
              Захиалсан огноо:
              <span>{toDateString(item.date)}</span>
            </li>
          </ul>
          <ul className="list">
            <li>
              Захиалгын дүн:
              <span className="price">{toCurrency(item.totalAmount)}</span>
            </li>
            <li>
              Хүргэлтийн төлбөр:
              <span className="status">Үнэгүй</span>
            </li>
          </ul>
          {/* <Link className={styles.morea} to="#" rel="noopener noreferrer">
                            <button className={styles.more}>ДЭЛГЭРЭНГҮЙ<i className="icon-right-open"></i></button>
                        </Link> */}
        </div>
      );
    });

  return (
    <div className="order-box-container ">
      <div className="box">
        <h2 className="title">{title}</h2>
        {pastOrderList}
      </div>
    </div>
  );
};

export default OrderBoxPast;
