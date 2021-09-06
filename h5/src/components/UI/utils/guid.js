"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uid = Date.now();
exports.getUid = function () {
    uid += 1;
    return uid;
};
exports.getUidString = function () {
    return exports.getUid().toString(36);
};
