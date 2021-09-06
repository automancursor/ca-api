"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
require("./style/index.scss");
var defaultProps = {
    dot: false,
    overflowCount: 99,
    prefixCls: 'cp-ui-badge',
    corner: false
};
var getClassNames = function (_a) {
    var _b;
    var status = _a.status, prefixCls = _a.prefixCls, children = _a.children;
    return classnames_1.default(prefixCls, (_b = {},
        _b[prefixCls + "-" + status] = status,
        _b[prefixCls + "-no-wrapper"] = !children,
        _b));
};
var getOutStyle = function (style, corner) {
    var _style = {};
    if (!!corner) {
        _style.width = '100%';
    }
    _style = Object.assign(style, _style);
    return _style;
};
var renderCount = function (_a) {
    var _b;
    var text = _a.text, overflowCount = _a.overflowCount, dot = _a.dot, prefixCls = _a.prefixCls, corner = _a.corner, style = _a.style;
    // dot 和 text都存在的时候优先dot
    if (dot) {
        return React.createElement("sup", { className: prefixCls + "-dot" });
    }
    if (text) {
        var content = void 0;
        var classStr = classnames_1.default(prefixCls + "-text", (_b = {},
            _b[prefixCls + "-custom"] = typeof text !== 'number',
            _b[prefixCls + "-corner"] = !!corner,
            _b));
        if (typeof text === 'number') {
            content = text <= overflowCount ? text : overflowCount + "+";
        }
        else {
            content = text;
        }
        return (React.createElement("sup", { className: classStr, style: style }, content));
    }
    return null;
};
var Badge = function (props) {
    var children = props.children, corner = props.corner, outStyle = props.outStyle;
    return (React.createElement("div", { className: getClassNames(props), style: getOutStyle(outStyle !== null && outStyle !== void 0 ? outStyle : {}, corner) },
        children,
        renderCount(props)));
};
Badge.defaultProps = defaultProps;
exports.default = Badge;
