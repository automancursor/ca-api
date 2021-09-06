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
require("./style/index.scss");
var icon_1 = require("../icon");
var noop = function () { };
var prefixCls = 'cp-ui-radio';
var defaultProps = {
    onChange: noop,
    checked: false,
    disabled: false,
    defaultChecked: false,
    autoFocus: false,
    color: '#ff5454'
};
var getClassNames = function (_a) {
    var _b;
    var checked = _a.checked, disabled = _a.disabled, autoFocus = _a.autoFocus, className = _a.className;
    return classnames_1.default(prefixCls, className, (_b = {},
        _b[prefixCls + "-checked"] = checked,
        _b[prefixCls + "-disabled"] = disabled,
        _b[prefixCls + "-focus"] = autoFocus,
        _b));
};
var handleChange = function (onChange, radioChecked) {
    onChange(radioChecked);
};
var renderIcon = function (radioChecked, color, disabled) {
    if (disabled) {
        return React.createElement(icon_1.default, { type: 'circle-o', size: '18px', color: '#c2c2c2' });
    }
    return React.createElement(icon_1.default, { type: !radioChecked ? 'circle-o' : 'check-circle', size: '18px', color: color });
};
var Radio = function (props) {
    var _a;
    var propsCopy = __assign({}, props);
    var children = propsCopy.children, onChange = propsCopy.onChange, color = propsCopy.color, rest = __rest(propsCopy, ["children", "onChange", "color"]);
    var isChecked = propsCopy.checked !== undefined ? propsCopy.checked : (_a = propsCopy.defaultChecked) !== null && _a !== void 0 ? _a : false;
    var classStr = getClassNames(props);
    return (React.createElement("label", { className: classStr },
        React.createElement("span", { className: prefixCls + "-select" },
            React.createElement("input", __assign({ type: "radio", className: prefixCls + "-input", onClick: function (e) {
                    console.log(e);
                    handleChange(onChange, isChecked);
                } }, rest)),
            renderIcon(isChecked, color, propsCopy.disabled)),
        React.createElement("span", { className: prefixCls + "-label" }, children)));
};
Radio.defaultProps = defaultProps;
exports.default = Radio;
