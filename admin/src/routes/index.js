import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

// Members
import Members from "../pages/Members/Members";
import MemberFile from "../pages/Members/MemberFile";

// Certification
import Certification from "../pages/Certification/Certification";
import ShopCertification from "../pages/Certification/ShopCertification";

// Referrers
import Referrers from "../pages/Referrers/Referrers";

// Orders
import Orders from "../pages/Orders/Orders";

// ProductOrders
import ProductOrders from "../pages/Orders/ProductOrders";

// Products
import Products from "../pages/Orders/Products";
import RptProducts from "../pages/Orders/RptProducts";

// Withdraw
import Withdraw from "../pages/Withdraw/Withdraw";

// Withdraw
import Recharge from "../pages/Recharge/Recharge";

// Withdraw
import Transefer from "../pages/Transefer/Transefer";

// Reimbursement
import Reimbursement from "../pages/Reimbursement/Reimbursement";

// Banner
import Banner from "../pages/Banner/Banner";

// Category
import Category from "../pages/Category/Category";

// Settings
import Settings from "../pages/Settings/Settings";

// Block
import Block from "../pages/Block/Block";

const authProtectedRoutes = [

	//cva
	{ path: "/dashboard", component: Dashboard },

	{ path: "/members", component: Members },
	{ path: "/memberfile", component: MemberFile },

  { path: "/certification", component: Certification },
  { path: "/shopcertification", component: ShopCertification },

	{ path: "/referrers", component: Referrers },

	{ path: "/orders", component: Orders },
	{ path: "/productOrders", component: ProductOrders },
	{ path: "/Products", component: Products },
	{ path: "/RptProducts", component: RptProducts },

  { path: "/withdraw", component: Withdraw },
  { path: "/recharge", component: Recharge },
  { path: "/transefer", component: Transefer },

  { path: "/reimbursement", component: Reimbursement },

  { path: "/banner", component: Banner },

  { path: "/category", component: Category },

	{ path: "/settings", component: Settings },

	{ path: "/block", component: Block },

	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const publicRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },
	{ path: "/forgot-password", component: ForgetPwd },
	{ path: "/register", component: Register },
	{ path: "/auth-lock-screen", component: AuthLockScreen },
];

export { authProtectedRoutes, publicRoutes };
