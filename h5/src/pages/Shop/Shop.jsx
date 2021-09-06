import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import NavHeader from "components/NavHeader/NavHeader";

import * as styles from "./shop.module.scss";
import cartIcon from "assets/cart/cart.png";
import { Carousel, Tabs, Cell, Radio, Button, Picker, Input } from "zarm";

export default function Shop() {
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);

  return (
    <div className={styles["wrapper"]}>
      <NavHeader title="商城" />
      <div style={{ marginTop: "0px" }}></div>
    </div>
  );
}
