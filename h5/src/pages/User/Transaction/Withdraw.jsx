import React, { useState, useEffect, useRef, useReducer } from "react";
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
  Picker,
} from "zarm";
import "zarm/dist/zarm.css";
import { Request } from "../../../utils/request";
import {
  BASE_URL,
  CONTENT_TYPE,
  REQUEST_METHOD,
} from "../../../utils/request/config";

const PAY_TYPE = [
  { value: "1", label: "微信" },
  { value: "2", label: "支付宝" },
  { value: "3", label: "数字货币" },
  { value: "4", label: "海外银行" },
  { value: "5", label: "中国银行" },
];
const initState = {
  single: {
    visible: false,
    value: "",
    dataSource: PAY_TYPE,
  },
  specDOM: {
    visible: false,
    value: "",
    dataSource: PAY_TYPE,
  },
};
const reducer = (state, action) => {
  const { type, key, value } = action;

  switch (type) {
    case "visible":
      return {
        ...state,
        [key]: {
          ...state[key],
          visible: !state[key].visible,
        },
      };
    case "value":
      return {
        ...state,
        [key]: {
          ...state[key],
          value,
        },
      };
  }
};

export default function Withdraw() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userIdCard = useSelector((state) => state.user?.data?.idCard);
  let userPassport = useSelector((state) => state.user?.data?.passport);
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
  const [transactionMethod, setTransactionMethod] = useState("微信");
  const [seconds, setSeconds] = useState(60);
  const [resend, setResend] = useState(false);

  const [state, dispatch] = useReducer(reducer, initState);
  const setVisible = (key) => {
    dispatch({ type: "visible", key });
  };
  const setValue = (key, value) => {
    dispatch({ type: "value", key, value });
  };

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(60);
      setResend(false);
    }
  });

  const getCode = async () => {
    if (walletData?.cva >= 100) {
      if (amount >= 100 && payPassword) {
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
        window.confirm("请输入提现数量，不小于CVA$100，且输入正确的交易密码。");
      }
    } else {
      window.confirm("金额不足，无法提现。");
    }
  };
  const debounceGetCode = _.throttle(getCode, 8000, {
    leading: true,
    trailing: false,
  });
  // handling sunmit
  const handleClick = async () => {
    if (payPassword) {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var formdata = new FormData();
        formdata.append("TransactionCoinType", coinType);
        formdata.append("Amount", amount);
        formdata.append("TransactionType", "WITHDRAW");
        formdata.append("VerifyCode", toVerifyCode);
        formdata.append("PayPassword", payPassword);
        formdata.append("TransactionMethod", transactionMethod);
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
      window.confirm("请输入支付密码");
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
    if (result.status == "Success") {
      if (window.confirm("操作成功。")) {
        history.push("/user");
      }
    }
  };

  const coinTypeSwitch = (type) => {
    switch (type) {
      case "cva":
        return `${walletData?.cva}`;
      // case "cvt":
      //   return `${walletData?.cvt}`;
      // case "abg":
      //   return `${walletData?.abg}`;
    }
  };

  return (
    <>
      <FuncHeader title={"提现"} goBack={() => history.push("/user")} />
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
                <Radio value="cva">扣减 CVA滴水池</Radio>
                {/*<Radio value="cvt">CVT提货通证</Radio>*/}
                {/*<Radio value="abg">ABG金豆</Radio>*/}
              </Radio.Group>
            }
          ></Cell>
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
                <Radio value="block">数字货币</Radio>
              </Radio.Group>
            }
          >
            货币类型
          </Cell>
          <Cell title="当前余额">{coinTypeSwitch(coinType)} CVA</Cell>
          <Cell title="提现数量">
            <Input
              type="number"
              value={amount}
              onChange={(value) => {
                setAmount(value);
              }}
              placeholder={"请输入提现数量"}
            />
          </Cell>
          <Cell title="手续费">(2% / 7天到账)</Cell>
          <Cell
            description={
              <Button size="xs" onClick={() => setVisible("single")}>
                {transactionMethod} (点击更换)
              </Button>
            }
          >
            收款方式
          </Cell>
          <Picker
            visible={state.single.visible}
            value={state.single.value}
            dataSource={state.single.dataSource}
            onOk={(selected) => {
              // console.log("您选择了", selected[0]?.label);
              Toast.show("您选择了" + selected[0]?.label);
              setTransactionMethod(selected[0]?.label);
              setValue(
                "single",
                selected.map((item) => item.value)
              );
              setVisible("single");
            }}
            onCancel={() => setVisible("single")}
          />
          {/*<Cell title="双击上传图片">*/}
          {/*  <div className="file-picker-wrapper" style={{ marginTop: "10px" }}>*/}
          {/*    {imgRender()}*/}
          {/*    {files.length < MAX_FILES_COUNT && (*/}
          {/*      <FilePicker*/}
          {/*        multiple*/}
          {/*        className="file-picker-btn"*/}
          {/*        accept="image/*"*/}
          {/*        onBeforeSelect={onBeforeSelect}*/}
          {/*        onChange={onSelect}*/}
          {/*      >*/}
          {/*        <Icon type="add" size="lg" />*/}
          {/*      </FilePicker>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*  <Input*/}
          {/*      type="text"*/}
          {/*      value={toUserName}*/}
          {/*      onChange={(value) => {*/}
          {/*        setToUserName(value);*/}
          {/*      }}*/}
          {/*      placeholder={"请输入对方用户名"}*/}
          {/*  />*/}
          {/*</Cell>*/}
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
              提交提现
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
