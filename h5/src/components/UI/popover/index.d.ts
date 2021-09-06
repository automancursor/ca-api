/// <reference types="react" />
/// <reference types="@emotion/core" />
declare const _default: {
    PopoverWapper: import("react").FC<import("./interface").PopOverPropsType> & {
        defaultProps: Partial<import("./interface").PopOverPropsType>;
    };
    PopoverItem: import("react").FC<import("./interface").PopoverItemProps> & {
        defaultProps: Partial<import("./interface").PopoverItemProps>;
        itemName: string;
    };
};
export default _default;
