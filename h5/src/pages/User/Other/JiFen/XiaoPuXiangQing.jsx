import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Cell, Icon, Input, Modal, Stepper } from "zarm";
import FuncHeader from "components/FuncHeader/FuncHeader";
import axios from "axios";
import { BASE_URL } from "../../../../utils/request/config";
import * as QueryString from "query-string";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

let iId = null;
const initState = {
  hasFooter: {
    visible: false,
  },
};
const reducer = (state, action) => {
  const { type, key } = action;

  switch (type) {
    case "visible":
      return {
        ...state,
        [key]: {
          ...state[key],
          visible: !state[key].visible,
        },
      };
    default:
  }
};

export default function XiaoPuXiangQing() {
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const [product, setProduct] = useState([]);
  const [state, dispatch] = useReducer(reducer, initState);
  const toggle = (key) => dispatch({ type: "visible", key });
  const [pic, setPic] = useState([]);

  iId = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }).itemId;

  useEffect(() => {
    if (isAuthed) {
      getProduct(iId, token);
    }
  }, [iId]);

  function getProduct(id, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(BASE_URL + "/shop/rptProduct/" + id, config)
      .then((response) => {
        if (response.status === 400 || response.status === 500)
          throw response.data;
        if (response.data.data) {
          setProduct(response.data.data);
        }
      })
      .catch((err) => {
        throw err[1];
      });
  }

  function removeProduct() {
    if (window.confirm("是否确定删除？")) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var raw = "";

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(BASE_URL + "/shop/rptProduct/" + iId, requestOptions)
        .then((response) => response.text())
        .then((result) => history.push("/xiaopu"))
        .catch((error) => window.confirm("稍后再试"));
    } else {
    }
  }

  useEffect(() => {
    if (product?.productImages) {
      const images = product?.productImages.split("&&");
      setPic(images.slice(0, images.length - 1));
    }
  }, [product]);

  return (
    <>
      <FuncHeader
        title={product?.name}
        goBack={() => history.push("/xiaopu")}
      />
      <div style={{ marginTop: "5rem", marginBottom: "5rem" }}>
        <div className="carousel__item__pic">
          <Carousel autoPlay>
            {pic.map((n) => (
              <div>
                <img
                  src={n}
                  alt=""
                  draggable={true}
                  style={{ width: "100%" }}
                />
              </div>
            ))}
          </Carousel>
          {/*{product?.productImages ? (*/}
          {/*  <img*/}
          {/*    src={product?.productImages.split("&&")[0]}*/}
          {/*    alt=""*/}
          {/*    draggable={true}*/}
          {/*    style={{ width: "100%" }}*/}
          {/*  />*/}
          {/*) : null}*/}
          <br />
          <Cell
            title="货币类型"
            description={
              <p style={{ color: "red", fontSize: "16px" }}>
                {product?.currency}
              </p>
            }
          />
          <Cell
            title="价格"
            description={
              <p style={{ color: "red", fontSize: "16px" }}>{product?.price}</p>
            }
          />
          <Cell
            title="库存"
            description={
              <p style={{ fontSize: "15px" }}>{product?.quantity}</p>
            }
          />
          <Cell
            title="类别"
            description={
              <p style={{ fontSize: "15px" }}>{product?.category?.name}</p>
            }
          />
          <Cell
            title="平台货币类型"
            description={
              <p style={{ color: "red", fontSize: "16px" }}>
                {product?.costCurrency}
              </p>
            }
          />
          <Cell
            title="平台价格"
            description={
              <p style={{ color: "red", fontSize: "16px" }}>{product?.cost}</p>
            }
          />
          <Cell
            title="详情"
            description={
              <p style={{ fontSize: "15px" }}>{product?.productDescription}</p>
            }
          />
          <br />
          <Button
            block
            theme="primary"
            onClick={() => history.push(`/xiaopuedit?itemId=${iId}`)}
          >
            修改产品
          </Button>
          <br />
          <Button block onClick={() => removeProduct()}>
            删除产品
          </Button>
        </div>
      </div>
    </>
  );
}
