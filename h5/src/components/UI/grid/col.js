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
var useContext = React.useContext;
var defaultProps = {
    offset: 0
};
var prefixCls = 'cp-ui-col';
var GetStyle = function (_a) {
    var style = _a.style;
    var gutter = useContext(rowContext_1.default).gutter;
    var styleCopy = __assign({ paddingLeft: gutter / 2, paddingRight: gutter / 2 }, style);
    return styleCopy;
};
var getClassNames = function (_a) {
    var _b;
    var offset = _a.offset, span = _a.span, className = _a.className;
    return classnames_1.default(className, (_b = {},
        _b[prefixCls + "-offset-" + offset] = !!offset,
        _b[prefixCls + "-" + span] = span !== undefined,
        _b));
};
var Col = function (props) {
    var style = GetStyle(props);
    var classStr = getClassNames(props);
    return (React.createElement("div", { className: classStr, style: style }, props.children));
};
Col.defaultProps = defaultProps;
exports.default = Col;
