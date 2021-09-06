import * as React from 'react';
declare type buttonType = 'warning' | 'primary' | 'ghost';
declare type sizeType = 'large' | 'normal' | 'small';
export interface ButtonProps {
    type: buttonType;
    size: sizeType;
    disabled: boolean;
    loading: boolean;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    prefixCls: string;
    className?: string;
    style?: object;
    icon?: React.ReactNode;
    children?: React.ReactNode;
}
export {};
