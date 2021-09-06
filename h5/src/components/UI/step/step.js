"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var icon_1 = require("../icon");
require("./style/index.scss");
var defaultProps = {
    direction: 'horizontal',
    size: 'normal',
    labelPlacement: 'horizontal',
    options: [],
    current: 0
};
var prefixCls = 'cp-ui-steps';
var getClassNames = function (_a) {
    var _b;
    var direction = _a.direction, size = _a.size, labelPlacement = _a.labelPlacement, className = _a.className;
    return classnames_1.default(prefixCls, className, (_b = {},
        _b[prefixCls + "-" + direction] = direction,
        _b[prefixCls + "-" + size] = size,
        _b[prefixCls + "-label-" + labelPlacement] = labelPlacement,
        _b));
};
var getStatus = function (index, current) {
    var currentCopy = Number(current);
    var status = 'wait';
    if (index === currentCopy)
        status = 'process';
    if (index < currentCopy)
        status = 'finish';
    if (index > currentCopy)
        status = 'wait';
    return status;
};
var renderIcon = function (_a) {
    var icon = _a.icon, index = _a.index, status = _a.status;
    if (icon) {
        return React.createElement(React.Fragment, null, icon);
    }
    var activeIcon = index;
    if (status === 'finish') {
        activeIcon = React.createElement(icon_1.default, { type: "check" });
    }
    return activeIcon;
};
var renderStep = function (_a) {
    var _b;
    var option = _a.option, index = _a.index, current = _a.current;
    var status = option.status, title = option.title, describe = option.describe, icon = option.icon;
    var newStatus = getStatus(index, current);
    var prefixCls = 'cp-ui-steps-item';
    var classStr = classnames_1.default(prefixCls, prefixCls + "-" + newStatus, (_b = {},
        _b[prefixCls + "-custom"] = !!icon,
        _b));
    return (React.createElement("div", { className: classStr, key: prefixCls + "-" + index },
        React.createElement("div", { className: prefixCls + "-tail" }),
        React.createElement("div", { className: prefixCls + "-icon" },
            React.createElement("span", { className: prefixCls + "-icon-text" }, renderIcon({ index: index, icon: icon, status: status || newStatus }))),
        React.createElement("div", { className: prefixCls + "-content" },
            React.createElement("div", { className: prefixCls + "-content-title" }, title),
            React.createElement("div", { className: prefixCls + "-content-describe" }, describe))));
};
var renderSteps = function (_a) {
    var options = _a.options, current = _a.current;
    return (React.createElement(React.Fragment, null, options.map(function (option, index) {
        return renderStep({ option: option, index: index, current: current });
    })));
};
var Steps = function (props) {
    var classStr = getClassNames(props);
    return React.createElement("div", { className: classStr }, renderSteps(props));
};
Steps.defaultProps = defaultProps;
exports.default = Steps;
