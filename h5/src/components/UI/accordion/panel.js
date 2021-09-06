"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var icon_1 = require("../icon");
var noop = function () { };
var defaultProps = {
    disabled: false,
    defaultExpanded: false,
    prefixCls: 'cp-ui-panel',
    onChange: noop
};
var handleClick = function (_a) {
    var props = _a.props, defaultExpanded = _a.defaultExpanded;
    var onChange = props.onChange, disabled = props.disabled;
    if (disabled)
        return;
    onChange(!defaultExpanded);
};
var renderIcon = function (_a) {
    var icon = _a.icon;
    if (icon) {
        return icon;
    }
    return null;
};
var renderRightIcon = function (_a, visible) {
    var rightOpenIcon = _a.rightOpenIcon, rightCloseIcon = _a.rightCloseIcon;
    var isShowCustomIcon = !!rightOpenIcon && !!rightCloseIcon;
    if (visible) {
        if (isShowCustomIcon) {
            return rightOpenIcon;
        }
        else {
            return React.createElement(icon_1.default, { type: 'angle-up' });
        }
    }
    else {
        if (isShowCustomIcon) {
            return rightCloseIcon;
        }
        else {
            return React.createElement(icon_1.default, { type: 'angle-down' });
        }
    }
};
var renderTitleContent = function (_a) {
    var title = _a.title, prefixCls = _a.prefixCls;
    if (title) {
        return React.createElement("div", { className: prefixCls + "-title-content" }, title);
    }
    return null;
};
var renderContent = function (_a, visible) {
    var _b;
    var content = _a.content, prefixCls = _a.prefixCls;
    if (content) {
        var classStr = classnames_1.default(prefixCls + "-body", (_b = {},
            _b[prefixCls + "-body-active"] = visible,
            _b[prefixCls + "-body-inactive"] = !visible,
            _b));
        return React.createElement("div", { className: classStr }, content);
    }
    return null;
};
var Panel = function (props) {
    var _a;
    var prefixCls = props.prefixCls, title = props.title, defaultExpanded = props.defaultExpanded, disabled = props.disabled;
    console.log('defaultExpanded', defaultExpanded);
    var classStr = classnames_1.default(prefixCls, (_a = {},
        _a[prefixCls + "-expanded"] = defaultExpanded,
        _a[prefixCls + "-disabled"] = disabled,
        _a));
    return (React.createElement("div", { className: classStr },
        title ? (React.createElement("div", { className: prefixCls + "-title", style: defaultExpanded ? { borderBottom: '1px solid #d9d9d9' } : {}, onClick: function () { return handleClick({ props: props, defaultExpanded: defaultExpanded }); } },
            React.createElement("div", { className: prefixCls + "-icon" }, renderIcon(props)),
            renderTitleContent(props),
            React.createElement("div", { className: prefixCls + "-right-icon" }, renderRightIcon(props, defaultExpanded)))) : null,
        renderContent(props, defaultExpanded)));
};
Panel.defaultProps = defaultProps;
exports.default = Panel;
