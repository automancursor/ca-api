"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var guid_1 = require("./guid");
exports.getUid = guid_1.getUid;
exports.getUidString = guid_1.getUidString;
var omit = function (obj, arr) {
    return Object.keys(obj)
        .filter(function (k) { return !arr.includes(k); })
        .reduce(function (acc, key) { return ((acc[key] = obj[key]), acc); }, {});
};
exports.omit = omit;
var compose = function () {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return fns.reduce(function (f, g) { return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return f(g.apply(void 0, args));
    }; });
};
exports.compose = compose;
var getPrefixCls = function (prefixCls, classStr) {
    if (!classStr)
        return prefixCls;
    return prefixCls + "-" + classStr;
};
exports.getPrefixCls = getPrefixCls;
