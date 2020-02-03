import React from "react";
import Link from "next/link";
import { Carousel } from "antd";
import AspectRatio from "react-aspect-ratio";
import "./style.scss";

const CarouselSlider = () => {
  const data = ["1", "2", "3", "4"];

  return (
    <div className="carousel">
      <Carousel
        autoplay={true}
        autoplayInterval={3000}
        cellSpacing={10}
        infinite
      >
        {data.map(index => (
          <div style={{ paddingBottom: "20px" }} key={index}>
            <Link href="#" key={index}>
              <AspectRatio ratio="3/2" style={{ maxWidth: "600px" }}>
                <img
                  src={require("~/static/img/default/banner.png")}
                  alt="image"
                  className="thumbnail"
                />
              </AspectRatio>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default CarouselSlider;
