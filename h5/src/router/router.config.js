import Loadable from "react-loadable";
import Loading from "./Loading";

const Home = Loadable({
  loader: () => import("pages/Home/Home"),
  loading: Loading,
});

const Shop = Loadable({
  loader: () => import("pages/Shop/Shop"),
  loading: Loading,
});

const Cart = Loadable({
  loader: () => import("pages/Cart/Cart"),
  loading: Loading,
});

const Category = Loadable({
  loader: () => import("pages/Category/Category"),
  loading: Loading,
});

const Star = Loadable({
  loader: () => import("pages/Star/Star"),
  loading: Loading,
});

const User = Loadable({
  loader: () => import("pages/User/User"),
  loading: Loading,
});

const CvaDetail = Loadable({
  loader: () => import("pages/User/Wallet/CvaDetail"),
  loading: Loading,
});

const CvtDetail = Loadable({
  loader: () => import("pages/User/Wallet/CvtDetail"),
  loading: Loading,
});

const AbgDetail = Loadable({
  loader: () => import("pages/User/Wallet/AbgDetail"),
  loading: Loading,
});

export const Routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/shop",
    component: Shop,
  },
  {
    path: "/category",
    component: Category,
  },
  {
    path: "/star",
    component: Star,
  },
  {
    path: "/user",
    component: User,
  },
  {
    path: "/cvadetail",
    component: CvaDetail,
  },
  {
    path: "/cvtdetail",
    component: CvtDetail,
  },
  {
    path: "/abgdetail",
    component: AbgDetail,
  },
];
