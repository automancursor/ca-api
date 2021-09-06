import * as React from 'react';
export declare type Status = 'success' | 'default' | 'process' | 'warning' | 'error';
export interface BadgeProps {
    text?: React.ReactNode;
    hot?: boolean;
    dot: boolean;
    overflowCount: number;
    status?: Status;
    prefixCls: string;
    style?: React.CSSProperties;
    outStyle?: React.CSSProperties;
    children?: React.ReactNode;
    corner: boolean;
}
