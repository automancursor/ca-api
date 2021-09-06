import * as React from 'react';
import { SwitchProps } from './interface';
import './style/index.scss';
declare const Switch: React.SFC<SwitchProps> & {
    defaultProps: Partial<SwitchProps>;
};
export default Switch;
