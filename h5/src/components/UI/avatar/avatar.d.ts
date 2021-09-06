import * as React from 'react';
import { AvatarProps } from './interface';
import './style/index.scss';
declare const Avatar: React.SFC<AvatarProps> & {
    defaultProps: Partial<AvatarProps>;
};
export default Avatar;
