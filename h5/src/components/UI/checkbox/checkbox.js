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
var rc_checkbox_1 = require("rc-checkbox");
var utils_1 = require("../utils");
require("./style/index.scss");
var useRef = React.useRef, useState = React.useState;
var noop = function () { };
var defaultProps = {
    onChange: noop,
    onBlur: noop,
    onFocus: noop,
    autoFocus: false,
    disabled: false,
    indeterminate: false,
    prefixCls: 'cp-ui-checkbox',
    onKeyDown: noop,
    onKeyPress: noop,
    onMouseEnter: noop,
    onMouseLeave: noop
};
/**
 * 类名wrapper
 * @param prefixCls 类前缀
 * @param disabled 是否禁用
 * @param checked 选中状态
 * @param indeterminate 半选状态 默认为false
 */
var wrapperClassName = function (prefixCls, disabled, checked, indeterminate) {
    var _a;
    return classnames_1.default(prefixCls, (_a = {},
        _a[prefixCls + "-disabled"] = disabled,
        _a[prefixCls + "-checked"] = checked,
        _a[prefixCls + "-indeterminate"] = indeterminate,
        _a));
};
var getClassName = function (_a, _b) {
    var disabled = _a.disabled, checked = _a.checked, defaultChecked = _a.defaultChecked, indeterminate = _a.indeterminate, prefixCls = _a.prefixCls;
    var checkState = _b.checkState;
    if (checkState.isChange) {
        return wrapperClassName(prefixCls, disabled, checkState.checked, indeterminate);
    }
    if (defaultChecked === undefined && checked === undefined) {
        return wrapperClassName(prefixCls, disabled, false, indeterminate);
    }
    return wrapperClassName(prefixCls, disabled, checked !== undefined ? !!checked : defaultChecked, indeterminate);
};
var getOtherProps = function (props) {
    var omitStrs = [
        'onChange',
        'onMouseEnter',
        'onMouseLeave',
        'prefixCls',
        'indeterminate',
        'classNames',
        'children',
        'checked'
    ];
    var omitProps = utils_1.omit(props, omitStrs);
    return omitProps;
};
var handleChange = function (e, _a, setCheckState) {
    var onChange = _a.onChange;
    var checked = e.target.checked;
    setCheckState({
        isChange: true,
        checked: checked
    });
    onChange(e);
};
var Checkbox = function (props) {
    var _a = useState({
        isChange: false,
        checked: props.checked !== undefined ? !!props.checked : false
    }), checkState = _a[0], setCheckState = _a[1];
    var children = props.children, prefixCls = props.prefixCls, onMouseEnter = props.onMouseEnter, onMouseLeave = props.onMouseLeave;
    var otherProps = getOtherProps(props);
    console.log('otherProps', otherProps);
    var checkboxRef = useRef(null);
    return (React.createElement("label", { className: getClassName(props, { checkState: checkState, setCheckState: setCheckState }), onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave },
        React.createElement("span", { className: prefixCls + "-select" },
            React.createElement(rc_checkbox_1.default, __assign({ onChange: function (e) { return handleChange(e, props, setCheckState); } }, otherProps, { ref: checkboxRef, checked: checkState.checked })),
            React.createElement("span", { className: prefixCls + "-select-inner" })),
        React.createElement("span", { className: prefixCls + "-label" }, children)));
};
Checkbox.defaultProps = defaultProps;
exports.default = Checkbox;
