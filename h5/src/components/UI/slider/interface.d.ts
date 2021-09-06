/// <reference types="react" />
interface SliderProps {
    onChange?: (value?: number) => void;
    onAfterChange?: (value?: number) => void;
    defaultValue?: number;
    tipFormatter?: (value?: string) => React.ReactNode;
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    handle?: any;
}
export interface SliderPropsType extends SliderProps {
    prefixCls?: string;
    marks?: {
        [key: number]: string;
    };
    dots?: boolean;
    included?: boolean;
    maximumTrackStyle?: React.CSSProperties;
    minimumTrackStyle?: React.CSSProperties;
    handleStyle?: React.CSSProperties;
    trackStyle?: React.CSSProperties;
    railStyle?: React.CSSProperties;
    style?: React.CSSProperties;
}
export {};
