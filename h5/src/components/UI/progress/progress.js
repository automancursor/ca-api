"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
require("./style/index.scss");
var defaultProps = {
    size: 'medium',
    type: 'line',
    percent: 0,
    status: 'normal',
    position: 'normal',
    unfilled: true,
    showInfo: true
};
var prefixCls = 'cp-ui-progress';
var getClassNames = function (_a) {
    var _b;
    var type = _a.type, size = _a.size, status = _a.status, showInfo = _a.showInfo, position = _a.position, unfilled = _a.unfilled;
    return classnames_1.default(prefixCls, (_b = {},
        _b[prefixCls + "-" + type] = type,
        _b[prefixCls + "-fixed-outer"] = position === 'fixed',
        _b[prefixCls + "-unfilled"] = !unfilled,
        _b[prefixCls + "-" + size] = size,
        _b[prefixCls + "-" + status] = status,
        _b[prefixCls + "-show-info"] = showInfo,
        _b));
};
var getInnerStyle = function (_a) {
    var activeColor = _a.activeColor, percent = _a.percent;
    var style = { width: percent + "%" };
    if (activeColor) {
        style.backgroundColor = activeColor;
    }
    return style;
};
var getOuterStyle = function (_a) {
    var width = _a.width;
    var style = {};
    if (width) {
        style.width = width;
    }
    return style;
};
var renderCircleText = function (_a) {
    var textRender = _a.textRender, percent = _a.percent;
    if (textRender && typeof textRender === 'function') {
        return React.createElement("div", { className: prefixCls + "-circle-text" }, textRender(percent));
    }
    return React.createElement("div", { className: prefixCls + "-circle-text" }, percent + "%");
};
var renderLine = function (props) {
    var showInfo = props.showInfo, position = props.position, percent = props.percent;
    var innerStyle = getInnerStyle(props);
    var outStyle = getOuterStyle(props);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: prefixCls + "-container" },
            React.createElement("div", { className: prefixCls + "-outer", style: outStyle },
                React.createElement("div", { className: prefixCls + "-inner", style: innerStyle }))),
        showInfo && position === 'normal' ? (React.createElement("div", { className: prefixCls + "-info" }, percent + "%")) : null));
};
var renderCircle = function (props) {
    var activeColor = props.activeColor, percent = props.percent;
    var style = activeColor ? { stroke: activeColor } : {};
    var strokeDashoffset = 289 * (1 - percent / 100);
    return (React.createElement(React.Fragment, null,
        React.createElement("svg", { className: prefixCls + "-circle-container", viewBox: "0 0 100 100" },
            React.createElement("path", { className: prefixCls + "-circle-outer", d: "M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92", "fill-opacity": "0" }),
            React.createElement("path", { className: prefixCls + "-circle-inner", d: "M 50,50 m 0,-46 a 46,46 0 1 1 0,92 a 46,46 0 1 1 0,-92", "fill-opacity": "0", strokeDasharray: "289 289", strokeDashoffset: strokeDashoffset, style: style })),
        renderCircleText(props)));
};
var Progress = function (props) {
    var type = props.type;
    var classStr = getClassNames(props);
    return (React.createElement("div", { className: classStr }, type === 'circle' ? renderCircle(props) : renderLine(props)));
};
Progress.defaultProps = defaultProps;
exports.default = Progress;
