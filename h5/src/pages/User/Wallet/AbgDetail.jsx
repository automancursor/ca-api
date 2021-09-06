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

export default function AbgDetail() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let walletId = useSelector((state) => state.user?.data?.wallet?.id);
  const history = useHistory();
  const [abgDetailData, setabgDetailData] = useState();

  const goBack = () => {
    history.goBack();
  };

  const abgDetailDataFetch = async () => {
    let request = new Request();
    try {
      let response = await request.fetchData(
        "/UserProfile/walletHistories/abg/" + walletId,
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
      setabgDetailData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!abgDetailData) {
      abgDetailDataFetch();
    }
  }, [abgDetailData]);

  return (
    <>
      <FuncHeader title={"ABG钱包明细"} goBack={() => history.push("/user")} />
      {abgDetailData ? (
        <div
          className="table-responsive"
          style={{ marginTop: "50px", marginBottom: "55px", fontSize: "14px" }}
        >
          <BootstrapTable
            keyField="id"
            data={abgDetailData}
            columns={walletColumns}
            hover={true}
          />
        </div>
      ) : null}
    </>
  );
}
