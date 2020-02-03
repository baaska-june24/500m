import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getBasket } from "~/hooks/hooks";

import "./style.scss";

const Navigation = () => {
  const userId =
    typeof localStorage === "object" &&
    localStorage.getItem("data") &&
    JSON.parse(localStorage.getItem("data")).userId;
  const router = useRouter();
  const selected = router.pathname.replace(/\/$/, "");

  const { data, loading, error } = getBasket(userId);

  const basketCount =
    data && data.cartProduct
      ? data.cartProduct.reduce((a, b) => a + b.quantity, 0)
      : 0;
  return (
    <div className="navbar">
      <div className="wrapper">
        <ul className="nav">
          <li className="navitem">
            <Link href="/">
              <a className={selected === "" ? "active" : null}>
                <div className="home_icon icon" />
                Нүүр
              </a>
            </Link>
          </li>
          <li className="navitem">
            <Link href="/basket">
              <a className={selected === "/basket" ? "active" : null}>
                <div className="basket_icon icon" />
                <div className="cartcount">{basketCount}</div>
                Сагс
              </a>
            </Link>
          </li>
          <li className="navitem">
            <Link href="/profile">
              <a className={selected === "/profile" ? "active " : null}>
                <div className="profile_icon icon" />
                Миний
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );

  return;
};

export default Navigation;
