export interface AffixProps {
    offsetTop?: number;
    offsetBottom?: number;
    container?: () => HTMLElement;
    onChange: (fixed: boolean) => void;
    useSticky: boolean;
    prefixCls: string;
}
