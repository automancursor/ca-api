import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import FuncHeader from "components/FuncHeader/FuncHeader";
import {
  Input,
  Cell,
  Button,
  Radio,
  FilePicker,
  Icon,
  Toast,
  Badge,
} from "zarm";
import "zarm/dist/zarm.css";
import { Request } from "../../../utils/request";
import {
  BASE_URL,
  CONTENT_TYPE,
  REQUEST_METHOD,
} from "../../../utils/request/config";

import sfz1 from "assets/user/sfz1.png";
import sfz2 from "assets/user/sfz2.png";
import sfz3 from "assets/user/sfz3.png";
import searchIconPath from "../../../assets/home/search.png";

const MAX_FILES_COUNT = 3;

export default function Verification() {
  let isAuthed = useSelector((state) => state.auth.isAuthed);
  let token = useSelector((state) => state.auth.token);
  const [confirmVerify, setConfirmVerify] = useState([]);
  let userId = useSelector((state) => state.auth.userId);
  let userEmail = useSelector((state) => state.user?.data?.email);
  let userMobile = useSelector((state) => state.user?.data?.phoneNumber);
  let walletData = useSelector((state) => state.user?.data?.wallet);
  const [files, setFiles] = useState([]);
  const history = useHistory();
  const [docType, setDocType] = useState("idcard");
  const [docID, setDocID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [verifyType, setVerifyType] = useState("email");
  const [toVerifyCode, setVerifyCode] = useState("");

  const getConfirmVerify = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(BASE_URL + "/UserProfile/user_verification/", requestOptions)
      .then((response) => response.json())
      .then((result) => setConfirmVerify(result.data))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (isAuthed) {
      getConfirmVerify();
    }
  }, [isAuthed]);

  const onSelect = (selFiles) => {
    const newFiles = files.concat(selFiles);
    if (newFiles.length > MAX_FILES_COUNT) {
      Toast.show("??????????????????3?????????");
      return;
    }
    setFiles(newFiles);
  };

  const remove = (index) => {
    const newFiles = [].concat(files);
    newFiles.splice(index, 1);
    setFiles(newFiles);
    Toast.show("????????????");
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

  const getCode = async () => {
    // console.log(JSON.stringify(files[0]?.file))
    if (files[2]?.file) {
      let request = new Request();
      let url;
      let body;
      verifyType === "email"
        ? (body = { Email: userEmail })
        : (body = { Mobile: userMobile });
      verifyType === "email"
        ? (url = "/UserProfile/email_code")
        : (url = "/UserProfile/sms_code");
      try {
        let response = await request.fetchData(url, {
          method: REQUEST_METHOD.POST,
          contentType: CONTENT_TYPE.JSON,
          token,
          body,
        });
        window.confirm("????????????");
      } catch (error) {
        window.confirm("????????????");
      }
    } else {
      window.confirm("???????????????3??????????????????????????????????????????");
    }
  };
  const debounceGetCode = _.throttle(getCode, 8000, {
    leading: true,
    trailing: false,
  });

  const sucessConfirm = () => {
    if (window.confirm("???????????????")) {
      history.push("/user");
    }
  };

  const handleClick = async () => {
    if (toVerifyCode) {
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var formdata = new FormData();
        formdata.append("IdCard", docID);
        formdata.append("FirstName", firstName);
        formdata.append("LastName", lastName);
        formdata.append("Address", address);
        formdata.append("Passport", "");
        formdata.append("IdCardAttachedFiles", files[0]?.file);
        formdata.append("IdCardAttachedFiles", files[1]?.file);
        formdata.append("IdCardAttachedFiles", files[2]?.file);
        formdata.append("VerifyCode", toVerifyCode);
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };
        fetch(BASE_URL + "/UserProfile/user_verification", requestOptions)
          .then((response) => response.json())
          .then((result) => sucessConfirm())
          .catch((error) => window.confirm("????????????"));
      } catch (error) {
        window.confirm("????????????");
      }
    } else {
      window.confirm("??????????????????");
    }
  };
  const debounceHandleClick = _.throttle(handleClick, 8000, {
    leading: true,
    trailing: false,
  });

  const checkSuccess = (ctype) => {
    if (ctype.length === 0) {
      return true;
    } else return ctype[0]?.userVerificationStatus === "REJECTED";
  };

  return (
    <>
      <FuncHeader title={"????????????"} goBack={() => history.push("/settings")} />
      {confirmVerify ? (
        checkSuccess(confirmVerify) ? (
          <div style={{ marginTop: "60px", marginBottom: "60px" }}>
            <Cell title="????????????">
              <Input
                disabled
                type="text"
                rows={3}
                value={
                  confirmVerify.length === 0
                    ? "?????????"
                    : `???????????????${confirmVerify[0]?.adminMessage}`
                }
              />
            </Cell>
            <Cell title="????????????">
              <Input
                disabled
                type="text"
                rows={3}
                value="???????????????????????????????????????????????????PDF???JPG???PNG????????????????????????????????????"
              />
            </Cell>
            <Cell
              description={
                <Radio.Group
                  type="button"
                  value={docType}
                  onChange={(value) => {
                    setDocType(value);
                  }}
                >
                  <Radio value="idcard">?????????/??????</Radio>
                  <Radio value="password">??????</Radio>
                </Radio.Group>
              }
            >
              ????????????
            </Cell>
            <Cell title="?????????">
              <Input
                type="text"
                value={docID}
                onChange={(value) => {
                  setDocID(value);
                }}
                placeholder={"?????????????????????"}
              />
            </Cell>
            <Cell title="???">
              <Input
                type="text"
                value={firstName}
                onChange={(value) => {
                  setFirstName(value);
                }}
                placeholder={"????????????"}
              />
            </Cell>
            <Cell title="???">
              <Input
                type="text"
                value={lastName}
                onChange={(value) => {
                  setLastName(value);
                }}
                placeholder={"????????????"}
              />
            </Cell>
            <Cell title="??????">
              <Input
                type="text"
                value={address}
                onChange={(value) => {
                  setAddress(value);
                }}
                placeholder={"???????????????"}
              />
            </Cell>
            <Cell title="??????????????????">
              <div
                className="file-picker-wrapper"
                style={{ marginTop: "10px" }}
              >
                {imgRender()}
                {files.length < MAX_FILES_COUNT && (
                  <FilePicker
                    multiple
                    className="file-picker-btn"
                    accept="image/*"
                    onChange={onSelect}
                  >
                    {/*<Icon type="add" size="lg" />*/}
                    <div>
                      <img src={sfz1} alt="1" style={{ width: "100px" }} />
                      <img src={sfz2} alt="2" style={{ width: "100px" }} />
                      <img src={sfz3} alt="3" style={{ width: "100px" }} />
                    </div>
                  </FilePicker>
                )}
              </div>
            </Cell>
            <Cell
              description={
                <Radio.Group
                  type="button"
                  value={verifyType}
                  onChange={(value) => {
                    setVerifyType(value);
                  }}
                >
                  <Radio value="email">??????</Radio>
                  <Radio value="mobile">??????</Radio>
                </Radio.Group>
              }
            >
              ???????????????
            </Cell>
            <Cell>
              <Button
                block
                style={{ marginTop: "20px", marginBottom: "20px" }}
                onClick={() => debounceGetCode()}
              >
                ???????????????
              </Button>
            </Cell>
            <Cell title="?????????">
              <Input
                type="text"
                value={toVerifyCode}
                onChange={(value) => {
                  setVerifyCode(value);
                }}
                placeholder={"??????????????????"}
              />
            </Cell>
            <Cell>
              <Button
                block
                theme="primary"
                style={{ marginTop: "20px" }}
                onClick={() => debounceHandleClick()}
              >
                ??????
              </Button>
            </Cell>
          </div>
        ) : (
          <div style={{ marginTop: "60px" }}>
            {confirmVerify[0]?.userVerificationStatus === "SUCCESS" ? (
              <h3>??????????????????????????????</h3>
            ) : (
              <h3>??????????????????????????????</h3>
            )}
          </div>
        )
      ) : null}
    </>
  );
}
