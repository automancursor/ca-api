"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classnames_1 = require("classnames");
require("./style");
var icon_1 = require("../icon");
var useState = React.useState, useRef = React.useRef, useEffect = React.useEffect, useImperativeHandle = React.useImperativeHandle;
var prefixCls = 'cp-ui-list-view';
var timeout = function (delay) { return new Promise(function (resolve) { return setTimeout(resolve, delay); }); };
var defaultProps = {
    noMore: false,
    backTop: false,
    prefixCls: prefixCls,
    noMoreTip: '已经到底了~'
};
var scrollHandle = function (e, props, _a) {
    var listViewStatusRefs = _a.listViewStatusRefs, pullUpStatus = _a.pullUpStatus, pullUpHide = _a.pullUpHide, setPullUpStatus = _a.setPullUpStatus;
    var pullUpLoad = props.pullUpLoad, noMore = props.noMore;
    var target = e.target;
    //获取滚动距离，滚动方向，距底部距离
    var direction = target.scrollTop > listViewStatusRefs.current.scrollTop ? 'up' : 'down';
    listViewStatusRefs.current.scrollTop = target.scrollTop;
    var scrollBottom = target.scrollHeight - target.scrollTop - target.clientHeight;
    /*
     * 距底部距离小于10且是向上滚动
     * 开启了上拉加载 且 未隐藏底部提示 且 还有更多数据 且 不是正在加载中
     * 触发上拉加载
     * */
    if (scrollBottom < 10 && direction === 'up') {
        if (pullUpLoad && !pullUpHide && !noMore && pullUpStatus !== 1) {
            _pullUpLoad(props, setPullUpStatus);
        }
    }
};
var touchStartHandle = function (e, _a) {
    var wrapperElRef = _a.wrapperElRef, setMove = _a.setMove, listViewStatusRefs = _a.listViewStatusRefs;
    if (e.touches.length > 1)
        return;
    var touch = e.touches[0];
    //在页面顶部和底部时才 开启拉动动效
    if (wrapperElRef.current &&
        (wrapperElRef.current.scrollTop <= 0 ||
            wrapperElRef.current.scrollHeight ===
                wrapperElRef.current.scrollTop + wrapperElRef.current.clientHeight)) {
        setMove(true);
        listViewStatusRefs.current.touchX = touch.clientX;
        listViewStatusRefs.current.touchY = touch.clientY;
        listViewStatusRefs.current.time = new Date().getTime();
        if (wrapperElRef.current.scrollTop <= 0) {
            //顶部拉动时，判定为下拉刷新模式
            listViewStatusRefs.current.type = 'pullDown';
        }
        else {
            //底部拉动时,判定为上拉加载模式
            listViewStatusRefs.current.type = 'pullUp';
        }
    }
    else {
        //关闭拉动动效
        setMove(false);
    }
};
var touchMoveHandle = function (e, props, _a) {
    var move = _a.move, listViewStatusRefs = _a.listViewStatusRefs, pullUpHide = _a.pullUpHide, setMove = _a.setMove, setTranslateY = _a.setTranslateY;
    if (e.touches.length > 1 || !move)
        return;
    var pullDownRefresh = props.pullDownRefresh, pullUpLoad = props.pullUpLoad;
    //获取拉动偏移量
    var touch = e.touches[0];
    var moveX = touch.clientX - listViewStatusRefs.current.touchX;
    var moveY = touch.clientY - listViewStatusRefs.current.touchY;
    // 下拉刷新模式下，Y轴偏移量为负（上拉）,或未开启下拉刷新时，返回
    if (listViewStatusRefs.current.type === 'pullDown' && (moveY < 0 || !pullDownRefresh))
        return;
    //上拉加载模式下，Y轴偏移量为正（下拉），或未开启上拉加载时，返回
    if (listViewStatusRefs.current.type === 'pullUp' && (moveY > 0 || !pullUpLoad || pullUpHide))
        return;
    /*
     * 在20毫秒内 X轴偏移量/Y轴偏移量 > 0.8 ,则判定用户在进行横向滑动，而不是纵向滑动
     * 此时拉动动效，初始化各变量
     * */
    if (new Date().getTime() - listViewStatusRefs.current.time < 20) {
        if (Math.abs(moveX / moveY) > 0.8) {
            listViewStatusRefs.current.touchX = 0;
            listViewStatusRefs.current.touchY = 0;
            listViewStatusRefs.current.time = 0;
            move = false;
            setMove(false);
        }
    }
    else {
        /*
         * 否则判定为进行纵向滑动，
         * 页面跟随滑动距离为手指移动距离的 0.3 倍
         * */
        setTranslateY(moveY * 0.3);
    }
};
var touchEndHandle = function (e, props, _a) {
    var listViewStatusRefs = _a.listViewStatusRefs, move = _a.move, translateY = _a.translateY, pullUpHide = _a.pullUpHide, pullDownStatus = _a.pullDownStatus, pullUpStatus = _a.pullUpStatus, setTranslateY = _a.setTranslateY, setMove = _a.setMove, setPullUpStatus = _a.setPullUpStatus, setPullDownStatus = _a.setPullDownStatus;
    if (!move)
        return;
    var touch = e.changedTouches[0];
    var moveY = touch.clientY - listViewStatusRefs.current.touchY;
    //手指抬起时Y轴偏移量为0则不判定为在进行滑动，返回
    if (moveY === 0)
        return;
    //重置各变量
    listViewStatusRefs.current.touchX = 0;
    listViewStatusRefs.current.touchY = 0;
    listViewStatusRefs.current.time = 0;
    move = false;
    var pullDownRefresh = props.pullDownRefresh, pullUpLoad = props.pullUpLoad, noMore = props.noMore;
    if (listViewStatusRefs.current.type === 'pullDown') {
        /*
         * 手抬起时下拉刷新不是未开始状态下时
         * 拉动量赋值回40或0并返回
         * */
        if (pullDownStatus !== 0) {
            setTranslateY(listViewStatusRefs.current.pullDownDoneBacking ? 0 : 40);
            return;
        }
        //未开启下拉刷新 或者 拉动量小于 40 （达不到下拉刷新要求拉动量）时，回弹。
        if (!pullDownRefresh || translateY <= 40) {
            setMove(false);
            setTranslateY(0);
        }
        else {
            //否则判定为成功触发下拉刷新
            _pullDownRefresh(props, { setMove: setMove, setTranslateY: setTranslateY, setPullDownStatus: setPullDownStatus, listViewStatusRefs: listViewStatusRefs });
        }
    }
    else if (listViewStatusRefs.current.type === 'pullUp') {
        //回弹
        setMove(false);
        setTranslateY(0);
        /*
         * 开启了上拉加载 且 未隐藏底部提示 且 还有更多数据 且 不是正在加载中 且 Y轴偏移量小于-20（是在上拉）
         * 触发上拉加载
         * */
        if (pullUpLoad && !pullUpHide && !noMore && pullUpStatus !== 1 && moveY < -20) {
            _pullUpLoad(props, setPullUpStatus);
        }
    }
    listViewStatusRefs.current.type = '';
};
/*
 * 可在父组件中通过ref调用该方法，传入自定义异步函数组件会根据异步函数的状态去处理下拉的状态，自动下拉刷新
 * */
