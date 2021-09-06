import React from "react";
import * as styles from "./navheader.module.scss";
import searchIconPath from "assets/home/search.png";
import { useHistory } from "react-router-dom";

export default function THeader(props) {
  const { title } = props;
  const history = useHistory();
  // header for login
  return (
    <div style={{ zIndex: 100 }} className={styles["container"]}>
      <div className={styles["header-container-search"]}></div>
      <span className={styles["text"]}>{title}</span>
      <div className={styles["header-container-search"]}></div>
    </div>
  );
}
