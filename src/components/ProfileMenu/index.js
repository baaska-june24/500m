import React from "react";
import Link from "next/link";
import { Icon } from "antd";
import "./style.scss";

const ProfileMenu = () => {
  return (
    <div>
      <div className="card">
        <ul className="list">
          <li>
            <Link href="/orders">
              <a className="link">
                Миний өмнөх захиалгууд
                <div className="icon">
                  <Icon type="right" />
                </div>
              </a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="card">
        <ul className="list">
          <li>
            <Link href="#">
              <a className="link">
                Түгээмэл асуултууд
                <div className="icon">
                  <Icon type="question-circle" />
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a className="link phone">
                Холбоо барих
                <div className="icon">
                  <Icon type="phone" />
                </div>
              </a>
            </Link>
          </li>
          <li>
            <Link href="#">
              <a className="link legal">
                Үйлчилгээний нөхцөл
                <div className="icon">
                  <Icon type="file-text" />
                </div>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;
