import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { Routes } from "./router.config";

import Login from "pages/Login/Login";
import ForgotPassword from "pages/Login/ForgotPassword";
import Register from "pages/Register/Register";
import Validation from "pages/Register/Validation";

import AppLayout from "components/Layout/AppLayout";
import NotFound from "pages/NotFound/NotFound";
import LandingPage from "pages/LandingPage/LandingPage";
import Search from "pages/Search/Search";
import List from "pages/List/List";
import CategoryList from "pages/Category/CategoryList";

import Block from "pages/Home/Block";
import BuyBlock from "pages/Home/BuyBlock";

import ProductDetail from "pages/Category/ProductDetail";
import RptProductDetail from "pages/Category/RptProductDetail";

import Settings from "pages/Settings/Settings";
import Profile from "pages/User/Settings/Profile";
import UpdateProfile from "pages/User/Settings/UpdateProfile";
import Verification from "pages/User/Settings/Verification";
import ChangePassword from "pages/User/Settings/ChangePassword";
import ChangePayPassword from "pages/User/Settings/ChangePayPassword";
import PaymentMethod from "pages/User/Settings/PaymentMethod";
import Alipay from "pages/User/Settings/PaymentMethods/Alipay";
import Wechat from "pages/User/Settings/PaymentMethods/Wechat";
import CNBank from "pages/User/Settings/PaymentMethods/CNBank";
import OverseaBank from "pages/User/Settings/PaymentMethods/OverseaBank";
import BlockchainPayAddress from "pages/User/Settings/PaymentMethods/BlockchainPayAddress";
import Transefer from "pages/User/Transaction/Transefer";
import Recharge from "pages/User/Transaction/Recharge";
import RptChange from "pages/User/Transaction/RptChange";
import Reimbursement from "pages/User/Transaction/Reimbursement";
import Pay from "pages/User/Transaction/Pay";
import PayPal from "pages/User/Transaction/PayPal";
import Withdraw from "pages/User/Transaction/Withdraw";
import Huanhui from "pages/User/Transaction/Huanhui";
import CvtDetail from "pages/User/Wallet/CvtDetail";
import CvaDetail from "pages/User/Wallet/CvaDetail";
import AbgDetail from "pages/User/Wallet/AbgDetail";
import RptDetail from "pages/User/Wallet/RptDetail";
import QRCode from "pages/User/Other/QRCode";
import Kefu from "pages/User/Other/Kefu";
import Dingdan from "pages/User/Other/Dingdan";
import RptDingdan from "pages/User/Other/RptDingdan";
import ShopDingdan from "pages/User/Other/ShopDingdan";
import ShopVerification from "pages/User/Other/ShopVerification";

import JiFenChi from "pages/User/Other/JiFenChi";
import JiFenQu from "pages/Category/JiFenQu";
import PuPu from "pages/User/Other/PuPu";
import ZhiFuQR from "pages/User/Transaction/ZhiFuQR";
import CreateQR from "pages/User/Transaction/CreateQR";
import DingdanXiangQing from "pages/User/Other/DingdanXiangQing";
import RptDingdanXiangQing from "pages/User/Other/RptDingdanXiangQing";
import ShopDingdanXiangQing from "pages/User/Other/ShopDingdanXiangQing";

import XiaoPu from "pages/User/Other/JiFen/XiaoPu";
import XiaoPuXiangQing from "pages/User/Other/JiFen/XiaoPuXiangQing";
import XiaoPuAdd from "pages/User/Other/JiFen/XiaoPuAdd";
import XiaoPuEdit from "pages/User/Other/JiFen/XiaoPuEdit";

import ShangCheng from "pages/User/Other/Shop/ShangCheng";
import ShangChengGengxin from "pages/User/Other/Shop/ShangChengGengxin";
import ShangChengXiangQing from "pages/User/Other/Shop/ShangChengXiangQing";
import ShangChengAdd from "pages/User/Other/Shop/ShangChengAdd";
import ShangChengEdit from "pages/User/Other/Shop/ShangChengEdit";

