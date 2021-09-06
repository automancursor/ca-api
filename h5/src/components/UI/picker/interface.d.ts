/// <reference types="react" />
export interface PickerColumnProps {
    options: string[];
    name: string;
    value: string;
    itemHeight: number;
    columnHeight: number;
    onChange: (name: string, value: string) => void;
    onClick: (name: string, value: string) => void;
}
export interface PickerPanelProps {
    optionGroups: object;
    valueGroups: object;
    onChange: (name: string, value: string) => void;
    onClick: (name: string, value: string) => void;
    itemHeight: number;
    height: number;
}
export interface PickerItemProps {
    value: string;
    label: string;
    children?: PickerItemProps[];
}
export interface PickerProps {
    data: object;
    valueGroups: object;
    onChange: (name: string, value: string) => void;
    onVisibleChange?: (visible: boolean) => void;
    okText: string | React.ReactElement;
    dismissText: string | React.ReactElement;
    title: string | React.ReactElement;
    onOk?: (value: object) => void;
    onDismiss?: () => void;
}
