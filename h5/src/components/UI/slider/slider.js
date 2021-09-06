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
var rc_slider_1 = require("rc-slider");
var utils_1 = require("../utils");
require("./style");
var defaultProps = {
    prefixCls: 'cp-ui-slider'
};
var omitProps = function (props) {
    var excludeProps = ['prefixCls'];
    return utils_1.omit(props, excludeProps);
};
var Slider = function (props) {
    var prefixCls = props.prefixCls;
    var otherProps = omitProps(props);
    console.log(otherProps);
    return (React.createElement("div", { className: "" + prefixCls },
        React.createElement(rc_slider_1.default, __assign({}, otherProps))));
};
Slider.defaultProps = defaultProps;
exports.default = Slider;
