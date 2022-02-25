import React, { Component, type CSSProperties } from 'react';
import { type FireworksOptions } from './fireworks';
declare type FireworksHookProps = {
    initialStart?: boolean;
    initialOptions?: FireworksOptions;
};
export declare const useFireworks: ({ initialStart, initialOptions }: FireworksHookProps) => {
    enabled: boolean;
    options: FireworksOptions;
    setOptions: React.Dispatch<React.SetStateAction<FireworksOptions>>;
    setEnabled: (state?: boolean | undefined) => void;
};
export declare type FireworksProps = {
    className?: string;
    style?: CSSProperties;
    enabled?: boolean;
    options?: FireworksOptions;
};
export declare class Fireworks extends Component<FireworksProps> {
    private _fw;
    private _ref;
    static defaultProps: {
        enabled: boolean;
    };
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    toggleStart(): void;
    render(): React.DetailedReactHTMLElement<{
        ref: (ref: HTMLElement | null) => HTMLElement | null;
        className: string | undefined;
        children: React.ReactNode;
        style: React.CSSProperties | undefined;
    }, HTMLElement>;
}
export {};
