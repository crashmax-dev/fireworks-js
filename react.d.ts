import React, { Component, CSSProperties } from 'react';
import { FireworksOptions, Fireworks as Fw } from './fireworks';
export interface FireworksProps {
    options?: FireworksOptions;
    style?: CSSProperties;
}
export declare class Fireworks extends Component<FireworksProps> {
    _fw: Fw;
    _ref: HTMLElement | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.DetailedReactHTMLElement<{
        ref: (ref: HTMLElement) => HTMLElement;
        children: React.ReactNode;
        style: React.CSSProperties | undefined;
    }, HTMLElement>;
}
