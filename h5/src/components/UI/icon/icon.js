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
var warning = require("warning");
require("./style");
var noop = function () { };
var defaultProps = {
    prefixCls: 'cp-ui-icon',
    onClick: noop
};
var handleClick = function (e, _a) {
    var onClick = _a.onClick;
    onClick(e);
};
var Icon = function (props) {
    var _a;
    var prefixCls = props.prefixCls, type = props.type, size = props.size, color = props.color, spin = props.spin, rotate = props.rotate, rotateDegree = props.rotateDegree, flip = props.flip, flipOrder = props.flipOrder, className = props.className, rest = __rest(props, ["prefixCls", "type", "size", "color", "spin", "rotate", "rotateDegree", "flip", "flipOrder", "className"]);
    warning(!!type, 'type should be required for icon');
    var classStr = classnames_1.default(prefixCls, className, 'fa', "fa-" + type, (_a = {},
        _a["fa-spin"] = !!spin,
        _a["fa-rotate-" + rotateDegree] = !!rotate,
        _a["fa-flip-" + flipOrder] = !!flip,
        _a));
    var style = {
        color: color
    };
    if (size) {
        style.fontSize = size;
    }
    return React.createElement("i", __assign({ className: classStr, style: style, onClick: function (e) { return handleClick(e, props); } }, rest));
};
Icon.defaultProps = defaultProps;
exports.default = Icon;
