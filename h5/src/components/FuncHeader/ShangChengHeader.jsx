import React from "react";
import * as styles from "./funcheader.module.scss";

import arrowLeftIcon from "assets/search/arrow-left.png";
import { useHistory } from "react-router-dom";

export default function ShangChengHeader(props) {
  const history = useHistory();
  const { title, goBack, goSearch } = props;

  const toParentGoback = () => {
    goBack();
  };

  return (
    <div className={styles["header-container"]}>
      <div className={styles["header-container-back"]} onClick={toParentGoback}>
        <img src={arrowLeftIcon} alt="返回上一页" />
      </div>
      <span className={styles["text"]}>{title}</span>
      <div
        className={styles["header-container-back"]}
        onClick={() => history.push("/shangchengadd")}
      >
        {/*<img src={arrowLeftIcon} alt="添加产品"/>*/}
        <span className={styles["text"]} style={{ color: "blue" }}>
          添加产品&emsp;&emsp;
        </span>
      </div>
    </div>
  );
}
