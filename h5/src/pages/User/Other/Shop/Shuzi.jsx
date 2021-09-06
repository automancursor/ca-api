import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Tabs, Cell, Radio, Button, Picker, Input } from "zarm";
import "zarm/dist/zarm.css";

import FuncHeader from "components/FuncHeader/FuncHeader";

import img1 from "assets/user/shop/Shuzi/Shuzi1.jpeg";
import img2 from "assets/user/shop/Shuzi/Shuzi2.jpeg";
import img3 from "assets/user/shop/Shuzi/Shuzi3.jpeg";
import img4 from "assets/user/shop/Shuzi/Shuzi4.jpeg";
import img5 from "assets/user/shop/Shuzi/Shuzi5.jpeg";
import img6 from "assets/user/shop/Shuzi/Shuzi6.jpeg";
import img7 from "assets/user/shop/Shuzi/Shuzi7.jpeg";
import img8 from "assets/user/shop/Shuzi/Shuzi8.jpeg";
import img9 from "assets/user/shop/Shuzi/Shuzi9.jpeg";

export default function Shuzi() {
  const history = useHistory();
  const handleClick = () => {

  }

  return (
    <>
      <FuncHeader
        title={"天下第一梳"}
        goBack={() => history.push("/cart")}
      />
      <div style={{ marginTop: "60px", padding: "20px", fontSize: "14px" }}>
        <h2>天下第一梳</h2>
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
          介绍一下古人“一日三梳”的方法！
          <br />
          第一梳：清晨洗漱完毕后,用5-10分钟时间梳头。
          <br />
          要顾及到前后左右各个地方,从额到颈;由慢到快,
          由轻到重,双目微闭,专心梳理。
          <br />
          梳头结束后,双手可以做拉耳抓颈等动作,让整个头部血脉畅通。
          <br />
          第二梳：午饭之后,再利用5-10分钟时间梳梳头发。
          <br />
          依照早晨的方法再梳一遍,可对头皮轻轻按摩,刺激头部穴位。
          <br />
          第三梳：晚上临睡前,用5-10分钟梳头。
          <br />
          包括拉耳抓颈,让头部穴位得到更有效的刺激和按摩。动作要轻缓,双目紧闭,心境平和。睡前的头部按摩,对提高睡眠质量很有帮助。
          <br />
          记住了吗？快把我们东施帛宝梳请回家！
          <br />
        </p>
        <p>
          全世界只有独一无二的东施帛健康梳
          <br />
          能将毛囊里面的垃圾-毒素-污垢-新成代谢-分泌物清理出来！这些垃圾毒素污垢分泌物；堵塞了你的毛囊才会导致身体不健康的因素，有了这把神奇的健康梳，每天使用，再也不为头痛头晕颈椎追痛困扰了，头皮屑三天消失…
          <br />
          每天梳5次以上，每次梳5分钟以上，持续梳1-2个月，白头发慢慢转黑，秃头的朋友慢慢长出新发🤗🤗🤗🤗…！天天梳，预防脑梗，脑血栓，脑动脉硬化，脑肿瘤；老年痴呆等大型疾病发生
          <br />
        </p>
        <p>
          常梳头，好处多！
          <br />
          1，防中风
          <br />
          俗话说：“梳头十分钟，预防脑中风”，
          老年人多气血虚弱，脉络淤阻，以致大脑失养，发为中风，经常梳头刺激头部经络和穴位，能使头部毛孔张开、排泄，从而疏通经络，活血行气，疏经通络，减少脑中风的发生。
          <br />
          2，改善神经衰弱
          <br />
          神经衰弱多和记忆力减退、失眠联系在一起，需要安神养血、宁心调气。而每天早晚梳头，以头顶为主向两侧分梳，或者从后向前梳，可以疏通头上的阳经，具有很好的补益作用。
          <br />
          3，缓解颈椎病
          <br />
          每天梳刮头颈部相关穴位能够疏通穴位，减轻、甚至消除颈椎病的疼痛感。
          <br />
          4，防健忘
          <br />
          用梳子对头部穴位和经脉进行按摩与刺激，会起到疏通经络、醒脑提神等多种作用。梳头可以促使经脉通畅，活血行气，大脑就聪明，不易退化。
          <br />
          5，改善发质
          <br />
          头发分叉的话，千万别忽视睡觉前梳头，许多人只顾睡前洗脸、洗澡，却忘了刷去头发上的灰尘，头发所沾的污垢会加重分叉的程度。
          <br />
          梳头从头皮梳向发端，将头皮中的天然油脂带到发端，使头发的发梢获得营养，从而改善头发分叉的情况。
          <br />
        </p>
        <img src={img2} style={{ width: "100%", marginBottom: "40px" }} />
        <img src={img3} style={{ width: "100%", marginBottom: "40px" }} />
        <img src={img4} style={{ width: "100%", marginBottom: "40px" }} />
        <img src={img5} style={{ width: "100%", marginBottom: "40px" }} />
        <img src={img6} style={{ width: "100%", marginBottom: "40px" }} />
        <img src={img7} style={{ width: "100%", marginBottom: "40px" }} />
        <img src={img8} style={{ width: "100%", marginBottom: "40px" }} />
        <img src={img9} style={{ width: "100%", marginBottom: "40px" }} />
      </div>
    </>
  );
}
