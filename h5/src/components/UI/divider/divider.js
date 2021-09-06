"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
require("./style/index.scss");
var defaultProps = {
    type: 'horizontal',
    orientation: 'center',
    dashed: false
};
var prefixCls = 'cp-ui-divider';
var getClassNames = function (_a) {
    var _b;
    var type = _a.type, orientation = _a.orientation, dashed = _a.dashed, className = _a.className, children = _a.children;
    return classnames_1.default(prefixCls, className, (_b = {},
        _b[prefixCls + "-" + type] = type,
        _b[prefixCls + "-" + orientation] = children ? orientation : false,
        _b[prefixCls + "-dashed"] = dashed,
        _b));
};
var Divide = function (props) {
    var classStr = getClassNames(props);
    var children = props.children;
    return (React.createElement("div", { className: classStr }, children ? React.createElement("span", { className: prefixCls + "-inner-text" }, children) : null));
};
Divide.defaultProps = defaultProps;
exports.default = Divide;
