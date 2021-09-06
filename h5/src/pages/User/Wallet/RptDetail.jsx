import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { Request } from "../../../utils/request";
import { CONTENT_TYPE, REQUEST_METHOD } from "../../../utils/request/config";
import BootstrapTable from "react-bootstrap-table-next";

const walletColumns = [
  {
    dataField: "covertedDate",
    text: "时间",
    sort: false,
  },
  {
    dataField: "msg",
    text: "消息",
    sort: false,
  },
  {
    dataField: "changedValue",
    text: "+/-",
    sort: false,
  },
  {
    dataField: "afterValue",
    text: "余额",
    sort: false,
  },
];

export default function RptDetail() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let walletId = useSelector((state) => state.user?.data?.wallet?.id);
  const history = useHistory();
  const [rptDetailData, setrptDetailData] = useState();
  let rptDebts = useSelector((state) => state.user?.data?.wallet?.rptDebts);
  let rpt = useSelector((state) => state.user?.data?.wallet?.rpt);

  const goBack = () => {
    history.goBack();
  };

  const rptDetailDataFetch = async () => {
    let request = new Request();
    try {
      let response = await request.fetchData(
        "/UserProfile/walletHistories/rpt/" + walletId,
        {
          method: REQUEST_METHOD.GET,
          contentType: CONTENT_TYPE.JSON,
          token,
          body: {},
        }
      );
      let data = [];
      for (let key in response.data) {
        data.push({
          ...response.data[key],
          changedValue:
            response.data[key]?.afterValue - response.data[key]?.beforeValue > 0
              ? "+" +
                (response.data[key]?.afterValue -
                  response.data[key]?.beforeValue)
              : response.data[key]?.afterValue -
                response.data[key]?.beforeValue,
          covertedDate: response.data[key]?.createdDate.slice(5, 10),
        });
      }
      setrptDetailData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!rptDetailData) {
      rptDetailDataFetch();
    }
  }, [rptDetailData]);

  return (
    <>
      <FuncHeader title={"RPT钱包明细"} goBack={() => history.push("/user")} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "60px",
          marginBottom: "20px",
          fontSize: "14px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="grid-column" style={{ marginRight: "20px" }}>
          <span>总rpt: {rpt}</span>
        </div>
        <div className="grid-column">
          <span>欠款rpt: {rptDebts}</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
          marginBottom: "20px",
          fontSize: "14px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="grid-column" style={{ marginRight: "20px" }}>
          <span>可用RPT: {rpt - rptDebts}</span>
        </div>
      </div>
      {rptDetailData ? (
        <div
          className="table-responsive"
          style={{ marginTop: "50px", marginBottom: "55px", fontSize: "14px" }}
        >
          <BootstrapTable
            keyField="id"
            data={rptDetailData}
            columns={walletColumns}
            hover={true}
          />
        </div>
      ) : null}
    </>
  );
}
