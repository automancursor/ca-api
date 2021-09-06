import * as React from 'react';
import { ModalProps } from './interface';
import './style/index.scss';
declare const Modal: React.SFC<ModalProps> & {
    defaultProps: Partial<ModalProps>;
};
export default Modal;
