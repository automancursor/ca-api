import * as React from 'react';
export interface Action {
    content?: React.ReactNode;
    onClick?: () => void;
}
export interface CardProps {
    title?: React.ReactNode;
    extra?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    actions: Array<Action>;
    prefixCls: string;
    onExtraClick: () => void;
}
