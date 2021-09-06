import * as React from 'react';
import { ColProps } from './interface';
import './style/index.scss';
declare const Col: React.SFC<ColProps> & {
    defaultProps: Partial<ColProps>;
};
export default Col;
