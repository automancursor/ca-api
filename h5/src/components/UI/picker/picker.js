"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var picker_panel_1 = require("./picker-panel");
require("./style");
var prefixCls = 'cp-ui-picker';
var useState = React.useState;
var defaultProps = {
    onVisibleChange: function () { },
    okText: '确认',
    dismissText: '取消',
    title: ''
};
var getClassNames = function () {
    return classnames_1.default("" + prefixCls);
};
var getPickerModalClass = function (isPickerShow) {
    return "picker-modal" + (isPickerShow ? ' picker-modal-toggle' : '');
};
var togglePicker = function (props, _a) {
    var isPickerShow = _a.isPickerShow, setIsPickerShow = _a.setIsPickerShow;
    var onVisibleChange = props.onVisibleChange;
    setIsPickerShow(isPickerShow);
    onVisibleChange && onVisibleChange(isPickerShow);
};
var handleHeaderRight = function (e, props, setIsPickerShow, valueGroups) {
    var onOk = props.onOk;
    e.preventDefault();
    onOk && onOk(valueGroups);
    togglePicker(props, { isPickerShow: false, setIsPickerShow: setIsPickerShow });
};
var handleHeaderLeft = function (e, props, setIsPickerShow) {
    var onDismiss = props.onDismiss;
    e.preventDefault();
    onDismiss && onDismiss();
    togglePicker(props, { isPickerShow: false, setIsPickerShow: setIsPickerShow });
};
//Picker
var Picker = function (props) {
    var okText = props.okText, dismissText = props.dismissText, valueGroups = props.valueGroups, data = props.data, onChange = props.onChange, title = props.title;
    var _a = useState(false), isPickerShow = _a[0], setIsPickerShow = _a[1];
    var classStr = getClassNames();
    var pickerClassStr = getPickerModalClass(isPickerShow);
    var maskStyle = {
        display: isPickerShow ? 'block' : 'none'
    };
    return (React.createElement("div", { className: classStr },
        React.createElement("div", { className: "picker-modal-mask", style: maskStyle, onClick: function () {
                togglePicker(props, { isPickerShow: false, setIsPickerShow: setIsPickerShow });
            } }),
        React.createElement("div", { className: pickerClassStr },
            React.createElement("header", null,
                React.createElement("a", { href: "#", className: prefixCls + "-header-left", onClick: function (e) {
                        handleHeaderLeft(e, props, setIsPickerShow);
                    } }, dismissText),
                React.createElement("div", null, title),
                React.createElement("a", { href: "#", onClick: function (e) {
                        handleHeaderRight(e, props, setIsPickerShow, valueGroups);
                    } }, okText)),
            React.createElement(picker_panel_1.default, { optionGroups: data, valueGroups: valueGroups, onChange: onChange })),
        React.createElement("div", { onClick: function () {
                togglePicker(props, { isPickerShow: true, setIsPickerShow: setIsPickerShow });
            } }, props.children)));
};
Picker.defaultProps = defaultProps;
exports.default = Picker;
