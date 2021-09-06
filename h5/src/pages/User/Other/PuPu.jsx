import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FuncHeader from "components/FuncHeader/FuncHeader";

export default function PuPu() {
  const history = useHistory();

  return (
    <>
      <FuncHeader title={"管理积分商城"} goBack={() => history.push("/user")} />
      <div style={{ display: "flex", justifyContent: "center" }}></div>
    </>
  );
}
