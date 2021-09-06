import React, { useState, useEffect } from "react";
import NavHeader from "components/NavHeader/NavHeader";
import HomeHeader from "components/NavHeader/HomeHeader";
import * as styles from "./home.module.scss";
import Content from "./Content/Content";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NoticeBar, Icon, Carousel } from "zarm";
import "zarm/dist/zarm.css";

import ABC from "assets/home/ABC.png";
import Pupuqu from "assets/home/pupuqu.png";
import Jifenqu from "assets/home/jifenqu.jpg";
import Bitmap from "assets/home/Bitmap.png";
import { Request } from "../../utils/request";
import {
  BASE_URL,
  CONTENT_TYPE,
  REQUEST_METHOD,
} from "../../utils/request/config";
import axios from "axios";
import _ from "lodash";

const CallForLogin = (props) => {
  const { goLogin } = props;

  return (
    <div className={styles["call-for-login"]} onClick={goLogin}>
      <span className={styles["call-for-login-left"]}>登录后享受更多优惠</span>
      <span className={styles["call-for-login-right"]}>去登录</span>
    </div>
  );
};

export default function Home() {
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  const [banner, getBanner] = useState([]);
  const [config, getConfig] = useState([]);

  const goLogin = () => {
    history.push("/login");
  };

  useEffect(() => {
    if (!banner[0]) {
      getBannerFun();
      getConfigFun();
    }
  }, [banner]);
  //get banner
  const getBannerFun = () => {
    const config = {};
    axios
      .get(BASE_URL + "/Config/media", config)
      .then((response) => {
        getBanner(response.data.data);
      })
      .catch((err) => {
        throw err[1];
      });
  };
  // get config
  const getConfigFun = () => {
    const config = {};
    axios
      .get(BASE_URL + "/Config", config)
      .then((response) => {
        getConfig(response.data.data);
      })
      .catch((err) => {
        throw err[1];
      });
  };

  return (
    <div className={styles["wrapper"]}>
      <HomeHeader title={"首页"} />
      {isAuthed ? null : <CallForLogin goLogin={goLogin} />}
      {/*<Content />*/}
      <Carousel>
        {banner
          ? banner.map((item, i) => {
              return (
                <div className="carousel__item__pic" key={+i}>
                  <img
                    src={item.value}
                    alt=""
                    draggable={false}
                    style={{ width: "100%", marginTop: "10px" }}
                  />
                </div>
              );
            })
          : null}
      </Carousel>
      <NoticeBar>{config ? config[6]?.value : null}</NoticeBar>
      <div
        style={{
          padding: "20px",
          fontSize: "14px",
          color: "#989898",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2>全心全意为消费商服务！</h2>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ width: "50%" }}>
          <div
            style={{
              backgroundImage: "url(" + Bitmap,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              marginTop: "20px",
              marginLeft: "10px",
              marginRight: "10px",
              borderRadius: "10px",
              padding: "10px",
              color: "white",
              fontSize: "14px",
              height: "100px",
            }}
            onClick={() => history.push("/Baipishu")}
          >
            <p>
              CVA Dreams Pty Ltd
              <br />
              CVA圆梦有限公司
            </p>
            <p>任重道远</p>
          </div>
        </div>
        <div style={{ width: "50%" }}>
          <div
            style={{
              backgroundImage: "url(" + Bitmap,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              marginTop: "20px",
              marginLeft: "10px",
              marginRight: "10px",
              borderRadius: "10px",
              padding: "10px",
              color: "white",
              fontSize: "12px",
              height: "100px",
            }}
            onClick={() => history.push("/aboutus")}
          >
            <p>
              CVA Technology Pty Ltd
              <br />
              CVA科技有限公司
            </p>
            <p>通证改变世界，消费增值循环系统</p>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginBottom: "20px", width: "50%" }}>
          <div
            style={{
              backgroundImage: "url(" + Bitmap,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              marginTop: "20px",
              marginLeft: "10px",
              marginRight: "10px",
              borderRadius: "10px",
              padding: "10px",
              color: "white",
              fontSize: "14px",
              height: "100px",
            }}
            onClick={() => history.push("/shijieshanghui")}
          >
            <p>CVA世界商会</p>
            <p>CVA World Merchant Association</p>
          </div>
        </div>
        <div style={{ marginBottom: "20px", width: "50%" }}>
          <div
            style={{
              backgroundImage: "url(" + Bitmap,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              marginTop: "20px",
              marginLeft: "10px",
              marginRight: "10px",
              borderRadius: "10px",
              padding: "10px",
              color: "white",
              fontSize: "14px",
              height: "100px",
            }}
            onClick={() => history.push("/category")}
          >
            <p>Content Union Mall</p>
            <p>物联商城</p>
          </div>
        </div>
      </div>

      <img
        onClick={() => history.push("/block")}
        src={Pupuqu}
        style={{
          marginTop: "20px",
          width: "100%",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      />
      <img
        onClick={() => history.push("/block")}
        src={Jifenqu}
        style={{
          marginTop: "20px",
          width: "100%",
          paddingRight: "20px",
          paddingLeft: "20px",
        }}
      />
      <img
        onClick={() => history.push("/block")}
        src={ABC}
        style={{ marginTop: "20px", marginBottom: "60px", width: "100%" }}
      />
    </div>
  );
}
