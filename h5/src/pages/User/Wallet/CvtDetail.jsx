import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { Request } from "../../../utils/request";
import { CONTENT_TYPE, REQUEST_METHOD } from "../../../utils/request/config";
import BootstrapTable from "react-bootstrap-table-next";
import * as styles from "../user.module.scss";

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

export default function CvtDetail() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let walletId = useSelector((state) => state.user?.data?.wallet?.id);
  let cvtCredit = useSelector((state) => state.user?.data?.wallet?.cvtCredit);
  let cvt = useSelector((state) => state.user?.data?.wallet?.cvt);
  const history = useHistory();
  const [cvtDetailData, setcvtDetailData] = useState();

  const cvtDetailDataFetch = async () => {
    let request = new Request();
    try {
      let response = await request.fetchData(
        "/UserProfile/walletHistories/cvt/" + walletId,
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
      setcvtDetailData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!cvtDetailData) {
      cvtDetailDataFetch();
    }
  }, [cvtDetailData]);

  return (
    <>
      <FuncHeader title={"CVT钱包明细"} goBack={() => history.push("/user")} />
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
          <span>已释放CVT: {cvt}</span>
        </div>
        <div className="grid-column">
          <span>待释放CVT: {cvtCredit}</span>
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
          <span>合计CVT: {cvt + cvtCredit}</span>
        </div>
      </div>
      {cvtDetailData ? (
        <div
          className="table-responsive"
          style={{ marginBottom: "55px", fontSize: "14px" }}
        >
          <BootstrapTable
            keyField="id"
            data={cvtDetailData}
            columns={walletColumns}
            hover={true}
          />
        </div>
      ) : null}
    </>
  );
}
