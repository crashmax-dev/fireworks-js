import React, { Component, CSSProperties } from 'react';
import { FireworksOptions } from './fireworks';
declare type useFireworksProps = {
    initialStart?: boolean;
    initialOptions?: FireworksOptions;
};
export declare const useFireworks: ({ initialStart, initialOptions }: useFireworksProps) => {
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
        ref: (ref: HTMLElement) => HTMLElement;
        className: string | undefined;
        children: React.ReactNode;
        style: React.CSSProperties | undefined;
    }, HTMLElement>;
}
export {};
