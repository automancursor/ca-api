"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
require("./style");
var prefixCls = 'cp-ui-picker-column';
var useState = React.useState, useEffect = React.useEffect;
var computeTranslate = function (props) {
    var options = props.options, value = props.value, itemHeight = props.itemHeight, columnHeight = props.columnHeight, name = props.name;
    var selectedIndex = options.indexOf(value);
    if (selectedIndex < 0) {
        // throw new ReferenceError();
        console.warn('Warning: "' + name + '" doesn\'t contain an option of "' + value + '".');
        onValueSelected(props, options[0]);
        selectedIndex = 0;
    }
    return {
        scrollerTranslate: columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight,
        minTranslate: columnHeight / 2 - itemHeight * options.length + itemHeight / 2,
        maxTranslate: columnHeight / 2 - itemHeight / 2
    };
};
var onValueSelected = function (props, newValue) {
    var onChange = props.onChange, name = props.name;
    onChange(name, newValue);
};
var handleTouchStart = function (event, _a) {
    var setStartScrollerTranslate = _a.setStartScrollerTranslate, scrollerTranslate = _a.scrollerTranslate, setStartTouchY = _a.setStartTouchY;
    event.preventDefault();
    var startTouchY = event.targetTouches[0].pageY;
    setStartTouchY(startTouchY);
    setStartScrollerTranslate(scrollerTranslate);
};
var handleTouchMove = function (event, _a) {
    var isMoving = _a.isMoving, setIsMoving = _a.setIsMoving, setScrollerTranslate = _a.setScrollerTranslate, startTouchY = _a.startTouchY, startScrollerTranslate = _a.startScrollerTranslate, minTranslate = _a.minTranslate, maxTranslate = _a.maxTranslate;
    event.preventDefault();
    var touchY = event.targetTouches[0].pageY;
    if (!isMoving) {
        setIsMoving(true);
        return;
    }
    var nextScrollerTranslate = startScrollerTranslate + touchY - startTouchY;
    if (nextScrollerTranslate < minTranslate) {
        nextScrollerTranslate = minTranslate - Math.pow(minTranslate - nextScrollerTranslate, 0.8);
    }
    else if (nextScrollerTranslate > maxTranslate) {
        nextScrollerTranslate = maxTranslate + Math.pow(nextScrollerTranslate - maxTranslate, 0.8);
    }
    setScrollerTranslate(nextScrollerTranslate);
};
var handleTouchEnd = function (event, props, _a) {
    var scrollerTranslate = _a.scrollerTranslate, minTranslate = _a.minTranslate, maxTranslate = _a.maxTranslate, isMoving = _a.isMoving, setIsMoving = _a.setIsMoving, setStartTouchY = _a.setStartTouchY, setStartScrollerTranslate = _a.setStartScrollerTranslate;
    event.preventDefault();
    if (!isMoving) {
        return;
    }
    setIsMoving(false);
    setStartTouchY(0);
    setStartScrollerTranslate(0);
    window.setTimeout(function () {
        var options = props.options, itemHeight = props.itemHeight;
        var activeIndex;
        if (scrollerTranslate > maxTranslate) {
            activeIndex = 0;
        }
        else if (scrollerTranslate < minTranslate) {
            activeIndex = options.length - 1;
        }
        else {
            activeIndex = -Math.floor((scrollerTranslate - maxTranslate) / itemHeight);
        }
        onValueSelected(props, options[activeIndex]);
    }, 0);
};
var handleTouchCancel = function (event, _a) {
    var isMoving = _a.isMoving, setIsMoving = _a.setIsMoving, setStartTouchY = _a.setStartTouchY, setStartScrollerTranslate = _a.setStartScrollerTranslate, startScrollerTranslate = _a.startScrollerTranslate, setScrollerTranslate = _a.setScrollerTranslate;
    event.preventDefault();
    if (!isMoving) {
        return;
    }
    setScrollerTranslate(startScrollerTranslate);
    setIsMoving(false);
    setStartTouchY(0);
    setStartScrollerTranslate(0);
};
var handleItemClick = function (props, option) {
    var value = props.value, onClick = props.onClick, name = props.name;
    if (option !== value) {
        onValueSelected(props, option);
    }
    else {
        onClick(name, value);
    }
};
var renderItems = function (props) {
    var options = props.options, itemHeight = props.itemHeight, value = props.value;
    return options.map(function (option, index) {
        var style = {
            height: itemHeight + 'px',
            lineHeight: itemHeight + 'px'
        };
        var className = prefixCls + "-item " + (option === value ? prefixCls + "-item-selected" : '');
        return (React.createElement("div", { key: index, className: className, style: style, onClick: function () { return handleItemClick(props, option); } }, option));
    });
};
var noop = function () { };
var defaultProps = {
    options: [],
    name: '',
    value: '',
    itemHeight: 0,
    columnHeight: 0,
    onChange: noop,
    onClick: noop
};
var PickerColumn = function (props) {
    var _a = useState(false), isMoving = _a[0], setIsMoving = _a[1];
    var _b = useState(0), startTouchY = _b[0], setStartTouchY = _b[1];
    var _c = useState(0), startScrollerTranslate = _c[0], setStartScrollerTranslate = _c[1];
    var _d = useState(0), scrollerTranslate = _d[0], setScrollerTranslate = _d[1];
    var _e = useState(0), minTranslate = _e[0], setMinTranslate = _e[1];
    var _f = useState(0), maxTranslate = _f[0], setMaxTranslate = _f[1];
    var translateString = "translate3d(0, " + scrollerTranslate + "px, 0)";
    var style = {
        msTransform: translateString,
        OTransform: translateString,
        WebkitTransform: translateString,
        transform: translateString
    };
    if (isMoving) {
        style.transitionDuration = '0ms';
    }
    useEffect(function () {
        var _a = computeTranslate(props), scrollerTranslate = _a.scrollerTranslate, minTranslate = _a.minTranslate, maxTranslate = _a.maxTranslate;
        setScrollerTranslate(scrollerTranslate);
        setMinTranslate(minTranslate);
        setMaxTranslate(maxTranslate);
    }, [props]);
    return (React.createElement("div", { className: classnames_1.default("" + prefixCls) },
        React.createElement("div", { className: prefixCls + "-scroller", style: style, onTouchStart: function (e) {
                handleTouchStart(e, { setStartTouchY: setStartTouchY, scrollerTranslate: scrollerTranslate, setStartScrollerTranslate: setStartScrollerTranslate });
            }, onTouchMove: function (e) {
                handleTouchMove(e, {
                    isMoving: isMoving,
                    setScrollerTranslate: setScrollerTranslate,
                    startTouchY: startTouchY,
                    startScrollerTranslate: startScrollerTranslate,
                    minTranslate: minTranslate,
                    maxTranslate: maxTranslate,
                    setIsMoving: setIsMoving
                });
            }, onTouchEnd: function (e) {
                handleTouchEnd(e, props, {
                    scrollerTranslate: scrollerTranslate,
                    minTranslate: minTranslate,
                    maxTranslate: maxTranslate,
                    isMoving: isMoving,
                    setIsMoving: setIsMoving,
                    setStartTouchY: setStartTouchY,
                    setStartScrollerTranslate: setStartScrollerTranslate
                });
            }, onTouchCancel: function (e) {
                handleTouchCancel(e, {
                    isMoving: isMoving,
                    setIsMoving: setIsMoving,
                    setStartTouchY: setStartTouchY,
                    setStartScrollerTranslate: setStartScrollerTranslate,
                    scrollerTranslate: scrollerTranslate,
                    startScrollerTranslate: startScrollerTranslate,
                    setScrollerTranslate: setScrollerTranslate
                });
            } }, renderItems(props))));
};
PickerColumn.defaultProps = defaultProps;
exports.default = PickerColumn;
