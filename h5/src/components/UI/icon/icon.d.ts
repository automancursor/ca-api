import * as React from 'react';
import './style';
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    size?: string | number;
    type?: string;
    prefixCls: string;
    className?: string;
    spin?: boolean;
    rotate?: boolean;
    rotateDegree?: 0 | 90 | 180 | 270 | 360;
    flip?: boolean;
    flipOrder?: 'horizontal' | 'vertical';
    color?: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}
declare const Icon: React.SFC<IconProps> & {
    defaultProps: Partial<IconProps>;
};
export default Icon;
