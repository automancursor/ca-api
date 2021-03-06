import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import THeader from "components/NavHeader/THeader";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "store/actionCreators";
import { useForm } from "react-hook-form";
import { Request } from "utils/request/index";
import { REQUEST_METHOD, CONTENT_TYPE } from "utils/request/config";
import * as styles from "./login.module.scss";
import miIcon from "assets/login/mi.png";
import eyeIcon from "assets/login/eye.svg";
import eyeHideIcon from "assets/login/eye-hide.svg";
import Vcode from "react-vcode";

export default function Login(props) {
  const [isPasswordHidden, setHide] = useState();
  const [account, setAccount] = useState("");
  const [pwd, setPwd] = useState("");
  const [vcode, setVcode] = useState(null);
  const [inputVcode, setInputVcode] = useState(null);

  let token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();

  const goMe = () => {
    history.push("/user");
  };

  const goRegister = () => {
    history.push("/register");
  };

  const goForgot = () => {
    history.push("/forgotPassword");
  };

  const shiftPwdVisibility = () => {
    let reverse = !isPasswordHidden;
    setHide(reverse);
    const inputEl = document.querySelector("input#password");
    if (isPasswordHidden) {
      inputEl.setAttribute("type", "password");
    } else {
      inputEl.setAttribute("type", "text");
    }
  };

  const handleClick = async () => {
    if (inputVcode === vcode) {
      let request = new Request();
      try {
        let response = await request.fetchData("/authenticate/login", {
          method: REQUEST_METHOD.POST,
          contentType: CONTENT_TYPE.JSON,
          token,
          body: {
            username: account,
            password: pwd,
          },
        });
        dispatch(actionCreators.login(response.token, response.userId));
        goMe();
      } catch (error) {
        window.confirm("?????????????????????????????????????????????");
        // console.log(error);
      }
    } else {
      window.confirm("????????????????????????");
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <THeader title={"??????"} />
      <div className={styles["header-container"]}>
        <img src={miIcon} alt="CVA" />
      </div>
      <div>
        <form
          className={styles["login-form"]}
          onSubmit={handleSubmit(handleClick)}
        >
          <input
            id="account"
            name="username"
            defaultValue={account}
            onChange={(e) => setAccount(e.currentTarget.value)}
            placeholder="?????????"
            ref={register({ required: true })}
          />
          {errors.username?.type === "required" && (
            <span style={{ marginTop: "-10px", color: "red" }}>
              ??????????????????
            </span>
          )}
          <input
            id="password"
            name="password"
            type="password"
            defaultValue={pwd}
            onChange={(e) => setPwd(e.currentTarget.value)}
            placeholder="????????????"
            ref={register({
              required: true,
              // pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
            })}
          />
          {errors.password?.type === "required" && (
            <span style={{ marginTop: "-10px", color: "red" }}>???????????????</span>
          )}
          {errors.password?.type === "pattern" && (
            <span style={{ marginTop: "-10px", color: "red" }}>
              ???????????????6-16?????????????????????????????????????????????????????????
            </span>
          )}
          <img
            className={styles["icon-eye"]}
            src={isPasswordHidden ? eyeIcon : eyeHideIcon}
            alt=""
            onClick={shiftPwdVisibility}
          />
          <br />
          <input
            id="vcode"
            name="vcode"
            defaultValue={inputVcode}
            onChange={(e) => setInputVcode(e.currentTarget.value)}
            placeholder="?????????"
            ref={register({ required: true })}
          />
          <Vcode
            length={4}
            onChange={(v) => setVcode(v)}
            options={{
              codes: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
            }}
            style={{ marginBottom: "20px" }}
          />
          <input
            type="submit"
            className={styles["login-form-btn"]}
            value="??????"
          />
        </form>
      </div>
      <a className={styles["register-btn"]} onClick={goRegister}>
        ???????????????
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a className={styles["register-btn"]} onClick={goForgot}>
        ????????????
      </a>
      <br />
      <br />
      <a
        className={styles["register-btn"]}
        onClick={() =>
          window.location.replace("https://h5en.cvac.net.au/login")
        }
      >
        Switch to English
      </a>
    </div>
  );
}
