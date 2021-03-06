import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as styles from "./header.module.scss";

import * as actionCreators from "store/actionCreators/index";

import arrowLeftIcon from "assets/search/arrow-left.png";
import searchIconPath from "assets/home/search.png";

export default function Header() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };
  // handling input
  const handleInputChange = (event) => {
    // update value
    const { value } = event.currentTarget;
    setInputValue(value);
  };

  const handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      goToList();
    }
  };

  const goToList = () => {
    if (!inputValue) return false;
    history.push(`/list?keyword=${encodeURI(inputValue)}`);
    addSearchHistory(inputValue);
  };
  // addSearchHistory to get
  const addSearchHistory = (history) => {
    const action = actionCreators.addSearchHistory(history);
    dispatch(action);
  };

  return (
    <div className={styles["search-container"]}>
      <div className={styles["search-container-icon"]} onClick={goBack}>
        <img src={arrowLeftIcon} alt="返回上一页" />
      </div>
      <input
        className={styles["search-container-input"]}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyEnter}
        placeholder="搜索商品名称 / 商家名称 / 地址 / 种类"
      />
      <div className={styles["search-container-user"]} onClick={goToList}>
        <img src={searchIconPath} alt="搜索" />
      </div>
    </div>
  );
}
