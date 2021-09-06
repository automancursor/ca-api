import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Toast } from "zarm";
import "zarm/dist/zarm.css";

import QRCodeHeader from "components/FuncHeader/QRCodeHeader";

import share_bg from "assets/user/share_bg.png";
import * as QueryString from "query-string";
let urlReferC = null;

export default function QRCode() {
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  let referC = useSelector((state) => state.user?.data?.referCode);
  const history = useHistory();

  urlReferC = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }).referC;

  useEffect(() => {
    if (isAuthed) {
      window.history.replaceState(
        null,
        "CVA圆梦消费增值系统",
        "/qrcode?referC=" + referC
      );
    } else {
      window.location.replace(
        "http://h5.cvac.net.au/register?referC=" + urlReferC
      );
    }
  }, [isAuthed]);

  var React = require("react");
  var QRCode = require("qrcode.react");

  // tab to copy - header
  const toCopy = () => {
    navigator.clipboard.writeText(referC);
    Toast.show("复制成功");
  };

  return (
    <>
      <QRCodeHeader
        title={`邀请码：${referC}`}
        goBack={() => history.push("/user")}
        copyFunc={() => toCopy()}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundImage: "url(" + share_bg,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "1000px",
        }}
      >
        <QRCode
          style={{
            width: "300px",
            height: "300px",
            marginTop: "360px",
          }}
          value={"http://h5.cvac.net.au/register?referC=" + referC}
        />
      </div>
    </>
  );
}
