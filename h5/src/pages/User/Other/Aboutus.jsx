import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FuncHeader from "components/FuncHeader/FuncHeader";

export default function Aboutus() {
  const history = useHistory();
  // about us page
  return (
    <>
      <FuncHeader title={"关于我们"} goBack={() => history.push("/")} />
      <div
        style={{
          marginTop: "80px",
          justifyContent: "center",
          padding: "20px",
          fontSize: "20px",
        }}
      >
        <p>CVA圆梦消费增值系统</p>
        <p>
          消费致富理念，把化钱的事变成赚钱的事，把家庭的开支转化为家庭的收入。化原来就要化的钱，买原来就要买的东西，赚原来赚不到的钱。换个消费方式，有计划的延迟消费就能改变人生,
          让一次性消费，终身受惠，免费生活，圆梦生态圈!
          <br />
          消费增値循环系统道破企业分配体制的天机，为全球企业家找到一条事业常青的发展之路。能让消费商涌跃”消费”，运用CVT提货通证,
          持续免费换领商品 , 等于帮助了商家不断销售产品！
          <br />
          五区块分红模式是运用消费额的时间 , 量化，有序组合，循环重生或升级 ,
          不断释放红利及提货通证，让消费商倍增收益,
          保证了五区块良性的延续。定能为社会创造未来！引领消费增值的新潮流！成为消费致富的新典范！是一项具有历史意义的圆梦工程！
          <br />
        </p>
        <p>CVA Dreams Pty Ltd</p>
        <p>ABN 65 641 094 877</p>
        <p>地址: Shop 7, 94 Beamish St, Campsie NSW 2194 Australia</p>
        <p>网站: cvac.net.au</p>
        <p>电话: +61 0481 001 663</p>
        <p>请把表格和存款/转账收据传到cva_rego@163.com</p>
      </div>
    </>
  );
}
