import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Tabs, Cell, Radio, Button, Picker } from "zarm";
import "zarm/dist/zarm.css";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { Request } from "../../../utils/request";
import { CONTENT_TYPE, REQUEST_METHOD } from "../../../utils/request/config";

export default function Profile() {
  const history = useHistory();
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userData = useSelector((state) => state.user?.data);
  const [validationCode, setValidationCode] = useState("");
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

  const sendSMS = () => {
    let request = new Request();
    try {
      let response = request.fetchData("/UserProfile/sms_code", {
        method: REQUEST_METHOD.POST,
        contentType: CONTENT_TYPE.JSON,
        token: token,
        body: {
          Mobile: userData?.phoneNumber,
        },
      });
      window.confirm("验证码已发送到手机。");
      setResend(true);
    } catch (error) {
      window.confirm("未知错误");
    }
  };
  const verifySMS = (vCode) => {
    let request = new Request();
    try {
      let response = request.fetchData("/UserProfile/mobileVerify", {
        method: REQUEST_METHOD.POST,
        contentType: CONTENT_TYPE.JSON,
        token: token,
        body: {
          VerifyCode: vCode,
        },
      });
      history.push("/UpdateProfile");
    } catch (error) {
      window.confirm("未知错误");
    }
  };

  const sendEmail = () => {
    let request = new Request();
    try {
      let response = request.fetchData("/UserProfile/email_code", {
        method: REQUEST_METHOD.POST,
        contentType: CONTENT_TYPE.JSON,
        token: token,
        body: {
          Email: userData?.email,
        },
      });
      window.confirm("验证码已发送到邮箱。");
      setResend(true);
    } catch (error) {
      window.confirm("未知错误");
    }
  };
  const verifyEmail = (vCode) => {
    let request = new Request();
    try {
      let response = request.fetchData("/UserProfile/emailVerify", {
        method: REQUEST_METHOD.POST,
        contentType: CONTENT_TYPE.JSON,
        token: token,
        body: {
          VerifyCode: vCode,
        },
      });
      history.push("/UpdateProfile");
    } catch (error) {
      window.confirm("未知错误");
    }
  };

  const handleClick = () => {
    if (userData?.email || userData?.phoneNumber) {
      if (userData?.email) {
        sendEmail();
        let newCode = prompt("请输入邮箱验证码:");
        if (newCode) {
          verifyEmail(newCode);
        }
      } else {
        sendSMS();
        let newCode = prompt("请输入短信验证码:");
        if (newCode) {
          verifySMS(newCode);
        }
      }
    } else {
      history.push("/UpdateProfile");
    }
  };

  return (
    <>
      <FuncHeader title={"个人信息"} goBack={() => history.push("/settings")} />
      <div style={{ paddingTop: "50px" }}>
        <Cell description={<div className="box">{userData?.username}</div>}>
          用户名
        </Cell>
        <Cell description={<div className="box">{userData?.referCode}</div>}>
          邀请码
        </Cell>
        <Cell description={<div className="box">{userData?.countryCode}</div>}>
          国家
        </Cell>
        <Cell description={<div className="box">{userData?.email}</div>}>
          邮箱
        </Cell>
        <Cell description={<div className="box">{userData?.phoneNumber}</div>}>
          手机
        </Cell>
        <Cell>
          <Button
            block
            disabled={resend}
            theme="primary"
            style={{ marginTop: "20px" }}
            onClick={() => handleClick()}
          >
            {resend ? `等待${seconds}秒重发` : "更改个人信息"}
          </Button>
        </Cell>
      </div>
    </>
  );
}
