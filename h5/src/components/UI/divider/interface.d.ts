import * as React from 'react';
export interface DivideProps {
    className?: string;
    dashed: boolean;
    orientation: OrientationEnum;
    type: DivideTypeEnum;
    children?: React.ReactNode;
}
export declare type OrientationEnum = 'left' | 'right' | 'center';
export declare type DivideTypeEnum = 'horizontal' | 'vertical';
