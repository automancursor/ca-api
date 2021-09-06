"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var icon_1 = require("../icon");
var grid_1 = require("../grid");
require("./style/index.scss");
var noop = function () { };
var prefixCls = 'cp-ui-pagination';
var defaultProps = {
    current: 1,
    onChange: noop,
    pageSize: 10,
    total: 0,
    size: 'medium'
};
var getClassNames = function (_a) {
    var _b;
    var size = _a.size;
    return classnames_1.default(prefixCls, (_b = {},
        _b[prefixCls + "-" + size] = size,
        _b));
};
var getTotalPages = function (total, pageSize) {
    var totalPages = Math.ceil(total / pageSize);
    return totalPages <= 0 ? 1 : totalPages;
};
var translateValue = function (value, step, operation, totalPages) {
    if (operation === 'subtraction') {
        return value - step <= 0 ? 1 : value - step;
    }
    else {
        return value + step >= totalPages ? totalPages : value + step;
    }
};
var jump = function (value, _a) {
    var onChange = _a.onChange;
    onChange(value);
};
var jumpPre = function (props) {
    var current = props.current, total = props.total, pageSize = props.pageSize;
    if (current === 1)
        return;
    var totalPages = getTotalPages(total, pageSize);
    var value = translateValue(current, 1, 'subtraction', totalPages);
    jump(value, props);
};
var jumpNext = function (props) {
    var current = props.current, total = props.total, pageSize = props.pageSize;
    var totalPages = getTotalPages(total, pageSize);
    if (current === totalPages)
        return;
    var value = translateValue(current, 1, 'add', totalPages);
    jump(value, props);
};
/**
 * 中间部分
 * @param props
 */
var renderSimpleData = function (props) {
    var total = props.total, current = props.current, pageSize = props.pageSize, mode = props.mode;
    var pages = getTotalPages(total, pageSize);
    var classStr = classnames_1.default(prefixCls + "-item");
    if (mode === 'pointer') {
        return React.createElement("div", { className: classStr });
    }
    return (React.createElement("div", { className: classStr },
        React.createElement("span", { className: prefixCls + "-num" }, current),
        "/",
        pages));
};
var handlePage = function (_a, _b) {
    var value = _a.value;
    var onChange = _b.onChange;
    onChange(value);
};
var getPointerContentData = function (_a) {
    var total = _a.total, pageSize = _a.pageSize;
    var pages = getTotalPages(total, pageSize);
    var data = [];
    for (var i = 1; i <= pages; i++) {
        data.push({ value: i });
    }
    return data;
};
var renderPointerContainerData = function (props) {
    var current = props.current;
    var dataSources = getPointerContentData(props);
    return (React.createElement(React.Fragment, null, dataSources.map(function (record, index) {
        var _a;
        var classStr = classnames_1.default(prefixCls + "-item ", prefixCls + "-noEllipsis", (_a = {},
            _a[prefixCls + "-item-active"] = current === record.value,
            _a));
        return (React.createElement("li", { className: classStr, key: "page-" + index, onClick: function () { return handlePage(record, props); } },
            React.createElement("span", { className: prefixCls + "-pointer-span" })));
    })));
};
/**
 * mode 为pointer下状态
 * @param props
 */
var renderPointerData = function (props) {
    return React.createElement("ul", { className: prefixCls + "-wrap " }, renderPointerContainerData(props));
};
var Pagination = function (props) {
    var _a, _b;
    var classStr = getClassNames(props);
    var preStep = props.preStep, nextStep = props.nextStep, current = props.current, total = props.total, pageSize = props.pageSize, simple = props.simple, mode = props.mode;
    var totalPages = getTotalPages(total, pageSize);
    var preClass = classnames_1.default(prefixCls + "-pre", prefixCls + "-item", (_a = {},
        _a[prefixCls + "-pre-disabled"] = current === 1,
        _a));
    var nextClass = classnames_1.default(prefixCls + "-next", prefixCls + "-item", (_b = {},
        _b[prefixCls + "-next-disabled"] = current === totalPages,
        _b));
    return (React.createElement("div", { className: classStr },
        React.createElement("div", { className: prefixCls + "-wrap" }, mode === 'pointer' ? (React.createElement(grid_1.Row, { justify: 'center' },
            React.createElement(grid_1.Col, null, renderPointerData(props)))) : (React.createElement(grid_1.Row, { justify: 'space-between' },
            React.createElement(grid_1.Col, null,
                React.createElement("a", { onClick: function () {
                        jumpPre(props);
                    }, className: preClass }, preStep || React.createElement(icon_1.default, { type: "angle-left" }))),
            !simple && React.createElement(grid_1.Col, null,
                " ",
                renderSimpleData(props)),
            React.createElement(grid_1.Col, null,
                React.createElement("a", { onClick: function () {
                        jumpNext(props);
                    }, className: nextClass }, nextStep || React.createElement(icon_1.default, { type: "angle-right" }))))))));
};
Pagination.defaultProps = defaultProps;
exports.default = Pagination;
