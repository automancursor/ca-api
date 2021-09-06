import * as React from 'react';
import { ButtonProps } from './interface';
import './style/index.scss';
declare const Button: React.SFC<ButtonProps> & {
    defaultProps: Partial<ButtonProps>;
};
export default Button;
