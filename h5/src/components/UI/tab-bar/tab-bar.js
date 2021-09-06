"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var grid_1 = require("../grid");
var tabs_1 = require("../tabs");
var badge_1 = require("../badge");
require("./style");
var useState = React.useState;
var defaultProps = {
    prefixCls: 'cp-ui-tab-bar',
    tabBarPosition: 'bottom',
    onPress: function () { }
};
var getClassNames = function (_a) {
    var _b;
    var className = _a.className, prefixCls = _a.prefixCls, hidden = _a.hidden;
    return classnames_1.default(prefixCls, className, (_b = {},
        _b[prefixCls + "-hidden"] = hidden,
        _b));
};
var wrapperBarge = function (item, children) {
    if (item.dot || item.badge) {
        return (React.createElement(badge_1.default, { dot: item.dot, text: item.badge, status: "success" }, children));
    }
    return children;
};
var wrapperOptions = function (_a, activeKey) {
    var items = _a.items, prefixCls = _a.prefixCls;
    if (items === undefined) {
        return [];
    }
    return items.map(function (item, index) {
        var _a, _b;
        var currentKey = (_a = item.key) !== null && _a !== void 0 ? _a : "cp-tab-bar-" + index;
        var itemEle = (React.createElement(React.Fragment, null,
            React.createElement("div", { className: prefixCls + "-tab-icon" }, activeKey === currentKey ? item.selectedIcon : item.icon),
            React.createElement("div", { className: prefixCls + "-tab-title" }, activeKey === currentKey ? item.selectedTitle : item.title)));
        return {
            key: currentKey,
            tab: React.createElement("div", { className: prefixCls + "-tab" }, wrapperBarge(item, itemEle)),
            content: (React.createElement("div", { className: prefixCls + "-content" },
                React.createElement("div", { className: prefixCls + "-content-inner" }, (_b = item.content) !== null && _b !== void 0 ? _b : '')))
        };
    });
};
var TabBar = function (props) {
    var _a = useState('lift'), activeKey = _a[0], setActiveKey = _a[1];
    var barTintColor = props.barTintColor, onPress = props.onPress, tabBarPosition = props.tabBarPosition;
    var handleChange = function (key) {
        setActiveKey(key);
        onPress(key);
    };
    var options = wrapperOptions(props, activeKey);
    return (React.createElement("div", { className: getClassNames(props) },
        React.createElement(grid_1.Row, { style: { height: '100%', width: '100%' } },
            React.createElement(grid_1.Col, { span: 24, style: { height: '100%', width: '100%' } },
                React.createElement(tabs_1.default, { activeKey: activeKey, tabTitleStyle: { backgroundColor: barTintColor }, tabPosition: tabBarPosition, onChange: handleChange, options: options })))));
};
TabBar.defaultProps = defaultProps;
exports.default = TabBar;
