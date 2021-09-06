import React, { useState, useEffect, useRef, useReducer } from "react";
import { useHistory } from "react-router-dom";
import FuncHeader from "components/FuncHeader/FuncHeader";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "store/actionCreators";
import { useForm } from "react-hook-form";
import { Request } from "utils/request/index";
import { REQUEST_METHOD, CONTENT_TYPE, BASE_URL } from "utils/request/config";
import { Tabs, Cell, Radio, Button, Picker, Input } from "zarm";
import "zarm/dist/zarm.css";
// hard code
const SINGLE_DATA = [
  { value: "+61", label: "澳大利亚" },
  { value: "+86", label: "中国大陆" },
  { value: "+852", label: "香港" },
  { value: "+853", label: "澳门" },
  { value: "+886", label: "台湾" },
  { value: "+213", label: "阿尔及利亚" },
  { value: "+33", label: "安道尔" },
  { value: "+244", label: "安哥拉" },
  { value: "+1", label: "安圭拉" },
  { value: "+1", label: "安提瓜和马布达" },
  { value: "+54", label: "阿根廷" },
  { value: "+247", label: "阿松森" },
  { value: "+43", label: "奥地利" },
  { value: "+1", label: "巴哈马" },
  { value: "+973", label: "巴林" },
  { value: "+880", label: "孟加拉" },
  { value: "+1", label: "巴巴多斯" },
  { value: "+32", label: "比利时" },
  { value: "+501", label: "伯利兹" },
  { value: "+229", label: "贝宁" },
  { value: "+1", label: "百慕大群岛" },
  { value: "+591", label: "玻利维亚" },
  { value: "+267", label: "博茨瓦纳" },
  { value: "+55", label: "巴西" },
  { value: "+673", label: "文莱" },
  { value: "+359", label: "保加利亚" },
  { value: "+226", label: "布基纳法索" },
  { value: "+95", label: "缅甸" },
  { value: "+257", label: "布隆迪" },
  { value: "+237", label: "咯麦隆" },
  { value: "+1", label: "加拿大" },
  { value: "+34", label: "加那利群岛" },
  { value: "+1", label: "开曼群岛" },
  { value: "+56", label: "智利" },
  { value: "+57", label: "哥伦比亚" },
  { value: "+242", label: "刚果" },
  { value: "+682", label: "科克群岛" },
  { value: "+506", label: "哥斯达黎加" },
  { value: "+53", label: "古巴" },
  { value: "+357", label: "塞浦路斯" },
  { value: "+42", label: "捷克斯洛伐克" },
  { value: "+45", label: "丹麦" },
  { value: "+253", label: "吉布提" },
  { value: "+1", label: "多米尼加共和国" },
  { value: "+593", label: "厄瓜多尔" },
  { value: "+20", label: "埃及" },
  { value: "+503", label: "萨尔瓦多" },
  { value: "+251", label: "埃塞俄比亚" },
  { value: "+679", label: "斐济" },
  { value: "+358", label: "芬兰" },
  { value: "+33", label: "法国" },
  { value: "+594", label: "法属圭亚那" },
  { value: "+241", label: "加蓬" },
  { value: "+220", label: "冈比亚" },
  { value: "+49", label: "德意志联邦共和国" },
  { value: "+350", label: "直布罗陀" },
  { value: "+30", label: "希腊" },
  { value: "+1", label: "格林纳达" },
  { value: "+671", label: "关岛" },
  { value: "+502", label: "危地马拉" },
  { value: "+592", label: "圭亚那" },
  { value: "+509", label: "海地" },
  { value: "+504", label: "洪都拉斯" },
  { value: "+36", label: "匈牙利" },
  { value: "+354", label: "冰岛" },
  { value: "+91", label: "印度" },
  { value: "+62", label: "印度尼西亚" },
  { value: "+98", label: "伊朗" },
  { value: "+964", label: "伊拉克" },
  { value: "+353", label: "爱尔兰" },
  { value: "+39", label: "意大利" },
  { value: "+225", label: "科特迪瓦" },
  { value: "+1", label: "牙买加" },
  { value: "+81", label: "日本" },
  { value: "+962", label: "约旦" },
  { value: "+254", label: "肯尼亚" },
  { value: "+965", label: "科威特" },
  { value: "+961", label: "黎巴嫩" },
  { value: "+266", label: "莱索托" },
  { value: "+231", label: "利比里亚" },
  { value: "+218", label: "利比亚" },
  { value: "+41", label: "列支敦士登" },
  { value: "+352", label: "卢森堡" },
  { value: "+261", label: "马达加斯加" },
  { value: "+265", label: "马拉维" },
  { value: "+60", label: "马来西亚" },
  { value: "+960", label: "马尔代夫" },
  { value: "+223", label: "马里" },
  { value: "+356", label: "马耳他" },
  { value: "+670", label: "马里亚那群岛" },
  { value: "+596", label: "马提尼克" },
  { value: "+230", label: "毛里求斯" },
  { value: "+52", label: "墨西哥" },
  { value: "+33", label: "摩纳哥" },
  { value: "+1", label: "蒙特塞拉特岛" },
  { value: "+212", label: "摩洛哥" },
  { value: "+258", label: "莫桑比克" },
  { value: "+674", label: "瑙鲁" },
  { value: "+977", label: "尼泊尔" },
  { value: "+31", label: "荷兰" },
  { value: "+599", label: "荷属安的列斯" },
  { value: "+587", label: "新喀里多尼亚群岛" },
  { value: "+64", label: "新西兰" },
  { value: "+505", label: "尼加拉瓜" },
  { value: "+227", label: "尼日尔" },
  { value: "+234", label: "尼日利亚" },
  { value: "+47", label: "挪威" },
  { value: "+968", label: "阿曼" },
  { value: "+92", label: "巴基斯坦" },
  { value: "+507", label: "巴拿马" },
  { value: "+675", label: "巴布亚新几内亚" },
  { value: "+595", label: "巴拉圭" },
  { value: "+51", label: "秘鲁" },
  { value: "+63", label: "菲律宾" },
  { value: "+48", label: "波兰" },
  { value: "+689", label: "波利尼西亚" },
  { value: "+351", label: "葡萄牙" },
  { value: "+1", label: "波多黎各" },
  { value: "+974", label: "卡塔尔" },
  { value: "+262", label: "留尼旺" },
  { value: "+40", label: "罗马尼亚" },
  { value: "+684", label: "东萨摩亚（美）" },
  { value: "+685", label: "西萨摩亚" },
  { value: "+39", label: "圣马力诺" },
  { value: "+239", label: "圣多美和普林西比" },
  { value: "+966", label: "沙特阿拉伯" },
  { value: "+221", label: "塞内加尔" },
  { value: "+248", label: "塞舌尔" },
  { value: "+232", label: "塞拉利昂" },
  { value: "+65", label: "新加坡" },
  { value: "+677", label: "所罗门群岛" },
  { value: "+252", label: "索马里" },
  { value: "+34", label: "西班牙" },
  { value: "+94", label: "斯里兰卡" },
  { value: "+1", label: "圣克里斯托弗和尼维斯岛" },
  { value: "+1", label: "圣卢西亚" },
  { value: "+1", label: "圣文森特" },
  { value: "+249", label: "苏丹" },
  { value: "+597", label: "苏里南" },
  { value: "+268", label: "斯威士兰" },
  { value: "+46", label: "瑞典" },
  { value: "+41", label: "瑞士" },
  { value: "+963", label: "叙利亚" },
  { value: "+255", label: "坦桑尼亚" },
  { value: "+66", label: "泰国" },
  { value: "+228", label: "多哥" },
  { value: "+676", label: "汤加" },
  { value: "+1", label: "特立尼达和多巴哥" },
  { value: "+216", label: "突尼斯" },
  { value: "+90", label: "土耳其" },
  { value: "+256", label: "乌干达" },
  { value: "+971", label: "阿拉伯联合酋长国" },
  { value: "+44", label: "英国" },
  { value: "+1", label: "美国" },
  { value: "+598", label: "乌拉圭" },
  { value: "+7", label: "俄罗斯（莫斯科）" },
  { value: "+58", label: "委内瑞拉" },
  { value: "+84", label: "越南" },
  { value: "+1", label: "维尔京群岛（英）" },
  { value: "+1", label: "维尔京群岛（美）" },
  { value: "+967", label: "阿拉伯也门共和国" },
  { value: "+969", label: "也门民主人民共和国" },
  { value: "+38", label: "南斯拉夫" },
  { value: "+260", label: "赞比亚" },
  { value: "+263", label: "津巴布韦" },
];

