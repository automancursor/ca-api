"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var tag_1 = require("./tag");
var noop = function () { };
var defaultProps = {
    checked: false,
    onChange: noop,
    disabled: false,
    type: 'primary'
};
var prefixCls = 'cp-ui-tag';
var getClassNames = function (_a) {
    var _b;
    var type = _a.type, checked = _a.checked, disabled = _a.disabled;
    return classnames_1.default((_b = {},
        _b[prefixCls + "-" + type] = type,
        _b[prefixCls + "-checked"] = checked,
        _b[prefixCls + "-disabled"] = disabled,
        _b));
};
var handleChange = function (_a) {
    var checked = _a.checked, onChange = _a.onChange, disabled = _a.disabled;
    if (disabled)
        return;
    var nextChecked = !checked;
    onChange(nextChecked);
};
var TagChecked = function (props) {
    var classStr = getClassNames(props);
    return (React.createElement(tag_1.default, { className: classStr, onClick: function () { return handleChange(props); } }, props.children));
};
TagChecked.defaultProps = defaultProps;
exports.default = TagChecked;
