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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var rowContext_1 = require("./rowContext");
require("./style/index.scss");
var defaultProps = {
    align: 'top',
    gutter: 0,
    justify: 'start'
};
var prefixCls = 'cp-ui-row';
var getClassNames = function (_a) {
    var _b;
    var align = _a.align, justify = _a.justify, wrap = _a.wrap;
    return classnames_1.default(prefixCls, (_b = {},
        _b[prefixCls + "-" + align] = !!align,
        _b[prefixCls + "-" + justify] = !!justify,
        _b[prefixCls + "-nowrap"] = wrap === 'nowrap',
        _b[prefixCls + "-wrap"] = wrap === 'wrap',
        _b[prefixCls + "-wrap-reverse"] = wrap === 'wrap-reverse',
        _b));
};
var Row = function (props) {
    var children = props.children, style = props.style, gutter = props.gutter;
    var classStr = getClassNames(props);
    var rowStyle = gutter > 0
        ? __assign({ marginLeft: gutter / -2, marginRight: gutter / -2 }, style) : style;
    return (React.createElement(rowContext_1.default.Provider, { value: { gutter: gutter } },
        React.createElement("div", { className: classStr, style: rowStyle }, children)));
};
Row.defaultProps = defaultProps;
exports.default = Row;
