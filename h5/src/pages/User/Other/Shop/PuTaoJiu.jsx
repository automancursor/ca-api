import { useRef, useReducer } from 'react';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Tabs, Cell, Radio, Button, Picker, Input, Modal } from "zarm";
import "zarm/dist/zarm.css";

import FuncHeader from "components/FuncHeader/FuncHeader";

import img1 from "assets/user/shop/PuTaoJiu/1.jpeg";
import img2 from "assets/user/shop/PuTaoJiu/2.jpeg";
import img3 from "assets/user/shop/PuTaoJiu/3.jpeg";
import img4 from "assets/user/shop/PuTaoJiu/4.jpeg";
import img5 from "assets/user/shop/PuTaoJiu/5.jpeg";

const initState = {
  normal: {
    visible: false,
  },
};

const reducer = (state, action) => {
  const { type, key, animationType } = action;

  switch (type) {
    case 'visible':
      return {
        ...state,
        [key]: {
          ...state[key],
          visible: !state[key].visible,
        },
      };

    case 'animation':
      return {
        ...state,
        [key]: {
          ...state[key],
          animationType,
        },
      };

    default:
  }
};

export default function PuTaoJiu() {
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  const history = useHistory();
  let token = useSelector((state) => state.auth.token);
  const [state, dispatch] = useReducer(reducer, initState);
  const focusInput = useRef();
  let userAddress = useSelector((state) => state.user?.data?.address);
  const [price, setPrice] = useState(50000);
  const [qty, setQty] = useState(1);

  const toggle = (key) => dispatch({ type: 'visible', key });

  const handleClick = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "Cvt": price*qty,
      "Address": userAddress,
      "OrderDetail": `香槟型无酒精匍萄果汁 x${qty}`
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5001/Order/product_order", requestOptions)
        .then(response => response.json())
        .then(result => handleMsg(result.message))
        .catch(error => console.log('error', error.message));
  }
  const handleMsg = (msg) => {
    if (msg === 'Success'){
      if (window.confirm("购买成功")) {
        window.location.reload();
      }
    }
    if (msg == `{"ClassName":"System.Exception","Message":"insufficient Cvt Balance","Data":null,"InnerException":null,"HelpURL":null,"StackTraceString":"   at cva_api.Controllers.OrderController.AddProductOrder(AddProductOrderRequest addProductOrderRequest) in /source/cva-api/Controllers/OrderController.cs:line 311","RemoteStackTraceString":null,"RemoteStackIndex":0,"ExceptionMethod":null,"HResult":-2146233088,"Source":"cva-api","WatsonBuckets":null}`) {
      window.confirm("余额不足");
    }
  }

  return (
    <>
      <FuncHeader
        title={"香槟型无酒精匍萄果汁"}
        goBack={() => history.push("/cart")}
      />
      <Modal visible={state.normal.visible} title="香槟型无酒精匍萄果汁" closable onCancel={() => toggle('normal')}>
        <Cell title="数量">
          <Input
              ref={focusInput}
              type="number"
              placeholder="1"
              value={qty}
              onChange={setQty}
          />
        </Cell>
        <Button
            block
            theme="primary"
            style={{ marginBottom: "10px" }}
            onClick={() => handleClick()}
        >
          确认购买
        </Button>
      </Modal>
      <div style={{ marginTop: "60px", padding: "20px", fontSize: "14px" }}>
        <h2>CVA自家品牌"乐澳100"无醇香檳，正式推出市場 :</h2>
        <img src={img1} style={{ width: "100%", marginBottom: "40px" }} />
        <h2>CVT: 50,000 x1</h2>
        <Button
            block
            theme="primary"
            style={{ marginBottom: "10px" }}
            onClick={() => isAuthed ? toggle('normal') : window.confirm("请登录")}
        >
          购买
        </Button>
        <p>
          1. 規格 : 750ml/瓶
          <br />
          2. 半透明玻璃瓶裝
          <br />
          3. 每箱6瓶(毛重約10K)
          <br />
          4. 市場零售指导价:$16.80至$18.80/瓶
          <br />
          5. 現CVA先以本地批發為導向，傳統商家進貨優惠价 : $9+gst
          <br />
          6. 交易條件及支付方式 : 以首月試銷期計算，採用 "翻單找數"
          形式開始合作，三個月為一個檢討期，最終可以以月結應收形式長期合作。
          <br />
          7. 起訂量以每一個落貨點為10箱 (即60瓶)起，少於者另補運費。
          <br />
          8. 屬纯葡萄釀製更健康，過去主要以出口為主。
          <br />
          9.
          成份天然、工藝精湛，用100%澳洲南澳優質葡萄經特別的冷凍技術釀製而成，為不含酒精的無醇健康飲品，含豐富的白黎蘆醇抗氧化成份，具有美顏護膚、健脾活血的效果，是極適合人體吸收的純天然果汁飲料，男女老少皆宜，饋贈自飲首選，佳節聯歡必備，歡迎及早預訂。
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
