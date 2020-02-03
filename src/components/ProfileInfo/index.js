import React from "react";
// import ProfileLevel from "~/components/ProfileLevel/";
import "./style.scss";
const ProfileInfo = ({ data }) => {
  if (data) {
    const foodCount = data.orders.reduce(
      (a, b) => a + b.orderProducts.reduce((x, y) => x + y.quantity, 0),
      0
    );
    return (
      <div className="profile-info">
        <div className="wrapper">
          <div className="header">
            {/* <div className="item">
              <p>Rookie</p>
              <span>Зэрэглэл</span>
            </div> */}
            <div className="item">
              <p>{foodCount}</p>
              <span>Хоол</span>
            </div>
            <div className="item">
              <p>{data.orders.length}</p>
              <span>Захиалга</span>
            </div>
          </div>
          {/* <ProfileLevel count="100" /> */}
        </div>
      </div>
    );
  }
  return null;
};

export default ProfileInfo;
