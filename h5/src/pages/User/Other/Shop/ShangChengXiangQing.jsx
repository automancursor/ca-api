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
let productDescriptionObj = null;

export default function ShangChengXiangQing() {
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

  useEffect(() => {
    if (product?.productDescription) {
      productDescriptionObj = JSON.parse(product?.productDescription);
      console.log(productDescriptionObj);
    }
  }, [product]);

  function getProduct(id, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(BASE_URL + "/shop/product/" + id, config)
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
    if (window.confirm("?????????????????????")) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var raw = "";

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(BASE_URL + "/shop/product/" + iId, requestOptions)
        .then((response) => response.text())
        .then((result) => history.push("/shangcheng"))
        .catch((error) => window.confirm("????????????"));
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
        goBack={() => history.push("/shangcheng")}
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
            title="??????"
            description={
              <p style={{ color: "red", fontSize: "16px" }}>
                {product?.cvtPrice}
              </p>
            }
          />
          <Cell
            title="??????"
            description={
              <p style={{ fontSize: "15px" }}>{product?.quantity}</p>
            }
          />
          <Cell
            title="????????????"
            description={
              <p style={{ fontSize: "15px" }}>{product?.category?.name}</p>
            }
          />
          <Cell
            title="?????????"
            description={
              <p style={{ fontSize: "15px" }}>{productDescriptionObj?.brand}</p>
            }
          />
          <Cell
            title="?????????"
            description={
              <p style={{ fontSize: "15px" }}>{productDescriptionObj?.place}</p>
            }
          />
          <Cell
            title="????????????"
            description={
              <p style={{ fontSize: "15px" }}>
                {productDescriptionObj?.condition}
              </p>
            }
          />
          <Cell
            title="????????????"
            description={
              <p style={{ fontSize: "15px" }}>
                {productDescriptionObj?.description}
              </p>
            }
          />
          <br />
          <Button
            block
            theme="primary"
            onClick={() => history.push(`/shangchengedit?itemId=${iId}`)}
          >
            ????????????
          </Button>
          <br />
          <Button block onClick={() => removeProduct()}>
            ????????????
          </Button>
        </div>
      </div>
    </>
  );
}
