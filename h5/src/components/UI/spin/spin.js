"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
require("./style/index.scss");
var defaultProps = {
    spinning: true,
    size: 'normal',
    fullScreen: false
};
var prefixCls = 'cp-ui-spin';
var getClassNames = function (_a) {
    var _b;
    var size = _a.size, fullScreen = _a.fullScreen, children = _a.children;
    return classnames_1.default(prefixCls, (_b = {},
        _b[prefixCls + "-" + size] = size,
        _b[prefixCls + "-fullScreen"] = fullScreen,
        _b[prefixCls + "-wrapper"] = children,
        _b));
};
var renderIndicator = function (_a) {
    var indicator = _a.indicator, color = _a.color;
    var style = {};
    if (color) {
        style.background = color;
    }
    return (React.createElement("div", { className: prefixCls + "-loading-icon" }, indicator || (React.createElement("div", { className: prefixCls + "-default-spin" },
        React.createElement("span", { className: "loading-dot", style: style }),
        React.createElement("span", { className: "loading-dot", style: style }),
        React.createElement("span", { className: "loading-dot", style: style }),
        React.createElement("span", { className: "loading-dot", style: style })))));
};
var renderChildren = function (_a) {
    var children = _a.children;
    if (children) {
        return React.createElement("div", { className: prefixCls + "-container" }, children);
    }
    return null;
};
var renderComponent = function (props) {
    var tip = props.tip;
    var classStr = getClassNames(props);
    return (React.createElement("div", { className: classStr },
        React.createElement("div", { className: prefixCls + "-loading" },
            React.createElement("div", { className: prefixCls + "-loading-container" },
                renderIndicator(props),
                tip ? React.createElement("div", { className: prefixCls + "-loading-text" }, tip) : null)),
        renderChildren(props)));
};
var Spin = function (props) {
    // 这里这么写是为了预留fullScreen使用
    return renderComponent(props);
};
Spin.defaultProps = defaultProps;
exports.default = Spin;