const initState = {
  single: {
    visible: false,
    value: "+61",
    label: "澳大利亚",
    dataSource: SINGLE_DATA,
  },
};

const reducer = (state, action) => {
  const { type, key, visible, value, label, dataSource } = action;

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

    case "label":
      return {
        ...state,
        [key]: {
          ...state[key],
          label,
        },
      };

    case "dataSource":
      return {
        ...state,
        [key]: {
          ...state[key],
          dataSource,
        },
      };
  }
};

export default function Validation(props) {
  const [userProfile, setUser] = useState();
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  const [seconds, setSeconds] = useState(60);
  const [resend, setResend] = useState(false);

  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const userProfileFetch = async () => {
    let request = new Request();
    try {
      let response = await request.fetchData("/UserProfile/" + userId, {
        method: REQUEST_METHOD.GET,
        contentType: CONTENT_TYPE.JSON,
        token,
        body: {},
      });
      dispatch(actionCreators.userProfile(response.data));
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthed) {
      userProfileFetch();
    }
  }, [isAuthed]);

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(60);
      setResend(false);
    }
  });

  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+61");
  const [country, setCountry] = useState("澳大利亚");
  const [phone, setPhone] = useState("");
  const [validationCode, setValidationCode] = useState("");
  const [toVerifyCode, setVerifyCode] = useState("");
  const [verifyType, setVerifyType] = useState("email");

  const [state, dispatchVisible] = useReducer(reducer, initState);
  const setVisible = (key) => {
    dispatchVisible({ type: "visible", key });
  };
  const setValue = (key, value) => {
    dispatchVisible({ type: "value", key, value });
  };
  const setLabel = (key, label) => {
    dispatchVisible({ type: "label", key, label });
  };

  const setDataSource = (key, value) => {
    dispatchVisible({ type: "dataSource", key, dataSource: value });
  };
  useEffect(() => {
    // 异步加载数据源测试
    setTimeout(() => {
      setValue("diy", ["1", "12"]);
    }, 0);
  }, []);

  const goLogin = () => {
    history.push("/login");
  };
  const goUser = () => {
    history.push("/user");
  };

  const sendSMS = () => {
    let request = new Request();
    try {
      let response = request.fetchData("/UserProfile/sms_code", {
        method: REQUEST_METHOD.POST,
        contentType: CONTENT_TYPE.JSON,
        token: token,
        body: {
          Mobile: countryCode + phone,
        },
      });
      window.confirm("验证码已发送到手机。");
      setResend(true);
    } catch (error) {
      window.confirm(
        "输入有误，请检查手机格式是否正确。注意，澳洲手机号不需要输入0。"
      );
    }
  };
  // verify
  const verifySMS = () => {
    let request = new Request();
    try {
      let response = request.fetchData("/UserProfile/mobileVerify", {
        method: REQUEST_METHOD.POST,
        contentType: CONTENT_TYPE.JSON,
        token: token,
        body: {
          VerifyCode: validationCode,
        },
      });
      updateUser();
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
          Email: email,
        },
      });
      window.confirm("验证码已发送到邮箱。");
      setResend(true);
    } catch (error) {
      window.confirm("输入有误，请检查email格式是否正确。");
    }
  };
  const verifyEmail = () => {
    let request = new Request();
    try {
      let response = request.fetchData("/UserProfile/emailVerify", {
        method: REQUEST_METHOD.POST,
        contentType: CONTENT_TYPE.JSON,
        token: token,
        body: {
          VerifyCode: validationCode,
        },
      });
      updateUser();
    } catch (error) {
      window.confirm("未知错误");
    }
  };
  // update user request
  const updateUser = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      UserName: userProfile?.username,
      Email: email,
      PhoneNumber: phone,
      CountryCode: country,
      BankDetailCN: "",
      OverSeaBankDetail: "",
      AliPay: "",
      Wechat: "",
      BlockChainWalletAddress: "",
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(BASE_URL + "/UserProfile", requestOptions)
      .then((response) => response.text())
      .then((result) => history.push("/user"))
      .catch((error) => console.log("error", error));
  };

  const getCode = () => {
    if (email || phone) {
      if (verifyType === "email") {
        sendEmail();
      } else {
        sendSMS();
      }
    } else {
      window.confirm("请输入邮箱或手机。");
    }
  };

  const handleClick = () => {
    if (toVerifyCode) {
      if (email) {
        verifyEmail();
      } else {
        verifySMS();
      }
    } else {
      window.confirm("请输入验证码。");
    }
  };

  return (
    <>
      <FuncHeader title={"安全验证"} goBack={goLogin} />
      <div style={{ marginTop: "60px" }}>
        <div>
          <Cell title="电子邮箱">
            <Input
              type="text"
              value={email}
              onChange={(value) => {
                setEmail(value);
              }}
              placeholder={"请输入电子邮箱"}
            />
          </Cell>
          <Cell
            description={
              <Button size="xs" onClick={() => setVisible("single")}>
                选择国家区号
              </Button>
            }
            style={{ backgroundColor: "#fafafa", paddingLeft: "0" }}
          >
            {state.single.value + " " + state.single.label}
          </Cell>

          <Picker
            visible={state.single.visible}
            value={state.single.value}
            label={state.single.label}
            dataSource={state.single.dataSource}
            onOk={(selected) => {
              setCountryCode(selected[0]?.value);
              setCountry(selected[0]?.label);
              setValue(
                "single",
                selected.map((item) => item.value)
              );
              setLabel(
                "single",
                selected.map((item) => item.label)
              );
              setVisible("single");
            }}
            onCancel={() => setVisible("single")}
          />
          <Cell title="电话">
            <Input
              type="text"
              value={phone}
              onChange={(value) => {
                setPhone(value);
              }}
              placeholder={"请输入电话"}
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
              onClick={() => getCode()}
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
          <Button
            block
            theme="primary"
            style={{ marginTop: "20px" }}
            onClick={() => handleClick()}
          >
            确认
          </Button>
        </div>
      </div>
    </>
  );
}
