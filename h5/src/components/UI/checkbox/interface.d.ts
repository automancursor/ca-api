/// <reference types="react" />
/**
 * checkbox interface
 */
export interface CheckboxProps {
    checked?: boolean;
    onChange: (e: Event) => void;
    autoFocus?: boolean;
    disabled?: boolean;
    className?: string;
    indeterminate?: boolean;
    defaultChecked?: boolean;
    onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    prefixCls?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<any>;
    onMouseLeave?: React.MouseEventHandler<any>;
    onKeyPress?: React.KeyboardEventHandler<any>;
    onKeyDown?: React.KeyboardEventHandler<any>;
    children?: React.ReactNode;
}
interface OptionValue {
    label: string | number;
    value: any;
}
/**
 * checkboxGroup
 */
export interface CheckGroupProps {
    onChange: (checkedValue: any) => void;
    defaultValue: string[];
    disabled: boolean;
    options: Array<OptionValue>;
    value: string[];
}
export {};
