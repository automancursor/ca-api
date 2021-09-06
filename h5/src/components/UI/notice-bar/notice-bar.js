"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var icon_1 = require("../icon");
var marquee_1 = require("./marquee");
require("./style");
var useState = React.useState;
var prefixCls = 'cp-ui-notice-bar';
var defaultProps = {
    prefixCls: prefixCls,
    icon: React.createElement(icon_1.default, { type: "volume-up", size: "16" }),
    onClick: function () { }
};
var _onClick = function (props, setShow) {
    var _a = props.mode, mode = _a === void 0 ? '' : _a, onClick = props.onClick;
    if (onClick) {
        onClick();
    }
    if (mode === 'closable') {
        setShow(false);
    }
};
var getClassNames = function (prefixCls, className) {
    return classnames_1.default(prefixCls, className);
};
var NoticeBar = function (props) {
    var _a = useState(true), show = _a[0], setShow = _a[1];
    var _b = props.mode, mode = _b === void 0 ? '' : _b, icon = props.icon, onClick = props.onClick, children = props.children, className = props.className, prefixCls = props.prefixCls, action = props.action, marqueeProps = props.marqueeProps, restProps = __rest(props, ["mode", "icon", "onClick", "children", "className", "prefixCls", "action", "marqueeProps"]);
    var extraProps = {};
    var operationDom = null;
    if (mode === 'closable') {
        operationDom = (React.createElement("div", { className: prefixCls + "-operation", onClick: function () {
                _onClick(props, setShow);
            }, role: "button", "aria-label": "close" }, action ? action : React.createElement(icon_1.default, { type: "times", size: "md" })));
    }
    else {
        if (mode === 'link') {
            operationDom = (React.createElement("div", { className: prefixCls + "-operation", role: "button", "aria-label": "go to detail" }, action ? action : React.createElement(icon_1.default, { type: "angle-right", size: "md" })));
        }
        extraProps.onClick = onClick;
    }
    var classStr = getClassNames(prefixCls, className);
    return show ? (React.createElement("div", __assign({ className: classStr }, restProps, extraProps, { role: "alert" }),
        icon && (React.createElement("div", { className: prefixCls + "-icon", "aria-hidden": "true" }, icon)),
        React.createElement("div", { className: prefixCls + "-content" },
            React.createElement(marquee_1.default, __assign({ prefixCls: prefixCls, text: children }, marqueeProps))),
        operationDom)) : null;
};
NoticeBar.defaultProps = defaultProps;
exports.default = NoticeBar;
