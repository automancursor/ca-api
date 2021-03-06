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
      window.confirm("????????????");
      setResend(true);
    } catch (error) {
      window.confirm("????????????");
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
        .catch((error) => window.confirm("?????????????????????"));
    } else {
      window.confirm("????????????????????????");
    }
  };
  const sucessConfirm = (result) => {
    console.log(result.status);
    if (result.status == "Error") {
      window.confirm("???????????????");
    }
    if (result.status == "ERROR") {
      window.confirm("?????????????????????");
    }
    if (newPassword === newPassword2) {
      if (result.status == "Success") {
        if (window.confirm("???????????????")) {
          history.push("/login");
        }
      }
    } else {
      window.confirm("????????????????????????");
    }
  };

  return (
    <>
      <FuncHeader
        title={"??????????????????"}
        goBack={() => history.push("/settings")}
      />
      {resetToken ? (
        <div style={{ marginTop: "60px" }}>
          <Cell title="?????????">
            <Input
              clearable
              type="text"
              placeholder="?????????"
              value={inputName}
              onChange={(value) => {
                setInputName(value);
              }}
            />
          </Cell>
          <Cell title="?????????">
            <Input
              clearable
              type="password"
              placeholder="?????????"
              value={newPassword}
              onChange={(value) => {
                setNewPassword(value);
              }}
            />
          </Cell>
          <Cell title="????????????">
            <Input
              clearable
              type="password"
              placeholder="????????????"
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
              ????????????
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
                <Radio value="email">??????</Radio>
                <Radio value="mobile">??????</Radio>
              </Radio.Group>
            }
          >
            ????????????
          </Cell>
          <Cell>
            <Button
              block
              style={{ marginTop: "20px", marginBottom: "20px" }}
              onClick={() => getCode()}
            >
              {resend ? `??????${seconds}?????????` : "????????????????????????"}
            </Button>
          </Cell>
        </div>
      )}
    </>
  );
}
