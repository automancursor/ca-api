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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var rmc_tooltip_1 = require("rmc-tooltip");
require("./style");
var recursiveCloneChildren = function (children, cb) {
    if (cb === void 0) { cb = function (ch, _) { return ch; }; }
    return React.Children.map(children, function (child, index) {
        var newChild = cb(child, index);
        if (typeof newChild !== 'string' &&
            typeof newChild !== 'number' &&
            newChild &&
            newChild.props &&
            newChild.props.children) {
            return React.cloneElement(newChild, {}, recursiveCloneChildren(newChild.props.children, cb));
        }
        return newChild;
    });
};
var defaultProps = {
    prefixCls: 'cp-ui-popover'
};
var Popover = function (props) {
    var overlay = props.overlay, _a = props.onSelect, onSelect = _a === void 0 ? function () { } : _a, _b = props.align, align = _b === void 0 ? { overflow: { adjustY: 0, adjustX: 0 } } : _b, _c = props.placement, placement = _c === void 0 ? 'bottomRight' : _c, restProps = __rest(props, ["overlay", "onSelect", "align", "placement"]);
    var overlayNode = recursiveCloneChildren(overlay, function (child, index) {
        var extraProps = { firstItem: false };
        if (child &&
            typeof child !== 'string' &&
            typeof child !== 'number' &&
            child.type &&
            // Fixme: not sure where the `itemName` came from.
            child.type.itemName === 'PopoverItem' &&
            !child.props.disabled) {
            extraProps.onClick = function () { return onSelect(child, index); };
            extraProps.firstItem = index === 0;
            return React.cloneElement(child, extraProps);
        }
        return child;
    });
    var wrapperNode = React.createElement("div", { className: props.prefixCls + "-inner-wrapper" }, overlayNode);
    return React.createElement(rmc_tooltip_1.default, __assign({ align: align, placement: placement }, restProps, { overlay: wrapperNode }));
};
Popover.defaultProps = defaultProps;
exports.default = Popover;
