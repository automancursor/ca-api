export declare type SizeType = 'small' | 'normal' | 'large';
export declare type TagCheckedType = 'primary' | 'ticked';
export interface TagProps {
    size: SizeType;
    onClick: () => void;
    closable: boolean;
    color?: string;
    className?: string;
    onClose: () => void;
    style?: object;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    type?: TagCheckedType;
}
export interface TagCheckedProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled: boolean;
    type: TagCheckedType;
}
