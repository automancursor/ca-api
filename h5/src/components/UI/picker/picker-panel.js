"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var picker_column_1 = require("./picker-column");
require("./style");
var prefixCls = 'cp-ui-picker-panel';
var defaultProps = {
    onClick: function () { },
    itemHeight: 36,
    height: 216
};
var renderInner = function (props) {
    var optionGroups = props.optionGroups, valueGroups = props.valueGroups, itemHeight = props.itemHeight, height = props.height, onChange = props.onChange, onClick = props.onClick;
    var highlightStyle = {
        height: itemHeight,
        marginTop: -(itemHeight / 2)
    };
    var columnNodes = [];
    for (var name_1 in optionGroups) {
        if (optionGroups.hasOwnProperty(name_1)) {
            columnNodes.push(React.createElement(picker_column_1.default, { key: name_1, name: name_1, options: optionGroups[name_1], value: valueGroups[name_1], itemHeight: itemHeight, columnHeight: height, onChange: onChange, onClick: onClick }));
        }
    }
    return (React.createElement("div", { className: prefixCls + "-inner" },
        columnNodes,
        React.createElement("div", { className: prefixCls + "-highlight", style: highlightStyle })));
};
var getClassNames = function () {
    return classnames_1.default(prefixCls, prefixCls + "-container");
};
var PickerPanel = function (props) {
    var height = props.height;
    var style = {
        height: height
    };
    var classStr = getClassNames();
    return (React.createElement("div", { className: classStr, style: style }, renderInner(props)));
};
PickerPanel.defaultProps = defaultProps;
exports.default = PickerPanel;
