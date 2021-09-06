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
var classnames_1 = require("classnames");
var icon_1 = require("../icon");
var utils_1 = require("../utils");
require("./style/index.scss");
var useRef = React.useRef, useEffect = React.useEffect;
var noop = function () { };
var prefixCls = 'cp-ui-input';
var defaultProps = {
    type: 'text',
    disabled: false,
    clear: false,
    onChange: noop,
    onBlur: noop,
    onFocus: noop
};
var normalizeValue = function (value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
};
var getClassName = function (_a) {
    var _b;
    var disabled = _a.disabled, className = _a.className;
    return classnames_1.default(prefixCls, className, (_b = {},
        _b[prefixCls + "-disabled"] = disabled,
        _b));
};
var getTrueType = function (type) {
    var inputType = 'text';
    if (type === 'bankCard' || type === 'mobile') {
        inputType = 'tel';
    }
    else if (type === 'password') {
        inputType = 'password';
    }
    else {
        inputType = type;
    }
    return inputType;
};
var omitProps = function (props) {
    var excludeProps = [
        'onChange',
        'onBlur',
        'type',
        'prefix',
        'style',
        'suffix',
        'inlinePrefix',
        'clear',
        'className',
        'addonBefore',
        'addonAfter',
        'error'
    ];
    return utils_1.omit(props, excludeProps);
};
var formatValue = function (value, type) {
    var newValue = value;
    switch (type) {
        case 'bankCard':
            newValue = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
            break;
        case 'mobile':
            newValue = value.replace(/\D/g, '').substring(0, 11);
            var valueLen = newValue.length;
            if (valueLen > 3 && valueLen < 8) {
                newValue = newValue.substr(0, 3) + " " + newValue.substr(3);
            }
            else if (valueLen >= 8) {
                newValue = newValue.substr(0, 3) + " " + newValue.substr(3, 4) + " " + newValue.substr(7);
            }
            break;
        // case 'number':
        //   newValue = value.replace(/\D/g, '')
        //   break
        case 'text':
        case 'password':
        case 'number':
        default:
            break;
    }
    return newValue;
};
var parseValue = function (_a) {
    var type = _a.type, value = _a.value;
    var newValue = value;
    var inputValue = utils_1.compose(function (v) { return formatValue(v, type); }, normalizeValue)(newValue);
    return inputValue;
};
var handleChange = function (e, _a) {
    var onChange = _a.onChange, type = _a.type;
    var value = e.target.value;
    var newValue = parseValue({ type: type, value: value });
    onChange(newValue);
};
var handleBlur = function (value, e, _a) {
    var onBlur = _a.onBlur;
    onBlur(value, e);
};
var renderPrefix = function (_a) {
    var prefix = _a.prefix;
    if (!prefix) {
        return null;
    }
    return React.createElement("div", { className: prefixCls + "-prefix" }, prefix);
};
var renderInlinePrefix = function (_a) {
    var inlinePrefix = _a.inlinePrefix;
    if (!inlinePrefix) {
        return null;
    }
    return React.createElement("div", { className: prefixCls + "-inline-prefix" }, inlinePrefix);
};
var renderSuffix = function (_a) {
    var suffix = _a.suffix;
    if (suffix) {
        return null;
    }
    return React.createElement("div", { className: prefixCls + "-suffix" }, suffix);
};
var renderInlineSuffix = function (_a, inputRef) {
    var disabled = _a.disabled, value = _a.value, defaultValue = _a.defaultValue, clear = _a.clear, inlineSuffix = _a.inlineSuffix, onChange = _a.onChange;
    if (inlineSuffix !== undefined) {
        return React.createElement("div", { className: prefixCls + "-inline-suffix" }, inlineSuffix);
    }
    var newValue = normalizeValue(value || defaultValue);
    if (!disabled && newValue && newValue.length && clear) {
        return (React.createElement(icon_1.default, { className: prefixCls + "-clear", type: "times-circle", onClick: function () {
                onChange('');
                inputRef.current.focus();
            }, size: 16, color: "#999" }));
    }
    return null;
};
var renderAddonBefore = function (_a) {
    var addonBefore = _a.addonBefore;
    if (addonBefore) {
        return (React.createElement("div", { className: prefixCls + "-addon-before" },
            React.createElement("div", { className: "before" }, addonBefore)));
    }
    return null;
};
var renderAddonAfter = function (_a) {
    var addonAfter = _a.addonAfter;
    if (addonAfter) {
        return (React.createElement("div", { className: prefixCls + "-addon-after" },
            React.createElement("div", { className: "after" }, addonAfter)));
    }
    return null;
};
var renderErrorEle = function (_a) {
    var error = _a.error;
    if (!error)
        return null;
    return (React.createElement("div", { className: prefixCls + "-error" },
        React.createElement("div", { className: "after" }, error)));
};
var Input = function (props) {
    var _a;
    var _inputRef = useRef(null);
    var type = getTrueType(props.type);
    var addonAfter = props.addonAfter, addonBefore = props.addonBefore, inlinePrefix = props.inlinePrefix, style = props.style;
    var restProps = omitProps(props);
    if ('value' in restProps) {
        restProps.value = normalizeValue(props.value);
        // Input elements must be either controlled or uncontrolled,
        // specify either the value prop, or the defaultValue prop, but not both.
        delete restProps.defaultValue;
    }
    var inputClass = classnames_1.default(prefixCls + "-internal", (_a = {},
        _a[prefixCls + "-group"] = !!addonBefore || !!addonAfter,
        _a));
    var inputStyle = Object.assign({}, inlinePrefix !== undefined ? { paddingLeft: '26px' } : {}, style !== null && style !== void 0 ? style : {});
    useEffect(function () {
        if (props.getInputRef !== undefined && _inputRef.current !== null) {
            props.getInputRef(_inputRef.current);
        }
    }, []);
    return (React.createElement("div", { className: getClassName(props) },
        React.createElement("div", { className: prefixCls + "-container" },
            React.createElement("div", { className: inputClass },
                React.createElement("div", { className: prefixCls + "-content" },
                    renderPrefix(props),
                    renderAddonBefore(props),
                    renderInlinePrefix(props),
                    React.createElement("input", __assign({ type: type, ref: _inputRef, style: inputStyle, onChange: function (e) { return handleChange(e, props); }, onBlur: function (e) { return handleBlur(restProps.value, e, props); } }, restProps)),
                    renderInlineSuffix(props, _inputRef),
                    renderAddonAfter(props)),
                renderErrorEle(props)),
            renderSuffix(props))));
};
Input.defaultProps = defaultProps;
exports.default = Input;
