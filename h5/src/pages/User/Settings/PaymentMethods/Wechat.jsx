import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Input, Button, Cell } from "zarm";
import "zarm/dist/zarm.css";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { BASE_URL } from "../../../../utils/request/config";

export default function Wechat() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userData = useSelector((state) => state.user?.data);
  let userWechat = useSelector((state) => state.user?.data?.wechat);
  const history = useHistory();
  const [newWechat, setNewWechat] = useState("");

  const handleClick = async () => {
    if (newWechat) {
      var axios = require("axios");
      var data = JSON.stringify({
        UserName: userData?.username,
        Email: userData?.email,
        PhoneNumber: userData?.phoneNumber,
        CountryCode: userData?.countryCode,
        BankDetailCN: userData?.bankDetailCN,
        OverSeaBankDetail: userData?.overSeaBankDetail,
        AliPay: userData?.aliPay,
        Wechat: newWechat,
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
      window.confirm("请输入新的微信号");
    }
  };

  return (
    <>
      <FuncHeader
        title={"微信钱包"}
        goBack={() => history.push("/paymentMethod")}
      />
      <div style={{ marginTop: "60px" }}>
        <Cell title="我的微信">
          <Input
            readOnly
            type="text"
            defaultValue={userWechat ? userWechat : "未绑定"}
          />
        </Cell>
        <Cell title="更改信息">
          <Input
            clearable
            type="text"
            placeholder="新的微信账号"
            value={newWechat}
            onChange={(value) => {
              setNewWechat(value);
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
