/// <reference types="react" />
export interface ModalProps {
    prefixCls: string;
    className?: string;
    maskClassName?: string;
    animationName?: string;
    maskAnimationName?: string;
    visible: boolean;
    title?: React.ReactNode;
    maskClosable: boolean;
    children?: React.ReactNode;
    closable: boolean;
    okText: React.ReactNode;
    cancelText: React.ReactNode;
    onOk: () => void;
    onCancel: () => void;
    destroy: boolean;
    closeIcon?: React.ReactNode;
    footer?: React.ReactNode;
}
