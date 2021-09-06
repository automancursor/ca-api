"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var utils_1 = require("../utils");
var noop = function () { };
var useRef = React.useRef, useState = React.useState, useEffect = React.useEffect;
var defaultProps = {
    onChange: noop,
    useSticky: false,
    prefixCls: 'cp-ui-affix'
};
var getScrollTarget = function (_a) {
    var container = _a.container;
    if (container === undefined)
        return window;
    return container();
};
var getClassNames = function (_a) {
    var _b;
    var useSticky = _a.useSticky, prefixCls = _a.prefixCls;
    return classnames_1.default(prefixCls, (_b = {},
        _b[utils_1.getPrefixCls(prefixCls, 'use-sticky')] = useSticky,
        _b));
};
var getStyle = function (_a, style) {
    var useSticky = _a.useSticky, offsetTop = _a.offsetTop, offsetBottom = _a.offsetBottom;
    var styleCopy = {};
    if (useSticky)
        return style;
    styleCopy.position = 'sticky';
    if (offsetBottom === undefined) {
        styleCopy.top = offsetTop;
    }
    else {
        styleCopy.bottom = offsetBottom;
    }
    return styleCopy;
};
var setEventListener = function (props, listener) {
    var container = getScrollTarget(props);
    container.addEventListener('scroll', listener);
    return container;
};
var handleChange = function (_a) {
    var onChange = _a.onChange, setAffixed = _a.setAffixed, setStyle = _a.setStyle, affixed = _a.affixed, style = _a.style;
    onChange(affixed);
    setAffixed(affixed);
    setStyle(style);
};
var getOffsetTop = function (offsetTop, offsetBottom) {
    var _offsetTop = 0;
    if (offsetBottom === undefined && offsetTop === undefined) {
        offsetTop = 0;
    }
    else {
        _offsetTop = offsetTop !== null && offsetTop !== void 0 ? offsetTop : 0;
    }
    return _offsetTop;
};
var handleScroll = function (_a) {
    var props = _a.props, setStyle = _a.setStyle, wrapperRef = _a.wrapperRef, affixed = _a.affixed, setAffixed = _a.setAffixed, setOuterStyle = _a.setOuterStyle;
    var offsetBottom = props.offsetBottom;
    wrapperScollStyle({ props: props, setStyle: setStyle, wrapperRef: wrapperRef, affixed: affixed, setAffixed: setAffixed, setOuterStyle: setOuterStyle }, offsetBottom !== undefined);
};
var wrapperScollStyle = function (_a, isButtom) {
    var props = _a.props, setStyle = _a.setStyle, wrapperRef = _a.wrapperRef, affixed = _a.affixed, setAffixed = _a.setAffixed, setOuterStyle = _a.setOuterStyle;
    if (isButtom === void 0) { isButtom = false; }
    var style = {};
    var offsetTop = props.offsetTop, offsetBottom = props.offsetBottom, onChange = props.onChange;
    var rect = wrapperRef.current.getBoundingClientRect();
    var top = rect.top, bottom = rect.bottom, left = rect.left, width = rect.width, height = rect.height;
    var scrollPos = top;
    if (isButtom) {
        scrollPos = bottom;
    }
    // 对affixed做判断避免多余的setState
    if (scrollPos > getOffsetTop(props.offsetTop, props.offsetBottom)) {
        if (affixed) {
            style.position = 'relative';
            handleChange({ onChange: onChange, setAffixed: setAffixed, setStyle: setStyle, affixed: false, style: style });
            setOuterStyle({});
        }
    }
    else {
        if (!affixed) {
            style = {
                position: 'fixed',
                left: left
            };
            if (!isButtom) {
                style.top = offsetTop;
            }
            else {
                style.bottom = offsetBottom;
            }
            handleChange({ onChange: onChange, setAffixed: setAffixed, setStyle: setStyle, affixed: true, style: style });
            setOuterStyle({ width: width, height: height });
        }
    }
};
var Affix = function (props) {
    var useSticky = props.useSticky;
    var wrapperRef = useRef(null);
    var targetRef = useRef(null);
    var _a = useState({}), style = _a[0], setStyle = _a[1];
    // 需要对外部容器设置宽高否则会内容闪到上面
    var _b = useState({}), outerStyle = _b[0], setOuterStyle = _b[1];
    var _c = useState(false), affixed = _c[0], setAffixed = _c[1];
    var wrapperStyle = getStyle(props, style);
    useEffect(function () {
        if (useSticky) {
            var listener_1 = function () {
                handleScroll({ props: props, setStyle: setStyle, wrapperRef: wrapperRef, affixed: affixed, setAffixed: setAffixed, setOuterStyle: setOuterStyle });
            };
            var container_1 = setEventListener(props, listener_1);
            return function () {
                container_1.removeEventListener('scroll', listener_1);
            };
        }
        return function () { };
    }, [useSticky]);
    var classStr = getClassNames(props);
    return (React.createElement("div", { ref: wrapperRef, className: classStr, style: useSticky ? outerStyle : wrapperStyle },
        React.createElement("div", { ref: targetRef, style: wrapperStyle }, props.children)));
};
Affix.defaultProps = defaultProps;
exports.default = Affix;
