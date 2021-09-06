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
var react_dom_1 = require("react-dom");
var react_transition_group_1 = require("react-transition-group");
var overlay_1 = require("./overlay");
var noop = function () { };
var useState = React.useState;
var defaultProps = {
    prefixCls: 'cp-ui-overlay',
    visible: false,
    mask: true,
    maskClosable: true,
    closable: false,
    autoFix: false,
    destroy: true,
    onClose: noop,
    maskAnimationName: 'fade',
    animationName: 'fade'
};
var setBodyStyle = function (visible) {
    document.body.style.overflow = visible ? 'hidden' : 'auto';
};
var OverlayWrapper = function (props) {
    var _a = useState(true), firstTime = _a[0], setFirstTime = _a[1];
    var visible = props.visible, destroy = props.destroy, prefixCls = props.prefixCls;
    if (visible) {
        if (firstTime) {
            setFirstTime(false);
        }
    }
    // 处理destroy为false的时候第一次没动画的问题
    var getUnmount = function () {
        var props = {};
        if (destroy) {
            props.unmountOnExit = true;
        }
        else {
            if (firstTime) {
                props.unmountOnExit = true;
            }
            else {
                props.unmountOnExit = false;
            }
        }
        return props;
    };
    if (!destroy) {
        setBodyStyle(visible);
    }
    return react_dom_1.createPortal(React.createElement(react_transition_group_1.CSSTransition, __assign({ in: props.visible, timeout: 300, classNames: prefixCls + "-fade" }, getUnmount()),
        React.createElement(overlay_1.default, __assign({}, props))), document.body);
};
OverlayWrapper.defaultProps = defaultProps;
exports.default = OverlayWrapper;
