import React from "react";
import { useRouter } from "next/router";
import { getRestaurant } from "~/hooks/hooks";
import Layout from "~/components/Layout/";
import { Collection } from "~/components/Collection/";
import ResCover from "~/components/ResCover/";
import ResInfo from "~/components/ResInfo/";
import ResBox from "~/components/Resbox/";
import { ModalRestaurant } from "~/components/FoodModal/";
import { Spin } from "antd";

const Restaurant = () => {
  const router = useRouter();
  const id = router.query.id;
  const [visible, setVisible] = React.useState(false);
  const [foodModalData, setFoodModalData] = React.useState(null);
  const foodModal = data => {
    setVisible(true);
    setFoodModalData(data);
  };

  const { data, loading, error } = getRestaurant(id);

  if (loading) {
    return (
      <div className="loading">
        <Spin tip="Уншиж байна" />
      </div>
    );
  }

  return (
    <div>
      <ResCover data={data && data[0]} />
      <ResInfo data={data && data[0]} />
      <Collection
        data={data && data[0].remains}
        title="Хоолнууд"
        foodModal={foodModal}
      />
      {/* <h2 className="section-title">Таны ойр хавьд</h2>
      {Object.keys(data.content.organizations).map(key => (
        <ResBox key={key} data={data.content.organizations[key]} />
      ))} */}
      <ModalRestaurant
        visible={visible}
        setVisible={setVisible}
        data={foodModalData}
      />
    </div>
  );
};
export default Layout({ header: false })(Restaurant);
