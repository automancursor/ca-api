import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { Input, Cell, Button, Radio } from "zarm";
import "zarm/dist/zarm.css";
import { Request } from "../../../utils/request";
import {
  BASE_URL,
  CONTENT_TYPE,
  REQUEST_METHOD,
} from "../../../utils/request/config";

export default function ChangePayPassword() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userEmail = useSelector((state) => state.user?.data?.email);
  let userMobile = useSelector((state) => state.user?.data?.phoneNumber);
  let walletData = useSelector((state) => state.user?.data?.wallet);
  const history = useHistory();
  const [newPassword, setNewPassword] = useState("");
  const [verifyType, setVerifyType] = useState("email");
  const [toVerifyCode, setVerifyCode] = useState("");

  const getCode = async () => {
    if (newPassword) {
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
      } catch (error) {
        window.confirm("未知错误");
      }
    } else {
      window.confirm("请输入密码");
    }
  };

  const handleClick = async () => {
    if (toVerifyCode) {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var formdata = new FormData();
        formdata.append("TransactionnewPassword", newPassword);
        formdata.append("TransactionType", "TRANSEFER");
        formdata.append("VerifyCode", toVerifyCode);
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };
        fetch(BASE_URL + "/Transaction", requestOptions)
          .then((response) => response.json())
          .then((result) => window.confirm("操作成功"))
          .catch((error) => window.confirm("未知错误"));
      } catch (error) {
        window.confirm("未知错误");
      }
    } else {
      window.confirm("请输入验证码");
    }
  };

  return (
    <>
      <FuncHeader
        title={"修改支付密码"}
        goBack={() => history.push("/settings")}
      />
      <div style={{ marginTop: "60px" }}>
        <Cell title="新支付密码">
          <Input
            clearable
            type="password"
            placeholder="请输入新的支付密码"
            value={newPassword}
            onChange={(value) => {
              setNewPassword(value);
            }}
            onBlur={(value) => console.log(`onBlur: ${value}`)}
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
            style={{ marginTop: "20px", marginBottom: "20px" }}
            onClick={() => getCode()}
          >
            获取验证码
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
            onClick={() => handleClick()}
          >
            提交
          </Button>
        </Cell>
      </div>
    </>
  );
}
