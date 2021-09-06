import * as React from 'react';
/**
 * 垂直对齐方式
 * top: 顶部对齐
 * middle: 居中对齐
 * bottom: 底部对齐
 * baseline: 按第一行文字基线对齐
 * stretch: 未设置高度或设为 auto，将占满整个容器的高度
 */
declare type alignType = 'top' | 'middle' | 'bottom' | 'baseline' | 'stretch';
/**
 * 水平对齐方式
 * start: 左对齐
 * end: 右对齐
 * center: 居中对齐
 * space-around: 每列具有相同的左右间距，行两端间距是列间距的二分之一
 * space-between: 两端对齐，列之间间距相等
 */
declare type justifyType = 'start' | 'end' | 'center' | 'space-around' | 'space-between';
/**
 * 子元素的换行方式，可选nowrap,wrap,wrap-reverse
 */
declare type wrapType = 'nowrap' | 'wrap' | 'wrap-reverse';
/**
 * 栅格占位
 */
declare type spanTypeNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    align: alignType;
    gutter: number | object;
    justify: justifyType;
    wrap?: wrapType;
}
export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
    offset: number;
    span?: spanTypeNumber;
}
export {};
