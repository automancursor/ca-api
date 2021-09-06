import * as React from 'react';
export interface OverlayProps {
    prefixCls: string;
    className?: string;
    maskClassName?: string;
    animationName: string;
    maskAnimationName: string;
    visible: boolean;
    header?: React.ReactNode;
    mask: boolean;
    maskClosable: boolean;
    children?: React.ReactNode;
    closable: boolean;
    close?: React.ReactNode;
    footer?: React.ReactNode;
    autoFix: boolean;
    onClose: () => void;
    destroy: boolean;
    style?: React.CSSProperties;
    zIndex?: number;
}
export declare type Trigger = 'click' | 'hover';
export declare type Direction = 'top' | 'left' | 'bottom' | 'right' | 'leftBottom' | 'leftTop' | 'rightTop' | 'rightBottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
export interface PopupProps {
    trigger: Trigger;
    direction: Direction;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    visible: boolean;
}
