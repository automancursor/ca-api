import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FuncHeader from "components/FuncHeader/FuncHeader";
import * as styles from "./settings.module.scss";
import * as actionCreators from "../../store/actionCreators";
import { useDispatch, useSelector } from "react-redux";

const SettingsList = (props) => {
  const { goUserProfile, goLogout } = props;
  const history = useHistory();
  // list settings menu
  return (
    <div className={styles["set_up"]}>
      <ul className={styles["mui-table-view"]}>
        <li
          className={styles["mui-table-view-cell"]}
          onClick={() => history.push("/profile")}
        >
          <a className={styles["mui-navigate-right"]}>个人信息</a>
        </li>
        <li
          className={styles["mui-table-view-cell"]}
          onClick={() => history.push("/verification")}
        >
          <a className={styles["mui-navigate-right"]}>实名认证</a>
        </li>
        <li
          className={styles["mui-table-view-cell"]}
          onClick={() => history.push("/changePassword")}
        >
          <a className={styles["mui-navigate-right"]}>修改登陆密码</a>
        </li>
        <li
          className={styles["mui-table-view-cell"]}
          onClick={() => history.push("/changePayPassword")}
        >
          <a className={styles["mui-navigate-right"]}>修改交易密码</a>
        </li>
        <li
          className={styles["mui-table-view-cell"]}
          onClick={() => history.push("/paymentMethod")}
        >
          <a className={styles["mui-navigate-right"]}>收款方式</a>
        </li>
        <li
          className={styles["mui-table-view-cell"]}
          onClick={() => history.push("/address")}
        >
          <a className={styles["mui-navigate-right"]}>收货地址</a>
        </li>
        <li className={styles["mui-table-view-cell"]}>
          <a className={styles["mui-navigate-right"]} onClick={goLogout}>
            登出系统
          </a>
        </li>
      </ul>
    </div>
  );
};

export default function Settings(props) {
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);

  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const goUserProfile = () => {};

  const goLogout = () => {
    dispatch(actionCreators.logout(token, userId));
    history.push("/user");
  };

  return (
    <div className={styles["wrapper"]}>
      <FuncHeader title={"设置"} goBack={() => history.push("/user")} />
      {isAuthed ? (
        <SettingsList goUserProfile={goUserProfile} goLogout={goLogout} />
      ) : null}
    </div>
  );
}
