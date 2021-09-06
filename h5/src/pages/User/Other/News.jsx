import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FuncHeader from "components/FuncHeader/FuncHeader";

export default function News() {
  const history = useHistory();
  // to do news page
  return (
    <>
      <FuncHeader title={"活动信息"} goBack={() => history.push("/user")} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>正在开发中。。。</p>
      </div>
    </>
  );
}
