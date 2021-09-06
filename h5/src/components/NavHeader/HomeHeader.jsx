import React from "react";
import * as styles from "./navheader.module.scss";
import arrowLeftIcon from "../../assets/search/settings.png";
import { useHistory } from "react-router-dom";

export default function HomeHeader(props) {
  const history = useHistory();
  const { title } = props;
  // header for home
  return (
    <div className={styles["container"]}>
      <div className={styles["header-container-search"]}></div>
      <span className={styles["text"]}>{title}</span>
      <div
        className={styles["header-container-back"]}
        onClick={() =>
          window.location.replace("https://h5en.cvac.net.au/login")
        }
      >
        {/*<img src={arrowLeftIcon} alt="切换英文" />*/}
        <span className={styles["text"]}>English</span>
      </div>
    </div>
  );
}
