import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Cell, Icon } from "zarm";
import FuncHeader from "components/FuncHeader/FuncHeader";
import axios from "axios";
import { BASE_URL } from "../../../utils/request/config";

export default function Dingdan() {
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    if (isAuthed) {
      getAllCategory(userId, token);
    }
  }, [userId]);
  // get category
  function getAllCategory(id, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(BASE_URL + "/Order/product_order", config)
      .then((response) => {
        if (response.status === 400 || response.status === 500)
          throw response.data;
        if (response.data.data) {
          setAllOrders(response.data.data);
        }
      })
      .catch((err) => {
        throw err[1];
      });
  }

  return (
    <>
      <FuncHeader title={"我的订单"} goBack={() => history.push("/user")} />
      <div style={{ marginTop: "50px" }}>
        {allOrders.map((order) => (
          <Cell
            hasArrow
            key={order.id}
            title={
              <div className="box">
                <div className="box-title">商家: {order?.sellerName}</div>
                <div className="box-description">价格(CVT): {order?.cvt}</div>
                <div className="box-description">
                  创建时间: {order?.createdDate}
                </div>
              </div>
            }
            description={
              order?.productOrderStatus == "PENDING" ? "发货中" : "已完成"
            }
            onClick={() => history.push(`/dingdanxiangqing?id=${order?.id}`)}
          />
        ))}
      </div>
    </>
  );
}
