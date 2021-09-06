import * as React from 'react';
import { StepsProps } from './interface';
import './style/index.scss';
declare const Steps: React.SFC<StepsProps> & {
    defaultProps: Partial<StepsProps>;
};
export default Steps;
