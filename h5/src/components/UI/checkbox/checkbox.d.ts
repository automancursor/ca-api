import * as React from 'react';
import { CheckboxProps } from './interface';
import './style/index.scss';
declare const Checkbox: React.SFC<CheckboxProps> & {
    defaultProps: Partial<CheckboxProps>;
};
export default Checkbox;
