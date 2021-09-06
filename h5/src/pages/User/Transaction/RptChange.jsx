import React, { useState, useRef, useReducer, useEffect } from "react";
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

const MAX_FILES_COUNT = 1;

const PAY_TYPE = [
  { value: "1", label: "微信" },
  { value: "2", label: "支付宝" },
  { value: "3", label: "现金" },
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

  // types seitcher
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
const renderAccount = (type) => {
  switch (type) {
    case "cva":
      return (
        <Cell title="CVA">
          <Input readOnly type="text" rows={3} value="CVA滴水池" />
        </Cell>
      );
    case "cvt":
      return (
        <Cell title="CVT">
          <Input readOnly type="text" rows={3} value="CVT提货通证" />
        </Cell>
      );
  }
};

export default function RptChange() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userEmail = useSelector((state) => state.user?.data?.email);
  let userMobile = useSelector((state) => state.user?.data?.phoneNumber);
  let walletData = useSelector((state) => state.user?.data?.wallet);
  const history = useHistory();
  const [coinType, setCoinType] = useState("cva");
  const [payPassword, setPayPassword] = useState("");
  const [amount, setAmount] = useState("");
  const [files, setFiles] = useState([]);
  const [transactionMethod, setTransactionMethod] = useState("cva");
  const [verifyType, setVerifyType] = useState("email");
  const [seconds, setSeconds] = useState(60);
  const [resend, setResend] = useState(false);
  const [toVerifyCode, setVerifyCode] = useState("");

  const myRef = useRef();
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

  const sucessConfirm = (result) => {
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
  const getCode = async () => {
    if (amount > 0 && payPassword) {
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

  // hanlding submit

  const handleClick = async () => {
    if (toVerifyCode) {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var formdata = new FormData();
        formdata.append("TransactionCoinType", coinType);
        formdata.append("Amount", amount);
        formdata.append("TransactionType", "RPTCONVERSION");
        formdata.append("PayPassword", payPassword);
        formdata.append("VerifyCode", toVerifyCode);
        // formdata.append("TransactionMethod", transactionMethod);
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
      window.confirm("请双击上传凭证。");
    }
  };
  const debounceHandleClick = _.throttle(handleClick, 8000, {
    leading: true,
    trailing: false,
  });

  const coinTypeSwitch = (type) => {
    switch (type) {
      case "rpt":
        return `$ ${walletData?.rpt}`;
      // case "cvt":
      //   return `${walletData?.cvt}`;
      // case "abg":
      //   return `${walletData?.abg}`;
    }
  };
  const debounceGetCode = _.throttle(getCode, 8000, {
    leading: true,
    trailing: false,
  });

  return (
    <>
      <FuncHeader title={"积分转换"} goBack={() => history.push("/user")} />
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
              <Radio value="cva">RPT转CVA(5 RPT 换 1 CVA)</Radio>
              <Radio value="cvt">RPT转CVT(1 RPT 换 100 CVT)</Radio>
              {/*<Radio value="abg">ABG金豆</Radio>*/}
            </Radio.Group>
          }
        ></Cell>
        <Cell title="当前余额">{`$ ${walletData?.rpt}`}</Cell>
        <Cell title="转换数量">
          <Input
            type="number"
            value={amount}
            onChange={(value) => {
              setAmount(value);
            }}
            placeholder={"请输入转换数量"}
          />
        </Cell>
        {/*<Cell*/}
        {/*  description={*/}
        {/*    <Button size="xs" onClick={() => setVisible("single")}>*/}
        {/*      请点击选择*/}
        {/*    </Button>*/}
        {/*  }*/}
        {/*>*/}
        {/*  转换货币*/}
        {/*</Cell>*/}
        {/*<Picker*/}
        {/*  visible={state.single.visible}*/}
        {/*  value={state.single.value}*/}
        {/*  dataSource={state.single.dataSource}*/}
        {/*  onOk={(selected) => {*/}
        {/*    Toast.show("您选择了" + selected[0]?.label);*/}
        {/*    setTransactionMethod(selected[0]?.label);*/}
        {/*    setValue(*/}
        {/*      "single",*/}
        {/*      selected.map((item) => item.value)*/}
        {/*    );*/}
        {/*    setVisible("single");*/}
        {/*  }}*/}
        {/*  onCancel={() => setVisible("single")}*/}
        {/*/>*/}
        {/*{renderAccount(transactionMethod)}*/}
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
            提交充值
          </Button>
        </Cell>
      </div>
    </>
  );
}
