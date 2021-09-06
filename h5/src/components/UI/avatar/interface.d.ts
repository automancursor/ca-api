export declare type SizeType = 'large' | 'normal' | 'small';
export declare type ShapeType = 'square' | 'circle';
export interface AvatarProps {
    size: SizeType | number;
    shape: ShapeType;
    src?: string;
    style?: object;
    srcSet?: string;
    icon?: string;
    alt?: string;
    children?: any;
    onError: () => void;
    onClick: () => void;
}
