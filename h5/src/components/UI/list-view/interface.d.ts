/// <reference types="react" />
export interface PullDownRefreshProps {
    setMove: React.Dispatch<React.SetStateAction<boolean>>;
    setTranslateY: React.Dispatch<React.SetStateAction<number>>;
    setPullDownStatus: React.Dispatch<React.SetStateAction<number>>;
    listViewStatusRefs: React.MutableRefObject<{
        scrollTop: number;
        touchX: number;
        touchY: number;
        time: number;
        type: string;
        pullDownDoneBacking: boolean;
    }>;
}
export interface RefreshContainer {
    text: string;
    icon: string | React.ReactNode;
}
export interface RefreshTips {
    loading?: RefreshContainer;
    success?: RefreshContainer;
    error?: RefreshContainer;
    actionRelease?: string;
    actionDown?: string;
}
export interface UpLoadTips {
    loading: string | React.ReactNode;
    success?: string | React.ReactNode;
    error?: string | React.ReactNode;
}
export interface ListViewProps {
    pullDownRefresh?: () => void;
    pullUpLoad?: () => Promise<any>;
    noMore: boolean;
    noMoreTip?: string | React.ReactElement;
    children?: React.ReactElement;
    listViewHandleRefs?: React.MutableRefObject<ListViewHandlesProps | null>;
    className?: string;
    prefixCls?: string;
    style?: React.CSSProperties;
    refreshTips?: RefreshTips;
    upLoadTips?: UpLoadTips;
}
export interface ListViewHandlesProps {
    pullDownRefreshRenderData: () => void;
}
