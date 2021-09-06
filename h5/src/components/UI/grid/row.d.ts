import * as React from 'react';
import { RowProps } from './interface';
import './style/index.scss';
declare const Row: React.SFC<RowProps> & {
    defaultProps: Partial<RowProps>;
};
export default Row;
