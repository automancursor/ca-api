import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Cell, Icon } from "zarm";
import FuncHeader from "components/FuncHeader/FuncHeader";
import axios from "axios";
import { BASE_URL } from "../../../utils/request/config";
import * as QueryString from "query-string";

let iId = null;

export default function RptDingdanXiangQing() {
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const [order, setOrder] = useState([]);

  iId = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }).id;
  // get order
  useEffect(() => {
    if (isAuthed) {
      getOrder(userId, token);
    }
  }, [userId]);

  function getOrder(id, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(BASE_URL + "/Order/rptProduct_order/" + iId, config)
      .then((response) => {
        if (response.status === 400 || response.status === 500)
          throw response.data;
        if (response.data.data) {
          setOrder(response.data.data);
        }
      })
      .catch((err) => {
        throw err[1];
      });
  }
  // approve order
  function approveOrder() {
    if (window.confirm("是否确定收货？")) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var raw = "";

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(BASE_URL + "/Order/rptProduct_order/approve/" + iId, requestOptions)
        .then((response) => response.text())
        .then((result) => history.push("/rptdingdan"))
        .catch((error) => window.confirm("稍后再试"));
    } else {
    }
  }

  return (
    <>
      <FuncHeader
        title={"订单详情"}
        goBack={() => history.push("/rptdingdan")}
      />
      <div style={{ marginTop: "50px" }}>
        <Cell
          title="订单状态"
          description={
            <p style={{ fontSize: "16px" }}>
              {order?.productOrderStatus == "SUCCESS" ? "已完成" : "发货中"}
            </p>
          }
        />
        <Cell
          title="卖家"
          description={<p style={{ fontSize: "16px" }}>{order?.sellerName}</p>}
        />
        <Cell
          title="价格"
          description={<p style={{ fontSize: "16px" }}>{order?.price}</p>}
        />
        <Cell
          title="地址"
          description={<p style={{ fontSize: "16px" }}>{order?.address}</p>}
        />
        <Cell
          title="订单备注"
          description={<p style={{ fontSize: "16px" }}>{order?.orderDetail}</p>}
        />
        <Cell
          title="日期"
          description={<p style={{ fontSize: "16px" }}>{order?.createdDate}</p>}
        />
        <Cell title="产品" />
        {order?.orderProducts
          ? order?.orderProducts.map((item) => (
              <Cell
                title={
                  <div className="box">
                    <div className="box-description">{item.name}</div>
                    <div className="box-description">x {item.quantity}</div>
                  </div>
                }
                description={item.cvtPrice}
                icon={
                  <img
                    alt=""
                    src={item.productImages.split("&&")[0]}
                    style={{ width: 48, height: 48 }}
                  />
                }
              />
            ))
          : null}

        <br />
        {order?.productOrderStatus == "PENDING" ? (
          <Button block theme="primary" onClick={() => approveOrder()}>
            确认收货
          </Button>
        ) : null}
      </div>
    </>
  );
}
