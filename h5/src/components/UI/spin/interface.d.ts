import * as React from 'react';
export declare type SizeType = 'small' | 'normal';
export interface SpinProps {
    indicator?: React.ReactNode;
    size: SizeType;
    spinning: boolean;
    tip?: string;
    fullScreen: boolean;
    children?: React.ReactNode;
    color?: string;
}
