import * as React from 'react';
export interface RadioProps {
    autoFocus: boolean;
    checked: boolean;
    defaultChecked: boolean;
    disabled: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
    color: string;
}
export interface OptionTypes {
    label?: React.ReactNode;
    value?: any;
    disabled?: boolean;
}
export declare type func = (value: any) => void;
