import * as React from 'react';
import { CheckGroupProps, CheckboxProps } from './interface';
declare const CheckboxGroup: React.SFC<CheckGroupProps> & {
    defaultProps: Partial<CheckGroupProps>;
    checkbox: React.SFC<CheckboxProps> & {
        defaultProps: Partial<CheckboxProps>;
    };
};
export default CheckboxGroup;
