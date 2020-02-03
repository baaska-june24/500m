import React from "react";
import AspectRatio from "react-aspect-ratio";
import isEmpty from "~/utils/isEmpty";
import "./style.scss";

const ResCover = ({ data }) => {
  if (data) {
    return (
      <div className="rescover">
        <AspectRatio ratio="375/250">
          <img
            src={
              isEmpty(data.frontImage)
                ? require("~/static/img/default/rescover.png")
                : data.frontImage
            }
            alt="img"
            className="image"
          />
        </AspectRatio>
      </div>
    );
  }
  return null;
};

export default ResCover;
