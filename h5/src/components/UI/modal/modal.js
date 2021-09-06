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
var overlay_1 = require("../overlay");
var button_1 = require("../button");
require("./style/index.scss");
var utils_1 = require("../utils");
var noop = function () { };
var defaultProps = {
    visible: false,
    prefixCls: 'cp-ui-modal',
    maskClosable: true,
    closable: true,
    okText: '确认',
    cancelText: '取消',
    destroy: true,
    onCancel: noop,
    onOk: noop
};
var handleCancel = function (_a) {
    var onCancel = _a.onCancel;
    onCancel();
};
var handleOk = function (_a) {
    var onOk = _a.onOk;
    onOk();
};
var renderHeader = function (_a) {
    var title = _a.title, prefixCls = _a.prefixCls;
    if (title) {
        return React.createElement("div", { className: prefixCls + "-title" }, title);
    }
    return null;
};
var getFooterBotton = function (props) {
    var okText = props.okText, cancelText = props.cancelText, prefixCls = props.prefixCls;
    var btns = [
        {
            text: okText,
            onClick: function () { return handleOk(props); },
            className: cancelText !== null ? prefixCls + "-footer-ok" : prefixCls + "-footer-ok-only"
        }
    ];
    if (cancelText !== null) {
        btns.unshift({
            text: cancelText,
            onClick: function () { return handleCancel(props); },
            className: prefixCls + "-footer-cancel"
        });
    }
    return btns;
};
var renderFooter = function (props) {
    var prefixCls = props.prefixCls, footer = props.footer;
    var buttons = getFooterBotton(props);
    var com = null;
    if (footer) {
        com = footer;
    }
    else {
        com =
            footer === undefined ? (React.createElement(React.Fragment, null, buttons.map(function (button, index) { return (React.createElement(button_1.default, __assign({ key: index }, utils_1.omit(button, ['text'])), button.text)); }))) : (footer);
    }
    return React.createElement("div", { className: prefixCls + "-footer-container" }, com);
};
var Modal = function (props) {
    var children = props.children, prefixCls = props.prefixCls, closable = props.closable, visible = props.visible, closeIcon = props.closeIcon, className = props.className, maskAnimationName = props.maskAnimationName, maskClassName = props.maskClassName, animationName = props.animationName, destroy = props.destroy;
    return (React.createElement(overlay_1.default, { prefixCls: prefixCls, className: className, visible: visible, header: renderHeader(props), footer: renderFooter(props), close: closeIcon, onClose: function () { return handleCancel(props); }, maskClassName: maskClassName, maskAnimationName: maskAnimationName, animationName: animationName, destroy: destroy, closable: closable },
        React.createElement("div", { className: prefixCls + "-body-contain" }, children)));
};
Modal.defaultProps = defaultProps;
exports.default = Modal;
