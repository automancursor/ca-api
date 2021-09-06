import React, { useEffect, useState, useRef, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useCart } from "react-use-cart";
import FuncHeader from "../../components/FuncHeader/FuncHeader";
import * as QueryString from "query-string";
import axios from "axios";
import { BASE_URL } from "../../utils/request/config";
import { useSelector } from "react-redux";
import { Cell, Stepper, Button, Input, Modal } from "zarm";
import _ from "lodash";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
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

let iId = null;

export default function ProductDetail() {
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  const { addItem } = useCart();
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userAddress = useSelector((state) => state.user?.data?.address);
  const [product, setProduct] = useState([]);
  const [pic, setPic] = useState([]);
  const [qty, setQty] = useState(1);
  const [state, dispatch] = useReducer(reducer, initState);
  const [content, setContent] = useState("无");

  const toggle = (key) => dispatch({ type: "visible", key });
  //get id from uel
  iId = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }).itemId;
  // get products.
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

  const handleClick = async () => {
    if (qty) {
      var axios = require("axios");
      var data = JSON.stringify({
        Address: userAddress,
        OrderDetail: content,
        SellerId: product?.userId,
        OrderProducts: [
          {
            ProductId: iId,
            Quantity: qty,
          },
        ],
      });
      // console.log(JSON.stringify(response.data));
      // toggle("hasFooter");
      var config = {
        method: "post",
        url: BASE_URL + "/Order/product_order",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          history.push("/dingdan");
          // console.log(JSON.stringify(response.data));
          // toggle("hasFooter");
        })
        .catch(function (error) {
          if (error.response) {
            console.log("余额不足");
            if (
              error.response.data.message ==
              '{"ClassName":"System.Exception","Message":"insufficient Cvt Balance","Data":null,"InnerException":null,"HelpURL":null,"StackTraceString":"   at cva_api.Controllers.OrderController.AddProductOrder(AddProductOrderRequest addProductOrderRequest) in /source/cva-api/Controllers/OrderController.cs:line 420","RemoteStackTraceString":null,"RemoteStackIndex":0,"ExceptionMethod":null,"HResult":-2146233088,"Source":"cva-api","WatsonBuckets":null}'
            ) {
              window.confirm("余额不足");
            }
          }
        });
    } else {
      window.confirm("数量至少为1。");
    }
  };
  const debounceHandleClick = _.throttle(handleClick, 8000, {
    leading: true,
    trailing: false,
  });

  useEffect(() => {
    if (iId) {
      getProduct(iId, token);
    }
  }, [iId]);

  useEffect(() => {
    if (product?.productImages) {
      const images = product?.productImages.split("&&");
      setPic(images.slice(0, images.length - 1));
    }
  }, [product]);

  const handleAddItem = (item) => {
    addItem(item);
    alert("添加成功");
    history.push("/category");
  };

  return (
    <>
      <FuncHeader
        title={product?.name}
        goBack={() => history.push("/category")}
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
          <br />
          <Cell
            title="价格"
            description={
              <p style={{ color: "red", fontSize: "16px" }}>
                {product?.cvtPrice} CVT
              </p>
            }
          />
          <Cell
            title="库存"
            description={
              <p style={{ fontSize: "15px" }}>{product?.quantity}</p>
            }
          />
          <Cell
            title="详情"
            description={
              <p style={{ fontSize: "15px" }}>{product?.productDescription}</p>
            }
          />
          <Cell
            title="商家"
            description={
              <p style={{ fontSize: "15px" }}>{product?.companyName}</p>
            }
          />
          <Cell
            title="类别"
            description={
              <p style={{ fontSize: "15px" }}>{product?.category?.name}</p>
            }
          />
          <Cell
            title="商家地址"
            description={<p style={{ fontSize: "15px" }}>{product?.address}</p>}
          />
          <Cell
            title="商家网站"
            description={
              <p style={{ fontSize: "15px" }}>{product?.user?.companyLink}</p>
            }
          />
          <Cell
            title="购买数量"
            description={
              <Stepper
                value={qty}
                onChange={setQty}
                onInputChange={(qty) => {
                  setQty(qty);
                }}
              />
            }
          />
          <br />
          <Button
            block
            theme="primary"
            onClick={() =>
              userAddress
                ? toggle("hasFooter")
                : window.confirm("请绑定收货地址。")
            }
          >
            购买
          </Button>
          <br />
          <Button
            block
            onClick={() => {
              product &&
                handleAddItem({
                  username: product?.userName,
                  quantity: qty,
                  userId: product.userId,
                  categoryInfo: product.category?.name,
                  name: product?.name,
                  imageUrl: pic[0],
                  id: product?.id,
                  price: qty * product.cvtPrice,
                });
            }}
          >
            加入购物车
          </Button>
          <Modal
            title="订单总结"
            visible={state.hasFooter.visible}
            footer={
              <div style={{ width: "100%" }}>
                <Button
                  block
                  theme="primary"
                  onClick={() => debounceHandleClick()}
                >
                  确认购买
                </Button>
                <br />
                <Button block onClick={() => toggle("hasFooter")}>
                  取消
                </Button>
              </div>
            }
          >
            <Cell
              title="产品"
              description={<p style={{ fontSize: "15px" }}>{product?.name}</p>}
            />
            <Cell
              title="数量"
              description={<p style={{ fontSize: "15px" }}>{qty}</p>}
            />
            <Cell
              title="收货地址"
              description={<p style={{ fontSize: "15px" }}>{userAddress}</p>}
            />
            <Cell title="备注">
              <Input
                rows={3}
                type="text"
                placeholder="请输入"
                value={content}
                onChange={setContent}
              />
            </Cell>
          </Modal>
        </div>
      </div>
    </>
  );
}
