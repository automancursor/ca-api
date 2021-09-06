import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Tabs, Cell, Radio, Button, Picker, Input } from "zarm";
import "zarm/dist/zarm.css";

import FuncHeader from "components/FuncHeader/FuncHeader";

import img1 from "assets/user/shop/ShuiGuangZheng/1.jpeg";
import img2 from "assets/user/shop/ShuiGuangZheng/2.jpeg";
import img3 from "assets/user/shop/ShuiGuangZheng/3.jpeg";
import img4 from "assets/user/shop/ShuiGuangZheng/4.jpeg";
import img5 from "assets/user/shop/ShuiGuangZheng/5.jpeg";

export default function ShuiGuangZheng() {
  const history = useHistory();

  const handleClick = () => {

  }

  return (
    <>
      <FuncHeader
        title={"玻尿酸水光剂护肤精华液"}
        goBack={() => history.push("/cart")}
      />
      <div style={{ marginTop: "60px", padding: "20px", fontSize: "14px" }}>
        <h2>玻尿酸水光剂护肤精华液</h2>
        <img src={img1} style={{ width: "100%", marginBottom: "40px" }} />
        <Button
            block
            theme="primary"
            style={{ marginBottom: "10px" }}
            onClick={() => handleClick()}
        >
          购买
        </Button>
        <p>
          玻尿酸
          是广泛存在于皮肤和人体其他组织的天然生物分子，本身含有丰富的水分，分布在细胞和纤维之间，使肌肤显得充盈、饱满有弹性。随着年龄的增长，玻尿酸流失的速度比生长速度快时，肌肤也将渐渐变得缺乏水分，失去光泽弹性，长久下来便出现皱纹、色斑、干涩等老化现象。补充玻尿酸已被证明是最佳的
          “逆生长” 路线。
          <br />
          阿法德体(Aphrodite是希腊女神的名字)涂抹玻尿酸里含有高浓小分子玻尿酸使皮肤更好吸收，渗透。強力补水，使皮肤光滑饱满。
          <br />
          其中的另一种成份羊胎盘素(PLACENTA)
          一般胎盘素所含有的主要成份包括蛋白质、核酸、磷脂类、多醣体、氨基酸、矿物质、维生素类等，其精华所在为小分子的肽类物质和核酸片段，它同时也是活化细胞的基本要素。改善肌肤粗糙、肌肉松弛、皱纹增多，祛斑、美白，防止肌肤张力降低、使皮肤滋润细腻、改善和维护肌肉的弹力等。此外还含有葡萄籽精华(grape
          seed extract) 保护皮肤，美容养颜，抗过敏，抗福射，减少抚平皮肤皱纹.
          <br />
        </p>
        <img src={img2} style={{ width: "100%", marginBottom: "40px" }} />
        <img src={img3} style={{ width: "100%", marginBottom: "40px" }} />
        <img src={img4} style={{ width: "100%", marginBottom: "40px" }} />
        <img src={img5} style={{ width: "100%", marginBottom: "40px" }} />
      </div>
    </>
  );
}
