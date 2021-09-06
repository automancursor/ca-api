import * as React from 'react';
import { CardProps } from './interface';
import './style/index.scss';
declare const Card: React.SFC<CardProps> & {
    defaultProps: Partial<CardProps>;
};
export default Card;
