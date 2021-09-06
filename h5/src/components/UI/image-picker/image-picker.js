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
var warning = require("warning");
var icon_1 = require("../icon");
require("./style/index.scss");
var useRef = React.useRef;
var noop = function () { };
var defaultProps = {
    selectable: true,
    fileList: [],
    onChange: noop,
    multiple: false,
    accept: 'image/*',
    disabled: false,
    preview: false,
    disableDelete: false,
    onFail: noop,
    onRemove: noop,
    onPreview: noop
};
var prefixCls = 'cp-ui-upload';
var getMaxLength = function (max) {
    if (typeof max === 'undefined')
        return -1;
    if (max < 0) {
        warning(false, 'if maxLength is negative, it will be translated by Math.abs(maxLength)');
    }
    return Math.abs(max);
};
var getClassNames = function (_a) {
    var _b;
    var className = _a.className, disabled = _a.disabled;
    return classnames_1.default(prefixCls, className, prefixCls + "-card", (_b = {},
        _b[prefixCls + "-disabled"] = disabled,
        _b));
};
var getRemainFilesLength = function (targetFiles, _a) {
    var fileList = _a.fileList, max = _a.maxLength;
    var maxLength = getMaxLength(max);
    if (maxLength === -1)
        return -1;
    var sumLength = fileList.length + targetFiles.length;
    if (sumLength < maxLength)
        return -1;
    return maxLength - fileList.length;
};
var addImage = function (inputRef) {
    ;
    inputRef.current.click();
};
var handleChange = function (event, props) {
    var onChange = props.onChange, onFail = props.onFail, fileList = props.fileList;
    var newFiles = fileList.slice();
    var promistFiles = [];
    var targetFiles = event.target.files;
    if (targetFiles) {
        var remainLength = getRemainFilesLength(targetFiles, props);
        var length_1 = remainLength === -1 ? targetFiles.length : remainLength;
        for (var i = 0; i < length_1; i++) {
            var parseFiles = parseFile(targetFiles[i], i);
            promistFiles.push(parseFiles);
        }
        Promise.all(__spreadArrays(newFiles, promistFiles))
            .then(function (imageItems) { return onChange(imageItems, 'add'); })
            .catch(function (error) {
            onFail(error);
        });
    }
};
var parseFile = function (file, index) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var dataURL = e.target.result;
            if (!dataURL) {
                reject("Fail to get the " + index + " image");
                return;
            }
            var orientation = 1;
            getOrientation(file, function (res) {
                // -2: not jpeg , -1: not defined
                if (res > 0) {
                    orientation = res;
                }
                resolve({
                    url: dataURL,
                    index: index,
                    orientation: orientation,
                    file: file
                });
            });
        };
        reader.readAsDataURL(file);
    });
};
/**
 * 获取原始文件
 * @param file
 * @param callback
 */
var getOrientation = function (file, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var view = new DataView(e.target.result);
        if (view.getUint16(0, false) !== 0xffd8) {
            return callback(-2);
        }
        var length = view.byteLength;
        var offset = 2;
        while (offset < length) {
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker === 0xffe1) {
                var tmp = view.getUint32((offset += 2), false);
                if (tmp !== 0x45786966) {
                    return callback(-1);
                }
                var little = view.getUint16((offset += 6), false) === 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++) {
                    if (view.getUint16(offset + i * 12, little) === 0x0112) {
                        return callback(view.getUint16(offset + i * 12 + 8, little));
                    }
                }
            }
            else if ((marker & 0xff00) !== 0xff00) {
                break;
            }
            else {
                offset += view.getUint16(offset, false);
            }
        }
        return callback(-1);
    };
    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
};
var handleRemove = function (_a, file) {
    var fileList = _a.fileList, onChange = _a.onChange, onRemove = _a.onRemove;
    var newFiles = fileList.slice();
    newFiles = newFiles.filter(function (item) {
        return item.index !== file.index;
    });
    onChange(newFiles, 'remove');
    onRemove(file);
};
var getRotation = function (orientation) {
    if (orientation === void 0) { orientation = 1; }
    var imgRotation = 0;
    switch (orientation) {
        case 3:
            imgRotation = 180;
            break;
        case 6:
            imgRotation = 90;
            break;
        case 8:
            imgRotation = 270;
            break;
        default:
    }
    return imgRotation;
};
var RenderFiles = function (props) {
    var fileList = props.fileList, selectable = props.selectable, accept = props.accept, multiple = props.multiple, preview = props.preview, disableDelete = props.disableDelete, onPreview = props.onPreview, disabled = props.disabled;
    var inputRef = useRef(null);
    var fileListCopy = fileList.slice();
    if (selectable) {
        fileListCopy.push({ _type: 'add' });
    }
    return fileListCopy.map(function (file, index) {
        if (file._type === 'add') {
            return (React.createElement("div", { className: prefixCls + "-item " + prefixCls + "-add", key: Math.random() + "-input" },
                React.createElement("div", { className: prefixCls + "-add-image", onClick: function () { return addImage(inputRef); } },
                    React.createElement("div", { className: prefixCls + "-add-text" })),
                React.createElement("input", { type: "file", accept: accept, multiple: multiple, disabled: disabled, onChange: function (e) { return handleChange(e, props); }, ref: inputRef, style: { display: 'none' } })));
        }
        var imgStyle = {
            transform: "rotate(" + getRotation(file.orientation) + "deg)"
        };
        return (React.createElement("div", { className: prefixCls + "-item " + prefixCls + "-image", key: file.url },
            React.createElement("div", { className: prefixCls + "-item-info" },
                React.createElement("img", { src: file.url, style: imgStyle })),
            React.createElement("div", { className: prefixCls + "-operation" },
                preview && (React.createElement("span", { className: prefixCls + "-preview", onClick: function () { return onPreview(file, index); } },
                    React.createElement(icon_1.default, { type: "eye" }))),
                !disableDelete && (React.createElement("span", { className: prefixCls + "-remove", onClick: function () { return handleRemove(props, file); } },
                    React.createElement(icon_1.default, { type: "close", size: 16 }))))));
    });
};
var ImagePicker = function (props) {
    var classStr = getClassNames(props);
    return React.createElement("div", { className: classStr }, RenderFiles(props));
};
ImagePicker.defaultProps = defaultProps;
exports.default = ImagePicker;
