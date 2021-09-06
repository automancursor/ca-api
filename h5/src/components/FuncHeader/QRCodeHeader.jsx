import React from "react";
import * as styles from "./funcheader.module.scss";

import arrowLeftIcon from "assets/search/arrow-left.png";
import copyIcon from "assets/search/copy.png";

export default function QRCodeHeader(props) {
  const { title, goBack, copyFunc } = props;

  const toParentGoback = () => {
    goBack();
  };

  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-container-back"]} onClick={toParentGoback}>
        <img src={arrowLeftIcon} alt="返回上一页" />
      </div>
      <span className={styles["text"]}>{title}</span>
      <div className={styles["header-container-back"]} onClick={copyFunc}>
        <img src={copyIcon} alt="复制" />
      </div>
    </div>
  );
}
