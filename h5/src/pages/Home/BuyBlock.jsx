import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as QueryString from "query-string";
import { Input, Cell, Button, Radio } from "zarm";
import "zarm/dist/zarm.css";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { Request } from "../../utils/request";
import { CONTENT_TYPE, REQUEST_METHOD } from "../../utils/request/config";

let id;
let areaType;

export default function BuyBlock() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const history = useHistory();
  const [payPassword, setPayPassword] = useState("");
  const [coinType, setCoinType] = useState("Cva");
  //get id from url
  id = QueryString.parse(window.location.search, { ignoreQueryPrefix: true })
    .id;
  areaType = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }).areaType;

  const handleClick = async () => {
    if (payPassword) {
      let request = new Request();
      try {
        let response = await request.fetchData("/Order", {
          method: REQUEST_METHOD.POST,
          contentType: CONTENT_TYPE.JSON,
          token,
          body: {
            AreaClaimId: id,
            PayPassword: payPassword,
            PaymentType: coinType,
          },
        });
        window.confirm("购买成功");
        history.push("/");
      } catch (error) {
        window.confirm("错误，请联系管理员。");
      }
    } else {
      window.confirm("请输入支付密码");
    }
  };

  const shuoMing = (type) => {
    switch (type) {
      case "A":
        return (
          <Cell title="说明">
            <p>
              一次性消费: 澳元＄500 /人民币￥2,500元,
              <br />
              1, 无分享有5轮收益, 共分红CVA约＄1,620 /￥8,100元 (可提现)
              <br />
              2, 配25万CVT提货通证, 分5轮释放, 可换领＄2,500 /￥12,500元产品，
              <br />
              3, 或领补贴: 5轮合共: ＄750 /￥3,750元, (可提现)
              <br />
              4, 若分享N个, 就有: (5+N轮) 收益.
              <br />
              5, 送ABG 金豆红股5股
              <br />
            </p>
          </Cell>
        );
      case "B":
        return (
          <Cell title="说明">
            <p>
              一次性消费: 澳元＄1,000／￥5,000元,
              <br />
              1, 无分享有5轮收益, 共分红CVA约＄3,240 /￥16,200元(可提现)
              <br />
              2, 配50万CVT提货通证, 分5轮释放, 可换领＄5,000 /￥25,000元产品,
              <br />
              3, 或领补贴: 5轮合共: ＄1,500 /￥7,500元 (可提现)
              <br />
              4, 若分享N个, 就 有: (5+N轮) 收益
              <br />
              5, 送ABG 金豆红股10股
              <br />
            </p>
          </Cell>
        );
      case "C":
        return (
          <Cell title="说明">
            <p>
              一次性消费: 澳元＄2,000／￥10,000元
              <br />
              1, 无分享有5轮收益 , 共分红CVA约＄6,480 /￥32,400元, (可提现)
              <br />
              2, 配100万CVT提货通证, 分5轮释放, 可换领＄10,000 /￥50,000元产品
              <br />
              3, 或领补贴: 5轮合共: ＄3,000 /￥15,000元, (可提现)
              <br />
              4, 若分享N个, 就 有: (5+N轮) 收益
              <br />
              5, 送ABG 金豆红股20股
              <br />
            </p>
          </Cell>
        );
      case "D":
        return (
          <Cell title="说明">
            <p>
              一次性消费: 澳元＄4,000／￥20,000元
              <br />
              1, 无分享有5轮收益, 共分红CVA约＄12,960 /￥64,800元 (可提现)
              <br />
              2, 配200万CVT提货通证, 分5轮释放, 可换领＄20,000 /￥100,000元产品
              <br />
              3, 或领补贴: 5轮合共: ＄6,000 /￥30,000元, (可提现)
              <br />
              4, 若分享N个, 就 有: (5+N轮) 收益
              <br />
              5, 送ABG 金豆红股40股
              <br />
            </p>
          </Cell>
        );
      case "E":
        return (
          <Cell title="说明">
            <p>
              一次性消费: 澳元＄8,000／￥40,000元
              <br />
              1, 无分享有5轮收益, 共分红CVA约＄25,920 /￥129,600元 (可提现)
              <br />
              2, 配CVT提货通证4,000,000个, 分5轮释放, 可换领＄40,000
              /￥200,000元产品
              <br />
              3, 或领补贴额5轮合共: ＄12,000 /￥60,000元 (可提现)
              <br />
              4, 若分享N个, 就 有: (5+N) 轮收益
              <br />
              5, 送ABG 金豆红股80股 ,高级合伙人(限额）
              <br />
            </p>
          </Cell>
        );
      case "VIP":
        return (
          <Cell title="说明">
            <p>
              一次性消费: $20,000 / ￥100,000元
              <br />
              1, 无分享有10轮收益, 共分红CVA约＄72,000 /￥360,000元 (可提现)
              <br />
              2, 配CVT提货通证 10,000,000个, 分10轮释放, 可换领 $100,000 /
              ￥500,000元产品,
              <br />
              3, 或领补贴: 10轮合共: ＄30,000 /￥150,000元 (可提现) ,<br />
              4, 共有A、B、C、D、E、VIP区各10轮分红，合现金CVA约＄172,440 /
              ￥862.200元
              <br />
              + CVT提货通证25,500,000个 或 领补贴:＄76,500 /￥382,500元,
              <br />
              5, 任何区若分享N个: 有(10+N轮)收益,
              <br />
              6, 送ABG 金豆红股200股，高级合伙人(限额）, 参加年终奖
              <br />
            </p>
          </Cell>
        );
      case "县代表":
        return (
          <Cell title="说明">
            <p>
              一次性消费: $40,000 CVA /￥200,000元
              <br />
              1, 无分享有20轮收益, 共现金分红CVA约＄288,000 /￥1,440,000元,
              (可提现)
              <br />
              2, 配CVT提货通证 40,000,000个, 可换领$400,000元/ ￥2,000,000元产品
              <br />
              3, 或领补贴: 20轮合共: ＄120,000 /￥600,000元, (可提现)
              <br />
              4, 共有A、B、C、D、E、VIP、F区各有20轮分红，
              <br />
              合现金CVA约＄632,880 /￥3,164,400 元 + CVT提货通证91,000,000个
              <br />
              或领补贴:＄273,000 /￥1,365,000元,
              <br />
              5, 任何区若分享N个: 有(20+N轮)收益,
              <br />
              6, 送ABG 金豆红股400股, 高级合伙人(限额）, 参加年终奖
              <br />
              7, 任务：12个月内分享35个(C区40个, D区20个, E区10个，VIP
              区5个)区块点
              <br />
            </p>
          </Cell>
        );
      case "市代表":
        return (
          <Cell title="说明">
            <p>
              一次性消费： $80,000 CVA /￥400,000元
              <br />
              1, 无分享有40轮收益, 共现金分红CVA约＄1,152,000 /￥5,760,000元
              (可提现)
              <br />
              2, 配CVT提货通证 160,000,000个 ,
              可换领价值$1,600,000万/￥8,000,000元产品
              <br />
              3, 或领补贴: 40轮合共: ＄480,000 /￥2,400,000元, (可提现)
              <br />
              4, 共有A、B、C、D、E、VIP、F、G区各有40轮分红，
              <br />
              合现金CVA约＄2,417,760 / ￥12,088,800 元 + CVT提货通证342,000,000
              个<br />
              或领补贴:＄720,000 /￥3,600,000元
              <br />
              5, 任何区若分享N个: 有(40+N轮) 收益,
              <br />
              6, 送ABG 金豆红股800股, 高级合伙人(限额）, 参加年终奖
              <br />
              7, 任务：18个月内分享155个(C区80, D区40,
              E区20，VIP区10，F区5个)区块点
              <br />
            </p>
          </Cell>
        );
      case "省代表":
        return (
          <Cell title="说明">
            <p>
              一次性消费： $160,000 CVA /￥800,000元
              <br />
              1,无分享有80轮收益, 共现金分红CVA约＄4,608,000
              /￥23,040,000元(可提现)
              <br />
              2,配CVT提货通证640,000,000个,
              可换领价值＄6,400,000元/￥32,000,000元产品,
              <br />
              3,或领补贴:80轮合共:＄1,920,000 /￥9,600,000元,(可提现)
              <br />
              4, 共有A、B、C、D、E、VIP、F、G、H区各有80轮分红，
              <br />
              合现金CVA约＄9,443,520 / ￥47,217,600 元 +
              CVT提货通证1,324,000,000个
              <br />
              或领补贴: ＄3,360,000 /￥16,800,000元
              <br />
              5,任何区若分享N个: 有(80+N轮) 收益,
              <br />
              6,送ABG 金豆红股1,600股, 高级合伙人（限额）参加年终分红。
              <br />
              7,任务：24个月内分享315个(C区160个，D区80个，E区40个，VIP区20个，
              <br />
              F区县级代表区10个，G区市代表5个)区块点
              <br />
            </p>
          </Cell>
        );
      case "国家代表":
        return (
          <Cell title="说明">
            <p>
              一次性消费：＄320,000 CVA /￥1,600,000元
              <br />
              1,无分享有160轮收益, 共现金分红CVA约＄15,360,000
              /￥76,800,000元(可提现)
              <br />
              2,配CVT提货通证2,560,000,000个,
              可换领价值＄25,600,000/￥128,000,000元产品,
              <br />
              3,或领补贴:160轮合共: ＄7,680,000 /￥38,400,000元,(可提现)
              <br />
              4,共有A、B、C、D、E、VIP、F、G、H、I区各有160轮分红，
              <br />
              合现金CVA约＄34,247,040 / ￥171,235,200 元 +
              CVT提货通证5,208,000,000个
              <br />
              或领补贴: ＄14,400,000 /￥72,000,000元
              <br />
              5,任何区若分享N个: 有(160+N轮) 收益,
              <br />
              6,送ABG 金豆红股3,200股, 高级合伙人(限额）参加年终奖.
              <br />
              7,任务: 30个月内分享635个(C区320个,D区160个,E区80个，VIP区40个，
              <br />
              F区县级代表20个，G区市级代表10个，H区省级代表5个)区块点
              <br />
            </p>
          </Cell>
        );
      case "洲域代表(全球七大洲)":
        return (
          <Cell title="说明">
            <p>
              一次性消费：＄640,000 CVA /￥3,200,000元
              <br />
              1,无分享有320轮收益, 共现金分红CVA约＄73,728,000
              /￥368,640,000元(可提现)
              <br />
              2,配CVT提货通证1,024,000,000个,
              可换领价值＄102,400,000/￥512,000,000元产品,
              <br />
              3,或领补贴:360轮合共: ＄34,560,000 /￥172,800,000元,(可提现)
              <br />
              4, 共有A、B、C、D、E、VIP、F、G、H、I、K区各有360轮分红，
              <br />
              合共现金分红CVA约＄142,222,080 / ￥711,110,400 元 +
              CVT提货通证20,656,000,000个
              <br />
              或可领消费补贴额: ＄63,360,000 /￥316,800,000元
              <br />
              5,任何区若分享N个: 有(320+N轮) 收益,
              <br />
              6,送ABG 金豆红股6,000股,高级合伙人(限额）参加年终奖.
              <br />
              7,任务：36个月内分享1275个(C区640个，D区320个，E区160个，VIP区80个，
              <br />
              F区县级代表40个，G区市代表20个, H区省级代表10个,
              I区国家级代表5个)区块点
              <br />
            </p>
          </Cell>
        );
    }
  };

  return (
    <>
      <FuncHeader title={"购买套餐"} goBack={() => history.push("/")} />
      <div style={{ marginTop: "60px" }}>
        <Cell title="区块类型">
          <Input readOnly type="text" defaultValue={areaType + "区"} />
        </Cell>
        <Cell
          description={
            <Radio.Group
              type="button"
              value={coinType}
              onChange={(value) => {
                setCoinType(value);
              }}
            >
              <Radio value="Cva">CVA</Radio>
              <Radio value="Rpt">RPT</Radio>
              {/*<Radio value="abg">ABG金豆</Radio>*/}
            </Radio.Group>
          }
        >
          支付类型
        </Cell>
        <Cell title="支付密码">
          <Input
            type="password"
            value={payPassword}
            onChange={(value) => {
              setPayPassword(value);
            }}
            placeholder={"请输入支付密码"}
          />
        </Cell>
        {shuoMing(areaType)}
        <Cell>
          <Button
            block
            theme="primary"
            style={{ marginTop: "20px" }}
            onClick={() => handleClick()}
          >
            确认购买
          </Button>
        </Cell>
      </div>
    </>
  );
}
