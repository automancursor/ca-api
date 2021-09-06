import * as React from 'react';
import { TagProps } from './interface';
import './style/index.scss';
declare const Tag: React.FC<TagProps> & {
    defaultProps: Partial<TagProps>;
};
export default Tag;
