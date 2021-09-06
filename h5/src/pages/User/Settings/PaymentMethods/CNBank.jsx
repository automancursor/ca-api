import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Badge, Button, Cell, Input } from "zarm";
import "zarm/dist/zarm.css";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { BASE_URL } from "../../../../utils/request/config";

export default function CNBank() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userData = useSelector((state) => state.user?.data);
  let userBankDetailCN = useSelector((state) => state.user?.data?.bankDetailCN);
  const history = useHistory();
  const [newBankDetailCN, setNewBankDetailCN] = useState("");

  const [newBankDetailCNName, setNewBankDetailCNName] = useState("");
  const [newBankDetailCNUser, setNewBankDetailCNUser] = useState("");
  const [newBankDetailCNCard, setNewBankDetailCNCard] = useState("");

  const handleClick = async () => {
    if (newBankDetailCNName && newBankDetailCNUser && newBankDetailCNCard) {
      var axios = require("axios");
      var data = JSON.stringify({
        UserName: userData?.username,
        Email: userData?.email,
        PhoneNumber: userData?.phoneNumber,
        CountryCode: userData?.countryCode,
        BankDetailCN:
          "银行名称:" +
          newBankDetailCNName +
          " - " +
          "账户名:" +
          newBankDetailCNUser +
          " - " +
          "卡号:" +
          newBankDetailCNCard,
        OverSeaBankDetail: userData?.overSeaBankDetail,
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
        title={"中国银行"}
        goBack={() => history.push("/paymentMethod")}
      />
      <div style={{ marginTop: "60px" }}>
        <Cell title="中国银行">
          <Input
            readOnly
            type="text"
            rows={4}
            value={userBankDetailCN ? userBankDetailCN : "未绑定"}
          />
        </Cell>
        <Cell title="更改信息"></Cell>
        <Cell title="银行名称">
          <Input
            clearable
            type="text"
            placeholder="银行: 中国工商银行"
            value={newBankDetailCNName}
            onChange={(value) => {
              setNewBankDetailCNName(value);
            }}
          />
        </Cell>
        <Cell title="账户名">
          <Input
            clearable
            type="text"
            placeholder="账户名: 张三"
            value={newBankDetailCNUser}
            onChange={(value) => {
              setNewBankDetailCNUser(value);
            }}
          />
        </Cell>
        <Cell title="卡号">
          <Input
            clearable
            type="text"
            placeholder="卡号: 1234567890"
            value={newBankDetailCNCard}
            onChange={(value) => {
              setNewBankDetailCNCard(value);
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
