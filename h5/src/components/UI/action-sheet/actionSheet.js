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
var ReactDOM = require("react-dom");
var classnames_1 = require("classnames");
require("./style");
var prefixCls = 'cp-ui-action-sheet';
var queue = [];
var defaultProps = {
    closeOnClickModal: true,
    cancelText: '取消',
    actions: []
};
var closeActionSheet = function () {
    queue.forEach(function (q) { return q(); });
};
var renderCancelAcitionButton = function (cancelText, onCancel) {
    return (React.createElement("a", { href: "#", onClick: function (e) {
            e.preventDefault();
            e.stopPropagation();
            closeActionSheet();
            onCancel && onCancel(e);
        } }, cancelText));
};
var onBodyActionItemClick = function (item, key, onClick) {
    closeActionSheet();
    onClick(key, item);
};
var renderBodyActionButtonSheet = function (_a) {
    var actions = _a.actions;
    return actions.map(function (item, index) {
        var key = item.key === undefined ? "" + index : item.key;
        return (React.createElement("div", { className: classnames_1.default(prefixCls + "-select-choose-list"), key: key },
            React.createElement("a", { href: "#", onClick: function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    onBodyActionItemClick(item, key, item.onClick);
                } }, item.content)));
    });
};
var getClassNames = function () {
    return classnames_1.default(prefixCls);
};
var onMark = function (closeOnClickModal) {
    if (!closeOnClickModal) {
        return;
    }
    closeActionSheet();
};
var ActionSheet = function (props) {
    var cancelText = props.cancelText, onCancel = props.onCancel, closeOnClickModal = props.closeOnClickModal;
    var classStr = getClassNames();
    return (React.createElement("div", { className: classStr, onClick: function () {
            onMark(closeOnClickModal !== null && closeOnClickModal !== void 0 ? closeOnClickModal : true);
        } },
        React.createElement("div", { className: prefixCls + "-container" },
            React.createElement("div", { className: prefixCls + "-select-choose" }, renderBodyActionButtonSheet(props)),
            React.createElement("div", { className: prefixCls + "-select-chancel" }, renderCancelAcitionButton(cancelText, onCancel)))));
};
ActionSheet.defaultProps = defaultProps;
var createActionSheet = function (props) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    queue.push(close);
    function close() {
        if (div) {
            ReactDOM.unmountComponentAtNode(div);
            if (div.parentNode) {
                div.parentNode.removeChild(div);
            }
            var index = queue.indexOf(close);
            if (index !== -1) {
                queue.splice(index, 1);
            }
        }
    }
    ReactDOM.render(React.createElement(ActionSheet, __assign({}, props)), div);
};
exports.default = {
    showActionSheetWithOptions: function (props) {
        createActionSheet(props);
    },
    close: closeActionSheet
};
