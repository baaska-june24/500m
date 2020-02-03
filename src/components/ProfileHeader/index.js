import React from "react";
import LazyLoad from "react-lazyload";
import AspectRatio from "react-aspect-ratio";

import isEmpty from "~/utils/isEmpty";

import "./style.scss";

const ProfileHeader = ({ data }) => {
  const username = data.firstName + " " + data.lastName;
  return (
    <div className="profile-header">
      <LazyLoad height={140}>
        <AspectRatio ratio="1" className="imagea">
          <img
            src={
              isEmpty(data.userimage)
                ? require("~/static/img/default/user.png")
                : data.userimage
            }
            className="image"
          />
        </AspectRatio>
      </LazyLoad>
      <h2 className="username">{username}</h2>
    </div>
  );
};

export default ProfileHeader;
