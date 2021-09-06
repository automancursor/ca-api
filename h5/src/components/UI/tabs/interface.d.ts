import * as React from 'react';
/**
 * tab
 */
export interface TabProps {
    key: string;
    tab?: string | React.ReactNode;
    content?: React.ReactNode | string;
}
export declare type TabsTypes = 'card' | 'line';
export declare type TabsSizeTypes = 'small' | 'normal' | 'large';
export declare type TabsPositionTypes = 'top' | 'bottom' | 'left' | 'right';
/**
 * Tabs 群组
 */
export interface TabsProps {
    activeKey?: string;
    type: TabsTypes;
    onChange: (value: string) => void;
    size: TabsSizeTypes;
    tabBarExtraContent?: React.ReactNode;
    tabBarGutter?: number;
    tabTitleStyle?: React.CSSProperties;
    className?: string;
    tabPosition: TabsPositionTypes;
    prefixCls: string;
    options: Array<TabProps>;
    onExtraClick: (e: React.MouseEvent<HTMLElement>) => void;
    style?: React.CSSProperties;
}
