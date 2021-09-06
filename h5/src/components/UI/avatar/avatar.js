"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var icon_1 = require("../icon");
require("./style/index.scss");
var noop = function () { };
var prefixCls = 'cp-ui-avatar';
var defaultProps = {
    size: 'normal',
    shape: 'circle',
    onError: noop,
    onClick: noop
};
var getClassNames = function (_a) {
    var _b;
    var size = _a.size, shape = _a.shape, src = _a.src, icon = _a.icon;
    return classnames_1.default(prefixCls, (_b = {},
        _b[prefixCls + "-" + size] = !!size && typeof size === 'string',
        _b[prefixCls + "-" + shape] = !!shape,
        _b[prefixCls + "-image"] = src,
        _b[prefixCls + "-icon"] = icon,
        _b));
};
var getChildren = function (_a) {
    var icon = _a.icon, src = _a.src, alt = _a.alt, children = _a.children, srcSet = _a.srcSet, onError = _a.onError;
    var childrenNode = children;
    if (icon) {
        childrenNode = React.createElement(icon_1.default, { type: icon });
    }
    else if (src) {
        childrenNode = React.createElement("img", { src: src, srcSet: srcSet, alt: alt, onError: onError });
    }
    return childrenNode;
};
var getStyle = function (_a) {
    var size = _a.size, icon = _a.icon;
    var _style = {};
    if (typeof size === 'number') {
        _style.height = size;
        _style.width = size;
        _style.lineHeight = size + "px";
        _style.fontSize = icon ? size / 2 : 18;
    }
    return _style;
};
var Avatar = function (props) {
    var _a;
    var classStr = getClassNames(props);
    var _style = getStyle(props);
    return (React.createElement("span", { className: classStr, style: (_a = props.style) !== null && _a !== void 0 ? _a : _style, onClick: props.onClick },
        React.createElement("span", { className: "avatar_ava" }, getChildren(props))));
};
Avatar.defaultProps = defaultProps;
exports.default = Avatar;
