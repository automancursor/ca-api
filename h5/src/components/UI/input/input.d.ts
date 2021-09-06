import * as React from 'react';
import { InputProps } from './interface';
import './style/index.scss';
declare const Input: React.SFC<InputProps> & {
    defaultProps: Partial<InputProps>;
};
export default Input;
