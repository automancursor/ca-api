import React, { useState, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Input,
  Cell,
  Button,
  Radio,
  FilePicker,
  Icon,
  Toast,
  Badge,
  Picker,
  Select,
} from "zarm";
import "zarm/dist/zarm.css";
import FuncHeader from "components/FuncHeader/FuncHeader";
import axios from "axios";
import { BASE_URL } from "../../../../utils/request/config";
import _ from "lodash";
import * as QueryString from "query-string";

let iId = null;

const MAX_FILES_COUNT = 5;

const CASCADE_DATA = [
  {
    value: "1",
    label: "北京市",
  },
  {
    value: "2",
    label: "上海市",
  },
];
let productDescriptionObj = null;

export default function XiaoPuAdd() {
  const history = useHistory();
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  const [product, setProduct] = useState([]);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [cvt, setCvt] = useState(null);
  const [categoryId, setCategoryId] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const [allCategory, setAllCategory] = useState([]);

  const [value, setValue] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  iId = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }).itemId;

  useEffect(() => {
    if (product?.productDescription) {
      productDescriptionObj = JSON.parse(product?.productDescription);
      console.log(productDescriptionObj);
    }
  }, [product]);

  function getProduct(id, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(BASE_URL + "/shop/product/" + id, config)
      .then((response) => {
        if (response.status === 400 || response.status === 500)
          throw response.data;
        if (response.data.data) {
          setProduct(response.data.data);
          setName(response.data.data?.name);
          setCvt(response.data.data?.cvtPrice);
          setValue(response.data.data?.name);
          setQuantity(response.data.data?.quantity);
          setAddress(response.data.data?.address);
          setProductDescription(response.data.data?.productDescription);
        }
      })
      .catch((err) => {
        throw err[1];
      });
  }

  function getAllCategory(id, token) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(BASE_URL + "/shop/category", config)
      .then((response) => {
        if (response.status === 400 || response.status === 500)
          throw response.data;
        if (response.data.data) {
          setAllCategory(response.data.data);
        }
      })
      .catch((err) => {
        throw err[1];
      });
  }

  useEffect(() => {
    if (isAuthed) {
      getProduct(iId, token);
      getAllCategory(userId, token);
    }
  }, [userId]);

  useEffect(() => {
    setTimeout(() => {
      const newCate = [];
      allCategory.map((item) => {
        newCate.push(
          _.mapKeys(item, (value, key) => {
            let newKey = key;
            if (key === "id") {
              newKey = "value";
            }

            if (key === "name") {
              newKey = "label";
            }

            return newKey;
          })
        );
      });
      setDataSource(newCate);
    }, 0);
  }, [allCategory]);

  const onSelect = (selFiles) => {
    const newFiles = files.concat(selFiles);
    if (newFiles.length > MAX_FILES_COUNT) {
      Toast.show("最多只能选择5张图片");
      return;
    }
    setFiles(newFiles);
  };

  const remove = (index) => {
    const newFiles = [].concat(files);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    Toast.show("删除成功");
  };

  const imgRender = () => {
    return files.map((item, index) => {
      return (
        <Badge
          key={+index}
          className="file-picker-item"
          shape="circle"
          text={
            <span className="file-picker-closebtn">
              <Icon type="wrong" />
            </span>
          }
          onClick={() => remove(index)}
          style={{ padding: "10px" }}
        >
          <div className="file-picker-item-img">
            <a href={item.thumbnail} target="_blank" rel="noopener noreferrer">
              <img
                src={item.thumbnail}
                alt=""
                style={{
                  height: "60px",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              />
            </a>
          </div>
        </Badge>
      );
    });
  };

  const sucessConfirm = (result) => {
    if (result.status == 401) {
      window.confirm("商家未验证通过。");
    }
    if (result.status == "ERROR") {
      window.confirm("信息输入错误。");
    }
    if (result.status == "Success") {
      if (window.confirm("操作成功。")) {
        history.push("/user");
      }
    }
  };
  //handling submit
  const handleClick = async () => {
    if (
      name &&
      cvt &&
      categoryId &&
      quantity &&
      address &&
      productDescription
    ) {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var formdata = new FormData();
        formdata.append("Name", name);
        formdata.append("Cvt", cvt);
        formdata.append("CategoryId", categoryId);
        formdata.append("Quantity", quantity);
        formdata.append("Address", address);
        formdata.append("ProductDescription", productDescription);
        formdata.append("ID", iId);
        formdata.append("ProductStatus", "ACTIVE");
        var requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };
        fetch(BASE_URL + "/shop/product", requestOptions)
          .then((response) => response.json())
          .then((result) => sucessConfirm(result))
          .catch((error) => window.confirm("未知错误"));
      } catch (error) {
        window.confirm("未知错误");
      }
    } else {
      window.confirm("请输入所有选项。");
    }
  };
  const debounceHandleClick = _.throttle(handleClick, 8000, {
    leading: true,
    trailing: false,
  });

  return (
    <>
      <FuncHeader title="添加产品" goBack={() => history.push("/shangcheng")} />
      <div style={{ marginTop: "5rem", marginBottom: "5rem" }}>
        {/*<Cell title="双击上传图片">*/}
        {/*  <div className="file-picker-wrapper" style={{ marginTop: "10px" }}>*/}
        {/*    {imgRender()}*/}
        {/*    {files.length < MAX_FILES_COUNT && (*/}
        {/*      <FilePicker*/}
        {/*        multiple*/}
        {/*        className="file-picker-btn"*/}
        {/*        accept="image/*"*/}
        {/*        onChange={onSelect}*/}
        {/*      >*/}
        {/*        <Icon type="add" size="lg" />*/}
        {/*      </FilePicker>*/}
        {/*    )}*/}
        {/*  </div>*/}
        {/*</Cell>*/}
        <Cell title="产品名">
          <Input
            type="text"
            value={name}
            onChange={(value) => {
              setName(value);
            }}
            placeholder={"请输入产品名"}
          />
        </Cell>
        <Cell title="价格（CVT）">
          <Input
            type="number"
            value={cvt}
            onChange={(value) => {
              setCvt(value);
            }}
            placeholder={"请输入价格"}
          />
        </Cell>
        <Cell title="类别">
          {allCategory ? (
            <Select
              value={value}
              wheelDefaultValue={value}
              dataSource={dataSource}
              onOk={(selected) => {
                setValue(selected.map((item) => item.value));
                setCategoryId(selected.map((item) => item.value));
              }}
            />
          ) : null}
        </Cell>
        <Cell title="库存量">
          <Input
            type="number"
            value={quantity}
            onChange={(value) => {
              setQuantity(value);
            }}
            placeholder={"请输入库存量"}
          />
        </Cell>
        <Cell title="地址">
          <Input
            type="text"
            value={address}
            onChange={(value) => {
              setAddress(value);
            }}
            placeholder={"请输入地址"}
          />
        </Cell>
        <Cell title="品牌名">
          <Input
            type="text"
            value={productDescriptionObj?.brand}
            // onChange={(value) => {
            //   setAddress(value);
            // }}
            placeholder={"请输入品牌名"}
          />
        </Cell>
        <Cell title="产地">
          <Input
            type="text"
            value={productDescriptionObj?.place}
            // onChange={(value) => {
            //   setAddress(value);
            // }}
            placeholder={"请输入产地"}
          />
        </Cell>
        <Cell title="产品条件">
          <Input
            type="text"
            value={productDescriptionObj?.condition}
            // onChange={(value) => {
            //   setAddress(value);
            // }}
            placeholder={"请输入产品条件"}
          />
        </Cell>
        <Cell title="产品介绍">
          <Input
            autoHeight
            showLength
            maxLength={1000}
            type="text"
            rows={5}
            placeholder="请输入"
            value={productDescriptionObj?.description}
            // onChange={setProductDescription}
          />
        </Cell>
        <Cell>
          <Button
            block
            theme="primary"
            style={{ marginTop: "20px" }}
            onClick={() => debounceHandleClick()}
          >
            提交
          </Button>
        </Cell>
      </div>
    </>
  );
}
