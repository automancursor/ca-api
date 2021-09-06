import React from "react";
import * as styles from "./funcheader.module.scss";

import arrowLeftIcon from "assets/search/arrow-left.png";

export default function Header(props) {
  const { title, goBack, goSearch } = props;
  // header for funs
  const toParentGoback = () => {
    goBack();
  };

  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-container-back"]} onClick={toParentGoback}>
        <img src={arrowLeftIcon} alt="返回上一页" />
      </div>
      <span className={styles["text"]}>{title}</span>
      <div className={styles["header-container-search"]}></div>
    </div>
  );
}
