"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var panel_1 = require("./panel");
require("./style/index.scss");
var useState = React.useState;
var noop = function () { };
var prefixCls = 'cp-ui-accordion';
var defaultProps = {
    border: true,
    activeKey: [],
    accordion: false,
    dataSource: [],
    onChange: noop
};
var getClassNames = function (_a) {
    var _b;
    var border = _a.border, accordion = _a.accordion, className = _a.className;
    return classnames_1.default(prefixCls, className, (_b = {},
        _b[prefixCls + "-border"] = border,
        _b[prefixCls + "-accordion"] = accordion,
        _b));
};
var handleChange = function (_a) {
    var props = _a.props, key = _a.key, expanded = _a.expanded, activeKeyList = _a.activeKeyList, setActiveKeyList = _a.setActiveKeyList;
    var onChange = props.onChange, accordion = props.accordion;
    console.log('key', activeKeyList.indexOf(key), setActiveKeyList);
    var activeKeyCopy = activeKeyList.slice();
    if (expanded) {
        if (accordion && !activeKeyList.includes(key)) {
            activeKeyCopy = [key];
            setActiveKeyList([key]);
        }
        else if (!activeKeyList.includes(key)) {
            activeKeyCopy.push(key);
            setActiveKeyList(activeKeyCopy);
        }
    }
    else {
        if (accordion && activeKeyList.includes(key)) {
            activeKeyCopy = [];
            setActiveKeyList([]);
        }
        else if (activeKeyList.includes(key)) {
            activeKeyList.splice(activeKeyList.indexOf(key), 1);
            activeKeyCopy = __spreadArrays(activeKeyList);
            setActiveKeyList(activeKeyCopy);
        }
    }
    onChange(activeKeyCopy, key);
};
var Accordion = function (props) {
    var dataSource = props.dataSource, activeKey = props.activeKey, style = props.style;
    var _a = useState(activeKey !== null && activeKey !== void 0 ? activeKey : []), activeKeyList = _a[0], setActiveKeyList = _a[1];
    var classStr = getClassNames(props);
    return (React.createElement("div", { className: classStr, style: style }, dataSource.map(function (data, index) {
        var key = data.key || "" + index;
        return (React.createElement(panel_1.default, { key: key, content: data.content, rightOpenIcon: data.rightOpenIcon, rightCloseIcon: data.rightCloseIcon, icon: data.icon, title: data.title, defaultExpanded: activeKeyList.includes(key), disabled: data.disabled, onChange: function (expanded) {
                return handleChange({ props: props, key: key, expanded: expanded, activeKeyList: activeKeyList, setActiveKeyList: setActiveKeyList });
            } }));
    })));
};
Accordion.defaultProps = defaultProps;
exports.default = Accordion;
