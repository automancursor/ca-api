import * as React from 'react';
export declare type SizeProps = 'small' | 'medium' | 'large';
/**
 * 此组件完全受控
 */
export interface PaginationProps {
    current: number;
    onChange: (page: string | number) => void;
    pageSize: number;
    total: number;
    size: SizeProps;
    className?: string;
    preStep?: React.ReactNode;
    nextStep?: React.ReactNode;
    simple?: boolean;
    mode?: 'number' | 'pointer';
}
