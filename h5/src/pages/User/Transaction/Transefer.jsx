import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import * as QueryString from "query-string";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { Input, Cell, Button, Radio } from "zarm";
import "zarm/dist/zarm.css";
import { Request } from "../../../utils/request";
import {
  BASE_URL,
  CONTENT_TYPE,
  REQUEST_METHOD,
} from "../../../utils/request/config";

let urlUserName = null;
let urlAmount = null;

export default function Transefer() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userIdCard = useSelector((state) => state.user?.data?.idCard);
  let userPassport = useSelector((state) => state.user?.data?.passport);
  let userEmail = useSelector((state) => state.user?.data?.email);
  let userMobile = useSelector((state) => state.user?.data?.phoneNumber);
  let walletData = useSelector((state) => state.user?.data?.wallet);
  const history = useHistory();
  const [coinType, setCoinType] = useState("cva");
  const [verifyType, setVerifyType] = useState("email");
  const [payPassword, setPayPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [toUserName, setToUserName] = useState("");
  const [toVerifyCode, setVerifyCode] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [resend, setResend] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(60);
      setResend(false);
    }
  });

  urlUserName = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }).name;
  urlAmount = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }).amount;

  useEffect(() => {
    if (urlUserName) {
      setCoinType("rpt");
      setToUserName(urlUserName);
      setAmount(urlAmount);
    }
  }, [urlUserName]);

  const getCode = async () => {
    if (amount > 0 && toUserName && payPassword) {
      let request = new Request();
      let url;
      let body;
      verifyType === "email"
        ? (body = { Email: userEmail })
        : (body = { Mobile: userMobile });
      verifyType === "email"
        ? (url = "/UserProfile/email_code")
        : (url = "/UserProfile/sms_code");
      try {
        let response = await request.fetchData(url, {
          method: REQUEST_METHOD.POST,
          contentType: CONTENT_TYPE.JSON,
          token,
          body,
        });
        window.confirm("发送成功");
        setResend(true);
      } catch (error) {
        window.confirm("未知错误");
      }
    } else {
      window.confirm("请输入所有信息。");
    }
  };
  const debounceGetCode = _.throttle(getCode, 8000, {
    leading: true,
    trailing: false,
  });
  // handling submit
  const handleClick = async () => {
    if (toVerifyCode) {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var formdata = new FormData();
        formdata.append("TransactionCoinType", coinType);
        formdata.append("Amount", amount);
        formdata.append("TransactionType", "TRANSEFER");
        formdata.append("VerifyCode", toVerifyCode);
        formdata.append("ToUserName", toUserName);
        formdata.append("PayPassword", payPassword);
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };
        fetch(BASE_URL + "/Transaction", requestOptions)
          .then((response) => response.json())
          .then((result) => sucessConfirm(result))
          .catch((error) => window.confirm("未知错误"));
      } catch (error) {
        window.confirm("未知错误");
      }
    } else {
      window.confirm("请输入验证码");
    }
  };
  const debounceHandleClick = _.throttle(handleClick, 8000, {
    leading: true,
    trailing: false,
  });
  const sucessConfirm = (result) => {
    console.log(result.status);
    if (result.status == 401) {
      window.confirm("支付密码错误。");
    }
    if (result.status == "ERROR") {
      window.confirm("信息输入错误。");
    }
    if (result.status == "SUCCESS") {
      if (window.confirm("操作成功。")) {
        history.push("/user");
      }
    }
  };

  const coinTypeSwitch = (type) => {
    switch (type) {
      case "cva":
        return `${walletData?.cva}`;
      case "cvt":
        return `${walletData?.cvt}`;
      case "abg":
        return `${walletData?.abg}`;
      case "rpt":
        return `${walletData?.rpt}`;
    }
  };

  return (
    <>
      <FuncHeader title={"互转"} goBack={() => history.push("/user")} />
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
                <Radio value="cva">CVA滴水池</Radio>
                <Radio value="cvt">CVT提货通证</Radio>
                <Radio value="abg">ABG金豆</Radio>
                <Radio value="rpt">RPT</Radio>
              </Radio.Group>
            }
          >
            转换类型
          </Cell>
          <Cell title="当前余额">{coinTypeSwitch(coinType)}</Cell>
          <Cell title="互转数量">
            <Input
              type="number"
              value={amount}
              onChange={(value) => {
                setAmount(value);
              }}
              placeholder={"请输入互转数量"}
            />
          </Cell>
          <Cell title="对方用户名">
            <Input
              type="text"
              value={toUserName}
              onChange={(value) => {
                setToUserName(value);
              }}
              placeholder={"请输入对方用户名"}
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
          <Cell
            description={
              <Radio.Group
                type="button"
                value={verifyType}
                onChange={(value) => {
                  setVerifyType(value);
                }}
              >
                <Radio value="email">邮箱</Radio>
                <Radio value="mobile">手机</Radio>
              </Radio.Group>
            }
          >
            接收验证码
          </Cell>
          <Cell>
            <Button
              block
              disabled={resend}
              style={{ marginTop: "20px", marginBottom: "20px" }}
              onClick={() => debounceGetCode()}
            >
              {resend ? `等待${seconds}秒重发` : "获取验证码"}
            </Button>
          </Cell>
          <Cell title="验证码">
            <Input
              type="text"
              value={toVerifyCode}
              onChange={(value) => {
                setVerifyCode(value);
              }}
              placeholder={"请输入验证码"}
            />
          </Cell>

          <Cell>
            <Button
              block
              theme="primary"
              style={{ marginTop: "20px" }}
              onClick={() => debounceHandleClick()}
            >
              提交互转
            </Button>
          </Cell>
        </div>
      ) : (
        <div style={{ marginTop: "60px" }}>
          <h3>请双击上传证件，完成实名认证。</h3>
        </div>
      )}
    </>
  );
}
