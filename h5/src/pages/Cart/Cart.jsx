import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import THeader from "components/NavHeader/THeader";
import { useCart } from "react-use-cart";
import { Tabs, Cell, Radio, Button, Picker, Input, Stepper } from "zarm";
import _ from "lodash";
import axios from "axios";
import * as styles from "./cart.module.scss";
import { BASE_URL } from "../../utils/request/config";

const CallForLogin = (props) => {
  const { goLogin } = props;

  return (
    <div className={styles["call-for-login"]} onClick={goLogin}>
      <span className={styles["call-for-login-left"]}>登录后享受更多优惠</span>
      <span className={styles["call-for-login-right"]}>去登录</span>
    </div>
  );
};

export default function Cart() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const isAuthed = useSelector((state) => state.auth.isAuthed);
  const { items, updateItemQuantity, emptyCart, cartTotal } = useCart();
  let token = useSelector((state) => state.auth.token);
  const userAddress = useSelector((state) => state.user?.data?.address);
  const goLogin = () => {
    history.push("/login");
  };
  // get cart items
  const getGroupedItem = (items) => {
    return _.groupBy(items, "username");
  };
  const handleClick = async (groupedItems) => {
    try {
      setLoading(true);
      if (!userAddress) {
        window.confirm("请绑定收货地址。");
      } else {
        for (let key in groupedItems) {
          await handleAddOrder(groupedItems[key]);
          // alert(`向${key}购买成功`);
          history.push("/dingdan");
        }
        emptyCart();
      }
    } catch (e) {
      console.log(e);
      window.confirm("购买失败");
    } finally {
      setLoading(false);
    }
  };
  const handleAddOrder = async (items) => {
    const data = JSON.stringify({
      Address: userAddress,
      OrderDetail: "无",
      SellerId: items[0]?.userId,
      OrderProducts: items.map((n) => {
        return {
          ProductId: n.id,
          Quantity: n.quantity,
        };
      }),
    });

    const config = {
      method: "post",
      url: `${BASE_URL}/Order/product_order`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data,
    };
    try {
      const response = await axios(config);
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data);
        if (
          error.response.data.message ==
          '{"ClassName":"System.Exception","Message":"insufficient Cvt Balance","Data":null,"InnerException":null,"HelpURL":null,"StackTraceString":"   at cva_api.Controllers.OrderController.AddProductOrder(AddProductOrderRequest addProductOrderRequest) in /source/cva-api/Controllers/OrderController.cs:line 372","RemoteStackTraceString":null,"RemoteStackIndex":0,"ExceptionMethod":null,"HResult":-2146233088,"Source":"cva-api","WatsonBuckets":null}'
        ) {
          window.confirm("余额不足");
        }
      }
      throw error;
    }
  };
  const debounceHandleClick = _.throttle(handleClick, 8000, {
    leading: true,
    trailing: false,
  });
  console.log(cartTotal);
  return (
    <div className={styles.wrapper}>
      <THeader title="购物车" />
      {isAuthed ? null : <CallForLogin goLogin={goLogin} />}
      {isAuthed ? (
        <div>
          <div style={{ flex: 1, minHeight: "65vh" }}>
            {Object.keys(getGroupedItem(items)).map((key) => {
              const total = getGroupedItem(items)[key]?.reduce(
                (partial_sum, a) => partial_sum + a.itemTotal,
                0
              );
              return (
                <div key={key}>
                  <div style={{ fontSize: 16, marginBottom: 16 }}>
                    供货商：{key}
                  </div>
                  <div>
                    {getGroupedItem(items)[key]?.map((n) => {
                      return (
                        <div
                          key={n.id}
                          style={{
                            display: "flex",
                            background: "white",
                            alignItems: "center",
                            marginTop: 16,
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <Cell
                              title={
                                <div className="box">
                                  <div className="box-description">
                                    {n.name}
                                  </div>
                                  <div className="box-description">
                                    {n.categoryInfo}
                                  </div>
                                </div>
                              }
                              description={n.price}
                              icon={
                                <img
                                  alt=""
                                  src={n.imageUrl}
                                  style={{ width: 48, height: 48 }}
                                />
                              }
                            />
                          </div>
                          <Stepper
                            value={n.quantity}
                            onChange={(qty) => updateItemQuantity(n.id, qty)}
                            onInputChange={(qty) => {
                              updateItemQuantity(n.id, qty);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ fontSize: 14, marginTop: 20 }}>
                    小计：{total} CVT
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              fontSize: 20,
              marginTop: 20,
              borderTop: "1px solid black",
              marginBottom: 20,
            }}
          >{`总计： ${cartTotal}CVT`}</div>
          <div style={{ marginBottom: 100 }}>
            {loading ? (
              <div>加载中。。。</div>
            ) : (
              <Button
                block
                theme="primary"
                onClick={() => debounceHandleClick(getGroupedItem(items))}
              >
                购买
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
