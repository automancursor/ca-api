import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import FuncHeader from "components/FuncHeader/FuncHeader";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "store/actionCreators";
import { useForm } from "react-hook-form";
import { Request } from "utils/request/index";
import { REQUEST_METHOD, CONTENT_TYPE } from "utils/request/config";
import * as styles from "./register.module.scss";
import * as QueryString from "query-string";
import Vcode from "react-vcode";
import { Tabs, Cell, Radio, Button, Picker, Input } from "zarm";
import "zarm/dist/zarm.css";

let referC = null;

export default function Register(props) {
  const [account, setAccount] = useState("");
  const [pwd, setPwd] = useState("");
  const [referCode, setReferCode] = useState("");
  const [payPassword, setPayPassword] = useState("");
  const [vcode, setVcode] = useState(null);
  const [inputVcode, setInputVcode] = useState(null);

  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();
  //get code from url, invite code
  referC = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }).referC;

  const goValidation = () => {
    history.push("/validation");
  };

  const referCodeS = () => {
    if (referCode) {
      return referCode;
    } else {
      return referC;
    }
  };
  // handling registriong
  const handleClick = async () => {
    if (inputVcode === vcode) {
      let request = new Request();
      try {
        let response = await request.fetchData("/authenticate/register", {
          method: REQUEST_METHOD.POST,
          contentType: CONTENT_TYPE.JSON,
          body: {
            username: account,
            password: pwd,
            ReferCode: referCodeS(),
            PayPassword: payPassword,
          },
        });
        dispatch(actionCreators.register());
        let responseLogin = await request.fetchData("/authenticate/login", {
          method: REQUEST_METHOD.POST,
          contentType: CONTENT_TYPE.JSON,
          body: {
            username: account,
            password: pwd,
          },
        });
        dispatch(
          actionCreators.login(responseLogin.token, responseLogin.userId)
        );
        window.confirm("注册成功，请验证手机或者邮箱。");
        goValidation();
      } catch (error) {
        // check password
        if (error.message === "User already exists!") {
          window.confirm("用户名已占用。");
        } else if (
          error.message ==
          '[{"Code":"PasswordRequiresNonAlphanumeric","Description":"Passwords must have at least one non alphanumeric character."},{"Code":"PasswordRequiresLower","Description":"Passwords must have at least one lowercase (\'a\'-\'z\')."}]'
        ) {
          window.confirm(
            "密码过于简单，请输入6-16位，且包含大写，小写，数字以及特殊字符。"
          );
        } else if (
          error.message ==
          '[{"Code":"PasswordRequiresNonAlphanumeric","Description":"Passwords must have at least one non alphanumeric character."},{"Code":"PasswordRequiresLower","Description":"Passwords must have at least one lowercase (\'a\'-\'z\')."},{"Code":"PasswordRequiresUpper","Description":"Passwords must have at least one uppercase (\'A\'-\'Z\')."}]'
        ) {
          window.confirm(
            "密码过于简单，请输入6-16位，且包含大写，小写，数字以及特殊字符。"
          );
        } else {
          window.confirm("未知错误，请联系管理员。");
        }
      }
    } else {
      window.confirm("验证码输入有误。");
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <FuncHeader title={"新用户注册"} goBack={() => history.push("/login")} />
      <div>
        <Cell title="用户名">
          <Input
            type="text"
            value={account}
            onChange={(value) => {
              setAccount(value);
            }}
            placeholder={"请输入用户名"}
          />
        </Cell>
        <Cell title="登陆密码">
          <Input
            type="password"
            value={pwd}
            onChange={(value) => {
              setPwd(value);
            }}
            placeholder={"请输入登陆密码"}
          />
        </Cell>
        <Cell>
          <p>密码要求长度6-12位，并包含大写，小写字母，数字以及特殊字符。</p>
        </Cell>
        <Cell title="邀请码">
          <Input
            type="text"
            value={referC ? referC : referCode}
            onChange={(value) => {
              setReferCode(value);
            }}
            placeholder={"请输入邀请码"}
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
        <Vcode
          length={4}
          onChange={(v) => setVcode(v)}
          options={{
            codes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
          }}
          style={{ marginBottom: "20px" }}
        />
        <Cell title="验证码">
          <Input
            type="text"
            value={inputVcode}
            onChange={(value) => {
              setInputVcode(value);
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
            下一步
          </Button>
        </Cell>
        {/*<form*/}
        {/*  className={styles["login-form"]}*/}
        {/*  onSubmit={handleSubmit(handleClick)}*/}
        {/*>*/}
        {/*  <input*/}
        {/*    id="account"*/}
        {/*    name="username"*/}
        {/*    defaultValue={account}*/}
        {/*    onChange={(e) => setAccount(e.currentTarget.value)}*/}
        {/*    placeholder="用户名"*/}
        {/*    ref={register({ required: true })}*/}
        {/*  />*/}
        {/*  {errors.username?.type === "required" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>*/}
        {/*      请输入用户名*/}
        {/*    </span>*/}
        {/*  )}*/}

        {/*  <input*/}
        {/*    id="password"*/}
        {/*    name="password"*/}
        {/*    defaultValue={pwd}*/}
        {/*    onChange={(e) => setPwd(e.currentTarget.value)}*/}
        {/*    placeholder="登陆密码"*/}
        {/*    ref={register({*/}
        {/*      required: true,*/}
        {/*      pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,*/}
        {/*    })}*/}
        {/*  />*/}
        {/*  {errors.password?.type === "required" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>请输入密码</span>*/}
        {/*  )}*/}
        {/*  {errors.password?.type === "pattern" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>*/}
        {/*      密码格式为6-16位，必须包含数字，特殊字符，大小写字母*/}
        {/*    </span>*/}
        {/*  )}*/}

        {/*  <input*/}
        {/*    id="referCode"*/}
        {/*    name="referCode"*/}
        {/*    defaultValue={referC}*/}
        {/*    onChange={(e) => setReferCode(e.currentTarget.value)}*/}
        {/*    placeholder="邀请码"*/}
        {/*    ref={register({ required: true })}*/}
        {/*  />*/}
        {/*  {errors.referCode?.type === "required" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>*/}
        {/*      请输入邀请码*/}
        {/*    </span>*/}
        {/*  )}*/}

        {/*  <input*/}
        {/*    id="payPassword"*/}
        {/*    name="payPassword"*/}
        {/*    defaultValue={payPassword}*/}
        {/*    onChange={(e) => setPayPassword(e.currentTarget.value)}*/}
        {/*    placeholder="支付密码"*/}
        {/*    ref={register({*/}
        {/*      required: true,*/}
        {/*      pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,*/}
        {/*    })}*/}
        {/*  />*/}
        {/*  {errors.password?.type === "required" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>请输入密码</span>*/}
        {/*  )}*/}
        {/*  {errors.password?.type === "pattern" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>*/}
        {/*      密码格式为6-16位，必须包含数字，特殊字符，大小写字母*/}
        {/*    </span>*/}
        {/*  )}*/}
        {/*  <input*/}
        {/*    name="vcode"*/}
        {/*    onChange={(e) => setInputVcode(e.currentTarget.value)}*/}
        {/*    placeholder="验证码"*/}
        {/*  />*/}
        {/*  {errors.vcode?.type === "required" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>*/}
        {/*      请输入验证码*/}
        {/*    </span>*/}
        {/*  )}*/}
        {/*  <Vcode*/}
        {/*    length={4}*/}
        {/*    onChange={(v) => setVcode(v)}*/}
        {/*    options={{*/}
        {/*      codes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],*/}
        {/*    }}*/}
        {/*    style={{ marginBottom: "20px" }}*/}
        {/*  />*/}
        {/*  <input*/}
        {/*    type="submit"*/}
        {/*    className={styles["login-form-btn"]}*/}
        {/*    value="下一步"*/}
        {/*  />*/}
        {/*</form>*/}
      </div>
    </div>
  );
}
