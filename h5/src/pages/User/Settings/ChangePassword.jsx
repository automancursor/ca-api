import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FuncHeader from "components/FuncHeader/FuncHeader";
import {
  Input,
  Cell,
  Button,
  Radio,
  FilePicker,
  Icon,
  Toast,
  Badge,
} from "zarm";
import "zarm/dist/zarm.css";
import { Request } from "../../../utils/request";
import {
  BASE_URL,
  CONTENT_TYPE,
  REQUEST_METHOD,
} from "../../../utils/request/config";
import * as QueryString from "query-string";

let resetToken = null;

export default function ChangePassword() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userName = useSelector((state) => state.user?.data?.username);
  let userEmail = useSelector((state) => state.user?.data?.email);
  let userMobile = useSelector((state) => state.user?.data?.phoneNumber);
  const [verifyType, setVerifyType] = useState("email");
  const [inputName, setInputName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const history = useHistory();
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

  let testToken = window.location.search.slice(7);

  resetToken = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }).token;

  const getCode = async () => {
    let request = new Request();
    let url;
    let body;
    verifyType === "email"
      ? (body = {
          username: userName,
          ResetMethod: "Email",
        })
      : (body = {
          username: userName,
          ResetMethod: "PhoneNumber",
        });
    verifyType === "email"
      ? (url = "/authenticate/resetPasswordToken")
      : (url = "/authenticate/resetPasswordToken");
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
  };

  const handleClick = () => {
    if (inputName && newPassword && newPassword) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        ResetToken: testToken,
        UserName: inputName,
        NewPassword: newPassword,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(BASE_URL + "/authenticate/resetPassword", requestOptions)
        .then((response) => response.json())
        .then((result) => sucessConfirm(result))
        .catch((error) => window.confirm("信息输入有误。"));
    } else {
      window.confirm("请输入完整信息。");
    }
  };
  const sucessConfirm = (result) => {
    console.log(result.status);
    if (result.status == "Error") {
      window.confirm("信息有误。");
    }
    if (result.status == "ERROR") {
      window.confirm("信息输入错误。");
    }
    if (newPassword === newPassword2) {
      if (result.status == "Success") {
        if (window.confirm("操作成功。")) {
          history.push("/login");
        }
      }
    } else {
      window.confirm("两次密码不一致。");
    }
  };

  return (
    <>
      <FuncHeader
        title={"修改登陆密码"}
        goBack={() => history.push("/settings")}
      />
      {resetToken ? (
        <div style={{ marginTop: "60px" }}>
          <Cell title="用户名">
            <Input
              clearable
              type="text"
              placeholder="用户名"
              value={inputName}
              onChange={(value) => {
                setInputName(value);
              }}
            />
          </Cell>
          <Cell title="新密码">
            <Input
              clearable
              type="password"
              placeholder="新密码"
              value={newPassword}
              onChange={(value) => {
                setNewPassword(value);
              }}
            />
          </Cell>
          <Cell title="重复密码">
            <Input
              clearable
              type="password"
              placeholder="重复密码"
              value={newPassword2}
              onChange={(value) => {
                setNewPassword2(value);
              }}
            />
          </Cell>
          <Cell>
            <Button
              block
              theme="primary"
              style={{ marginTop: "20px" }}
              onClick={() => handleClick()}
            >
              修改密码
            </Button>
          </Cell>
        </div>
      ) : (
        <div style={{ marginTop: "60px" }}>
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
            接收方式
          </Cell>
          <Cell>
            <Button
              block
              style={{ marginTop: "20px", marginBottom: "20px" }}
              onClick={() => getCode()}
            >
              {resend ? `等待${seconds}秒重发` : "发送重设密码链接"}
            </Button>
          </Cell>
        </div>
      )}
    </>
  );
}
