import * as React from 'react';
import { Omit } from '../utils/type';
declare type InputType = 'text' | 'number' | 'mobile' | 'bankCard' | 'password';
declare type OmitProps = 'type' | 'prefix' | 'onChange' | 'onBlur' | 'value' | 'defaultValue';
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, OmitProps> {
    value?: string;
    defaultValue?: string;
    getInputRef?: (ele: HTMLInputElement) => void;
    type: InputType;
    prefix?: React.ReactNode;
    inlinePrefix?: React.ReactNode;
    inlineSuffix?: React.ReactNode;
    suffix?: React.ReactNode;
    error?: React.ReactNode;
    disabled?: boolean;
    clear: boolean;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    onChange: (value: string) => void;
    onBlur: (value?: string, e?: React.FocusEvent<HTMLInputElement>) => void;
}
export {};
