import React from "react";
import { useHistory } from "react-router-dom";

import NavHeader from "components/NavHeader/NavHeader";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightJiFenPanel from "./RightJiFenPanel/RightJiFenPanel";
import * as styles from "../Star/star.module.scss";
import { useSelector } from "react-redux";
import smoothscroll from "./smoothscroll";
import FuncHeader from "../../components/FuncHeader/FuncHeader";
smoothscroll.polyfill();

const CategoryPage = () => {
  return (
      <>
        <LeftPanel />
        <RightJiFenPanel />
      </>
  );
};

export default function JiFenQu() {
  const history = useHistory();

  const goLogin = () => {
    history.push("/login");
  };

  return (
      <div className={styles["wrapper"]}>
        {/*<NavHeader title={"积分商城"} />*/}
        <FuncHeader title={"积分商城"} goBack={() => history.push("/user")} />
        <div style={{ marginBottom: "5rem" }}>{CategoryPage()}</div>
      </div>
  );
}
