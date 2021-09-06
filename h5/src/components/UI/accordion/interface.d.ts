import * as React from 'react';
export interface Data {
    key?: string;
    title?: React.ReactNode;
    content?: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    rightOpenIcon?: React.ReactNode;
    rightCloseIcon?: React.ReactNode;
}
export interface PanelProps {
    icon?: React.ReactNode;
    rightOpenIcon?: React.ReactNode;
    rightCloseIcon?: React.ReactNode;
    title?: React.ReactNode;
    content?: React.ReactNode;
    disabled: boolean;
    defaultExpanded: boolean;
    prefixCls: string;
    onChange: (expanded: boolean) => void;
}
export interface AccordionProps {
    className?: string;
    style?: React.CSSProperties;
    border: boolean;
    activeKey: string[];
    accordion: boolean;
    dataSource: Array<Data>;
    onChange: (expandedKeys: string[], key: string) => void;
}
