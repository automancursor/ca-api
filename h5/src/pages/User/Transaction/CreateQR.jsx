import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { Input, Cell, Button, Radio } from "zarm";
import "zarm/dist/zarm.css";
import { Request } from "../../../utils/request";
import {
  BASE_URL,
  CONTENT_TYPE,
  REQUEST_METHOD,
} from "../../../utils/request/config";

export default function CreateQR() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userIdCard = useSelector((state) => state.user?.data?.idCard);
  let userPassport = useSelector((state) => state.user?.data?.passport);
  let userName = useSelector((state) => state.user?.data?.username);
  let userEmail = useSelector((state) => state.user?.data?.email);
  let userMobile = useSelector((state) => state.user?.data?.phoneNumber);
  let walletData = useSelector((state) => state.user?.data?.wallet);
  const history = useHistory();
  const [coinType, setCoinType] = useState("rpt");
  const [amount, setAmount] = useState("");

  var React = require("react");
  var QRCode = require("qrcode.react");

  // get diff coin type
  const coinTypeSwitch = (type) => {
    switch (type) {
      case "rpt":
        return `${walletData?.rpt}`;
    }
  };

  return (
    <>
      <FuncHeader title={"生成支付码"} goBack={() => history.push("/user")} />
      {userPassport || userIdCard ? (
        <div style={{ marginTop: "60px" }}>
          <Cell
            description={
              <Radio.Group
                type="button"
                value={coinType}
                onChange={(value) => {
                  setCoinType(value);
                }}
              >
                <Radio value="rpt">RPT积分</Radio>
              </Radio.Group>
            }
          >
            货币类型
          </Cell>
          <Cell title="当前余额">{coinTypeSwitch(coinType)}</Cell>
          <Cell title="收款数量">
            <Input
              type="number"
              value={amount}
              onChange={(value) => {
                setAmount(value);
              }}
              placeholder={"请输入收款数量"}
            />
          </Cell>
          <p>{`http://h5.cvac.net.au/transefer?name=${userName}&amount=${amount}`}</p>
          <QRCode
            style={{
              width: "300px",
              height: "300px",
              margin: "30px",
            }}
            value={`http://h5.cvac.net.au/transefer?name=${userName}&amount=${amount}`}
          />

          {/*<Cell>*/}
          {/*  <Button*/}
          {/*      block*/}
          {/*      theme="primary"*/}
          {/*      style={{ marginTop: "20px" }}*/}
          {/*      onClick={() => createQRCode()}*/}
          {/*  >*/}
          {/*    生成收款码*/}
          {/*  </Button>*/}
          {/*</Cell>*/}
        </div>
      ) : (
        <div style={{ marginTop: "60px" }}>
          <h3>请双击上传证件，完成实名认证。</h3>
        </div>
      )}
    </>
  );
}
