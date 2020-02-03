import React from "react";
import { useRouter } from "next/router";
import Layout from "~/components/Layout/";
import Trending from "~/components/Trending/";
import { HomeCollection } from "~/components/Collection/";
import Carousel from "~/components/Carousel/";
import ResBox from "~/components/Resbox/";
import { FoodModal } from "~/components/FoodModal/";
import { frontPage } from "~/hooks/hooks";
import { Spin } from "antd";
// import { initialState, reducer } from "~/utils/dataReducer";

// import { data } from "~/data";

const Index = () => {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);
  const [foodModalData, setFoodModalData] = React.useState(null);
  // const [state, dispatch] = React.useReducer(reducer, initialState);
  const { data, refetch, loading } = frontPage();
  React.useEffect(() => {
    //Хэрэглэгчийн байршил авах
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        if (router.query.code) {
          refetch(router.query.code, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        }
      });
    }
  }, [router.query.code]);

  React.useEffect(() => {
    if (data) {
      typeof localStorage === "object" && localStorage.removeItem("data");
      typeof localStorage === "object" &&
        localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  const localData =
    typeof localStorage === "object" &&
    localStorage.getItem("data") &&
    JSON.parse(localStorage.getItem("data"));

  const foodModal = data => {
    setVisible(true);
    setFoodModalData(data);
  };
  if (loading) {
    return (
      <>
        <div className="loading">
          <Spin tip="Уншиж байна" />
        </div>
      </>
    );
  }
  if (
    localData &&
    localData.organizations &&
    Object.keys(localData.organizations).length > 0
    // state &&
    // state.data &&
    // state.data.organizations &&
    // Object.keys(state.data.organizations).length > 0
  ) {
    return (
      <div>
        <Trending data={localData.trending} foodModal={foodModal} />
        <Carousel />
        <HomeCollection
          data={localData.belowTen}
          title="10к-с доос"
          foodModal={foodModal}
        />
        <HomeCollection
          data={localData.latest}
          title="Шинэ"
          foodModal={foodModal}
        />
        <HomeCollection
          data={localData.repeat}
          title="Repeat order"
          foodModal={foodModal}
        />
        <h2 className="section_title">Ресторанууд</h2>
        {localData.organizations &&
          Object.keys(localData.organizations).map(key => (
            <ResBox key={key} data={localData.organizations[key]} />
          ))}
        <FoodModal
          visible={visible}
          setVisible={setVisible}
          data={foodModalData}
        />
      </div>
    );
  }
  return <div>{router.query.code}</div>;
};

export default Layout({})(Index);
