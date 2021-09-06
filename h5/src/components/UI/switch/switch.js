"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
require("./style/index.scss");
var noop = function () { };
var defaultProps = {
    disabled: false,
    checked: false,
    onChange: noop,
    prefixCls: 'cp-ui-switch',
    color: '#ff5454',
    platform: 'ios'
};
var getClassName = function (_a) {
    var _b;
    var checked = _a.checked, disabled = _a.disabled, prefixCls = _a.prefixCls, platform = _a.platform;
    return classnames_1.default(prefixCls, prefixCls + "-checked-" + platform, (_b = {},
        _b[prefixCls + "-checked"] = checked,
        _b[prefixCls + "-disabled"] = disabled,
        _b));
};
var handleChange = function (e, _a) {
    var onChange = _a.onChange;
    var checked = e.target.checked;
    onChange(checked);
};
var Switch = function (props) {
    var prefixCls = props.prefixCls, checked = props.checked, color = props.color, platform = props.platform;
    var classStr = getClassName(props);
    var style = {};
    if (checked) {
        style.backgroundColor = color;
    }
    return (React.createElement("div", { className: classStr },
        React.createElement("div", { className: prefixCls + "-checkbox-" + platform, style: style }),
        React.createElement("input", { type: "checkbox", checked: checked, onChange: function (e) { return handleChange(e, props); }, className: prefixCls + "-input" })));
};
Switch.defaultProps = defaultProps;
exports.default = Switch;
