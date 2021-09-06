import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";

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

const MAX_FILES_COUNT = 1;

export default function Reimbursement() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userEmail = useSelector((state) => state.user?.data?.email);
  let userMobile = useSelector((state) => state.user?.data?.phoneNumber);
  let walletData = useSelector((state) => state.user?.data?.wallet);
  const history = useHistory();
  const [coinType, setCoinType] = useState("cva");
  const [transType, setTransType] = useState("aud");
  const [verifyType, setVerifyType] = useState("email");
  const [payPassword, setPayPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [toVerifyCode, setVerifyCode] = useState("");
  const [files, setFiles] = useState([]);
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

  const onSelect = (selFiles) => {
    const newFiles = files.concat(selFiles);
    if (newFiles.length > MAX_FILES_COUNT) {
      Toast.show("最多只能选择1张图片");
      return;
    }
    setFiles(newFiles);
  };

  const remove = (index) => {
    const newFiles = [].concat(files);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    Toast.show("删除成功");
  };

  const imgRender = () => {
    return files.map((item, index) => {
      return (
        <Badge
          key={+index}
          className="file-picker-item"
          shape="circle"
          text={
            <span className="file-picker-closebtn">
              <Icon type="wrong" />
            </span>
          }
          onClick={() => remove(index)}
          style={{ padding: "10px" }}
        >
          <div className="file-picker-item-img">
            <a href={item.thumbnail} target="_blank" rel="noopener noreferrer">
              <img
                src={item.thumbnail}
                alt=""
                style={{
                  height: "60px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              />
            </a>
          </div>
        </Badge>
      );
    });
  };

  const getCode = async () => {
    if (
      // amount >= 100 &&
      files[0]?.file &&
      payPassword
      // walletData?.cvt >= 30000 设置消费补贴限制
    ) {
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
      window.confirm(
        // "请输入报销数量，不小于CVA$100，CVT不少于3万，且输入所有信息。"
        "请输入报销数量，且输入所有信息。"
      );
    }
  };
  const debounceGetCode = _.throttle(getCode, 8000, {
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
    if (result.status == "Success") {
      if (window.confirm("操作成功。")) {
        history.push("/user");
      }
    }
  };
  // handling submiut
  const handleClick = async () => {
    if (toVerifyCode) {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var formdata = new FormData();
        formdata.append("TransactionCoinType", coinType);
        formdata.append("Amount", amount);
        formdata.append("PayPassword", payPassword);
        formdata.append("TransactionType", "CLAIM");
        formdata.append("VerifyCode", toVerifyCode);
        formdata.append("AttachedFiles", files[0]?.file);
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
      window.confirm("请输入验证码。");
    }
  };
  const debounceHandleClick = _.throttle(handleClick, 8000, {
    leading: true,
    trailing: false,
  });

  const coinTypeSwitch = (type) => {
    switch (type) {
      case "cva":
        return `$ ${walletData?.cva}`;
      case "cvt":
        return `${walletData?.cvt}`;
      case "abg":
        return `${walletData?.abg}`;
    }
  };

  return (
    <>
      <FuncHeader title={"消费补贴"} goBack={() => history.push("/user")} />
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
              <Radio value="cva">CVT提货通证转入CVA滴水池</Radio>
              {/*<Radio value="cvt">CVT提货通证</Radio>*/}
              {/*<Radio value="abg">ABG金豆</Radio>*/}
            </Radio.Group>
          }
        >
          报销种类
        </Cell>
        <Cell title="CVT余额">{walletData?.cvt} CVT</Cell>
        <Cell
          description={
            <Radio.Group
              type="button"
              value={transType}
              onChange={(value) => {
                setTransType(value);
              }}
            >
              <Radio value="aud">澳币</Radio>
              <Radio value="cny">人民币</Radio>
              {/*<Radio value="block">数字货币</Radio>*/}
            </Radio.Group>
          }
        >
          货币类型
        </Cell>
        {/*<Cell title="当前余额">{coinTypeSwitch(coinType)}</Cell>*/}
        <Cell title="报销金额($)">
          <Input
            type="number"
            value={amount}
            onChange={(value) => {
              setAmount(value);
            }}
            placeholder={"请输入报销金额"}
          />
        </Cell>
        <Cell title="单据凭证">
          <div className="file-picker-wrapper" style={{ marginTop: "10px" }}>
            {imgRender()}
            {files.length < MAX_FILES_COUNT && (
              <FilePicker
                multiple
                className="file-picker-btn"
                accept="image/*"
                onChange={onSelect}
              >
                <Icon type="add" size="lg" />
              </FilePicker>
            )}
          </div>
          {/*<Input*/}
          {/*    type="text"*/}
          {/*    value={toUserName}*/}
          {/*    onChange={(value) => {*/}
          {/*      setToUserName(value);*/}
          {/*    }}*/}
          {/*    placeholder={"请输入对方用户名"}*/}
          {/*/>*/}
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
            提交报销
          </Button>
        </Cell>
      </div>
    </>
  );
}
