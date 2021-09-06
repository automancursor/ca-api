import * as React from 'react';
import { ImagePickerProps } from './interface';
import './style/index.scss';
declare const ImagePicker: React.SFC<ImagePickerProps> & {
    defaultProps: Partial<ImagePickerProps>;
};
export default ImagePicker;
