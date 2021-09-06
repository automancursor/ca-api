import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as QueryString from "query-string";
import { Input, Cell, Button } from "zarm";
import "zarm/dist/zarm.css";

import FuncHeader from "components/FuncHeader/FuncHeader";
import { Request } from "../../utils/request";
import { CONTENT_TYPE, REQUEST_METHOD } from "../../utils/request/config";
import Bitmap from "../../assets/home/Bitmap.png";

export default function Block() {
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  const [areaClaims, setAreaClaims] = useState([]);

  // get area claim
  const areaClaimsFetch = async () => {
    let request = new Request();
    try {
      let response = await request.fetchData("/AreaRecord/claims", {
        method: REQUEST_METHOD.GET,
        contentType: CONTENT_TYPE.JSON,
        body: {},
      });
      setAreaClaims(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    areaClaimsFetch();
  }, []);

  return (
    <>
      <FuncHeader title={"购买套餐"} goBack={() => history.push("/")} />
      <div style={{ marginTop: "60px" }}>
        <div style={{ marginTop: "10px", marginBottom: "80px", width: "100%" }}>
          {areaClaims
            ? areaClaims.map((item) => (
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
                    fontSize: "16px",
                  }}
                  onClick={() =>
                    isAuthed
                      ? history.push(
                          "/buyblock?id=" +
                            item.id +
                            "&areaType=" +
                            item.areaType
                        )
                      : window.alert("请登录后继续")
                  }
                >
                  <p>购买 {item.name}</p>
                  <p>
                    CVA ${item.cva} / CVT{item.cvt} / ABG金豆 {item.abg}
                  </p>
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
