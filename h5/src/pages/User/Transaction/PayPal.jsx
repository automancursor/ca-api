import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FuncHeader from "components/FuncHeader/FuncHeader";
import "zarm/dist/zarm.css";
import * as QueryString from "query-string";

import { PayPalButton } from "react-paypal-button-v2";

let id;
let amount;

export default function PayPal() {
  const history = useHistory();
  let token = useSelector((state) => state.auth.token);
  let userId = useSelector((state) => state.auth.userId);
  id = QueryString.parse(window.location.search, { ignoreQueryPrefix: true })
    .id;
  amount = QueryString.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }).amount;

  return (
    <>
      <FuncHeader title={"PalPay支付"} goBack={() => history.push("/user")} />
      <div style={{ marginTop: "60px" }}>
        <PayPalButton
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "AUD",
                    value: amount,
                  },
                  reference_id: id,
                },
              ],
              // application_context: {
              //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
              // }
            });
          }}
          onApprove={(data, actions) => {
            // Capture the funds from the transaction
            console.log(data);
            return actions.order.capture().then(function (details) {
              console.log(details);
              // Show a success message to your buyer
              // alert("Transaction completed by " + details.payer.name.given_name);
              var myHeaders = new Headers();
              myHeaders.append("Authorization", `Bearer ${token}`);
              myHeaders.append("Content-Type", "application/json");
              // OPTIONAL: Call your server to save the transaction
              return fetch(
                "https://v2.api.cvac.net.au/Transaction/recharge/paypal",
                {
                  method: "post",
                  headers: myHeaders,
                  body: JSON.stringify({
                    TransactionId: id,
                    PaymentCredentials: data.orderID,
                  }),
                }
              )
                .then((response) => response.json())
                .then((result) => history.push("/user"))
                .catch((error) => window.confirm("未知错误"));
            });
          }}
          options={{
            currency: "AUD",
            clientId:
              "AQMYOpCipm5HPdBJBZYR3VDVul7XSdixeKWODjbSjA-xkgK88P2cYOq6RgOOrS0X_Q0zLC2CrOe5Hx1d",
          }}
        />
      </div>
    </>
  );
}
