import { ImageStyle } from 'react-native';
import { TmdbImageType } from '../TmdbImage';

interface ImageStyleWithHeight extends ImageStyle {
    height: number;
    margin: number;
    aspectRatio?: number;
    width?: number;
}

export type CarouselEntry = {
    tmdbResource: string;
    itemData: any;
};
export type CarouselParams = {
    type: TmdbImageType;
    items: CarouselEntry[];
    onItemPressed?: (item: any) => void;
    itemStyle: ImageStyleWithHeight;
    containerStyle?: ImageStyle;
    renderX?: boolean;
    itemContainer?: any;
};
