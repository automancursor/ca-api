import * as React from 'react';
export declare type StatusTypes = 'wait' | 'process' | 'finish' | 'error';
export interface StepProps {
    title?: React.ReactNode;
    describe?: React.ReactNode;
    icon?: React.ReactNode;
    status: StatusTypes;
}
export declare type DirectionType = 'horizontal' | 'vertical';
export declare type SizeType = 'small' | 'normal';
export declare type labelPlacement = 'horizontal' | 'vertical';
export interface StepsProps {
    direction: DirectionType;
    current: string | number;
    size: SizeType;
    className?: string;
    labelPlacement: labelPlacement;
    options: Array<StepProps>;
    color?: string;
}
