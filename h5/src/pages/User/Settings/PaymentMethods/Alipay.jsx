import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Badge, Button, Cell, Input } from "zarm";
import "zarm/dist/zarm.css";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { BASE_URL } from "../../../../utils/request/config";

export default function Alipay() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userData = useSelector((state) => state.user?.data);
  let userAplipay = useSelector((state) => state.user?.data?.aliPay);
  const history = useHistory();
  const [newAliPay, setNewAliPay] = useState("");

  const handleClick = async () => {
    if (newAliPay) {
      var axios = require("axios");
      var data = JSON.stringify({
        UserName: userData?.username,
        Email: userData?.email,
        PhoneNumber: userData?.phoneNumber,
        CountryCode: userData?.countryCode,
        BankDetailCN: userData?.bankDetailCN,
        OverSeaBankDetail: userData?.overSeaBankDetail,
        AliPay: newAliPay,
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
      window.confirm("请输入新的信息");
    }
  };

  return (
    <>
      <FuncHeader
        title={"支付宝"}
        goBack={() => history.push("/paymentMethod")}
      />
      <div style={{ marginTop: "60px" }}>
        <Cell title="我的支付宝">
          <Input
            readOnly
            type="text"
            defaultValue={userAplipay ? userAplipay : "未绑定"}
          />
        </Cell>
        <Cell title="更改信息">
          <Input
            clearable
            type="text"
            placeholder="新的支付宝账号"
            value={newAliPay}
            onChange={(value) => {
              setNewAliPay(value);
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
