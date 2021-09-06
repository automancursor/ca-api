"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_transition_group_1 = require("react-transition-group");
var classnames_1 = require("classnames");
var icon_1 = require("../icon");
var noop = function () { };
var useEffect = React.useEffect, useRef = React.useRef;
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
var getZIndex = function (zIndex) {
    return zIndex;
};
var getClassNames = function (_a) {
    var _b;
    var mask = _a.mask, className = _a.className, visible = _a.visible, prefixCls = _a.prefixCls;
    return classnames_1.default(prefixCls, className, (_b = {},
        _b[prefixCls + "-mask-show"] = mask,
        _b[prefixCls + "-visible"] = visible,
        _b));
};
var handleClose = function (onClose) {
    onClose();
};
var maskClick = function (e, props) {
    if (e.target === e.currentTarget) {
        handleClose(props.onClose);
    }
};
var animateEnter = function (_a, wrapRef) {
    var destroy = _a.destroy;
    if (!destroy) {
        ;
        wrapRef.current.style.display = '';
    }
};
var animateLeave = function (_a, wrapRef) {
    var destroy = _a.destroy;
    if (!destroy) {
        ;
        wrapRef.current.style.display = 'none';
    }
};
var renderMask = function (_a) {
    var maskClassName = _a.maskClassName, mask = _a.mask, prefixCls = _a.prefixCls, zIndex = _a.zIndex, maskAnimationName = _a.maskAnimationName, visible = _a.visible;
    var classStr = classnames_1.default(prefixCls + "-mask", maskClassName);
    var zindex = getZIndex(zIndex);
    var style = zindex ? { zIndex: zindex } : {};
    if (mask) {
        return (React.createElement(react_transition_group_1.CSSTransition, { in: visible, timeout: 300, classNames: prefixCls + "-" + maskAnimationName },
            React.createElement("div", { className: classStr, style: style })));
    }
    return null;
};
var renderHeader = function (_a) {
    var header = _a.header, prefixCls = _a.prefixCls;
    if (header) {
        return React.createElement("div", { className: prefixCls + "-header" }, header);
    }
    return null;
};
var renderClose = function (_a) {
    var closable = _a.closable, onClose = _a.onClose, close = _a.close, prefixCls = _a.prefixCls;
    if (closable) {
        return (React.createElement("div", { className: prefixCls + "-close", onClick: function () { return handleClose(onClose); } }, close || React.createElement(icon_1.default, { type: "close" })));
    }
    return null;
};
var renderFooter = function (_a) {
    var footer = _a.footer, prefixCls = _a.prefixCls;
    if (footer) {
        return React.createElement("div", { className: prefixCls + "-footer" }, footer);
    }
    return null;
};
var renderBody = function (props, wrapRef) {
    var prefixCls = props.prefixCls, children = props.children, animationName = props.animationName, zIndex = props.zIndex, visible = props.visible;
    var zindex = getZIndex(zIndex);
    var style = zIndex ? { zIndex: zindex } : {};
    return (React.createElement(react_transition_group_1.CSSTransition, { in: visible, timeout: 300, classNames: prefixCls + "-" + animationName, onEnter: function () { return animateEnter(props, wrapRef); }, onExited: function () { return animateLeave(props, wrapRef); } },
        React.createElement("div", { className: prefixCls + "-container", style: style },
            renderHeader(props),
            renderClose(props),
            React.createElement("div", { className: prefixCls + "-body" }, children),
            renderFooter(props))));
};
var Overlay = function (props) {
    var prefixCls = props.prefixCls, maskClosable = props.maskClosable;
    var classStr = getClassNames(props);
    var wrapRef = useRef(null);
    useEffect(function () {
        document.body.style.overflow = 'hidden';
        return function () {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (React.createElement("div", { className: classStr, ref: wrapRef },
        renderMask(props),
        React.createElement("div", { className: prefixCls + "-wrap", onClick: maskClosable
                ? function (e) {
                    maskClick(e, props);
                }
                : undefined }, renderBody(props, wrapRef))));
};
Overlay.defaultProps = defaultProps;
exports.default = Overlay;
