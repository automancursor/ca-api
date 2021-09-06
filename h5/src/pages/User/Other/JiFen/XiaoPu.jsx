import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Cell, Icon } from "zarm";
import XiaoPuHeader from "components/FuncHeader/XiaoPuHeader";
import axios from "axios";
import { BASE_URL } from "../../../../utils/request/config";

const img =
  "https://static.zhongan.com/website/health/zarm/images/icons/state.png";

export default function XiaoPu() {
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const [allOrders, setAllProducts] = useState([]);

  useEffect(() => {
    if (isAuthed) {
      getAllCategory(userId, token);
    }
  }, [userId]);
  // get all category
  function getAllCategory(id, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(BASE_URL + "/shop/rptProduct", config)
      .then((response) => {
        if (response.status === 400 || response.status === 500)
          throw response.data;
        if (response.data.data) {
          setAllProducts(response.data.data);
        }
      })
      .catch((err) => {
        throw err[1];
      });
  }

  return (
    <>
      <XiaoPuHeader
        title={"管理积分商城"}
        goBack={() => history.push("/user")}
      />
      <div style={{ marginTop: "50px" }}>
        {allOrders.map((allOrders) => (
          <Cell
            hasArrow
            key={allOrders.id}
            title={
              <div className="box">
                <div className="box-title">品名: {allOrders?.name}</div>
                <div className="box-description">售价: {allOrders?.price}</div>
                <div className="box-description">
                  库存: {allOrders?.quantity}
                </div>
              </div>
            }
            description={
              allOrders?.productStatus == "ACTIVE" ? "热卖中" : "已下架"
            }
            icon={
              allOrders?.productImages ? (
                <img
                  alt=""
                  src={allOrders?.productImages?.split("&&")[0]}
                  style={{ width: 48, height: 48 }}
                />
              ) : null
            }
            onClick={() =>
              history.push("/xiaopuxiangqing?itemId=" + allOrders?.id)
            }
          />
        ))}
      </div>
    </>
  );
}
