"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
require("./style");
var prefixCls = 'cp-ui-swipe-action';
var destoryTouchEvent = function () {
    //fixed me 在React中使用DOM原声事件的时候一定要在组件卸载的时候手动移除，以免内存泄漏
    document.body.removeEventListener('touchmove', function () { });
};
var onSiderContentTouchCancel = function (e, isMoving, setIsMoving, setStartTouchX) {
    e.preventDefault();
    if (!isMoving) {
        return;
    }
    setIsMoving(false);
    setStartTouchX(0);
};
var onSiderContentTouchEnd = function (e, props, directionRef, sliderContentRef, isMoving, setIsMoving) {
    e.preventDefault();
    var onOpen = props.onOpen, onClose = props.onClose, disabled = props.disabled;
    if (disabled || !isMoving) {
        return;
    }
    setIsMoving(false);
    var sliderButton = document.getElementsByClassName(prefixCls + "-button")[0];
    var sliderButtonWidth = sliderButton.offsetWidth * 2;
    var sliderContentComponent = sliderContentRef.current;
    if (!sliderContentComponent) {
        return;
    }
    if (directionRef.current === 'left') {
        sliderContentComponent.style.left = "-" + sliderButtonWidth + "px";
        onOpen && onOpen();
    }
    else if (directionRef.current === 'right') {
        sliderContentComponent.style.left = '0px';
        onClose && onClose();
    }
    // 取消过渡效果
    sliderContentComponent.style.transition = '0.3s all ease-in';
};
var onSiderContentTouchStart = function (e, setStartTouchX) {
    e.preventDefault();
    var startTouchX = e.targetTouches[0].pageX;
    setStartTouchX(startTouchX);
};
var onSiderContentTouchMove = function (e, props, directionRef, sliderContentRef, isMoving, setIsMoving, prevX, setPrevX, startTouchX) {
    var right = props.right, disabled = props.disabled;
    var length = right.length;
    e.preventDefault();
    if (disabled || !isMoving) {
        setIsMoving(true);
        return;
    }
    var currentComponent = sliderContentRef.current;
    if (!currentComponent) {
        return;
    }
    var sliderButton = document.getElementsByClassName(prefixCls + "-button")[0];
    var sliderButtonWidth = sliderButton.offsetWidth * length;
    var currentX = e.targetTouches[0].pageX - startTouchX;
    currentComponent.style.transition = '';
    var currentComponentOffset = currentComponent.offsetLeft;
    console.log('currentComponentOffset', currentComponentOffset, -sliderButtonWidth);
    if (currentComponentOffset > 0 && directionRef.current === 'right') {
        currentComponentOffset = 0;
    }
    else if (currentComponentOffset < -sliderButtonWidth && directionRef.current === 'left') {
        currentComponentOffset = -sliderButtonWidth;
    }
    if (prevX) {
        if (currentComponentOffset <= 0 && currentComponentOffset >= -sliderButtonWidth) {
            if (currentX < prevX) {
                directionRef.current = 'left';
                currentComponent.style.left = currentComponentOffset - 1 + 'px';
            }
            else {
                directionRef.current = 'right';
                currentComponent.style.left = currentComponentOffset + 1 + 'px';
            }
        }
    }
    setPrevX(currentX);
};
var handleSliderButtonClick = function (e, props, item, sliderContentRef) {
    e.preventDefault();
    var autoClose = props.autoClose;
    if (autoClose && sliderContentRef.current) {
        sliderContentRef.current.style.transition = '0.5s all ease-in';
        window.setTimeout(function () {
            if (sliderContentRef.current) {
                sliderContentRef.current.style.left = '0px';
            }
        }, 10);
    }
    item.onPress && item.onPress();
};
var useRef = React.useRef, useEffect = React.useEffect, useState = React.useState;
var defaultProps = {
    prefixCls: prefixCls,
    autoClose: true
};
var SwipeAction = function (props) {
    var _a = useState(0), prevX = _a[0], setPrevX = _a[1];
    var _b = useState(false), isMoving = _b[0], setIsMoving = _b[1];
    var _c = useState(0), startTouchX = _c[0], setStartTouchX = _c[1];
    var sliderWrapRef = useRef(null);
    var sliderContentRef = useRef(null);
    var directionRef = useRef('');
    var prefixCls = props.prefixCls, right = props.right;
    useEffect(function () {
        return function () {
            destoryTouchEvent();
        };
    }, []);
    return (React.createElement("div", { className: classnames_1.default(prefixCls, prefixCls + "-wrap"), ref: sliderWrapRef },
        React.createElement("div", { className: prefixCls + "-content", ref: sliderContentRef, onTouchStart: function (e) {
                onSiderContentTouchStart(e, setStartTouchX);
            }, onTouchMove: function (e) {
                onSiderContentTouchMove(e, props, directionRef, sliderContentRef, isMoving, setIsMoving, prevX, setPrevX, startTouchX);
            }, onTouchEnd: function (e) {
                onSiderContentTouchEnd(e, props, directionRef, sliderContentRef, isMoving, setIsMoving);
            }, onTouchCancel: function (e) {
                onSiderContentTouchCancel(e, isMoving, setIsMoving, setStartTouchX);
            } }, props.children),
        right.map(function (item, index) {
            return (React.createElement("a", { key: prefixCls + "-button-" + index, onClick: function (e) {
                    handleSliderButtonClick(e, props, item, sliderContentRef);
                }, style: { right: 70 * index }, className: classnames_1.default(prefixCls + "-button", item.style) },
                React.createElement("div", { className: prefixCls + "-btn-text" },
                    " ",
                    item.text)));
        })));
};
SwipeAction.defaultProps = defaultProps;
exports.default = SwipeAction;
