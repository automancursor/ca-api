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
var useState = React.useState, useRef = React.useRef;
var defaultProps = {
    text: '',
    loop: false,
    leading: 500,
    trailing: 800,
    fps: 40,
    className: ''
};
var _startAnimation = function (props, _a) {
    var _marqueeTimer = _a._marqueeTimer, animatedWidth = _a.animatedWidth, overflowWidth = _a.overflowWidth, setAnimatedWidth = _a.setAnimatedWidth;
    var fps = props.fps, leading = props.leading;
    if (_marqueeTimer.current) {
        window.clearTimeout(_marqueeTimer.current);
        _marqueeTimer.current = 0;
    }
    var TIMEOUT = (1 / fps) * 1000;
    var isLeading = animatedWidth === 0;
    var timeout = isLeading ? leading : TIMEOUT;
    var animate = function () {
        var loop = props.loop, trailing = props.trailing;
        var _animatedWidth = animatedWidth + 1;
        var isRoundOver = _animatedWidth > overflowWidth;
        if (isRoundOver) {
            if (loop) {
                _animatedWidth = 0;
            }
            else {
                return;
            }
        }
        if (isRoundOver && trailing) {
            //fixme trailing 表示 loop 为 true 时，动画间停顿
            _marqueeTimer.current = window.setTimeout(function () {
                setAnimatedWidth(_animatedWidth);
                _marqueeTimer.current = window.setTimeout(function () {
                    animate();
                }, TIMEOUT);
            }, trailing);
        }
        else {
            setAnimatedWidth(_animatedWidth);
            _marqueeTimer.current = window.setTimeout(function () {
                animate();
            }, TIMEOUT);
        }
    };
    if (overflowWidth !== 0) {
        //fixme 动画开启前停顿
        _marqueeTimer.current = window.setTimeout(function () {
            animate();
        }, timeout);
    }
};
var _measureText = function (_a) {
    var textRef = _a.textRef, overflowWidth = _a.overflowWidth, setOverflowWidth = _a.setOverflowWidth, marqueeRef = _a.marqueeRef;
    var container = ReactDOM.findDOMNode(marqueeRef.current);
    var node = textRef.current;
    if (container && node) {
        var containerWidth = container.offsetWidth;
        var textWidth = node.offsetWidth;
        var _overflowWidth = textWidth - containerWidth;
        if (_overflowWidth !== overflowWidth) {
            setOverflowWidth(_overflowWidth);
        }
    }
};
var Marquee = function (props) {
    var prefixCls = props.prefixCls, className = props.className, text = props.text;
    var _a = useState(0), animatedWidth = _a[0], setAnimatedWidth = _a[1];
    var _b = useState(0), overflowWidth = _b[0], setOverflowWidth = _b[1];
    var textRef = useRef(null);
    var marqueeRef = useRef(null);
    var _marqueeTimer = useRef(0);
    React.useEffect(function () {
        _measureText({
            textRef: textRef,
            overflowWidth: overflowWidth,
            setOverflowWidth: setOverflowWidth,
            marqueeRef: marqueeRef
        });
        _startAnimation(props, { _marqueeTimer: _marqueeTimer, animatedWidth: animatedWidth, overflowWidth: overflowWidth, setAnimatedWidth: setAnimatedWidth });
        return function () {
            clearTimeout(_marqueeTimer.current);
        };
    }, []);
    React.useEffect(function () {
        _measureText({
            textRef: textRef,
            overflowWidth: overflowWidth,
            setOverflowWidth: setOverflowWidth,
            marqueeRef: marqueeRef
        });
    });
    React.useEffect(function () {
        _startAnimation(props, { _marqueeTimer: _marqueeTimer, animatedWidth: animatedWidth, overflowWidth: overflowWidth, setAnimatedWidth: setAnimatedWidth });
    }, [_marqueeTimer.current, animatedWidth, overflowWidth]);
    var style = __assign({ position: 'relative', right: animatedWidth, whiteSpace: 'nowrap', display: 'inline-block' }, props.style);
    return (React.createElement("div", { className: prefixCls + "-marquee-wrap " + className, ref: marqueeRef, style: { overflow: 'hidden' }, role: "marquee" },
        React.createElement("div", { ref: textRef, className: prefixCls + "-marquee", style: style }, text)));
};
Marquee.defaultProps = defaultProps;
exports.default = Marquee;
