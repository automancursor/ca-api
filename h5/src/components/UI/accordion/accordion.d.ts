import * as React from 'react';
import { AccordionProps } from './interface';
import './style/index.scss';
declare const Accordion: React.SFC<AccordionProps> & {
    defaultProps: Partial<AccordionProps>;
};
export default Accordion;
