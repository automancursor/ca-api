"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classnames_1 = require("classnames");
var React = require("react");
require("./style");
var useState = React.useState, useEffect = React.useEffect;
var prefixCls = 'cp-ui-segment';
var noop = function () { };
var defaultProps = {
    prefixCls: prefixCls,
    selectedIndex: 0,
    disabled: false,
    values: [],
    onChange: noop,
    onValueChange: noop,
    style: {},
    tintColor: ''
};
var getClassNames = function (_a) {
    var _b;
    var prefixCls = _a.prefixCls, disabled = _a.disabled, className = _a.className;
    return classnames_1.default(className, prefixCls, (_b = {},
        _b[prefixCls + "-disabled"] = disabled,
        _b));
};
var getItemClassNames = function (_a, selected) {
    var _b;
    var prefixCls = _a.prefixCls;
    return classnames_1.default(prefixCls + "-item", (_b = {},
        _b[prefixCls + "-item-selected"] = selected,
        _b));
};
var onClick = function (props, index, value, selectedIndex, setSelectedIndex) {
    var disabled = props.disabled, onChange = props.onChange, onValueChange = props.onValueChange;
    if (!disabled && selectedIndex !== index) {
        // just do a mock so that the api to be the same as react-native
        if (onChange) {
            onChange(index, value);
        }
        if (onValueChange) {
            onValueChange(value);
        }
        setSelectedIndex(index);
    }
};
var renderSegmentItem = function (props, idx, value, selected, selectedIndex, setSelectedIndex) {
    var prefixCls = props.prefixCls, disabled = props.disabled, tintColor = props.tintColor;
    var itemStyle = {
        color: selected ? '#fff' : tintColor,
        backgroundColor: selected ? tintColor : 'transparent',
        borderColor: tintColor
    };
    var activeInnerStyle = tintColor
        ? {
            backgroundColor: tintColor
        }
        : {};
    var itemCls = getItemClassNames(props, selected);
    return (React.createElement("div", { key: prefixCls + "-item-" + idx, className: itemCls, style: itemStyle, role: "tab", "aria-selected": selected && !disabled, "aria-disabled": disabled, onClick: disabled ? undefined : function () { return onClick(props, idx, value, selectedIndex, setSelectedIndex); } },
        React.createElement("div", { className: prefixCls + "-item-inner", style: activeInnerStyle }),
        value));
};
var SegmentedControl = function (props) {
    var style = props.style, values = props.values;
    var _a = useState(props.selectedIndex), selectedIndex = _a[0], setSelectedIndex = _a[1];
    useEffect(function () {
        setSelectedIndex(props.selectedIndex);
    }, [props.selectedIndex]);
    var classStr = getClassNames(props);
    return (React.createElement("div", { className: classStr, style: style, role: "tablist" }, values.map(function (value, idx) {
        return renderSegmentItem(props, idx, value, idx === selectedIndex, selectedIndex, setSelectedIndex);
    })));
};
SegmentedControl.defaultProps = defaultProps;
exports.default = SegmentedControl;
