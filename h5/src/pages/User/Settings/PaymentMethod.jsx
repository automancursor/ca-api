import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Badge, Cell } from "zarm";
import "zarm/dist/zarm.css";

import FuncHeader from "components/FuncHeader/FuncHeader";

export default function PaymentMethod() {
  const history = useHistory();

  return (
    <>
      <FuncHeader title={"收款方式"} goBack={() => history.push("/settings")} />
      <div style={{ marginTop: "60px" }}>
        <Cell hasArrow title="微信" onClick={() => history.push("/wechat")} />
        <Cell hasArrow title="支付宝" onClick={() => history.push("/alipay")} />
        <Cell
          hasArrow
          title="海外银行"
          onClick={() => history.push("/overseaBank")}
        />
        <Cell
          hasArrow
          title="中国银行"
          onClick={() => history.push("/cnbank")}
        />
        <Cell
          hasArrow
          title="区块链地址ETH/USDT"
          onClick={() => history.push("/blockchainpayaddress")}
        />
      </div>
    </>
  );
}
