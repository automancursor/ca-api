import * as React from 'react';
export declare type SizeType = 'small' | 'medium' | 'large';
export declare type Type = 'line' | 'circle';
export declare type StatusType = 'normal' | 'success' | 'error';
export interface ProgressProps {
    size: SizeType;
    type: Type;
    percent: number;
    showInfo: boolean;
    status: StatusType;
    width?: number;
    activeColor?: string;
    textRender?: (percent: number) => React.ReactNode;
    position: 'fixed' | 'normal';
    unfilled: boolean;
}
