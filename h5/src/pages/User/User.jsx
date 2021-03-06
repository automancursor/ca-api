import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MeHeader from "components/NavHeader/MeHeader";
import NavHeader from "components/NavHeader/NavHeader";

import userIcon from "assets/user/avatar.png";
import czIcon from "assets/user/cz.png";
import txIcon from "assets/user/tx.png";
import fhmxIcon from "assets/user/fhmx.png";
import hzIcon from "assets/user/hz.png";
import ewmIcon from "assets/user/ewm.png";
import tdqyIcon from "assets/user/tdqy.png";
import kflIcon from "assets/user/kf.png";
import dpgl2Icon from "assets/user/dpgl2.png";
import levelIcon from "assets/user/level.png";
import aboutusIcon from "assets/user/aboutus.png";
import qitIcon from "assets/user/qit.png";
import tdglIcon from "assets/user/tdgl.png";
import sqdpIcon from "assets/user/sqdp.png";
import ssfsIcon from "assets/user/ssfs.png";
import csmjIcon from "assets/user/csmj.png";
import hshIcon from "assets/user/hsh.png";
import sxyIcon from "assets/user/sxy.png";

import * as styles from "./user.module.scss";
import { Request } from "../../utils/request";
import { CONTENT_TYPE, REQUEST_METHOD } from "../../utils/request/config";
import * as actionCreators from "../../store/actionCreators";

import thtz_ng from "assets/user/thtz_ng.png";