import News from "pages/User/Other/News";
import Dianpuguanli from "pages/User/Other/Dianpuguanli";
import Shangxueyuan from "pages/User/Other/Shangxueyuan";
import Shijieshanghui from "pages/User/Other/Shijieshanghui";
import Gongyi from "pages/User/Other/Gongyi";
import Aboutus from "pages/User/Other/Aboutus";
import Shuoming from "pages/User/Other/Shuoming";
import Baipishu from "pages/User/Other/Baipishu";
import Other from "pages/User/Other/Other";
import Address from "pages/User/Settings/Address";
// Add all page router
export default function AppRouter(props) {
  return (
    <Router>
      <Switch>
        {Routes.map((route, index) => (
          <PrivateRoute key={index} exact path={route.path} isAuth={true}>
            <AppLayout content={<route.component />} />
          </PrivateRoute>
        ))}
        <Route exact path="/download">
          <LandingPage />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/list">
          <List />
        </Route>
        <Route exact path="/categoryList">
          <CategoryList />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/forgotPassword">
          <ForgotPassword />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/validation">
          <Validation />
        </Route>

        <Route exact path="/block">
          <Block />
        </Route>
        <Route exact path="/buyblock">
          <BuyBlock />
        </Route>

        <Route exact path="/settings">
          <Settings />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/UpdateProfile">
          <UpdateProfile />
        </Route>
        <Route exact path="/verification">
          <Verification />
        </Route>
        <Route exact path="/changePassword">
          <ChangePassword />
        </Route>
        <Route exact path="/changePayPassword">
          <ChangePayPassword />
        </Route>
        <Route exact path="/paymentMethod">
          <PaymentMethod />
        </Route>
        <Route exact path="/alipay">
          <Alipay />
        </Route>
        <Route exact path="/wechat">
          <Wechat />
        </Route>
        <Route exact path="/overseaBank">
          <OverseaBank />
        </Route>
        <Route exact path="/cnbank">
          <CNBank />
        </Route>
        <Route exact path="/blockchainpayaddress">
          <BlockchainPayAddress />
        </Route>

        <Route exact path="/transefer">
          <Transefer />
        </Route>
        <Route exact path="/recharge">
          <Recharge />
        </Route>
        <Route exact path="/rptchange">
          <RptChange />
        </Route>
        <Route exact path="/reimbursement">
          <Reimbursement />
        </Route>
        <Route exact path="/pay">
          <Pay />
        </Route>
        <Route exact path="/paypal">
          <PayPal />
        </Route>
        <Route exact path="/withdraw">
          <Withdraw />
        </Route>
        <Route exact path="/huanhui">
          <Huanhui />
        </Route>

        <Route exact path="/cvtdetail">
          <CvtDetail />
        </Route>
        <Route exact path="/cvadetail">
          <CvaDetail />
        </Route>
        <Route exact path="/abgdetail">
          <AbgDetail />
        </Route>
        <Route exact path="/rptdetail">
          <RptDetail />
        </Route>
        <Route exact path="/qrcode">
          <QRCode />
        </Route>
        <Route exact path="/kefu">
          <Kefu />
        </Route>
        <Route exact path="/dingdan">
          <Dingdan />
        </Route>
        <Route exact path="/rptdingdan">
          <RptDingdan />
        </Route>
        <Route exact path="/shopdingdan">
          <ShopDingdan />
        </Route>
        <Route exact path="/shopdingdanxiangqing">
          <ShopDingdanXiangQing />
        </Route>
        <Route exact path="/shopverification">
          <ShopVerification />
        </Route>

        <Route exact path="/jifenchi">
          <JiFenChi />
        </Route>
        <Route exact path="/jifenqu">
          <JiFenQu />
        </Route>
        <Route exact path="/pupu">
          <PuPu />
        </Route>
        <Route exact path="/zhifuqr">
          <ZhiFuQR />
        </Route>
        <Route exact path="/CreateQR">
          <CreateQR />
        </Route>
        <Route exact path="/dingdanxiangqing">
          <DingdanXiangQing />
        </Route>
        <Route exact path="/rptdingdanxiangqing">
          <RptDingdanXiangQing />
        </Route>

        <Route exact path="/shangcheng">
          <ShangCheng />
        </Route>
        <Route exact path="/ShangChengGengxin">
          <ShangChengGengxin />
        </Route>
        <Route exact path="/shangchengxiangqing">
          <ShangChengXiangQing />
        </Route>
        <Route exact path="/shangchengadd">
          <ShangChengAdd />
        </Route>
        <Route exact path="/shangchengedit">
          <ShangChengEdit />
        </Route>

        <Route exact path="/xiaopu">
          <XiaoPu />
        </Route>
        <Route exact path="/xiaopuxiangqing">
          <XiaoPuXiangQing />
        </Route>
        <Route exact path="/xiaopuadd">
          <XiaoPuAdd />
        </Route>
        <Route exact path="/xiaopuedit">
          <XiaoPuEdit />
        </Route>

        <Route exact path="/news">
          <News />
        </Route>
        <Route exact path="/dianpuguanli">
          <Dianpuguanli />
        </Route>

        <Route exact path="/shangxueyuan">
          <Shangxueyuan />
        </Route>
        <Route exact path="/shijieshanghui">
          <Shijieshanghui />
        </Route>
        <Route exact path="/gongyi">
          <Gongyi />
        </Route>
        <Route exact path="/aboutus">
          <Aboutus />
        </Route>
        <Route exact path="/Shuoming">
          <Shuoming />
        </Route>
        <Route exact path="/Baipishu">
          <Baipishu />
        </Route>
        <Route exact path="/other">
          <Other />
        </Route>
        <Route exact path="/address">
          <Address />
        </Route>
        <Route exact path="/productdetail">
          <ProductDetail />
        </Route>
        <Route exact path="/rptproductdetail">
          <RptProductDetail />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
