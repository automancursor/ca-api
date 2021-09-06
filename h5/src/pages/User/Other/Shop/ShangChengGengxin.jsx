import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Tabs, Cell, Radio, Button, Picker, Input } from "zarm";
import "zarm/dist/zarm.css";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { Request } from "../../../../utils/request";
import {
  BASE_URL,
  CONTENT_TYPE,
  REQUEST_METHOD,
} from "../../../../utils/request/config";

export default function ShangChengGengxin() {
  const history = useHistory();
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let userData = useSelector((state) => state.user?.data);

  const [companyName, setcompanyName] = useState(userData?.companyName);
  const [shopName, setshopName] = useState(userData?.shopName);
  const [companyLink, setcompanyLink] = useState(userData?.companyLink);
  const [address, setaddress] = useState(userData?.address);
  const [companyDescription, setcompanyDescription] = useState(
    userData?.address
  );
  // const [phoneNumber, setphoneNumber] = useState(userData?.phoneNumber);

  // useEffect(() => {
  //
  // });

  const handleClick = async () => {
    var axios = require("axios");
    var data = JSON.stringify({
      UserName: userData?.username,
      Email: userData?.email,
      CompanyName: companyName,
      ShopName: shopName,
      CompanyLink: companyLink,
      Address: address,
      CompanyDescription: companyDescription,
      // PhoneNumber: phoneNumber,
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
  };

  return (
    <>
      <FuncHeader title={"商城信息"} goBack={() => history.push("/user")} />
      <div style={{ paddingTop: "50px" }}>
        <Cell
          description={
            <div className="box">
              <Input
                clearable
                type="text"
                placeholder={userData?.companyName}
                value={companyName}
                onChange={(value) => {
                  setcompanyName(value);
                }}
              />
            </div>
          }
        >
          公司名
        </Cell>
        <Cell
          description={
            <div className="box">
              <Input
                clearable
                type="text"
                placeholder={userData?.shopName}
                value={shopName}
                onChange={(value) => {
                  setshopName(value);
                }}
              />
            </div>
          }
        >
          商店名
        </Cell>
        <Cell
          description={
            <div className="box">
              <Input
                clearable
                type="text"
                placeholder={userData?.companyLink}
                value={companyLink}
                onChange={(value) => {
                  setcompanyLink(value);
                }}
              />
            </div>
          }
        >
          商家网站
        </Cell>
        <Cell
          description={
            <div className="box">
              <Input
                clearable
                type="text"
                placeholder={userData?.address}
                value={address}
                onChange={(value) => {
                  setaddress(value);
                }}
              />
            </div>
          }
        >
          地址
        </Cell>
        {/*<Cell description={<div className="box">*/}
        {/*  <Input*/}
        {/*      clearable*/}
        {/*      type="text"*/}
        {/*      placeholder={userData?.phoneNumber}*/}
        {/*      value={phoneNumber}*/}
        {/*      onChange={(value) => {*/}
        {/*        setphoneNumber(value);*/}
        {/*      }}*/}
        {/*  />*/}
        {/*</div>}>*/}
        {/*  手机*/}
        {/*</Cell>*/}
        <Cell>
          <Button
            block
            theme="primary"
            style={{ marginTop: "20px" }}
            onClick={() => handleClick()}
          >
            更改商家信息
          </Button>
        </Cell>
      </div>
    </>
  );
}