export default function User() {
  const [userProfile, setUser] = useState();

  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);

  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const userProfileFetch = async () => {
    let request = new Request();
    try {
      let response = await request.fetchData("/UserProfile/" + userId, {
        method: REQUEST_METHOD.GET,
        contentType: CONTENT_TYPE.JSON,
        token,
        body: {},
      });
      dispatch(actionCreators.userProfile(response.data));
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthed) {
      userProfileFetch();
    }
  }, [isAuthed]);

  const goLogin = () => {
    history.push("/login");
  };

  const goSettings = () => {
    history.push("/settings");
  };

  const CallForLogin = (props) => {
    const { goLogin } = props;

    return (
      <div className={styles["login-box"]} onClick={goLogin}>
        <img src={userIcon} alt="????????????" />
        <span>??????/??????</span>
      </div>
    );
  };

  const UserProfileHeader = (props) => {
    const { goSettings, userProfile } = props;

    return (
      <div
        className={styles["login-box"]}
        onClick={goSettings}
        style={{
          display: "flex",
          backgroundImage: "url(" + thtz_ng,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          flexDirection: "column",
        }}
      >
        <img src={userIcon} alt="????????????" style={{ paddingBottom: "20px" }} />
        <span>ID???{userProfile?.referCode}</span>
        {/*<span>&emsp;</span>*/}
        <span>???????????????{userProfile?.username}</span>
        {/*<span>&emsp;</span>*/}
        {/*<span>????????????{userProfile?.referCode}</span>*/}
      </div>
    );
  };

  const WalletList = (props) => {
    const { userProfile } = props;
    return (
      <div>
        <ul className={styles["cent_ul"]}>
          <li>
            <a href="/cvadetail">
              <div>$ {userProfile?.wallet?.cva.toFixed(2)}</div>
              <p>CVA?????????</p>
            </a>
          </li>
          <li>
            <a href="/abgdetail">
              <div>{userProfile?.wallet?.abg}</div>
              <p>ABG??????</p>
            </a>
          </li>
          <li>
            <a href="/cvtdetail">
              <div>{userProfile?.wallet?.cvt}</div>
              <p>CVT????????????</p>
            </a>
          </li>
          <li>
            <a href="/rptdetail">
              <div>{userProfile?.wallet?.rpt}</div>
              <p>RPT??????</p>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  const QianBaoCaoZuo = () => {
    return (
      <div>
        <ul className={styles["cent_gnq"]}>
          <li>
            <a href="/recharge">
              <img src={czIcon} />
              <div>????????????</div>
            </a>
          </li>

          <li>
            <a href="/pay">
              <img src={czIcon} />
              <div>????????????</div>
            </a>
          </li>
          <li>
            <a href="/withdraw">
              <img src={txIcon} />
              <div>??????</div>
            </a>
          </li>
          <li>
            <a href="/transefer">
              <img src={hzIcon} />
              <div>??????</div>
            </a>
          </li>
          <li>
            <a href="/reimbursement">
              <img src={tdglIcon} />
              <div>????????????</div>
            </a>
          </li>
        </ul>
        <ul className={styles["cent_gnq"]}>
          <li>
            <a href="/rptchange">
              <img src={hzIcon} />
              <div>????????????</div>
            </a>
          </li>
          <li>
            <a href="/huanhui">
              <img src={hzIcon} />
              <div>??????</div>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  const QianBaoMingXi = () => {
    return (
      <div>
        <ul className={styles["cent_gnq"]}>
          <li>
            <a href="/cvadetail">
              <img src={fhmxIcon} />
              <div>CVA??????</div>
            </a>
          </li>
          <li>
            <a href="/cvtdetail">
              <img src={fhmxIcon} />
              <div>CVT??????</div>
            </a>
          </li>
          <li>
            <a href="/abgdetail">
              <img src={fhmxIcon} />
              <div>ABG??????</div>
            </a>
          </li>
          <li>
            <a href="/rptdetail">
              <img src={fhmxIcon} />
              <div>RPT??????</div>
            </a>
          </li>
        </ul>
      </div>
    );
  };

  const ShangChengZhongXin = () => {
    return (
      <div>
        <ul className={styles["cent_gnq"]}>
          {userProfile?.sellerVerified ? (
            <li>
              <a href="/shangcheng">
                <img src={ssfsIcon} />
                <div>??????????????????</div>
              </a>
            </li>
          ) : (
            <li>
              <a href="/shopverification">
                <img src={ssfsIcon} />
                <div>????????????</div>
              </a>
            </li>
          )}
          {userProfile?.sellerVerified ? (
            <li>
              <a href="/shopdingdan">
                <img src={qitIcon} />
                <div>????????????</div>
              </a>
            </li>
          ) : null}
          {userProfile?.sellerVerified ? (
            <li>
              <a href="/ShangChengGengxin">
                <img src={aboutusIcon} />
                <div>????????????</div>
              </a>
            </li>
          ) : null}
          <li>
            <a href="/dingdan">
              <img src={fhmxIcon} />
              <div>????????????</div>
            </a>
          </li>

          {/*<li>*/}
          {/*  <a href="/Shuoming">*/}
          {/*    <img src={aboutusIcon} />*/}
          {/*    <div>????????????</div>*/}
          {/*  </a>*/}
          {/*</li>*/}
        </ul>
      </div>
    );
  };

  const JiFenZhongXin = () => {
    return (
      <div>
        <ul className={styles["cent_gnq"]}>
          {/*<li>*/}
          {/*  <a href="/dianpuguanli">*/}
          {/*    <img src={dpgl2Icon} />*/}
          {/*    <div>????????????</div>*/}
          {/*  </a>*/}
          {/*</li>*/}

          {/*<li>*/}
          {/*  <a href="/jifenchi">*/}
          {/*    <img src={tdqyIcon} />*/}
          {/*    <div>?????????</div>*/}
          {/*  </a>*/}
          {/*</li>*/}
          <li>
            <a href="/jifenqu">
              <img src={dpgl2Icon} />
              <div>????????????</div>
            </a>
          </li>
          <li>
            <a href="/rptdingdan">
              <img src={fhmxIcon} />
              <div>??????????????????</div>
            </a>
          </li>
          {/*{userProfile?.sellerVerified ? (*/}
          {/*  <li>*/}
          {/*    <a href="/xiaopu">*/}
          {/*      <img src={ssfsIcon} />*/}
          {/*      <div>??????????????????</div>*/}
          {/*    </a>*/}
          {/*  </li>*/}
          {/*) : (*/}
          {/*  <li>*/}
          {/*    <a href="/shopverification">*/}
          {/*      <img src={ssfsIcon} />*/}
          {/*      <div>????????????</div>*/}
          {/*    </a>*/}
          {/*  </li>*/}
          {/*)}*/}

          <li>
            <a href="/zhifuqr">
              <img src={ewmIcon} />
              <div>???????????????</div>
            </a>
          </li>
          <li>
            <a href="/CreateQR">
              <img src={ewmIcon} />
              <div>???????????????</div>
            </a>
          </li>
          {/*<li>*/}
          {/*  <a href="/other">*/}
          {/*    <img src={qitIcon} />*/}
          {/*    <div>??????</div>*/}
          {/*  </a>*/}
          {/*</li>*/}
        </ul>
      </div>
    );
  };

  const GongNengMoKuai = () => {
    return (
      <div>
        <ul className={styles["cent_gnq"]}>
          {/*<li>*/}
          {/*  <a href="/dianpuguanli">*/}
          {/*    <img src={dpgl2Icon} />*/}
          {/*    <div>????????????</div>*/}
          {/*  </a>*/}
          {/*</li>*/}
          <li>
            <a href="/star">
              <img src={tdqyIcon} />
              <div>????????????</div>
            </a>
          </li>
          <li>
            <a href="/qrcode">
              <img src={ewmIcon} />
              <div>?????????</div>
            </a>
          </li>
          <li>
            <a href="/shangxueyuan">
              <img src={sxyIcon} />
              <div>???????????????</div>
            </a>
          </li>
          <li>
            <a href="/shijieshanghui">
              <img src={hshIcon} />
              <div>??????????????????</div>
            </a>
          </li>
          <li>
            <a href="/gongyi">
              <img src={csmjIcon} />
              <div>????????????</div>
            </a>
          </li>

          {/*<li>*/}
          {/*  <a href="/other">*/}
          {/*    <img src={qitIcon} />*/}
          {/*    <div>??????</div>*/}
          {/*  </a>*/}
          {/*</li>*/}
        </ul>
        <ul className={styles["cent_gnq"]}>
          {/*<li>*/}
          {/*  <a href="/dianpuguanli">*/}
          {/*    <img src={dpgl2Icon} />*/}
          {/*    <div>????????????</div>*/}
          {/*  </a>*/}
          {/*</li>*/}
          <li>
            <a href="/news">
              <img src={aboutusIcon} />
              <div>????????????</div>
            </a>
          </li>
          <li>
            <a href="/Shuoming">
              <img src={aboutusIcon} />
              <div>????????????</div>
            </a>
          </li>

          <li>
            <a href="/kefu">
              <img src={kflIcon} />
              <div>??????</div>
            </a>
          </li>
          <li>
            <a href="/aboutus">
              <img src={levelIcon} />
              <div>????????????</div>
            </a>
          </li>
          {/*<li>*/}
          {/*  <a href="/other">*/}
          {/*    <img src={qitIcon} />*/}
          {/*    <div>??????</div>*/}
          {/*  </a>*/}
          {/*</li>*/}
        </ul>
      </div>
    );
  };

  const SubTitle = (title) => {
    if (isAuthed) {
      return (
        <h4
          style={{
            paddingLeft: "20px",
            paddingTop: "15px",
            paddingBottom: "5px",
            color: "#515151",
          }}
        >
          {title}
        </h4>
      );
    } else {
      return null;
    }
  };

  return (
    // User page screen
    <div className={styles["wrapper"]}>
      {isAuthed ? (
        <MeHeader title={"????????????"} />
      ) : (
        <NavHeader title={"????????????"} />
      )}
      {isAuthed ? null : <CallForLogin goLogin={goLogin} />}
      {isAuthed ? (
        <UserProfileHeader goSettings={goSettings} userProfile={userProfile} />
      ) : null}
      {isAuthed ? <WalletList userProfile={userProfile} /> : null}
      {SubTitle("????????????")}
      {isAuthed ? <QianBaoCaoZuo /> : null}
      {SubTitle("????????????")}
      {isAuthed ? <QianBaoMingXi /> : null}
      {SubTitle("????????????")}
      {isAuthed ? <ShangChengZhongXin /> : null}
      {SubTitle("????????????")}
      {isAuthed ? <JiFenZhongXin /> : null}
      {SubTitle("????????????")}
      {isAuthed ? <GongNengMoKuai /> : null}
    </div>
  );
}
