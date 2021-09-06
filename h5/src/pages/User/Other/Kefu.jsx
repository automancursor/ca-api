import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FuncHeader from "components/FuncHeader/FuncHeader";
// qr code
import weixinkefu from "assets/user/weixinkefu.jpg";

export default function Kefu() {
  const history = useHistory();

  return (
    <>
      <FuncHeader title={"客服"} goBack={() => history.push("/user")} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={weixinkefu} style={{ marginTop: "60px" }} />
      </div>
    </>
  );
}
