"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var warning = require("warning");
require("./style/index.scss");
var noop = function () { };
// left and top
var leftTopPosition = new Set(['left', 'top']);
//  right and bottom
var rightBottomPosition = new Set(['right', 'bottom']);
var defaultProps = {
    type: 'line',
    onChange: noop,
    size: 'normal',
    tabPosition: 'top',
    prefixCls: 'cp-ui-tabs',
    options: [],
    onExtraClick: noop
};
var getPosition = function (tabPosition) {
    if (leftTopPosition.has(tabPosition) || rightBottomPosition.has(tabPosition))
        return tabPosition;
    return 'top';
};
var getClassNames = function (_a) {
    var _b;
    var className = _a.className, tabPosition = _a.tabPosition, size = _a.size, type = _a.type, prefixCls = _a.prefixCls;
    var position = getPosition(tabPosition);
    return classnames_1.default(prefixCls, className, (_b = {},
        _b[prefixCls + "-" + position] = position,
        _b[prefixCls + "-" + size] = size,
        _b[prefixCls + "-" + type] = type,
        _b));
};
var handleTab = function (_a) {
    var key = _a.key, activeKey = _a.activeKey, onChange = _a.onChange;
    // 如果点击的就是当前的则什么都不处理
    if (key === activeKey)
        return;
    onChange(key);
};
var renderTabTitle = function (_a) {
    var options = _a.options, activeKey = _a.activeKey, onChange = _a.onChange, prefixCls = _a.prefixCls, tabBarExtraContent = _a.tabBarExtraContent, onExtraClick = _a.onExtraClick, tabTitleStyle = _a.tabTitleStyle;
    return (React.createElement("div", { className: prefixCls + "-tab" },
        React.createElement("div", { className: prefixCls + "-tab-container" }, options.map(function (option) {
            var _a;
            var classStr = classnames_1.default(prefixCls + "-tab-item", (_a = {},
                _a[prefixCls + "-tab-item-active"] = activeKey === option.key,
                _a));
            return (React.createElement("div", { className: classStr, style: tabTitleStyle, role: "tab", onClick: function () { return handleTab({ key: option.key, activeKey: activeKey, onChange: onChange }); }, key: prefixCls + "-" + option.key }, option.tab));
        })),
        tabBarExtraContent ? (React.createElement("div", { className: prefixCls + "-tab-extra", onClick: onExtraClick }, tabBarExtraContent)) : null));
};
var renderTabContent = function (_a) {
    var options = _a.options, prefixCls = _a.prefixCls, activeKey = _a.activeKey;
    return (React.createElement("div", { className: prefixCls + "-content" }, options.map(function (option) {
        var _a;
        var key = option.key;
        var classStr = classnames_1.default(prefixCls + "-tabpanel", (_a = {},
            _a[prefixCls + "-tabpanel-active"] = key === activeKey,
            _a));
        return (React.createElement("div", { className: classStr, role: "tabpanel", key: prefixCls + "-" + option.key }, option.content));
    })));
};
var renderTopLeft = function (props) {
    return (React.createElement(React.Fragment, null,
        renderTabTitle(props),
        renderTabContent(props)));
};
var renderBottomRight = function (props) {
    return (React.createElement(React.Fragment, null,
        renderTabContent(props),
        renderTabTitle(props)));
};
var renderTabPosition = function (props) {
    var tabPosition = props.tabPosition;
    if (leftTopPosition.has(tabPosition))
        return renderTopLeft(props);
    if (rightBottomPosition.has(tabPosition))
        return renderBottomRight(props);
    warning(false, '`tabPosition` should be one of [`left`, `right`, `bottom`, `top`]');
    return renderTopLeft(props);
};
var Tabs = function (props) {
    var style = props.style;
    return (React.createElement("div", { className: getClassNames(props), style: style }, renderTabPosition(props)));
};
Tabs.defaultProps = defaultProps;
exports.default = Tabs;
