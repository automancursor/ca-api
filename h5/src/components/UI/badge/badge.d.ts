import * as React from 'react';
import { BadgeProps } from './interface';
import './style/index.scss';
declare const Badge: React.SFC<BadgeProps> & {
    defaultProps: Partial<BadgeProps>;
};
export default Badge;