//下拉刷新
var _pullDownRefresh = function (props, _a) {
    var setMove = _a.setMove, setTranslateY = _a.setTranslateY, setPullDownStatus = _a.setPullDownStatus, listViewStatusRefs = _a.listViewStatusRefs;
    return __awaiter(void 0, void 0, void 0, function () {
        var pullDownRefresh, customAsyncFn, fn_1, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pullDownRefresh = props.pullDownRefresh;
                    if (!customAsyncFn) {
                        if (!pullDownRefresh)
                            return [2 /*return*/];
                        customAsyncFn = pullDownRefresh;
                    }
                    else {
                        fn_1 = customAsyncFn;
                        customAsyncFn = function () { return Promise.all([fn_1(), timeout(300)]); };
                    }
                    setMove(false);
                    setTranslateY(40);
                    setPullDownStatus(1);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, customAsyncFn()];
                case 2:
                    _b.sent();
                    setPullDownStatus(2);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    setPullDownStatus(3);
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, timeout(500)];
                case 5:
                    _b.sent();
                    setTranslateY(0);
                    listViewStatusRefs.current.pullDownDoneBacking = true;
                    return [4 /*yield*/, timeout(300)];
                case 6:
                    _b.sent();
                    setPullDownStatus(0);
                    listViewStatusRefs.current.pullDownDoneBacking = false;
                    return [2 /*return*/];
            }
        });
    });
};
//上拉加载
var _pullUpLoad = function (props, setPullUpStatus) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, pullUpLoad, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = props.pullUpLoad, pullUpLoad = _a === void 0 ? function () { } : _a;
                setPullUpStatus(1);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, pullUpLoad()];
            case 2:
                _b.sent();
                setPullUpStatus(2);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _b.sent();
                setPullUpStatus(3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getClassNames = function (prefixCls, className) {
    return classnames_1.default(prefixCls, className);
};
var ListView = function (props) {
    var _a, _b, _c, _d, _e, _f;
    var pullDownRefresh = props.pullDownRefresh, pullUpLoad = props.pullUpLoad, children = props.children, noMore = props.noMore, noMoreTip = props.noMoreTip, listViewHandleRefs = props.listViewHandleRefs, className = props.className, prefixCls = props.prefixCls, style = props.style, refreshTips = props.refreshTips, upLoadTips = props.upLoadTips;
    var _g = useState(0), translateY = _g[0], setTranslateY = _g[1];
    var _h = useState(false), move = _h[0], setMove = _h[1];
    var _j = useState(true), pullUpHide = _j[0], setPullUpHide = _j[1];
    var _k = useState(0), pullDownStatus = _k[0], setPullDownStatus = _k[1];
    var _l = useState(0), pullUpStatus = _l[0], setPullUpStatus = _l[1];
    var listViewStatusRefs = useRef({
        scrollTop: 0,
        touchX: 0,
        touchY: 0,
        time: 0,
        type: '',
        pullDownDoneBacking: false //下拉刷新完成后，正在回弹至初始位置的状态。 ps:解决一直重复下拉时的bug
    });
    var innerElRef = useRef(null);
    var wrapperElRef = useRef(null);
    useEffect(function () {
        //内容发生变化时重新计算 pullUpHide
        if (innerElRef.current && wrapperElRef.current) {
            var pullUpHide_1 = innerElRef.current.clientHeight < wrapperElRef.current.clientHeight;
            setPullUpHide(pullUpHide_1);
        }
    }, [props.children]);
    useImperativeHandle(listViewHandleRefs, function () {
        return {
            pullDownRefreshRenderData: function () {
                _pullDownRefresh(props, { setMove: setMove, setTranslateY: setTranslateY, setPullDownStatus: setPullDownStatus, listViewStatusRefs: listViewStatusRefs });
            }
        };
    });
    var classStr = getClassNames(prefixCls, className);
    return (React.createElement("div", { className: classStr, style: style, ref: wrapperElRef, onTouchStart: function (e) {
            touchStartHandle(e, { wrapperElRef: wrapperElRef, setMove: setMove, listViewStatusRefs: listViewStatusRefs });
        }, onTouchMove: function (e) {
            touchMoveHandle(e, props, {
                move: move,
                listViewStatusRefs: listViewStatusRefs,
                pullUpHide: pullUpHide,
                setMove: setMove,
                setTranslateY: setTranslateY
            });
        }, onTouchEnd: function (e) {
            touchEndHandle(e, props, {
                listViewStatusRefs: listViewStatusRefs,
                move: move,
                translateY: translateY,
                pullUpHide: pullUpHide,
                pullDownStatus: pullDownStatus,
                pullUpStatus: pullUpStatus,
                setTranslateY: setTranslateY,
                setMove: setMove,
                setPullUpStatus: setPullUpStatus,
                setPullDownStatus: setPullDownStatus
            });
        }, onScroll: function (e) {
            scrollHandle(e, props, { listViewStatusRefs: listViewStatusRefs, pullUpStatus: pullUpStatus, pullUpHide: pullUpHide, setPullUpStatus: setPullUpStatus });
        } },
        React.createElement("div", { style: {
                transform: "translateY(" + translateY + "px)",
                transition: move ? '' : 'transform .3s ease'
            } },
            pullDownRefresh && (React.createElement("div", { className: prefixCls + "-pull-down-tip" }, pullDownStatus !== 0 ? (React.createElement("div", null,
                pullDownStatus === 1 &&
                    ((refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.loading) ? (refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.loading.icon) : (React.createElement(icon_1.default, { type: "spinner", spin: true, size: 18 }))),
                pullDownStatus === 2 &&
                    ((refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.success) ? (refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.success.icon) : (React.createElement(icon_1.default, { type: 'check-circle', size: 18 }))),
                pullDownStatus === 3 &&
                    ((refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.error) ? (refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.error.icon) : (React.createElement(icon_1.default, { type: 'times-circle', size: 18 }))),
                React.createElement("span", null,
                    pullDownStatus === 1 &&
                        (((_a = refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.loading) === null || _a === void 0 ? void 0 : _a.text) ? (_b = refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.loading) === null || _b === void 0 ? void 0 : _b.text : '正在刷新'),
                    pullDownStatus === 2 &&
                        (((_c = refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.success) === null || _c === void 0 ? void 0 : _c.text) ? (_d = refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.success) === null || _d === void 0 ? void 0 : _d.text : '刷新成功'),
                    pullDownStatus === 3 &&
                        (((_e = refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.error) === null || _e === void 0 ? void 0 : _e.text) ? (_f = refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.error) === null || _f === void 0 ? void 0 : _f.text : '刷新失败')))) : (React.createElement("div", null,
                React.createElement(icon_1.default, { type: "arrow-down", size: 18 }),
                React.createElement("span", null, translateY > 60
                    ? (refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.actionRelease) ? refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.actionRelease : '释放刷新'
                    : (refreshTips === null || refreshTips === void 0 ? void 0 : refreshTips.actionDown) ? refreshTips.actionDown
                        : '下拉刷新'))))),
            React.createElement("div", { ref: innerElRef }, children),
            !pullUpHide && pullUpLoad && (React.createElement("div", { className: prefixCls + "-pull-up-tip" }, noMore ? (noMoreTip) : pullUpStatus === 0 || pullUpStatus === 1 ? (React.createElement("div", null, (upLoadTips === null || upLoadTips === void 0 ? void 0 : upLoadTips.loading) ? (upLoadTips === null || upLoadTips === void 0 ? void 0 : upLoadTips.loading) : (React.createElement(React.Fragment, null,
                React.createElement(icon_1.default, { type: "spinner", spin: true, size: 18 }),
                React.createElement("span", null, "\u52A0\u8F7D\u4E2D"))))) : pullUpStatus === 2 ? (React.createElement("div", null, (upLoadTips === null || upLoadTips === void 0 ? void 0 : upLoadTips.success) ? (upLoadTips === null || upLoadTips === void 0 ? void 0 : upLoadTips.success) : (React.createElement(React.Fragment, null,
                React.createElement(icon_1.default, { type: 'check-circle', size: 18 }),
                React.createElement("span", null, "\u52A0\u8F7D\u6210\u529F"))))) : pullUpStatus === 3 ? (React.createElement("div", null, (upLoadTips === null || upLoadTips === void 0 ? void 0 : upLoadTips.error) ? (upLoadTips === null || upLoadTips === void 0 ? void 0 : upLoadTips.error) : (React.createElement(React.Fragment, null,
                React.createElement(icon_1.default, { type: 'times-circle', size: 18 }),
                React.createElement("span", null, "\u52A0\u8F7D\u5931\u8D25"))))) : (''))))));
};
ListView.defaultProps = defaultProps;
exports.default = ListView;
