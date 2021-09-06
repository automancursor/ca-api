import React, { useEffect, useState } from "react";
import * as headerStyles from "../Search/Header/header.module.scss";
import * as styles from "../Category/RightPanel/rightPanel.module.scss";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import * as actionCreators from "store/actionCreators/index";
import arrowLeftIcon from "assets/search/arrow-left.png";
import axios from "axios";
import { BASE_URL } from "../../utils/request/config";

export default function List() {
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  const [allProducts, getAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // get products
  const getProducts = (id, token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`${BASE_URL}/shop/product/category/${id}`, config)
      .then((response) => {
        if (response.status === 400 || response.status === 500)
          throw response.data;
        if (response.data.data) {
          getAllProducts(response.data.data);
        }
      })
      .catch((err) => {
        throw err[1];
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  // get images from api split
  function getImg(str) {
    if (!str) {
      return "";
    }
    const rt = str.split("&&");
    return rt[0];
  }

  useEffect(() => {
    // decode url
    const input = decodeURIComponent(
      history.location.search.replace("?id=", "")
    );
    if (isAuthed) {
      getProducts(input, token);
    }
  }, [history.location.search, token]);
  return (
    <div>
      <div className={headerStyles["search-container"]}>
        <div className={headerStyles["search-container-icon"]} onClick={goBack}>
          <img src={arrowLeftIcon} alt="返回上一页" />
        </div>
      </div>
      {isLoading ? (
        <div>加载中</div>
      ) : (
        <div>
          {allProducts.map((item) => {
            return (
              <div>
                <div
                  key={item?.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                    marginBottom: 5,
                    marginTop: 5,
                  }}
                  onClick={() =>
                    history.push("/productdetail?itemId=" + item?.id)
                  }
                >
                  <img
                    style={{ width: 100, height: 100 }}
                    alt="icon"
                    src={getImg(item?.productImages)}
                  />
                  <div style={{ marginLeft: 30, flex: 1 }}>
                    <span style={{ fontSize: "16px" }}>{item?.name}</span>
                    <br />
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {item?.cvtPrice} CVT
                    </span>
                  </div>
                  <div style={{ marginLeft: 30, flex: 1, marginRight: 10 }}>
                    <span>种类：{item.category?.name}</span>
                    <br />
                    <span>商家名称：{item.userName}</span>
                    <br />
                    <span>剩余库存：{item.quantity}</span>
                    <br />
                    <div style={{ wordBreak: "break-word" }}>
                      地址：{item.address}
                    </div>
                    <br />
                    <span>
                      {item.productStatus === "ACTIVE" ? "热卖中" : "已下架"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
