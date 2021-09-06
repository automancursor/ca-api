import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Badge, Cell } from "zarm";
import "zarm/dist/zarm.css";

import NavHeader from "../../../components/NavHeader/NavHeader";

export default function Dianpuguanli() {
  const history = useHistory();

  return (
    <>
      <NavHeader title={"物联商城"} />
      <div style={{ marginTop: "60px" }}>
        <Cell
          hasArrow
          title="香槟型无酒精匍萄果汁"
          onClick={() => history.push("/PuTaoJiu")}
        />
        <Cell
          hasArrow
          title="玻尿酸水光剂护肤精华液"
          onClick={() => history.push("/ShuiGuangZheng")}
        />
        <Cell
          hasArrow
          title="天下第一梳"
          onClick={() => history.push("/Shuzi")}
        />
      </div>
    </>
  );
}
