import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FuncHeader from "components/FuncHeader/FuncHeader";

export default function Other() {
  const history = useHistory();
  //todo
  return (
    <>
      <FuncHeader title={"其他"} goBack={() => history.push("/user")} />
      <div style={{ display: "flex", justifyContent: "center" }}></div>
    </>
  );
}
