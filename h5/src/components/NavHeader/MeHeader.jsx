import React from "react";
import * as styles from "./navheader.module.scss";
import arrowLeftIcon from "../../assets/search/settings.png";
import { useHistory } from "react-router-dom";

export default function MeHeader(props) {
  const history = useHistory();
  const { title } = props;
  // header for user
  return (
    <div className={styles["container"]}>
      <div className={styles["header-container-search"]}></div>
      <span className={styles["text"]}>{title}</span>
      <div
        className={styles["header-container-back"]}
        onClick={() => history.push("/settings")}
      >
        <img src={arrowLeftIcon} alt="返回上一页" />
      </div>
    </div>
  );
}
