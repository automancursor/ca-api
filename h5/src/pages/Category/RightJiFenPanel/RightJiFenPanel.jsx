import React, { useState, useEffect } from "react";
import * as styles from "./rightPanel.module.scss";

import banner01 from "assets/category/banner01.jpg";
import banner02 from "assets/category/banner02.jpg";
import banner03 from "assets/category/banner03.jpg";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../../utils/request/config";
import _ from "lodash";
import { Carousel } from "zarm";

const ITEMS = [banner01, banner02, banner03];

const contentRender = () => {
  return ITEMS.map((item, i) => {
    return (
      <div className="carousel__item__pic" key={+i}>
        <img
          src={item}
          alt=""
          draggable={false}
          style={{ width: "100%", marginTop: "10px" }}
        />
      </div>
    );
  });
};

const SectionComponent = () => {
  const [userProfile, setUser] = useState();

  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);

  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const [allProducts, getAllProducts] = useState([]);

  useEffect(() => {
    if (allProducts) {
      getAllCategory();
    }
  }, []);
  // get category to render list
  function getAllCategory() {
    const config = {};
    axios
      .get(BASE_URL + "/shop/rptProduct/all", config)
      .then((response) => {
        if (response.status === 400 || response.status === 500)
          throw response.data;
        if (response.data.data) {
          // const groups = _.groupBy(response.data.data, 'categoryId');
          const groups = _(response.data.data)
            .groupBy(`category.name`)
            .map((name, category) => {
              const items = name.map((item) => item);
              return {
                category: items[0].category,
                items: items,
              };
            })
            .value();
          getAllProducts(groups);
        }
      })
      .catch((err) => {
        throw err[1];
      });
  }

  function getImg(str) {
    if (!str) {
      return "";
    }
    const rt = str.split("&&");
    return rt[0];
  }

  return (
    <>
      {/*<img*/}
      {/*  id={"全部商品"}*/}
      {/*  className={styles["banner-img"]}*/}
      {/*  alt="icon"*/}
      {/*  src={banner01}*/}
      {/*  style={{ width: "100%", marginTop: "10px" }}*/}
      {/*/>*/}
      {/*<Carousel>{contentRender()}</Carousel>*/}
      {allProducts
        ? allProducts.map((section) => (
            <div key={section.category.id} style={{ marginTop: "20px" }}>
              <div
                style={{
                  backgroundImage: `url(${getImg(
                    section.category.categoryImage
                  )})`,
                }}
                onClick={() =>
                  history.push("/categoryList?id=" + section.category.id)
                }
                className={styles["section-title"]}
              >
                <span
                  style={{
                    backgroundColor: "white",
                    borderRadius: 6,
                    padding: 6,
                  }}
                  id={section.category.name}
                  title={section.category.name}
                >
                  {section.category.name}
                </span>
              </div>
              <div className={styles["product-container"]}>
                {section.items.slice(0, 9).map((item) => (
                  <div
                    key={item?.id}
                    className={styles["product-box"]}
                    onClick={() =>
                      history.push("/rptproductdetail?itemId=" + item?.id)
                    }
                  >
                    <img
                      className={styles["product-box-img"]}
                      alt="icon"
                      src={getImg(item?.productImages)}
                    />
                    <span style={{ fontSize: "12px" }}>{item?.name}</span>
                    <span style={{ fontSize: "12px" }}>
                      <span style={{ color: "red" }}>{item?.price}</span>
                    </span>
                    {/*<span style={{ fontSize: "12px" }}>*/}
                    {/*  积分：<span style={{ color: "red" }}>{item?.price*item?.user?.rptRate}</span>*/}
                    {/*</span>*/}
                    <span style={{ fontSize: "10px" }}>
                      商家：{item?.companyName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        : null}
    </>
  );
};

export default function RightJiFenPanel() {
  return (
    <div className={styles["wrapper"]}>
      <SectionComponent />
    </div>
  );
}
