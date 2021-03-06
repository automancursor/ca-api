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
        window.confirm("????????????");
        setResend(true);
      } catch (error) {
        window.confirm("????????????");
      }
    } else {
      window.confirm("????????????????????????");
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
          .catch((error) => window.confirm("????????????"));
      } catch (error) {
        window.confirm("????????????");
      }
    } else {
      window.confirm("??????????????????");
    }
  };
  const debounceHandleClick = _.throttle(handleClick, 8000, {
    leading: true,
    trailing: false,
  });
  const sucessConfirm = (result) => {
    console.log(result.status);
    if (result.status == 401) {
      window.confirm("?????????????????????");
    }
    if (result.status == "ERROR") {
      window.confirm("?????????????????????");
    }
    if (result.status == "SUCCESS") {
      if (window.confirm("???????????????")) {
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
      <FuncHeader title={"??????"} goBack={() => history.push("/user")} />
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
                <Radio value="cva">CVA?????????</Radio>
                <Radio value="cvt">CVT????????????</Radio>
                <Radio value="abg">ABG??????</Radio>
                <Radio value="rpt">RPT</Radio>
              </Radio.Group>
            }
          >
            ????????????
          </Cell>
          <Cell title="????????????">{coinTypeSwitch(coinType)}</Cell>
          <Cell title="????????????">
            <Input
              type="number"
              value={amount}
              onChange={(value) => {
                setAmount(value);
              }}
              placeholder={"?????????????????????"}
            />
          </Cell>
          <Cell title="???????????????">
            <Input
              type="text"
              value={toUserName}
              onChange={(value) => {
                setToUserName(value);
              }}
              placeholder={"????????????????????????"}
            />
          </Cell>
          <Cell title="????????????">
            <Input
              type="password"
              value={payPassword}
              onChange={(value) => {
                setPayPassword(value);
              }}
              placeholder={"?????????????????????"}
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
                <Radio value="email">??????</Radio>
                <Radio value="mobile">??????</Radio>
              </Radio.Group>
            }
          >
            ???????????????
          </Cell>
          <Cell>
            <Button
              block
              disabled={resend}
              style={{ marginTop: "20px", marginBottom: "20px" }}
              onClick={() => debounceGetCode()}
            >
              {resend ? `??????${seconds}?????????` : "???????????????"}
            </Button>
          </Cell>
          <Cell title="?????????">
            <Input
              type="text"
              value={toVerifyCode}
              onChange={(value) => {
                setVerifyCode(value);
              }}
              placeholder={"??????????????????"}
            />
          </Cell>

          <Cell>
            <Button
              block
              theme="primary"
              style={{ marginTop: "20px" }}
              onClick={() => debounceHandleClick()}
            >
              ????????????
            </Button>
          </Cell>
        </div>
      ) : (
        <div style={{ marginTop: "60px" }}>
          <h3>?????????????????????????????????????????????</h3>
        </div>
      )}
    </>
  );
}
