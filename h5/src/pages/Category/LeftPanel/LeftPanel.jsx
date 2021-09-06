import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actionCreators from "store/actionCreators/index";
import * as styles from "./leftPanel.module.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../utils/request/config";

export default function LeftPanel() {
  const selector = useSelector((state) => state.category.setCate);
  const dispatch = useDispatch();
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);

  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const [allCategory, setAllCategory] = useState([]);

  useEffect(() => {
    if (allCategory) {
      getAllCategory();
    }
  }, []);

  function getAllCategory() {
    const config = {};
    axios
      .get(BASE_URL + "/shop/category", config)
      .then((response) => {
        if (response.status === 400 || response.status === 500)
          throw response.data;
        if (response.data.data) {
          setAllCategory(response.data.data);
        }
      })
      .catch((err) => {
        throw err[1];
      });
  }
  // scroolling achor
  const scrollToAnchor = (anchor) => {
    if (anchor) {
      const anchorElement = document.getElementById(anchor);
      if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };
  // set category store
  const setCateInStore = (cate, anchor) => {
    const action = actionCreators.setCate(cate);
    dispatch(action);
    scrollToAnchor(anchor);
  };

  return (
    <div className={styles["container"]}>
      <ul className={styles["list-container"]}>
        <li
          className={styles["list-item"]}
          anchor={"全部商品"}
          onClick={() => setCateInStore(0, "全部商品")}
        >
          <span className={styles["list-item-text"]}>全部商品</span>
        </li>
        {allCategory.map((category) => (
          <li
            key={category.name}
            className={
              selector === category.name
                ? styles["list-item"] + " " + styles["list-item_active"]
                : styles["list-item"]
            }
            anchor={category.name ? category.name : null}
            onClick={() => setCateInStore(category.name, category.name)}
          >
            <span className={styles["list-item-text"]}>{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
