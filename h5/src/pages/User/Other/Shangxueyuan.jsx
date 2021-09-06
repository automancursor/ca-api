import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FuncHeader from "components/FuncHeader/FuncHeader";

export default function Shangxueyuan() {
  const history = useHistory();
  // need to add api
  return (
    <>
      <FuncHeader title={"商学院报名"} goBack={() => history.push("/user")} />
      <div style={{ marginTop: "60px", padding: "20px", fontSize: "15px" }}>
        <p>
          <strong>CVA世界商会章程</strong>
        </p>
        <p>&nbsp;</p>
        <p>
          <strong>第一章：立会注册全名</strong>：CVA World Merchant Association
          incorporated&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <p>中文：CVA世界商会</p>
        <p>
          英文:CVA CVA World Merchant Association
          incorporated&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <p>1. 会址：7/94 Beamish St. Campsie NSW 2194 Australia</p>
        <p>&nbsp;2. 宗旨与目标: 团结互助，利他精神。</p>
        <p>
          &nbsp;3.本会注册为一个非牟利慈善机构,纯为本会各行业商家及消费商，谋求福利之公益组织。目的在联络促进团结与举办慈善活动为会员福利事业，文娱及康乐活动，发扬中华文化风俗之优良传统，促进澳洲本土与全球各地区的商会之友谊交流合作，以商养商为宗旨。
        </p>
        <p>
          <strong>第二章：会</strong>
          <strong>员</strong>
        </p>
        <p>
          一。凡未成为CVA
          消费商，供应商，合作商与各界人士，年满十八岁以上，不分性别，宗教信仰，敎育程度，品行端正，赞同本会宗旨，承认本会会章，经二位会员推荐，并经常务理事会通过者，皆可申请成为本会会员。
        </p>
        <p>二。凡已参加CVA消费商任何套装者，都符合资格成为会员。</p>
        <p>三。会员之权利：</p>
        <p>&nbsp; &nbsp; 1.凡入会会龄满六个月，享有选举权和被选权。</p>
        <p>
          &nbsp; &nbsp; 2.享有会内一切公益活动和享受本会举办的福利事业的权利。
        </p>
        <p>&nbsp; &nbsp; 3.享受每年敬老联欢宴免费招待。</p>
        <p>&nbsp; &nbsp; 4.对本会工作有建设性的提议和批评之权利。</p>
        <p>四。会员义务：</p>
        <p>&nbsp; &nbsp; 1. 遵守会章，服从本会决议，完成本会交给的任务。</p>
        <p>&nbsp; &nbsp; 2.维护本会名誉。</p>
        <p>&nbsp; &nbsp; 3.协助促进本会各项事务。</p>
        <p>&nbsp; &nbsp; 4.本会会员以失去会籍论：</p>
        <p>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;a. 逝世或经法庭证明失踪者。</p>
        <p>&nbsp;&nbsp; &nbsp; &nbsp; b. 自动申请退会者。</p>
        <p>&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;c. 違犯会章，破坏本会名誉者。</p>
        <p>&nbsp; &nbsp; &nbsp; d. 经法庭以刑事罪案判处监禁者。</p>
        <p>五。入会会费：</p>
        <p>
          &nbsp;&nbsp; 每年会费澳币$100 或一次性缴交$1000
          成为永久会员。凡未参加CVA消费商，入商会即送A区套装一个，第一轮无产品领取。
        </p>
        <p>
          <strong>第三章：</strong>
          <strong>组织</strong>
          <strong>法</strong>
        </p>
        <p>
          (一)。本会是CVA园梦有限公司其中一个非盈利版块，以团结互助，利他精神，互助共享的一个连接世界区块鏈量子科技的商会，每年於十月召开会员大会听取会务汇报及不同组别的事务报告。必要吋在非常务会员大会上，可使用决议权与罷免权。
        </p>
        <p>(二)。会员大会定於每年十月召开。</p>
        <p>(三)。会员大会由理节会召集之，必要吋由理事会决定提前或延期召开。</p>
        <p>
          (四)。理监事会委员由会员大会选举32票数最多的理事委员组成理监事会成员(每屆委员数目得以調整)，理监事会每屆任期三年，滿任后，必须換屆改选。
        </p>
        <p>
          (五)。換屆改选委员会由当屆理监事会于满任前5个月推荐给选举工作小组，负责筹备选举事宜。
        </p>
        <p>(六)。本会之组织结构：</p>
        <p>
          &nbsp; &nbsp; 1.
          商会是由CVA原创股東和CVA高级合伙人为本会之二个最高权力与领导组织。
        </p>
        <p>&nbsp; &nbsp;2.理监事会结构：</p>
        <p>
          &nbsp; &nbsp; &nbsp; A.
          理监事会成员为会务之执行者，依照会章和规则去处理会务：所涉及在行政，经济，人事，财政，福利，外交，文娱，康乐，教育等方面各项事务或活动。措理商会公产事务吋，必须获得董事局管理委员会同意。
        </p>
        <p>&nbsp; &nbsp; &nbsp; B .由董事局在32 位当选理事中。委任会长一名。</p>
        <p>&nbsp; &nbsp; &nbsp; C. 理事会成员为25 位，监事会成员为7 位。</p>
        <p>
          &nbsp; &nbsp; &nbsp; D.当屆会长卸任后为下一屆名誉会长，任期一屆三年。
        </p>
        <p>(七)。理监事会成员</p>
        <p>
          &nbsp;&nbsp;
          由当选的三十二位理监事成员互选执行会长二人及监事长一人，然后由理监事协商产生下列各组别委员:
        </p>
        <p>
          <strike>A.&nbsp;&nbsp;&nbsp;&nbsp; </strike>理事会
        </p>
        <p>会长1人：由董事局委任</p>
        <p>执行会长：2人</p>
        <p>副会长5人</p>
        <p>秘书处：中文秘书2人，英文秘书2人</p>
        <p>财政组：财政1人，出纳1人</p>
        <p>会计组：1人</p>
        <p>总务组：3人</p>
        <p>福利组：3人</p>
        <p>交际组：3人</p>
        <p>康乐组：4人</p>
        <p>高龄组：3人</p>
        <p>交际组：3人</p>
        <p>青年组：若干人</p>
        <p>旅游组：若干人</p>
        <p>&nbsp;</p>
        <p>B. 监事会：</p>
        <p>监事长：1人</p>
        <p>副监事长：2人</p>
        <p>监事成员：3人</p>
        <p>稽核：2人</p>
        <p>(八)。常务理事会成员及職守</p>
        <p>
          &nbsp;
          1。会长：对外代表本会，签署有关文件和合约。对內统理理事会各部门。根据议決案，督导各部门推行会务工作，召开会议一切常会与非常会。
        </p>
        <p>
          &nbsp;
          2。副会长：处理內部行政事务，为本会发言人。若处理重大事务，必须邀请会长甚至董事局主席列席会议，副会长当选后，必须於一个月内组成理事会，若遇上困难时，应上呈会长共同协商处理之。协助会长处理会务，会长缺席时，代表会长执行職杈。
        </p>
        <p>
          &nbsp;
          3。会长助理：协助內部处理行政事务，副会长缺席时，代表副会长执行職权。
        </p>
        <p>
          &nbsp;
          4。秘书处：中英文秘书负责文書工作，保管一切对内对外文件，承会长指示，发出对內书信文件，协助处理会内事务，由会长指示代表本会对外事务。在常务理事会的领导下，处理日常工作，并根据工作需要，設立各个机构与小组。
        </p>
        <p>
          &nbsp;
          5。财政：负责一切财务收支，与出纳配合财政运作。本会对银行一切來往则账单，支票之签发必须由会长或秘书或财政联署始为合法生效。财政一旦收到款项，应立即存入本会开设之银行账戶。
        </p>
        <p>&nbsp; 6。出纳：配合财政之日常财务收支事项。</p>
        <p>&nbsp; 7。常务理事：2~3 名，其職守由会长委任。</p>
        <p>(九)。理事会成员及職责：</p>
        <p>
          一).&nbsp;&nbsp;&nbsp;
          会长、执行会长，副会长、秘书处、财政、出纳、及常理事之職守，见上述之内容。
        </p>
        <p>
          &nbsp;二)
          &nbsp;&nbsp;&nbsp;总务组：保管、维护本会物资、器材，承会长、副会長、秘书、指示购置物料。
        </p>
        <p>&nbsp; 三).&nbsp;&nbsp; 会计：负责收支记帐工作，逐月作财政报告。</p>
        <p>
          &nbsp;四) .&nbsp;
          福利纽：筹備各项为会员谋取福利活动，协助会员向政府相糸部门求取福利或资助等。
        </p>
        <p>
          &nbsp; 五).&nbsp;
          &nbsp;高龄组：负责高龄会员之康乐之康乐活动，安排专业人士讲解健康生活智识。
        </p>
        <p>
          &nbsp; 六) .&nbsp;
          文教组：负责推展文化，教育工作，订立长期及短期教育计划，达到发展文教目标。
        </p>
        <p>&nbsp; 七) .&nbsp; 旅游组：负责组织遊览及户外活动。</p>
        <p>
          &nbsp; 八).&nbsp; 商务组：负责推展对外之交际活动，加強与社团联系。
        </p>
        <p>
          &nbsp;
          九)。青年祖：负责为年青会员介绍並提供学习中华优良传统文化，艺术课程，诸如書法、绘画、处世之道等等项目。
        </p>
        <p>&nbsp; 十) .&nbsp; 监事会成员及责守：</p>
        <p>
          一。由当选监事长委任二位副监事长，一位稽核及三位监事以组成监事会。监事会具备监察当屆理事会之运作权限及列席理事会例会。
        </p>
        <p>二。稽核负责复核理事会财政组之收支來往账簿与单据。</p>
        <p>三。监事会若发现任何理事会成员有：</p>
        <p>&nbsp; &nbsp;A。違章</p>
        <p>&nbsp; &nbsp;B。犯规</p>
        <p>&nbsp; &nbsp;C。破坏与损害会誉</p>
        <p>
          &nbsp;
          &nbsp;D。盗窃、吞侵、破坏财物时，必须召开监事会並将合法决议呈交理事会，从而召开理监事联席会议，解决措理。倘若不能解决时，须交会员大会解决。
        </p>
        <p>
          &nbsp; &nbsp;E.&nbsp;
          监事会成员倘不遵守会章与会规，知法犯法者，理事会亦具同等权力召开理监事联席会议处理，倘不能解决时，须交会员大会处理。
        </p>
        <p>十一) 董事局结構：</p>
        <p>
          &nbsp;
          一。董事局委员不設人数上限，每屆任期为三年，董事局法人必须由董事局主席、秘书长及财政共三人组成，法人由董事局委员会推选。
        </p>
        <p>&nbsp; 二。董事局成员与職称：</p>
        <p>&nbsp; &nbsp;荣誉主席：若干人&nbsp;</p>
        <p>&nbsp; 名 誉主席：若干人</p>
        <p>&nbsp; &nbsp;荣誉顾问：若干人&nbsp;&nbsp;</p>
        <p>&nbsp; 名 誉 顾 问：若干人</p>
        <p>
          &nbsp; &nbsp;主席：1人&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp;
        </p>
        <p>&nbsp; &nbsp;副主席：3或4人</p>
        <p>&nbsp; &nbsp;中文秘书长：1人&nbsp; &nbsp;</p>
        <p>&nbsp;&nbsp; 英文秘书长：1人</p>
        <p>&nbsp; &nbsp;财政：1人</p>
        <p>&nbsp; &nbsp;常务董事：5至10人</p>
        <p>&nbsp; &nbsp;董事：10至20人</p>
        <p>&nbsp;三。董事局管理委员会成员：</p>
        <p>&nbsp; &nbsp;荣誉主席：2人&nbsp; &nbsp; &nbsp;</p>
        <p>&nbsp;&nbsp; 名誉主席：2人</p>
        <p>&nbsp; &nbsp;荣誉顾问：2人&nbsp; &nbsp; &nbsp;</p>
        <p>
          &nbsp; &nbsp;主席：&nbsp; &nbsp; &nbsp; &nbsp; 1人&nbsp; &nbsp; &nbsp;
        </p>
        <p>&nbsp; 副主席：1或2人</p>
        <p>&nbsp; &nbsp;中文秘书长1人&nbsp; &nbsp; &nbsp;</p>
        <p>&nbsp;&nbsp; 英文秘书长：1人</p>
        <p>
          &nbsp; &nbsp;财政：&nbsp; &nbsp; &nbsp; &nbsp; 1人&nbsp; &nbsp; &nbsp;
          &nbsp;
        </p>
        <p>&nbsp; 常务董事：2至3人</p>
        <p>&nbsp; 四。董事局成员年费：</p>
        <p>
          &nbsp; &nbsp;
          A)荣誉主席、名誉主席、荣誉顾问、名誉顾问及主席每年必须缴纳年费澳币二千元。
        </p>
        <p>&nbsp; &nbsp; B)副主席、常务董事每年必须缴纳年费澳币一千元。</p>
        <p>&nbsp; &nbsp; &nbsp;C)欢迎董事会局成员乐捐。</p>
        <p>
          &nbsp;
          五。常务董事之资格來自或是聘请或是乐捐。而秘书长及财政为当然常务董事並免除其缴纳年费之例。个别人士如能为吾会作出贡献者並经董事局核準可以聘为常务董事及董事。免缴交年费。
        </p>
        <p>&nbsp; &nbsp;六。董事局之功能与权责：</p>
        <p>&nbsp; &nbsp; &nbsp;A) 董事局为世界商会之最高领导组织。</p>
        <p>
          &nbsp; &nbsp; &nbsp;B) 监督其属下各组织、属会之运作，评估其表现成果。
        </p>
        <p>
          &nbsp; &nbsp; &nbsp;C)
          藉此世界商会公产运作及保护公产完整，发展有利於本会公益事业，例如：建立安老院、购置義莊等等。
        </p>
        <p>
          &nbsp; &nbsp; &nbsp;D)
          在行政管理方面：提供指导思想，视乎实际情况而定，可接纳具有建设性及可行性之建议方案。
        </p>
        <p>
          &nbsp; &nbsp; &nbsp;E)
          在财政支配方面：属下各个组织，属社及属会，倘若其活动项目或方案，需要部分资金支援者，经董事局表:决通过后，有责任出资，令该方案或活动项目能投入正常运作领域，最后取得预期成果。
        </p>
        <p>
          &nbsp; &nbsp; &nbsp;F)
          在人事调度方面：具备参与权及決策权，置适当人选，9担任适当職守为大前题。
        </p>
        <p>
          &nbsp; &nbsp; &nbsp;G)
          董事局属下组织包括：世界华商会之理事会占监事会及日后增设之其他属社和属会。
        </p>
        <p>
          &nbsp; &nbsp; &nbsp;H)
          会长任期三年屆满后，对会务有良好的表现，若获得董事局三位常务委员推荐並经董事局通过者，可进入董事局担任副主席之職守。
        </p>
        <p>
          &nbsp;<strong>第四章：理</strong>
          <strong>监</strong>
          <strong>事会之</strong>
          <strong>产</strong>
          <strong>生法</strong>
          <strong>则</strong>
          <strong>：</strong>
        </p>
        <p>&nbsp;一。本商会规定每年召开会员大会一次，日期定于十月份。</p>
        <p>
          二。本商会理监事每屆三年。会长，监事长连任二屆后，不得再连任，隔二屆后才可再次参选。
        </p>
        <p>三。理监事会任期屆满前五个月，应成立筹选委员会，策划选举工作。</p>
        <p>四。理监事任期屆满后，可以提名为下一屆之理监事候选人。</p>
        <p>
          五。理监事候选人之人远，应由本会会员一人提名加三人附议，及必须在提名表格上签名，候选人也必须同意应选並在提名表上签名，方为合例。
        </p>
        <p>
          六。本会选举理监事之提名表，由秘书处于选举前一个月寄出至各会员，每一会员只能推荐一位理监事候选人，但可附议三位候选人，逾额附议无效。
        </p>
        <p>
          七。每屆当选之会长，如聘请各荣誉会长，名誉会长，名誉顾问，常务顾问，顾问等等，一律要经理监事会通过，否则无效。
        </p>
        <p>
          八。凡被聘请之常务顾问，不属理监事会成员，可以列席理监事会议，但无投票杈。
        </p>
        <p>
          <strong>第五章：</strong>
          <strong>经费</strong>
          <strong>与事</strong>
          <strong>业</strong>
          <strong>/</strong>
          <strong>费</strong>
          <strong>來源：</strong>
        </p>
        <p>1) 会员之会费。</p>
        <p>2) 董事局委员年费及捐献。</p>
        <p>3) 理监事会委员和会员，鄉亲捐献及赞助。</p>
        <p>4) 社会热心人士捐献。</p>
        <p>5) 董事局委员会荣誉職衔條例：</p>
        <p>
          &nbsp;&nbsp;一。凡为本会多年来作出贡献及服务之鄉亲,会员均是董事局聘请的人士，必须由董事局审核批準。
        </p>
        <p>&nbsp;二。董事局委员会特敦聘下列荣誉職衔：</p>
        <p>
          &nbsp; &nbsp;A)
          凡热心为董事局赞助澳币拾万元以上者，董事局特聘请为本会董事局永远荣誉主席。
        </p>
        <p>
          &nbsp; &nbsp;B)
          凡热心为董事局赞助澳币五万元以上者，董事局特聘请为本会董事局永远名誉主席。
        </p>
        <p>
          &nbsp; &nbsp;C)
          凡热心为董事局赞助澳币二万元以上者，董事局特聘请为本会董事局永远荣誉顾问。
        </p>
        <p>
          &nbsp;
          &nbsp;D)成为永远荣誉名誉職衔者免缴纳年费，同时也成为当然的常务董事。
        </p>
        <p>
          <strong>第六章：属会、属社條例</strong>
        </p>
        <p>
          本会为发展及壮大会务起见，同意属会属社之组，必须遵守本会之章规及领导。凡自组附属必须得理监事会之核准才能成立。其组成机構成员必须为合法之CVA消费商才能成为会员。组立之机构其條例必须呈上本会当屆理监事会通过才能生效。
        </p>
        <p>
          <strong>第七章：附</strong>
          <strong>则</strong>
        </p>
        <p>一) 本会章修改权属于会员代表大会。</p>
        <p>
          二)
          本会章经会员代表大会即世界商会理监事会成员及董事局成员重订后，並通过实行。
        </p>
        <p>三) 由公元2021年5月22日开始生效。</p>
      </div>
    </>
  );
}
