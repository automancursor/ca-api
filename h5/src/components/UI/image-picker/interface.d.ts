export declare type OperationType = 'add' | 'remove';
export interface FileItemProps {
    url?: string;
    index?: number;
    orientation?: number;
    file?: File;
    _type?: string;
}
export interface ImagePickerProps {
    onChange: (files: Array<FileItemProps>, operation: OperationType, index?: number) => void;
    fileList: Array<FileItemProps>;
    multiple: boolean;
    maxLength?: number;
    accept: string;
    disabled: boolean;
    className?: string;
    selectable: boolean;
    onFail: (reason?: string) => void;
    preview: boolean;
    disableDelete: boolean;
    onPreview: (file: FileItemProps, index?: number) => void;
    onRemove: (file: FileItemProps, index?: number) => void;
}
