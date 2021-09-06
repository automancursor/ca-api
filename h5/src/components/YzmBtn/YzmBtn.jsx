import React, { useState, useEffect } from "react";
import { Button } from "zarm";
import "zarm/dist/zarm.css";

let timeChange;
// verification code components
const YzmBtn = () => {
  const [time, setTime] = useState(120);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnContent, setBtnContent] = useState("获取验证码");

  useEffect(() => {
    clearInterval(timeChange);
    return () => clearInterval(timeChange);
  }, []);

  useEffect(() => {
    if (time > 0 && time < 120) {
      setBtnContent(`${time}s后重发`);
    } else {
      clearInterval(timeChange);
      setBtnDisabled(false);
      setTime(120);
      setBtnContent("获取验证码");
    }
  }, [time]);

  const getPhoneCaptcha = () => {
    timeChange = setInterval(() => setTime((t) => --t), 1000);
    setBtnDisabled(true);
  };
  return (
    <Button
      block
      style={{ marginTop: "20px", marginBottom: "20px" }}
      disabled={btnDisabled}
      onClick={getPhoneCaptcha}
    >
      {btnContent}
    </Button>
  );
};

export default YzmBtn;
