declare module 'react-simple-maps' {
  import { ReactNode } from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: any;
    style?: React.CSSProperties;
    children?: ReactNode;
  }

  export interface GeographiesProps {
    geography: string | any;
    children: (props: { geographies: any[] }) => ReactNode;
  }

  export interface GeographyProps {
    geography: any;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
    style?: any;
    key?: string | number;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
}
