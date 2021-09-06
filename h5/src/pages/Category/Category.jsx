import React from "react";
import { useHistory } from "react-router-dom";

import NavHeader from "components/NavHeader/NavHeader";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import * as styles from "../Star/star.module.scss";
import { useSelector } from "react-redux";
import smoothscroll from "./smoothscroll";
smoothscroll.polyfill();

// combian 2 sections
const CategoryPage = () => {
  return (
    <>
      <LeftPanel />
      <RightPanel />
    </>
  );
};

export default function Category() {
  const history = useHistory();

  const goLogin = () => {
    history.push("/login");
  };

  return (
    <div className={styles["wrapper"]}>
      <NavHeader title={"物联商城"} />
      <div style={{ marginBottom: "5rem" }}>{CategoryPage()}</div>
    </div>
  );
}
