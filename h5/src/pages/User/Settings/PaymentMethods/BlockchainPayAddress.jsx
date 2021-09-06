import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Badge, Button, Cell, Input } from "zarm";
import "zarm/dist/zarm.css";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { BASE_URL } from "../../../../utils/request/config";

export default function BlockchainPayAddress() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userData = useSelector((state) => state.user?.data);
  let userBlockchainPayAddress = useSelector(
    (state) => state.user?.data?.blockChainWalletAddress
  );
  const history = useHistory();
  const [newBlockchainPayAddress, setNewBlockchainPayAddress] = useState("");

  const handleClick = async () => {
    if (newBlockchainPayAddress) {
      var axios = require("axios");
      var data = JSON.stringify({
        UserName: userData?.username,
        Email: userData?.email,
        PhoneNumber: userData?.phoneNumber,
        CountryCode: userData?.countryCode,
        BankDetailCN: userData?.bankDetailCN,
        OverSeaBankDetail: userData?.overSeaBankDetail,
        AliPay: userData?.aliPay,
        Wechat: userData?.wechat,
        BlockChainWalletAddress: newBlockchainPayAddress,
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
          console.log(JSON.stringify(response.data));
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
        title={"区块链地址ETH/USDT"}
        goBack={() => history.push("/paymentMethod")}
      />
      <div style={{ marginTop: "60px" }}>
        <Cell title="区块链地址ETH/USDT">
          <Input
            readOnly
            type="text"
            defaultValue={
              userBlockchainPayAddress ? userBlockchainPayAddress : "未绑定"
            }
          />
        </Cell>
        <Cell title="更改信息">
          <Input
            clearable
            type="text"
            placeholder="新的区块链地址ETH/USDT"
            value={newBlockchainPayAddress}
            onChange={(value) => {
              setNewBlockchainPayAddress(value);
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
