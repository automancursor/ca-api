import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Cell, Icon } from "zarm";
import FuncHeader from "components/FuncHeader/FuncHeader";
import axios from "axios";
import { BASE_URL } from "../../../utils/request/config";
import * as QueryString from "query-string";

let iId = null;

export default function ShopDingdanXiangQing() {
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const [order, setOrder] = useState([]);

  iId = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }).id;

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
      .get(BASE_URL + "/Order/product_order/" + iId, config)
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

  function approveOrder() {
    if (window.confirm("是否确定发货？")) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var raw = "";

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(BASE_URL + "/Order/product_order/approve/" + iId, requestOptions)
        .then((response) => response.text())
        .then((result) => history.push("/shopdingdan"))
        .catch((error) => window.confirm("稍后再试"));
    } else {
    }
  }

  return (
    <>
      <FuncHeader
        title={"订单详情"}
        goBack={() => history.push("/shopdingdan")}
      />
      <div style={{ marginTop: "50px" }}>
        <Cell
          title="订单状态"
          description={
            <p style={{ fontSize: "16px" }}>
              {order?.productOrderStatus == "SUCCESS" ? "已完成" : "进行中"}
            </p>
          }
        />
        <Cell
          title="买家"
          description={<p style={{ fontSize: "16px" }}>{order?.userName}</p>}
        />
        <Cell
          title="价格(CVT)"
          description={<p style={{ fontSize: "16px" }}>{order?.cvt}</p>}
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
                  item.productImages ? (
                    <img
                      alt=""
                      src={item.productImages.split("&&")[0]}
                      style={{ width: 48, height: 48 }}
                    />
                  ) : null
                }
              />
            ))
          : null}

        {/*<br />*/}
        {/*{order?.productOrderStatus == "PENDING" ? <Button*/}
        {/*    block*/}
        {/*    theme="primary"*/}
        {/*    onClick={() => approveOrder() }*/}
        {/*>*/}
        {/*  确认发货*/}
        {/*</Button> : null}*/}
      </div>
    </>
  );
}
