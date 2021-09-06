import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import THeader from "components/NavHeader/THeader";
import * as styles from "./star.module.scss";
import { Tabs } from "zarm";
import "zarm/dist/zarm.css";
import axios from "axios";
import LightTab from "./LightTab";
import { Table, Row, Col, CardText } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import { BASE_URL } from "../../utils/request/config";
import FuncHeader from "../../components/FuncHeader/FuncHeader";

const { Panel } = Tabs;

const CallForLogin = (props) => {
  const { goLogin } = props;

  return (
    <div className={styles["call-for-login"]} onClick={goLogin}>
      <span className={styles["call-for-login-left"]}>登录后享受更多优惠</span>
      <span className={styles["call-for-login-right"]}>去登录</span>
    </div>
  );
};

export default function Star() {
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const [activedkey, setActivedkey] = useState(0);
  const [userAreaRecord, setUserAreaRecord] = useState([]);
  const [l1, setL1] = useState([]);
  const [l2, setL2] = useState([]);
  const [lA, setLA] = useState([]);
  const [lB, setLB] = useState([]);
  const [lC, setLC] = useState([]);
  const [lD, setLD] = useState([]);
  const [lE, setLE] = useState([]);
  const [lVIP, setLVIP] = useState([]);
  const [lF, setLF] = useState([]);
  const [lG, setLG] = useState([]);
  const [lH, setLH] = useState([]);
  const [lI, setLI] = useState([]);
  const [lK, setLK] = useState([]);

  useEffect(() => {
    if (isAuthed) {
      getAreaRecord(userId, token);
    }
  }, [userId]);
  // get all lights
  function getAreaRecord(id, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(BASE_URL + "/AreaRecord/records/" + id, config)
      .then((response) => {
        if (response.status === 400 || response.status === 500)
          throw response.data;
        if (response.data.data) {
          setUserAreaRecord(response.data.data);
          areaClaimData(response.data.data);
        }
      })
      .catch((err) => {
        throw err[1];
      });
  }
  // format all light data
  function areaClaimData(data) {
    let l1 = [];
    let l2 = [];
    let lA = [];
    let lB = [];
    let lC = [];
    let lD = [];
    let lE = [];
    let lVIP = [];
    let lF = [];
    let lG = [];
    let lH = [];
    let lI = [];
    let lK = [];
    if (data) {
      for (let i = 0; i <= data.length; i++) {
        if (data[i]?.areaClaimId === 1) {
          lA.push(data[i]);
        } else if (data[i]?.areaClaimId === 2) {
          lB.push(data[i]);
        } else if (data[i]?.areaClaimId === 3) {
          lC.push(data[i]);
        } else if (data[i]?.areaClaimId === 4) {
          lD.push(data[i]);
        } else if (data[i]?.areaClaimId === 5) {
          lE.push(data[i]);
        } else if (data[i]?.areaClaimId === 6) {
          l1.push(data[i]);
        } else if (data[i]?.areaClaimId === 7) {
          l2.push(data[i]);
        } else if (data[i]?.areaClaimId === 8) {
          lVIP.push(data[i]);
        } else if (data[i]?.areaClaimId === 9) {
          lF.push(data[i]);
        } else if (data[i]?.areaClaimId === 10) {
          lG.push(data[i]);
        } else if (data[i]?.areaClaimId === 11) {
          lH.push(data[i]);
        } else if (data[i]?.areaClaimId === 12) {
          lI.push(data[i]);
        } else if (data[i]?.areaClaimId === 13) {
          lK.push(data[i]);
        }
      }
    }
    setLA(lA);
    setLB(lB);
    setLC(lC);
    setLD(lD);
    setLE(lE);
    setL1(l1);
    setL2(l2);
    setLVIP(lVIP);
    setLF(lF);
    setLG(lG);
    setLH(lH);
    setLI(lI);
    setLK(lK);
  }

  const goLogin = () => {
    history.push("/login");
  };

  const buildRow = (row) => (
    <div>
      {row.map((item) => (
        <LightTab data={item} />
      ))}
    </div>
  );

  return (
    <div className={styles["wrapper"]}>
      {/*<THeader title={"区块"} />*/}
      <FuncHeader title={"区块"} goBack={() => history.push("/user")} />
      {isAuthed ? null : <CallForLogin goLogin={goLogin} />}
      {isAuthed ? (
        <Tabs scrollable value={activedkey} onChange={setActivedkey}>
          <Panel title="1区">
            <div className={styles["content"]}>
              {l1 !== undefined ? buildRow(l1) : null}
            </div>
          </Panel>
          <Panel title="2区">
            <div className={styles["content"]}>
              {l2 !== undefined ? buildRow(l2) : null}
            </div>
          </Panel>
          <Panel title="A区">
            <div className={styles["content"]}>
              {lA !== undefined ? buildRow(lA) : null}
            </div>
          </Panel>
          <Panel title="B区">
            <div className={styles["content"]}>
              {lB !== undefined ? buildRow(lB) : null}
            </div>
          </Panel>
          <Panel title="C区">
            <div className={styles["content"]}>
              {lC !== undefined ? buildRow(lC) : null}
            </div>
          </Panel>
          <Panel title="D区">
            <div className={styles["content"]}>
              {lD !== undefined ? buildRow(lD) : null}
            </div>
          </Panel>
          <Panel title="E区">
            <div className={styles["content"]}>
              {lE !== undefined ? buildRow(lE) : null}
            </div>
          </Panel>
          <Panel title="VIP 区">
            <div className={styles["content"]}>
              {lVIP !== undefined ? buildRow(lVIP) : null}
            </div>
          </Panel>
          <Panel title="F区/县代表">
            <div className={styles["content"]}>
              {lF !== undefined ? buildRow(lF) : null}
            </div>
          </Panel>
          <Panel title="G区/市代表">
            <div className={styles["content"]}>
              {lG !== undefined ? buildRow(lG) : null}
            </div>
          </Panel>
          <Panel title="H区/省代表">
            <div className={styles["content"]}>
              {lH !== undefined ? buildRow(lH) : null}
            </div>
          </Panel>
          <Panel title="I区/国家代表">
            <div className={styles["content"]}>
              {lI !== undefined ? buildRow(lI) : null}
            </div>
          </Panel>
          <Panel title="K区/洲域代表(全球七大洲)">
            <div className={styles["content"]}>
              {lK !== undefined ? buildRow(lK) : null}
            </div>
          </Panel>
        </Tabs>
      ) : null}
    </div>
  );
}
