import React from "react";
import Loadable from "react-loadable";
import Others from "pages/Home/Content/Others/Others";

const Loading = () => <div>加载中...</div>;

const Recommend = Loadable({
  loader: () => import("pages/Home/Content/Recommend/Recommend"),
  loading: Loading,
});

export const ContentConfig = {
  recommend: Recommend,
};
