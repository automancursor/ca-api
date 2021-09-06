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
var defaultProps = {
    prefixCls: 'cp-ui-popover',
    disabled: false
};
var getClassNames = function (_a) {
    var _b;
    var prefixCls = _a.prefixCls, className = _a.className, disabled = _a.disabled;
    return classnames_1.default(prefixCls + "-item", className, (_b = {},
        _b[prefixCls + "-item-disabled"] = disabled,
        _b));
};
var Item = function (props) {
    var children = props.children, className = props.className, prefixCls = props.prefixCls, icon = props.icon, disabled = props.disabled, firstItem = props.firstItem, activeStyle = props.activeStyle, restProps = __rest(props, ["children", "className", "prefixCls", "icon", "disabled", "firstItem", "activeStyle"]);
    var classStr = getClassNames(props);
    return (React.createElement("div", __assign({ className: classStr }, restProps),
        React.createElement("div", { className: prefixCls + "-item-container" },
            icon ? (React.createElement("span", { className: prefixCls + "-item-icon", "aria-hidden": "true" }, icon)) : null,
            React.createElement("span", { className: prefixCls + "-item-content" }, children))));
};
Item.defaultProps = defaultProps;
Item.itemName = 'PopoverItem';
exports.default = Item;
