import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Badge, Button, Cell, Input } from "zarm";
import "zarm/dist/zarm.css";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { BASE_URL } from "../../../../utils/request/config";

export default function OverseaBank() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userData = useSelector((state) => state.user?.data);
  let userOverSeaBankDetail = useSelector(
    (state) => state.user?.data?.overSeaBankDetail
  );
  const history = useHistory();
  const [newOverSeaBankDetail, setNewOverSeaBankDetail] = useState("");

  const [newOverSeaBankDetailSwift, setNewOverSeaBankDetailSwift] = useState(
    ""
  );
  const [newOverSeaBankDetailBank, setNewOverSeaBankDetailBank] = useState("");
  const [newOverSeaBankDetailName, setNewOverSeaBankDetailName] = useState("");
  const [newOverSeaBankDetailBsb, setNewOverSeaBankDetailBsb] = useState("");
  const [newOverSeaBankDetailAc, setNewOverSeaBankDetailAc] = useState("");

  const handleClick = async () => {
    if (
      newOverSeaBankDetailBank &&
      newOverSeaBankDetailName &&
      newOverSeaBankDetailBsb &&
      newOverSeaBankDetailAc
    ) {
      var axios = require("axios");
      var data = JSON.stringify({
        UserName: userData?.username,
        Email: userData?.email,
        PhoneNumber: userData?.phoneNumber,
        CountryCode: userData?.countryCode,
        BankDetailCN: userData?.bankDetailCN,
        OverSeaBankDetail:
          "SWIFT Code:" +
          newOverSeaBankDetailSwift +
          " - " +
          "银行名称:" +
          newOverSeaBankDetailBank +
          " - " +
          "账户名:" +
          newOverSeaBankDetailName +
          " - " +
          "BSB:" +
          newOverSeaBankDetailBsb +
          " - " +
          "Account:" +
          newOverSeaBankDetailAc,
        AliPay: userData?.aliPay,
        Wechat: userData?.wechat,
        BlockChainWalletAddress: userData?.blockChainWalletAddress,
      });

      var config = {
        method: "put",
        url: BASE_URL + "/UserProfile",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          history.push("/user");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      window.confirm("请输入完整信息");
    }
  };

  return (
    <>
      <FuncHeader
        title={"海外银行"}
        goBack={() => history.push("/paymentMethod")}
      />
      <div style={{ marginTop: "60px" }}>
        <Cell title="海外银行">
          <Input
            readOnly
            type="text"
            rows={4}
            value={userOverSeaBankDetail ? userOverSeaBankDetail : "未绑定"}
          />
        </Cell>
        <Cell title="更改信息"></Cell>
        <Cell title="SWIFT Code">
          <Input
            clearable
            type="text"
            placeholder="（澳洲用户可选填）"
            value={newOverSeaBankDetailSwift}
            onChange={(value) => {
              setNewOverSeaBankDetailSwift(value);
            }}
          />
        </Cell>
        <Cell title="银行名称">
          <Input
            clearable
            type="text"
            placeholder="Westpac"
            value={newOverSeaBankDetailBank}
            onChange={(value) => {
              setNewOverSeaBankDetailBank(value);
            }}
          />
        </Cell>
        <Cell title="账户名">
          <Input
            clearable
            type="text"
            placeholder="CVA Dreams Pty Ltd"
            value={newOverSeaBankDetailName}
            onChange={(value) => {
              setNewOverSeaBankDetailName(value);
            }}
          />
        </Cell>
        <Cell title="BSB">
          <Input
            clearable
            type="text"
            placeholder="032069"
            value={newOverSeaBankDetailBsb}
            onChange={(value) => {
              setNewOverSeaBankDetailBsb(value);
            }}
          />
        </Cell>
        <Cell title="A/C">
          <Input
            clearable
            type="text"
            placeholder="641427"
            value={newOverSeaBankDetailAc}
            onChange={(value) => {
              setNewOverSeaBankDetailAc(value);
            }}
          />
        </Cell>
        <Cell>
          <Button
            block
            theme="primary"
            style={{ marginTop: "20px" }}
            onClick={() => handleClick()}
          >
            提交
          </Button>
        </Cell>
      </div>
    </>
  );
}
