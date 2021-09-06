/// <reference types="react" />
export interface ActionsItemType {
    key?: string;
    content: string | React.ReactNode;
    onClick: ItemClickProps;
}
export declare type noop = (e: React.MouseEvent) => void;
export declare type ItemClickProps = (key: string, item: ActionsItemType) => void;
export interface ActionSheetProps {
    actions: Array<ActionsItemType>;
    cancelText?: string | React.ReactNode;
    onCancel?: noop;
    closeOnClickModal?: boolean;
}
