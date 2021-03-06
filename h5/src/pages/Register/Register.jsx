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
        window.confirm("?????????????????????????????????????????????");
        goValidation();
      } catch (error) {
        // check password
        if (error.message === "User already exists!") {
          window.confirm("?????????????????????");
        } else if (
          error.message ==
          '[{"Code":"PasswordRequiresNonAlphanumeric","Description":"Passwords must have at least one non alphanumeric character."},{"Code":"PasswordRequiresLower","Description":"Passwords must have at least one lowercase (\'a\'-\'z\')."}]'
        ) {
          window.confirm(
            "??????????????????????????????6-16????????????????????????????????????????????????????????????"
          );
        } else if (
          error.message ==
          '[{"Code":"PasswordRequiresNonAlphanumeric","Description":"Passwords must have at least one non alphanumeric character."},{"Code":"PasswordRequiresLower","Description":"Passwords must have at least one lowercase (\'a\'-\'z\')."},{"Code":"PasswordRequiresUpper","Description":"Passwords must have at least one uppercase (\'A\'-\'Z\')."}]'
        ) {
          window.confirm(
            "??????????????????????????????6-16????????????????????????????????????????????????????????????"
          );
        } else {
          window.confirm("????????????????????????????????????");
        }
      }
    } else {
      window.confirm("????????????????????????");
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <FuncHeader title={"???????????????"} goBack={() => history.push("/login")} />
      <div>
        <Cell title="?????????">
          <Input
            type="text"
            value={account}
            onChange={(value) => {
              setAccount(value);
            }}
            placeholder={"??????????????????"}
          />
        </Cell>
        <Cell title="????????????">
          <Input
            type="password"
            value={pwd}
            onChange={(value) => {
              setPwd(value);
            }}
            placeholder={"?????????????????????"}
          />
        </Cell>
        <Cell>
          <p>??????????????????6-12??????????????????????????????????????????????????????????????????</p>
        </Cell>
        <Cell title="?????????">
          <Input
            type="text"
            value={referC ? referC : referCode}
            onChange={(value) => {
              setReferCode(value);
            }}
            placeholder={"??????????????????"}
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
        <Vcode
          length={4}
          onChange={(v) => setVcode(v)}
          options={{
            codes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
          }}
          style={{ marginBottom: "20px" }}
        />
        <Cell title="?????????">
          <Input
            type="text"
            value={inputVcode}
            onChange={(value) => {
              setInputVcode(value);
            }}
            placeholder={"??????????????????"}
          />
        </Cell>
        <Cell>
          <Button
            block
            theme="primary"
            style={{ marginTop: "20px" }}
            onClick={() => handleClick()}
          >
            ?????????
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
        {/*    placeholder="?????????"*/}
        {/*    ref={register({ required: true })}*/}
        {/*  />*/}
        {/*  {errors.username?.type === "required" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>*/}
        {/*      ??????????????????*/}
        {/*    </span>*/}
        {/*  )}*/}

        {/*  <input*/}
        {/*    id="password"*/}
        {/*    name="password"*/}
        {/*    defaultValue={pwd}*/}
        {/*    onChange={(e) => setPwd(e.currentTarget.value)}*/}
        {/*    placeholder="????????????"*/}
        {/*    ref={register({*/}
        {/*      required: true,*/}
        {/*      pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,*/}
        {/*    })}*/}
        {/*  />*/}
        {/*  {errors.password?.type === "required" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>???????????????</span>*/}
        {/*  )}*/}
        {/*  {errors.password?.type === "pattern" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>*/}
        {/*      ???????????????6-16?????????????????????????????????????????????????????????*/}
        {/*    </span>*/}
        {/*  )}*/}

        {/*  <input*/}
        {/*    id="referCode"*/}
        {/*    name="referCode"*/}
        {/*    defaultValue={referC}*/}
        {/*    onChange={(e) => setReferCode(e.currentTarget.value)}*/}
        {/*    placeholder="?????????"*/}
        {/*    ref={register({ required: true })}*/}
        {/*  />*/}
        {/*  {errors.referCode?.type === "required" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>*/}
        {/*      ??????????????????*/}
        {/*    </span>*/}
        {/*  )}*/}

        {/*  <input*/}
        {/*    id="payPassword"*/}
        {/*    name="payPassword"*/}
        {/*    defaultValue={payPassword}*/}
        {/*    onChange={(e) => setPayPassword(e.currentTarget.value)}*/}
        {/*    placeholder="????????????"*/}
        {/*    ref={register({*/}
        {/*      required: true,*/}
        {/*      pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,*/}
        {/*    })}*/}
        {/*  />*/}
        {/*  {errors.password?.type === "required" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>???????????????</span>*/}
        {/*  )}*/}
        {/*  {errors.password?.type === "pattern" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>*/}
        {/*      ???????????????6-16?????????????????????????????????????????????????????????*/}
        {/*    </span>*/}
        {/*  )}*/}
        {/*  <input*/}
        {/*    name="vcode"*/}
        {/*    onChange={(e) => setInputVcode(e.currentTarget.value)}*/}
        {/*    placeholder="?????????"*/}
        {/*  />*/}
        {/*  {errors.vcode?.type === "required" && (*/}
        {/*    <span style={{ marginTop: "-10px", color: "red" }}>*/}
        {/*      ??????????????????*/}
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
        {/*    value="?????????"*/}
        {/*  />*/}
        {/*</form>*/}
      </div>
    </div>
  );
}
