/**
 * switch
 */
export interface SwitchProps {
    className?: string;
    prefixCls: string;
    color: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    size?: number;
    disabled: boolean;
    platform: 'ios' | 'android';
}
