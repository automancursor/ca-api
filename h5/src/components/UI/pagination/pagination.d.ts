import * as React from 'react';
import { PaginationProps } from './interface';
import './style/index.scss';
declare const Pagination: React.SFC<PaginationProps> & {
    defaultProps: Partial<PaginationProps>;
};
export default Pagination;
