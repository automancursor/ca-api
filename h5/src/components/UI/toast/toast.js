"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classnames_1 = require("classnames");
var React = require("react");
var rmc_notification_1 = require("rmc-notification");
var icon_1 = require("../icon");
require("./style/index.scss");
var SHORT = 3;
var config = {
    duration: SHORT,
    mask: true
};
var toastType;
(function (toastType) {
    toastType["success"] = "success";
    toastType["fail"] = "fail";
    toastType["info"] = "info";
    toastType["loading"] = "loading";
    toastType["offline"] = "offline";
})(toastType || (toastType = {}));
var messageInstance;
var messageNeedHide;
var prefixCls = 'cp-ui-toast';
function getMessageInstance(mask, callback) {
    var _a;
    return rmc_notification_1.default.newInstance({
        prefixCls: prefixCls,
        style: {},
        transitionName: 'cp-ui-fade',
        className: classnames_1.default((_a = {},
            _a[prefixCls + "-mask"] = mask,
            _a[prefixCls + "-nomask"] = !mask,
            _a))
    }, function (notification) { return callback && callback(notification); });
}
function notice(content, type, duration, onClose, mask) {
    if (duration === void 0) { duration = config.duration; }
    if (mask === void 0) { mask = config.mask; }
    var iconTypes = {
        info: '',
        success: 'check-circle-o',
        fail: 'close',
        offline: 'meh-o',
        loading: 'circle-o-notch'
    };
    var iconType = iconTypes[type];
    messageNeedHide = false;
    getMessageInstance(mask, function (notification) {
        if (!notification) {
            return;
        }
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
        if (messageNeedHide) {
            notification.destroy();
            messageNeedHide = false;
            return;
        }
        messageInstance = notification;
        notification.notice({
            duration: duration,
            style: {},
            content: !!iconType ? (React.createElement("div", { className: prefixCls + "-text " + prefixCls + "-text-icon", role: "alert", "aria-live": "assertive" },
                React.createElement(icon_1.default, { type: iconType, size: "32px", spin: type === 'loading' }),
                React.createElement("div", { className: prefixCls + "-text-info" }, content))) : (React.createElement("div", { className: prefixCls + "-text", role: "alert", "aria-live": "assertive" },
                React.createElement("div", null, content))),
            closable: true,
            onClose: function () {
                if (onClose) {
                    onClose();
                }
                notification.destroy();
                notification = null;
                messageInstance = null;
            }
        });
    });
}
exports.default = {
    SHORT: SHORT,
    LONG: 8,
    show: function (content, duration, mask) {
        return notice(content, toastType.info, duration, function () { }, mask);
    },
    info: function (content, duration, onClose, mask) {
        return notice(content, toastType.info, duration, onClose, mask);
    },
    success: function (content, duration, onClose, mask) {
        return notice(content, toastType.success, duration, onClose, mask);
    },
    fail: function (content, duration, onClose, mask) {
        return notice(content, toastType.fail, duration, onClose, mask);
    },
    offline: function (content, duration, onClose, mask) {
        return notice(content, toastType.offline, duration, onClose, mask);
    },
    loading: function (content, duration, onClose, mask) {
        return notice(content, toastType.loading, duration, onClose, mask);
    },
    hide: function () {
        if (messageInstance) {
            messageInstance.destroy();
            messageInstance = null;
        }
        else {
            messageNeedHide = true;
        }
    },
    config: function (conf) {
        if (conf === void 0) { conf = {}; }
        var _a = conf.duration, duration = _a === void 0 ? SHORT : _a, mask = conf.mask;
        config.duration = duration;
        if (mask === false) {
            config.mask = false;
        }
    }
};
