import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FuncHeader from "components/FuncHeader/FuncHeader";
import qukuaishuoming from "assets/user/qukuaishuoming.png";

export default function Shuoming() {
  const history = useHistory();
  //todo
  return (
    <>
      <FuncHeader title={"操作说明"} goBack={() => history.push("/user")} />
      <div
        style={{
          marginTop: "80px",
          justifyContent: "center",
          padding: "20px",
          fontSize: "15px",
        }}
      >
        <p>正在开发中。。。</p>
      </div>
    </>
  );
}
