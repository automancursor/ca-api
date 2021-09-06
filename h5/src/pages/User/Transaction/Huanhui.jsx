import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { Tabs, Input, Cell, Button } from "zarm";
import "zarm/dist/zarm.css";

const { Panel } = Tabs;

export default function Huanhui() {
  const history = useHistory();
  const [cva1Amount, set1CvaAmount] = useState(0);
  const [rmb1Amount, set1RmbAmount] = useState(0);
  const [usdt1Amount, set1UsdtAmount] = useState(0);
  const [cva2Amount, set2CvaAmount] = useState(0);
  const [rmb2Amount, set2RmbAmount] = useState(0);
  const [usdt2Amount, set2UsdtAmount] = useState(0);
  const [usdt2CvaAmount, setUsdt2CvaAmount] = useState(0);
  const [activedkey, setActivedkey] = useState(0);

  // calc currency
  const toRmb = (value) => {
    set1RmbAmount(value * 4.5);
  };
  const toUsdt = (value) => {
    set1UsdtAmount(value * 0.7);
  };
  useEffect(() => {
    toRmb(cva1Amount);
    toUsdt(cva1Amount);
  }, [cva1Amount]);

  const toCva = (value) => {
    set2CvaAmount(value * 0.2);
  };
  useEffect(() => {
    toCva(rmb2Amount);
  }, [rmb2Amount]);

  const usdtToCva = (value) => {
    set2UsdtAmount(value * 1.5);
  };
  useEffect(() => {
    usdtToCva(usdt2CvaAmount);
  }, [usdt2CvaAmount]);

  return (
    <>
      <FuncHeader title={"换算"} goBack={() => history.push("/user")} />
      <div style={{ marginTop: "60px" }}>
        <Tabs scrollable value={activedkey} onChange={setActivedkey}>
          <Panel title="CVA">
            <div>
              <Cell title="转换类型">
                <Input readOnly type="text" defaultValue="CVA换人民币" />
              </Cell>
              <Cell title="CVA">
                <Input
                  type="price"
                  value={cva1Amount}
                  onChange={(value) => {
                    set1CvaAmount(value);
                  }}
                  placeholder={"请输入金额"}
                />
              </Cell>
              <Cell title="人民币">
                <Input readOnly type="text" value={rmb1Amount} />
              </Cell>
            </div>
            <br />
            <div>
              <Cell title="转换类型">
                <Input
                  readOnly
                  type="text"
                  defaultValue="CVA换数字货币(USDT)"
                />
              </Cell>
              <Cell title="CVA">
                <Input
                  type="price"
                  value={cva1Amount}
                  onChange={(value) => {
                    set1CvaAmount(value);
                  }}
                  placeholder={"请输入金额"}
                />
              </Cell>
              <Cell title="USDT">
                <Input readOnly type="text" value={usdt1Amount} />
              </Cell>
            </div>
          </Panel>
          <Panel title="人民币">
            <div>
              <Cell title="转换类型">
                <Input readOnly type="text" defaultValue="人民币换CVA" />
              </Cell>
              <Cell title="人民币">
                <Input
                  type="price"
                  value={rmb2Amount}
                  onChange={(value) => {
                    set2RmbAmount(value);
                  }}
                  placeholder={"请输入金额"}
                />
              </Cell>
              <Cell title="CVA">
                <Input readOnly type="text" value={cva2Amount} />
              </Cell>
            </div>
          </Panel>
          <Panel title="数字货币(USDT)">
            <div>
              <Cell title="转换类型">
                <Input
                  readOnly
                  type="text"
                  defaultValue="数字货币(USDT)换CVA"
                />
              </Cell>
              <Cell title="USDT">
                <Input
                  type="price"
                  value={usdt2CvaAmount}
                  onChange={(value) => {
                    setUsdt2CvaAmount(value);
                  }}
                  placeholder={"请输入金额"}
                />
              </Cell>
              <Cell title="CVA">
                <Input readOnly type="text" value={usdt2Amount} />
              </Cell>
            </div>
          </Panel>
        </Tabs>
      </div>
    </>
  );
}
