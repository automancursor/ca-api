import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "utils/request/config";
import _ from "lodash";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { Tabs, Input, Cell, Button } from "zarm";
import "zarm/dist/zarm.css";
import { Request } from "../../../utils/request";
import { CONTENT_TYPE, REQUEST_METHOD } from "../../../utils/request/config";

const { Panel } = Tabs;

export default function Pay() {
  const history = useHistory();
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const [paypalAmount, setPaypalAmount] = useState();
  const [stripeAmount, setStripeAmount] = useState();
  const [activedkey, setActivedkey] = useState(0);
  const [payPassword, setPayPassword] = useState("");

  // take user to paypal
  const toPayPal = (id, amount) => {
    history.push("/paypal?id=" + id + "&amount=" + amount);
  };

  // hanlding paypal request
  const handlePaypal = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      var formdata = new FormData();
      formdata.append("TransactionCoinType", "Cva");
      formdata.append("Amount", paypalAmount);
      formdata.append("TransactionType", "RECHARGE");
      formdata.append("PayPassword", payPassword);
      formdata.append("TransactionMethod", "在线充值");
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      fetch(BASE_URL + "/Transaction", requestOptions)
        .then((response) => response.json())
        .then((result) => toPayPal(result.data.id, result.data.amount))
        .catch((error) => window.confirm("未知错误"));
    } catch (error) {
      window.confirm("未知错误");
    }
  };
  const debounceHandlePaypal = _.throttle(handlePaypal, 8000, {
    leading: true,
    trailing: false,
  });

  const handleStripe = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      var formdata = new FormData();
      formdata.append("TransactionCoinType", "Cva");
      formdata.append("Amount", paypalAmount);
      formdata.append("TransactionType", "RECHARGE");
      formdata.append("PayPassword", payPassword);
      formdata.append("TransactionMethod", "在线充值");
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      fetch(BASE_URL + "/Transaction", requestOptions)
        .then((response) => response.json())
        .then((result) => toPayPal(result.data.id, result.data.amount))
        .catch((error) => window.confirm("未知错误"));
    } catch (error) {
      window.confirm("未知错误");
    }
  };

  return (
    <>
      <FuncHeader title={"在线充值"} goBack={() => history.push("/user")} />
      <div style={{ marginTop: "60px" }}>
        <Tabs scrollable value={activedkey} onChange={setActivedkey}>
          <Panel title="Paypal">
            <div>
              <Cell title="支付方式">
                <Input
                  readOnly
                  type="text"
                  defaultValue="银行卡/信用卡/Paypal账号"
                />
              </Cell>
              <Cell title="充值金额">
                <Input
                  type="price"
                  value={paypalAmount}
                  onChange={(value) => {
                    setPaypalAmount(value);
                  }}
                  placeholder={"请输入金额"}
                />
              </Cell>
              <Cell title="支付密码">
                <Input
                  type="password"
                  value={payPassword}
                  onChange={(value) => {
                    setPayPassword(value);
                  }}
                  placeholder={"请输入支付密码"}
                />
              </Cell>
              <Button
                block
                theme="primary"
                style={{ marginTop: "20px" }}
                onClick={() => debounceHandlePaypal()}
              >
                确认
              </Button>
            </div>
          </Panel>
          {/*<Panel title="Stripe">*/}
          {/*  <div>*/}
          {/*    <Cell title="支付方式">*/}
          {/*      <Input*/}
          {/*        readOnly*/}
          {/*        type="text"*/}
          {/*        defaultValue="支付宝/微信钱包/中国银联卡"*/}
          {/*      />*/}
          {/*    </Cell>*/}
          {/*    <Cell title="充值金额">*/}
          {/*      <Input*/}
          {/*        type="price"*/}
          {/*        value={stripeAmount}*/}
          {/*        onChange={(value) => {*/}
          {/*          setStripeAmount(value);*/}
          {/*        }}*/}
          {/*        placeholder={"请输入金额"}*/}
          {/*      />*/}
          {/*    </Cell>*/}
          {/*    <Button*/}
          {/*      block*/}
          {/*      theme="primary"*/}
          {/*      style={{ marginTop: "20px" }}*/}
          {/*      onClick={() => handleStripe()}*/}
          {/*    >*/}
          {/*      确认*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*</Panel>*/}
        </Tabs>
      </div>
    </>
  );
}
