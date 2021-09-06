import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FuncHeader from "components/FuncHeader/FuncHeader";

export default function Gongyi() {
  const history = useHistory();
  // todo
  return (
    <>
      <FuncHeader title={"慈善公益"} goBack={() => history.push("/user")} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <p>正在开发中。。。</p>
      </div>
    </>
  );
}
