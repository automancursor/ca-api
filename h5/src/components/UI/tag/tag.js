"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
var icon_1 = require("../icon");
var tagChecked_1 = require("./tagChecked");
require("./style/index.scss");
var useState = React.useState;
var noop = function () { };
var defaultProps = {
    size: 'normal',
    onClick: noop,
    closable: false,
    onClose: noop
};
var prefixCls = 'cp-ui-tag';
var getClassNames = function (_a) {
    var _b;
    var size = _a.size, closable = _a.closable, className = _a.className;
    return classnames_1.default(prefixCls, className, (_b = {},
        _b[prefixCls + "-" + size] = size,
        _b[prefixCls + "-closable"] = closable,
        _b));
};
var getStyle = function (color) {
    var style = {};
    if (color) {
        style.border = 'none';
        style.color = '#fff';
        style.background = color;
    }
    return style;
};
var handleClose = function (_a) {
    var event = _a.event, setVisible = _a.setVisible, onClose = _a.onClose;
    event.stopPropagation();
    onClose();
    setVisible(false);
};
var Tag = function (props) {
    var _a = useState(true), visible = _a[0], setVisible = _a[1];
    var closable = props.closable, color = props.color, onClose = props.onClose, onClick = props.onClick, checked = props.checked, _b = props.onChange, onChange = _b === void 0 ? noop : _b, _c = props.disabled, disabled = _c === void 0 ? false : _c, _d = props.type, type = _d === void 0 ? 'primary' : _d, style = props.style;
    var classStr = getClassNames(props);
    var wrapperStyle = getStyle(color);
    if (checked !== undefined) {
        return (React.createElement(tagChecked_1.default, { checked: checked, onChange: onChange, disabled: disabled, type: type }, props.children));
    }
    return visible ? (React.createElement("div", { className: classStr, onClick: onClick, style: style },
        React.createElement("div", { className: prefixCls + "-wrapper", style: wrapperStyle },
            React.createElement("span", { className: prefixCls + "-wrapper-content" }, props.children),
            closable ? (React.createElement(icon_1.default, { type: "close", onClick: function (event) { return handleClose({ event: event, setVisible: setVisible, onClose: onClose }); } })) : null))) : null;
};
Tag.defaultProps = defaultProps;
exports.default = Tag;
