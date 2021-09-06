import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { Input, Cell, Button, Radio } from "zarm";
import "zarm/dist/zarm.css";
import { Request } from "../../../utils/request";
import {
  BASE_URL,
  CONTENT_TYPE,
  REQUEST_METHOD,
} from "../../../utils/request/config";
//added qr code reader
import QrReader from "react-qr-reader";

export default function ZhiFuQR() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userIdCard = useSelector((state) => state.user?.data?.idCard);
  let userPassport = useSelector((state) => state.user?.data?.passport);
  let userEmail = useSelector((state) => state.user?.data?.email);
  let userMobile = useSelector((state) => state.user?.data?.phoneNumber);
  let walletData = useSelector((state) => state.user?.data?.wallet);
  const history = useHistory();

  const [data, setData] = useState("");
  // take users to the qr url
  const handleScan = (data) => {
    if (data) {
      // setData(data)
      window.location.replace(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <FuncHeader title={"支付二维码"} goBack={() => history.push("/user")} />
      {userPassport || userIdCard ? (
        <div style={{ marginTop: "60px" }}>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "100%" }}
          />
          {/*<p>{data}</p>*/}
        </div>
      ) : (
        <div style={{ marginTop: "60px" }}>
          <h3>请双击上传证件，完成实名认证。</h3>
        </div>
      )}
    </>
  );
}
