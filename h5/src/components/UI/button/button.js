"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var icon_1 = require("../icon");
require("./style/index.scss");
var defaultProps = {
    disabled: false,
    loading: false,
    size: 'normal',
    prefixCls: 'cp-ui-btn',
    type: 'primary'
};
var getClassName = function (_a) {
    var _b;
    var className = _a.className, loading = _a.loading, disabled = _a.disabled, type = _a.type, size = _a.size, prefixCls = _a.prefixCls;
    var classStr = classnames_1.default(prefixCls, className, (_b = {},
        _b[prefixCls + "-warning"] = type === 'warning',
        _b[prefixCls + "-primary"] = type === 'primary',
        _b[prefixCls + "-ghost"] = type === 'ghost',
        _b[prefixCls + "-large"] = size === 'large',
        _b[prefixCls + "-normal"] = size === 'normal',
        _b[prefixCls + "-small"] = size === 'small',
        _b[prefixCls + "-loading"] = loading,
        _b[prefixCls + "-disabled"] = disabled,
        _b));
    return classStr;
};
var renderLoading = function (_a) {
    var loading = _a.loading;
    if (loading) {
        return React.createElement(icon_1.default, { type: "circle-o-notch", spin: true });
    }
    return null;
};
var renderIcon = function (_a) {
    var icon = _a.icon;
    if (icon) {
        return React.createElement(React.Fragment, null, icon);
    }
    return null;
};
// 解决ts 写了defaultProps  使用仍然需要必填的问题
var Button = function (props) {
    var style = props.style, onClick = props.onClick, disabled = props.disabled, prefixCls = props.prefixCls, children = props.children;
    return (React.createElement("div", { className: prefixCls + "-button_btn" },
        React.createElement("a", { role: "button", onClick: disabled ? undefined : onClick, className: getClassName(props), style: style },
            renderLoading(props),
            renderIcon(props),
            React.createElement("span", null, children))));
};
Button.defaultProps = defaultProps;
exports.default = Button;
