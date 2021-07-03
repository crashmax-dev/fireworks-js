import React, { CSSProperties } from 'react';
import { FireworksOptions } from './fireworks';
interface FireworksProps {
    options?: FireworksOptions;
    style?: CSSProperties;
}
declare const Fireworks: React.FC<FireworksProps>;
export { Fireworks, FireworksOptions };
