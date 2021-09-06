"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var checkbox_1 = require("./checkbox");
var noop = function () { };
var prefixCls = 'cp-ui-checkbox';
var defaultProps = {
    onChange: noop,
    defaultValue: [],
    disabled: false,
    options: [],
    value: []
};
var getNewValue = function (value, defaultValue, props) {
    if ('value' in props) {
        return value;
    }
    else {
        return defaultValue;
    }
};
var handleChange = function (_a) {
    var newValue = _a.newValue, value = _a.value, checked = _a.checked, onChange = _a.onChange;
    var newValueCopy = newValue.slice();
    if (checked) {
        newValueCopy.push(value);
    }
    else {
        newValueCopy.splice(newValue.indexOf(value), 1);
    }
    onChange(newValueCopy);
};
var renderOptions = function (props) {
    var value = props.value, defaultValue = props.defaultValue, options = props.options, onChange = props.onChange;
    var newValue = getNewValue(value, defaultValue, props);
    if (options && options.length > 0) {
        return (React.createElement(React.Fragment, null, options.map(function (option, index) {
            var value = option.value;
            return (React.createElement(checkbox_1.default, { checked: newValue.includes(value), key: "checkbox-" + index, onChange: function (checked) { return handleChange({ newValue: newValue, value: value, checked: checked, onChange: onChange }); } }, option.label));
        })));
    }
    return null;
};
var CheckboxGroup = function (props) {
    return React.createElement("div", { className: prefixCls + "-group" }, renderOptions(props));
};
CheckboxGroup.checkbox = checkbox_1.default;
CheckboxGroup.defaultProps = defaultProps;
exports.default = CheckboxGroup;
