"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
require("./style/index.scss");
var noop = function () { };
var defaultProps = {
    actions: [],
    prefixCls: 'cp-ui-card',
    onExtraClick: noop
};
var renderActions = function (_a) {
    var actions = _a.actions, prefixCls = _a.prefixCls;
    if (actions && actions.length) {
        return (React.createElement("div", { className: prefixCls + "-actions" }, actions.map(function (action, index) {
            return (React.createElement("div", { className: prefixCls + "-actions-item", onClick: action.onClick, key: "action-" + index }, action.content));
        })));
    }
    return null;
};
var Card = function (props) {
    var prefixCls = props.prefixCls, title = props.title, extra = props.extra, children = props.children, className = props.className, style = props.style, onExtraClick = props.onExtraClick;
    var classStr = classnames_1.default(prefixCls, className);
    var styleCopy = style || {};
    return (React.createElement("div", { className: classStr, style: styleCopy },
        title ? (React.createElement("div", { className: prefixCls + "-header" },
            React.createElement("div", { className: prefixCls + "-title" }, title),
            extra ? (React.createElement("div", { className: prefixCls + "-extra", onClick: onExtraClick }, extra)) : null)) : null,
        children ? React.createElement("div", { className: prefixCls + "-body" }, children) : null,
        renderActions(props)));
};
Card.defaultProps = defaultProps;
exports.default = Card;
